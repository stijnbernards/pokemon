<?php
/**
 * Created by PhpStorm.
 * User: Stijn
 * Date: 9/25/2015
 * Time: 11:24 AM
 */
ini_set('max_execution_time', 3000000000);
//error_reporting(0);

$url = 'http://bulbapedia.bulbagarden.net/wiki/List_of_moves';

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
$classname="sortable";
$node = $doc->getElementsByTagName('table')->item(1);

foreach($node->getElementsByTagName('tr') as $tr){
    $tds = $tr->getElementsByTagName('td');
    $file = 'var move = [
      "'. trim(str_replace("*", "", $tds->item(1)->nodeValue)) .'",
      "'. str_replace("*", "", trim($tds->item(2)->nodeValue)) .'",
      "'. str_replace("*", "", trim($tds->item(3)->nodeValue)) .'",
      "'. str_replace("*", "", trim($tds->item(4)->nodeValue)) .'",
      '. intval(str_replace("*", "", trim($tds->item(5)->nodeValue))) .',
      '. intval(str_replace("*", "", trim($tds->item(5)->nodeValue))) .',
      '. intval(str_replace("*", "", trim($tds->item(6)->nodeValue))) .',
      "'. str_replace("*", "", trim($tds->item(7)->nodeValue)) .'",
    ]';

    //echo $file;

    file_put_contents('moves/'. preg_replace('/\s+/', '', str_replace("*", "", $tds->item(1)->nodeValue)) .'.js', $file);
}