<?php session_start(); session_destroy();
//if(!isset($_SESSION["ses"])) {
//    $url = 'http://localhost:25565/auth';
//
//    $ch = curl_init();
//    curl_setopt($ch, CURLOPT_URL, $url);
//    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)');
//    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
//    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
//    $data = curl_exec($ch);
//    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
//    curl_close($ch);
//
//    $_SESSION["ses"] = $data;
//}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" type="text/css" href="resource/css/local.css">
    <script type="text/javascript" src="resource/js/jquery.js"></script>
<!--    <script type="text/javascript" src="http://localhost:25565/--><?php //echo $_SESSION["ses"] ?><!--/functions"></script>-->
    <script type="application/javascript" src="resource/js/functions.js"></script>
    <script type="text/javascript" src="resource/js/core.js"></script>
</head>
<body style="margin: 0 !important;">
    <div id="game">
        <div class="parent wrapper">
        </div>
    </div>
    <div class="controlls-left">
        <div class="up"></div>
        <div class="right"></div>
        <div class="left"></div>
        <div class="down"></div>
    </div>
    <div class="controlls-right">
        <div class="A"></div>
        <div class="B"></div>
    </div>
</body>
</html>