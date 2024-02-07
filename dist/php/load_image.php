
<?php

include "const.php";

try {
    $pdo = new PDO("mysql:host=$server_name;dbname=$db_name", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch( PDOException $e) {
    array_push($error, "Failed to connect DB: $db_name. \n $e");
}
$iterator_d = new RecursiveDirectoryIterator(PATH_POST, RecursiveDirectoryIterator::SKIP_DOTS);

$arr = [];

foreach($iterator_d as $item) {
    if(!is_dir($item)) {

        array_push($arr, $item);
        // echo "<img src=\"$item\" alt=\"some load from server image\"";
    }
}

$arr;


?>