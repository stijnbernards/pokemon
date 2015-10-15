<?php
ini_set('max_execution_time', 3000000000);

mkdir("cries");
for($i = 1; $i < 722; $i++){
    file_put_contents("cries/". sprintf('%03d', $i) . ".ogg", fopen("http://veekun.com/dex/media/pokemon/cries/". $i .".ogg", 'r'));
}