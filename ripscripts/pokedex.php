<?php
/**
 * Created by PhpStorm.
 * User: Stijn
 * Date: 9/25/2015
 * Time: 11:24 AM
 */
ini_set('max_execution_time', 3000000000);
error_reporting(0);

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
$classname="ent-name";
$nodes = $finder->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' $classname ')]");

foreach($nodes as $node){
    $url = 'http://pokemondb.net/pokedex/' . strtolower($node->nodeValue);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    $data = curl_exec($ch);
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $index = 1;
    $dom = new DOMDocument();
    $dom->loadHTML($data);
    $tags = $dom->getElementsByTagName('strong');
    $tags2 = $dom->getElementsByTagName('h1');
    $tags3 = $dom->getElementsByTagName('td');

    $file = 'var pokeInfo = {
    nN: '. $tags->item(($index-1))->nodeValue .',
    name: "'.$tags2->item((1-1))->nodeValue .'",
    species: "'. $tags3->item((3-1))->nodeValue .'",
    height: "'. $tags3->item((4-1))->nodeValue .'",
    weight: "'. $tags3->item((5-1))->nodeValue .'",
    abilities: [],
    base_stats:{
        HP: ['. $tags3->item((18-1))->nodeValue .', 0, 0],
        ATT: ['. $tags3->item((22-1))->nodeValue .', 0, 0],
        DEF: ['. $tags3->item((26-1))->nodeValue .', 0, 0],
        SPATT: ['. $tags3->item((30-1))->nodeValue .', 0, 0],
        SPDEF: ['. $tags3->item((34-1))->nodeValue .', 0, 0],
        SPD: ['. $tags3->item((38-1))->nodeValue .', 0, 0]
    },
    stats:{
        HP: [],
        ATT: [],
        DEF: [],
        SPATT: [],
        SPDEF: [],
        SPD: []
    },
    entry: "'. $tags3->item((61-1))->nodeValue .'",
    moves:[
        10,
    ],
    level: 0,
    exp: 0,
    nature: 0,
    expGroup: "'. $tags3->item((13-1))->nodeValue .'",
    baseExp: "'. $tags3->item((12-1))->nodeValue .'",
    evYield: "'. trim($tags3->item((9-1))->nodeValue) .'"
    }';
    file_put_contents('pokemons/'. $tags->item(($index-1))->nodeValue .'.js', $file);
    sleep(0.7);
    echo $tags->item(($index-1))->nodeValue;
}