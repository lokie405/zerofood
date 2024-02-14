<?php
header("Content-Type: application/json");

if($_SERVER['REQUEST_METHOD'] === "POST") {
    // Get input data with - file_get_contents('php://input').
    // Then decode to array with arr["key"] = value.
    $post_data = json_decode(file_get_contents('php://input'), true); 
    // Replace slash for php syntax (/ - separation).
    $corrected_path = str_replace('/', '\\', substr($post_data['data'], 1, -1));
    // Concat upper var to get reight path.
    $path = realpath(dirname(__DIR__)) . "" . $corrected_path;
    // To get all file in path:
    $dir = new RecursiveDirectoryIterator($path, RecursiveDirectoryIterator::SKIP_DOTS);
    // To iterate through directory iterate need to use RecursiveIterationIterator:
    $iterator = new RecursiveIteratorIterator($dir, RecursiveIteratorIterator::SELF_FIRST);
    // To accumulate value.
    $arr = [];
    foreach($iterator as $file) {
        // To find the path from $file (iterator):
        $file_path = $file->getPAthname();
        //  use substring with start on last "\" position and to end - for remove all except name end extension of file 
        $str = substr($file_path, strrpos($file_path, "\\") + 1);
        // Add to array for send back to js.
        array_push($arr,$str);
    }
    // Convert array to json to transfer:
    $encode = json_encode($arr);
    //  Send back
    echo $encode;
   

}
?>