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
    case 'items':
        echo json_encode(array_slice(scandir("../images/items/"), 2));
        break;
    case 'pkanim':
        echo json_encode(array_slice(scandir("../images/animations/pokemon/"), 2));
        break;
    case 'towns':
        echo json_encode(get_filelist_as_array("../images/towns/"));
        break;
    case 'routes':
        echo json_encode(get_filelist_as_array("../images/routes/"));
        break;
}

function get_filelist_as_array($dir, $recursive = true, $basedir = '') {
    if ($dir == '') {return array();} else {$results = array(); $subresults = array();}
    if (!is_dir($dir)) {$dir = dirname($dir);} // so a files path can be sent
    if ($basedir == '') {$basedir = realpath($dir).DIRECTORY_SEPARATOR;}

    $files = scandir($dir);
    foreach ($files as $key => $value){
        if ( ($value != '.') && ($value != '..') ) {
            $path = realpath($dir.DIRECTORY_SEPARATOR.$value);
            if (is_dir($path)) { // do not combine with the next line or..
                if ($recursive) { // ..non-recursive list will include subdirs
                    $subdirresults = get_filelist_as_array($path,$recursive,$basedir);
                    $results = array_merge($results,$subdirresults);
                }
            } else { // strip basedir and add to subarray to separate file list
                $subresults[] = str_replace($basedir,'',$path);
            }
        }
    }
    // merge the subarray to give the list of files then subdirectory files
    if (count($subresults) > 0) {$results = array_merge($subresults,$results);}
    return $results;
}
