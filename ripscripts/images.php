<?php

class PokemonData{

    private $image = null;
    public $data = null;
    private $images = null;
    private $icons;
    private $description = null;
    private $nN;

    public function __construct($alias, $icons = false, $nN){
        $this->alias = $alias;
        $this->icons = $icons;
        $this->nN = $nN;
        while ( strlen($this->nN) < 3 ) $this->nN = '0' . $this->nN;
    }

    private function createImage(){
        if($this->images == null){
            $this->getDescription($this->alias);
        }
        if($this->images == null){
            die("No images");
        }

        $image = imagecreatetruecolor($this->icons ? 192 : 128, 128);
        imagealphablending($image, true);
        imagesavealpha($image, true);
        imagefill($image, 0, 0, 0x7fff0000);

        $x = 0;
        $y = 0;
        foreach($this->images as $i){
            if($i != null){
                $bottom = 0;
                if($this->icons && $x >= 2){
                    $current = $this->resizeImage(imagecreatefromgif($i), 64, 64);
                }
                else{
                    $current = imagecreatefrompng($i);
                }

                imagealphablending($current, true);
                imagesavealpha($current, true);
                imagefill($current, 0, 0, 0x7fff0000);

                if($y == 1 && $x <= 1){
                    $bottom = $this->getOffsetFromBottom($current);
                }

                imagecopy($image, $current, $x * 64, $y * 64 + $bottom, 0, 0, imagesx($current), imagesy($current));
                imagedestroy($current);

                if($x >= ($this->icons ? 2 : 1)){
                    $x = 0;
                    $y++;
                }
                else{
                    $x++;
                }
            }
        }

        $this->image = $image;
        $this->image = $this->resizeImage($this->image, $this->icons ? 768 : 512, 512);

        $fp = fopen("images/" . $this->alias . ".png", "wb+");
        ob_start();
        imagepng($this->image);
        $src = ob_get_clean();
        fwrite($fp, $src);
        fclose($fp);
    }

    private function getOffsetFromBottom($image){
        for($i = 63; $i >= 0; $i--){
            for($j = 0; $j < 64; $j++){
                if(imagecolorat($image, $j, $i)){
                    return 63 - $i;
                }
            }
        }
    }

    public function showImage(){
        header("Content-Type: image/png");
        if($this->image == null){
            $this->createImage();
        }
        imagepng($this->image);
    }

    public function saveImage(){
        if($this->image == null){
            $this->createImage();
        }
    }

    public function showData(){
        header("Content-Type: application/json");
        if($this->data == null){
            $this->getPokemonData($this->alias);
        }
        echo preg_replace("/\\\\u([a-f0-9]{4})/e", "iconv('UCS-4LE','UTF-8',pack('V', hexdec('U$1')))", json_encode($this->data));
//        echo json_encode($this->data);
    }

    public function saveData($type = "file"){
        if($this->data == null){
            $this->getPokemonData($this->alias);
        }
        if($type == "file"){
            $fp = fopen("data/" . $this->alias . ".json", "wb+");
            fwrite($fp, json_encode($this->data));
            fclose($fp);
        }
        if($type == "mongo"){
            $m = new MongoClient();
            $db = $m->pokemon;
            $pokemons = $db->pokemons;

            if(!$pokemons->findOne(array("alias" => $this->alias))){
                $pokemons->insert($this->data);
            }
            else{
                $pokemons->update(array("alias" => $this->alias), $this->data);
            }

        }
    }

    public function getPokemonData($pokemon_name){
        $curl = curl_init("http://veekun.com/dex/pokemon/" . $pokemon_name);
        curl_setopt_array($curl, array(
            CURLOPT_USERAGENT => "Mozilla/5.0 ;Windows NT 6.1; WOW64; Trident/7.0; rv:11.0; like Gecko",
            CURLOPT_RETURNTRANSFER => true
        ));

        $result = curl_exec($curl);

        if(curl_errno($curl) || curl_getinfo($curl, CURLINFO_HTTP_CODE) != 200){
            curl_close($curl);
            return;
        }
        curl_close($curl);

        $document = new DOMDocument();
        $document->preserveWhiteSpace = false;
        $document->validateOnParse = false;

        try{
            libxml_use_internal_errors(true);
            $document->loadHTML($result);
            libxml_clear_errors();
        }
        catch(Exception $e){
            return null;
        }

        $xpath = new DOMXpath($document);

        $pokemon = (object)array();
        $pokemon->name = strtoupper($document->getElementById("dex-page-name")->nodeValue);
        $pokemon->alias = $pokemon_name;
        $pokemon->info = (object)array(
            "description" => $this->description == null ? $this->getDescription($pokemon_name) : $this->description
        );
        $pokemon->types = array();
        $pokemon->abilities = (object)array(
            "normal" => array(),
            "hidden" => array()
        );
        $pokemon->wild = (object)array(
            "items" => array()
        );
        $pokemon->damage = (object)array();
        $pokemon->stats = (object)array(
            "attack" => 0,
            "defense" => 0,
            "hp" => 0,
            "special_attack" => 0,
            "speed" => 0,
            "special_defense" => 0
        );
        $pokemon->moves = (object)array(
            "level_up" => array(),
            "npc" => array(),
            "learned" => array(),
        );
        $pokemon->ids = (object)array(
            "national" => -1,
            "hoenn" => -1
        );

        $types = $document->getElementById("dex-page-types");
        foreach($types->childNodes as $key => $value){
            if(isset($value->tagName) && $value->tagName == "a"){
                $pokemon->types[] = strtolower(preg_replace('/\s+|-/', '_', $value->childNodes[0]->getAttribute("alt")));
            }
        }

        $abilities = $xpath->query("//*[@class='pokemon-abilities']");
        $index = 0;
        foreach($abilities as $key => $value){
            $a = array();
            foreach($value->childNodes as $k => $v){
                if(isset($v->tagName) && $v->tagName == "dt"){
                    $a[] = strtolower(preg_replace('/\s+|-/', '_', $v->nodeValue));
                }
            }
            if($index == 0){
                $pokemon->abilities->normal = $a;
            }
            else{
                $pokemon->abilities->hidden = $a;
            }
            $index++;
        }


        $evolutions = $xpath->query("//*[@class='dex-evolution-chain']");
        $index = 0;
        foreach($evolutions[0]->childNodes[1]->childNodes[0]->childNodes as $key => $value){
            if($index == 0){
                $index++;
                continue;
            }


            $next = null;
            $level = null;
            if(isset($value->childNodes[1]->tagName) && $value->childNodes[1]->tagName == "a"){
                $next = strtolower(preg_replace('/\s+|-/', '_', trim($value->childNodes[1]->nodeValue)));
            }
            if(isset($value->childNodes[3]->tagName) && $value->childNodes[3]->tagName == "span"){
                $a = array();
                preg_match_all('/level [0-9]+/', trim($value->childNodes[3]->nodeValue), $a);
                $level = intval(explode(" ", $a[0][0])[1]);
            }

            if($next != null && $level != null){
                if($next != $pokemon_name){
                    $pokemon->evolve = (object)array(
                        "level" => $next,
                        "to" => $level
                    );
                    break;
                }
            }
            $index++;
        }

        $items = $xpath->query("//*[contains(@class, 'dex-pokemon-held-items')]");
        $emerald = false;
        foreach($items[0]->childNodes[0]->childNodes[0]->childNodes[0]->childNodes as $k => $v){
            if(isset($v->tagName) && $v->tagName == "img"){
                if(strtolower($v->getAttribute("title")) == "emerald"){
                    $emerald = true;
                    break;
                }
            }
        }
        if($emerald){
            $i = 0;
            $a = 0;
            foreach($items[0]->childNodes[0]->childNodes as $key => $value){
                $alias = null;
                $chance = null;
                foreach($value->childNodes as $k => $v){
                    if($i <= 1){
                        $i++;
                        continue;
                    }

                    if(isset($v->tagName) && $v->tagName == "td"){
                        $a++;
                        if($chance == null){
                            $chance = intval(str_replace("%", "", trim($v->nodeValue)));
                        }
                        else{
                            if(strlen(trim($v->nodeValue)) > 1){
                                $alias = strtolower(preg_replace('/\s+|-/', '_', trim($v->nodeValue)));
                            }
                        }
                    }

                    if($a >= 2){
                        $a = 0;
                        if($alias != null && $chance != null){
                            $pokemon->wild->items[] = (object)array(
                                "alias" => $alias,
                                "chance" => $chance
                            );
                        }
                        $alias = null;
                        $chance = null;
                    }

                    $i++;
                    continue;
                }
            }
        }

        $damage = $xpath->query("//*[@class='dex-type-list']");
        foreach($damage[0]->childNodes as $key => $value){
            if(isset($value->tagName) && $value->tagName == "li"){
                $pokemon->damage->{strtolower(preg_replace('/\s+|-/', '_', trim($value->childNodes[1]->childNodes[0]->getAttribute("title")))) . ""} = floatval(trim(str_replace("Â", "", str_replace("½", "0.5", $value->nodeValue))));
            }
        }

        $stats = $xpath->query("//*[@class='dex-pokemon-stats']");
        foreach($stats[0]->childNodes[3]->childNodes as $key => $value){
            $type = strtolower(preg_replace('/\s+|-/', '_', trim($value->childNodes[0]->nodeValue)));
            $pokemon->stats->$type = floatval(trim($value->childNodes[2]->nodeValue));
        }

        $moves = $xpath->query("//*[contains(@class,'dex-pokemon-moves')]");
        if(isset($moves[0]->childNodes[6]->childNodes)){
            foreach($moves[0]->childNodes[6]->childNodes as $key => $value){
                if(isset($value->childNodes[0])){
                    $level = intval(trim($value->childNodes[0]->nodeValue));
                    if($level != 0){
                        $title = null;
                        if(empty($value->childNodes[10]->nodeValue)){
                            $title = $value->childNodes[8]->nodeValue;
                        }
                        else{
                            $title = $value->childNodes[10]->nodeValue;
                        }

                        if($title != null){
                            $pokemon->moves->level_up[] = (object)array(
                                "level" => $level,
                                "alias" => strtolower(preg_replace('/\s+|-/', '_', trim($title)))
                            );
                        }
                    }
                }
            }
        }

        if(isset($moves[0]->childNodes[12]->childNodes)){
            foreach($moves[0]->childNodes[12]->childNodes as $key => $value){
                if(isset($value->childNodes[0])){
                    $level = intval(trim($value->childNodes[0]->nodeValue));
                    if($level != 0 || (isset($value->childNodes[0]->childNodes[1]->tagName) && $value->childNodes[0]->childNodes[1]->tagName == "strong")){
                        $title = null;
                        if(empty($value->childNodes[10]->nodeValue)){
                            $title = $value->childNodes[8]->nodeValue;
                        }
                        else{
                            $title = $value->childNodes[10]->nodeValue;
                        }

                        if($title != null){
                            $pokemon->moves->learned[] = strtolower(preg_replace('/\s+|-/', '_', trim($title)));
                        }
                    }
                }
            }
        }

        if(isset($moves[0]->childNodes[10]->childNodes)){
            foreach($moves[0]->childNodes[10]->childNodes as $key => $value){
                $emerald = false;
                foreach($value->childNodes as $k => $v){
                    if(isset($v->tagName) && $v->tagName == "td"){
                        foreach($v->childNodes as $kv => $vv){
                            if(isset($vv->nodeName) && $vv->nodeName == "img"){
                                if(strtolower($vv->getAttribute("title")) == "emerald"){
                                    $emerald = true;
                                }
                            }

                            if($emerald){
                                if(isset($vv->nodeName) && $vv->nodeName == "a"){
                                    if(strlen(trim($vv->nodeValue)) > 1){
                                        $pokemon->moves->npc[] = strtolower(preg_replace('/\s|-+/', '_', trim($vv->nodeValue)));
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        $pokedex = $xpath->query("//*[@class='dex-column']");
        $index = 0;
        foreach($pokedex as $key => $value){
            switch($index){
                case 0:
                    $ids = preg_replace('/\s|-|\\n+/', "", $value->nodeValue);
                    $a = array();
//                    echo $ids;
//                    var_dump(strpos($ids, "OriginalHoenn"));
                    if(strpos($ids, "OriginalHoenn") != 0){
                        $ids = preg_match_all('/National[0-9]+OriginalHoenn[0-9]+/', $ids, $a);
                        $ids = $a[0][0];
                        $ids = explode("OriginalHoenn", $ids);
                        $pokemon->ids = (object)array(
                            "national" => intval(str_replace("National", "", $ids[0])),
                            "hoenn" => intval($ids[1])
                        );
                    }
                    break;
                case 1:
                    $breeding = preg_replace('/\s|-|\\n+/', "", $value->nodeValue);
                    $groups = array();

                    $gender = $value->childNodes[3]->childNodes[2]->childNodes[1]->getAttribute("src");
                    $a = array();
                    $gender = preg_match_all('/[0-9]+.png/', $gender, $a);
                    $gender = $a[0][0];
                    $gender = str_replace(".png", "", $gender);

                    foreach($value->childNodes[3]->childNodes[6]->childNodes[1]->childNodes as $k => $v){
                        if(isset($v->tagName) && $v->tagName == "li"){
                            $groups[] = strtolower(preg_replace('/\s+|-/', '_', $v->nodeValue));
                        }
                    }

                    $a = array();
                    $hatch = preg_match_all('/Hatchcounter[0-9]+Stepstohatch[0-9]+/', $breeding, $a);
                    $hatch = explode("Hatchcounter", $a[0][0]);
                    $hatch = explode("Stepstohatch", $hatch[1]);
                    $pokemon->breeding = (object)array(
                        "gender" => $this->getGender(floatval($gender)),
                        "groups" => $groups,
                        "hatch_counter" => floatval(str_replace("Hatchcounter", "", $hatch[0])),
                        "steps" => floatval($hatch[1])
                    );
                    break;
                case 2:
                    $pokemon->experience = (object)array(
                        "base" => floatval(trim($value->childNodes[3]->childNodes[2]->nodeValue)),
                        "group" => $this->getExperienceGroup(trim($value->childNodes[3]->childNodes[18]->nodeValue))
                    );
                    $pokemon->ev_up = array();

                    $c = 0;
                    foreach($value->childNodes[3]->childNodes[6]->childNodes[1]->childNodes as $k => $v){
                        if($c == 0){
                            $ev_up = $this->getEVYield(strtolower(preg_replace('/\s+|-/', '_', $v->nodeValue)));
                            if($ev_up != null){
                                $pokemon->ev_up[] = $ev_up;
                            }
                        }
                        $c++;
                        if($c > 1){
                            $c = 0;
                        }
                    }

                    $pokemon->catch_rate = floatval(trim($value->childNodes[3]->childNodes[10]->nodeValue));
                    $pokemon->happiness = floatval(trim($value->childNodes[3]->childNodes[14]->nodeValue));
                    break;
                case 4:
                    $pokemon->specie = trim($value->childNodes[3]->childNodes[2]->nodeValue);
                    break;
                case 5:
                    $pokemon->info->height = trim(explode("\"", $value->childNodes[3]->childNodes[3]->childNodes[4]->nodeValue)[0] . "\"");
                    break;
                case 6:
                    $pokemon->info->weight = trim(explode("lb", $value->childNodes[3]->childNodes[3]->childNodes[4]->nodeValue)[0] . "lbs");
                    break;
            }
            $index++;
        }
        $this->data = $pokemon;
    }

    public function resizeImage($image, $width, $height){
        $i = imagecreatetruecolor($width, $height);
        imagealphablending($i, true);
        imagesavealpha($i, true);
        imagefill($i, 0, 0, 0x7fff0000);
        imagecopyresized($i, $image, 0, 0, 0, 0, $width, $height, imagesx($image), imagesy($image));
        return $i;
    }

    private function getGender($gender){
        switch($gender){
            case 0:
                return (object)array(
                    "male" => 100,
                    "female" => 0
                );
            case 1:
                return (object)array(
                    "male" => 87.5,
                    "female" => 12.5
                );
            case 2:
                return (object)array(
                    "male" => 75,
                    "female" => 25
                );
            case 3:
                return (object)array(
                    "male" => 62.5,
                    "female" => 37.5
                );
            case 4:
                return (object)array(
                    "male" => 50,
                    "female" => 50
                );
            case 5:
                return (object)array(
                    "male" => 37.5,
                    "female" => 62.5
                );
            case 6:
                return (object)array(
                    "male" => 25,
                    "female" => 75
                );
            case 7:
                return (object)array(
                    "male" => 12.5,
                    "female" => 87.5
                );
            case 8:
                return (object)array(
                    "male" => 0,
                    "female" => 100
                );
            default:
                return (object)array(
                    "male" => 50,
                    "female" => 50
                );
        }
    }

    private function getExperienceGroup($group){
        switch($group){
            case "erratic":
                return 1;
            case "fast":
                return 2;
            case "medium fast":
                return 3;
            case "medium slow":
                return 4;
            case "slow":
                return 5;
            case "fluctuating":
                return 6;
            default:
                return -1;
        }
    }

    private function getEVYield($string){
        $s = explode("_", $string, 2);
        return (object)array(
            "name" => $s[1],
            "value" => intval($s[0])
        );
    }

    private function getDescription($alias){
        $curl = curl_init("http://veekun.com/dex/pokemon/" . $alias . "/flavor");
        curl_setopt_array($curl, array(
            CURLOPT_USERAGENT => "Mozilla/5.0 ;Windows NT 6.1; WOW64; Trident/7.0; rv:11.0; like Gecko",
            CURLOPT_RETURNTRANSFER => true
        ));

        $result = curl_exec($curl);

        if(curl_errno($curl) || curl_getinfo($curl, CURLINFO_HTTP_CODE) != 200){
            curl_close($curl);
            $this->description = "-";
            return "-";
        }
        curl_close($curl);

        $document = new DOMDocument();
        $document->preserveWhiteSpace = false;
        $document->validateOnParse = false;

        try{
            libxml_use_internal_errors(true);
            $document->loadHTML($result);
            libxml_clear_errors();

            $xpath = new DOMXpath($document);
            $results = $xpath->query("//*[contains(@class, 'dex-pokemon-flavor-text')]");
            if(isset($results[0]->childNodes[2]->childNodes[1]->childNodes[10])){
                $this->description = htmlentities(preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $results[0]->childNodes[2]->childNodes[1]->childNodes[10]->nodeValue), ENT_COMPAT, "UTF-8");;
            }
            else{
                $this->description = "-";
            }

            $titlelist = $document->getElementsByTagName("title");
            $id = null;
            if($titlelist->length > 0){
                $m = array();
                $id = preg_match_all('/#[0-9]+/', trim($titlelist->item(0)->nodeValue), $m);
                $id = preg_replace('/#/', "", $m[0][0]);
            }
            else{
                die("Cannot find id");
            }

            $this->id = $id;

            $this->images = array(
                "http://veekun.com/dex/media/pokemon/main-sprites/ruby-sapphire/" . $id . ".png",
                "http://veekun.com/dex/media/pokemon/main-sprites/ruby-sapphire/shiny/" . $id . ".png",
                $this->icons ? "http://pkmn.net/sprites/rs/small/" . $id . ".gif" : null,
                "http://veekun.com/dex/media/pokemon/main-sprites/ruby-sapphire/back/" . $id . ".png",
                "http://veekun.com/dex/media/pokemon/main-sprites/ruby-sapphire/back/shiny/" . $id . ".png",
                $this->icons ? "http://pkmn.net/sprites/rs/small/" . $id . ".gif" : null,
            );
        }
        catch(Exception $e){
            $this->description = "-";
        }
        return $this->description;
    }

    public function saveFootprint(){
        if($this->id == null){
            $this->getDescription($this->alias);
        }
        if($this->id == null){
            die("No id");
        }

        $fp = fopen("footprints/" . $this->nN . ".png", "wb+");
        fwrite($fp, file_get_contents("http://veekun.com/dex/media/pokemon/footprints/" . $this->id . ".png"));
        fclose($fp);
        $image = $this->resizeImage(imagecreatefrompng("footprints/" . $this->nN . ".png"), 64, 64);
        $fp = fopen("footprints/" . $this->nN . ".png", "wb+");
        ob_start();
        imagepng($image);
        $src = ob_get_clean();
        fwrite($fp, $src);
        fclose($fp);
    }

    public function saveAnimation(){
        if($this->id == null){
            $this->getDescription($this->alias);
        }
        if($this->id == null){
            die("No id");
        }

        $types = array("normal", "shiny");
        foreach($types as $type){
            $fp = fopen("animations/" . ($type == "shiny" ? "shiny_" : "") . $this->nN . ".gif", "wb+");
            fwrite($fp, file_get_contents("http://veekun.com/dex/media/pokemon/main-sprites/emerald/animated" . ($type == "shiny" ? "/shiny/" : "/") . $this->id . ".gif"));
            fclose($fp);
        }
    }

    public function saveSound(){
        if($this->id == null){
            $this->getDescription($this->alias);
        }
        if($this->id == null){
            die("No id");
        }
        file_put_contents("cries/" . $this->alias . ".ogg", fopen("http://veekun.com/dex/media/pokemon/cries/" . $this->id . ".ogg", 'r'));
    }
}
//mkdir("images");
//mkdir("data");
ini_set('max_execution_time', 3000000000);
//error_reporting(0);

$url = 'http://pokemondb.net/pokedex/national';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt($ch, CURLOPT_TIMEOUT, 5);
$data = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$doc = new DOMDocument();
$doc->loadHTML($data);
$finder = new DomXPath($doc);
$classname = "ent-name";
$nodes = $finder->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' $classname ')]");

$iter = 1;
foreach ($nodes as $node) {
    $p = new PokemonData(strtolower($node->nodeValue), false, $iter);
    $p->saveFootprint();
    $p->saveAnimation();
    $iter++;
    sleep(0.7);
}
