<?php
/**
 * Created by PhpStorm.
 * User: Stijn
 * Date: 10/21/2015
 * Time: 2:38 PM
 */
error_reporting(0);
ini_set("display_errors", false);
$base_url = "../";
$uri = $_GET['uri'];
if(strpos($uri, '../')){

}else{
    $image = file_get_contents($base_url . $uri);
    echo base64_encode($image);

}