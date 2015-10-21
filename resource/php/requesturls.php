<?php
/**
 * Created by PhpStorm.
 * User: Stijn
 * Date: 10/21/2015
 * Time: 11:41 AM
 */
switch($_GET['dir']){
    case 'footprints':
        echo json_encode(array_slice(scandir("../images/footprint/"), 2));
        break;
    case 'pokemon':
        echo json_encode(array_slice(scandir("../images/pokemon/"), 2));
        break;
}