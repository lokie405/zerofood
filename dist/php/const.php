<?php

$db_name = "ZerroFood_DataBase";
$table_name = "Table_Blog";
$server_name = "localhost";
$user_name = "root";
$login_name = "Ferdinant";
$password = "";
$error = [];


$post_name = "Second post";
define("ERROR", []);
define("PATH", realpath(dirname(__DIR__)));
define("PATH_DIST", dirname(PATH));
define("PATH_FILES", PATH . "\\files");
define("PATH_USER", PATH_FILES . "\\$login_name");




/**
 * 1. For work with DB create instance of PDO object..
 */
try {
    $pdo = new PDO("mysql:host=$server_name", $user_name, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch (PDOException $e) {
    array_push($error, "Failed to create instance of PDO: " . $e);
}
?>