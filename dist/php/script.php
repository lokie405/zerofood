<?php

include "const.php";

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST["post_title"];
    $ser = $table_name;
}

// $path = PATH_TO_FILES;
/**
 * 2. Check is DB exist:
 */
try {
    $sql_is_db_exist = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?";
    $stmt = $pdo->prepare($sql_is_db_exist);
    $stmt->execute([$db_name]);
    $db_exist = $stmt->fetchColumn();
    if(!$db_exist) {
        $sql_create_DB = "CREATE DATABASE IF NOT EXISTS $db_name";
        $pdo->exec($sql_create_DB);
    }
} catch(PDOException $e){
    array_push(ERROR, "Filed create DB: " . $e);
}


/**
 * Switch to DB:
 */
try {
    $pdo->exec("USE $db_name");
} catch(PDOException $e) {
    array_push(ERROR, "Filed switched: " . $e);
}


/**
 * Check is Table exist in DB:
 */
$sql_is_table_exist = "SHOW TABLES LIKE :table";
$stmt = $pdo->prepare($sql_is_table_exist);
$stmt->bindParam("table", $table_name);
$stmt->execute();
$table_exist = $stmt->rowCount() == 0 ? FALSE : TRUE;
if(!$table_exist) {
    $sql_create_table = "
    CREATE TABLE IF NOT EXISTS $table_name (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_name TEXT,
    title TEXT,
    descr TEXT,
    title_img TEXT,
    content_img TEXT,
    introduction TEXT,
    main TEXT,
    quote TEXT,
    quote_author TEXT,
    conclusion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ";

    try {
        $pdo->exec($sql_create_table);
    } catch(PDOException $e) {
        array_push(ERROR, "Failed to create table: " . $e);
    }
}

/**
 * Upload images:
 */
try {
    $post = [];
    $upload_title_image = $_FILES["post_title-img"];
    $upload_other_image = $_FILES["post_other-imgs"];
    
    // $post_title = $_POST["post_title"];
    $other_images = [];
    $post["title"] = $_POST["post_title"];
    $post["descr"] = $_POST["post_descr"];
    $post["introduction_part"] = $_POST["post_introduction"];
    $post["main_part"] = $_POST["post_main-part"];
    $post["quote"] = $_POST["post_quote"];
    $post["quote_author"] = $_POST["post_quote-author"];
    $post["conclusion_part"] = $_POST["post_conclusion"];
    define("PATH_POST" , PATH_USER . "\\" .$post["title"] ."\\");  // Add user name folder and post name to path
    define("PATH_POST_TITLE", PATH_POST . "title\\");
    $dir_to_upload = $upload_title_image["tmp_name"];
    $explode = explode(".", $upload_title_image["name"]);
    $end = end($explode);
    $title_img_ext = strtolower($end);


    if(!file_exists(PATH_POST_TITLE)) {
        mkdir(PATH_POST_TITLE, 0777, true);
    }

    // Add title image to server, if exist.
    if($upload_title_image["name"]) {
        move_uploaded_file($upload_title_image["tmp_name"], PATH_POST_TITLE . $upload_title_image["name"]);

    }


    for($i = 0; $i < count($upload_other_image); $i++) {
        $tit2 = $upload_other_image["name"][$i];
        move_uploaded_file($upload_other_image["tmp_name"][$i], PATH_POST . $upload_other_image["name"][$i]);
    }

    
   
} catch(Exception $e) {
    array_push(ERROR, "Filed to get title image: $e");
}

/**
 * Put data into DB:
 */
$col_user_name = $login_name;
$col_title = $post["title"];
$col_descr = $post["descr"];
$col_title_img = PATH_POST_TITLE;
$col_content_img = PATH_POST;
$col_introduction = $post["introduction_part"];
$col_main = $post["main_part"];
$col_quote = $post["quote"];
$col_quote_author = $post["quote_author"];
$col_conclusion = $post["conclusion_part"];

try {
    $sql_insert_data = "INSERT INTO $table_name(
            user_name, title, descr, title_img, content_img, introduction,
            main, quote, quote_author, conclusion)
        VALUES (
            :user_name, :title, :descr, :title_img, :content_img, :introduction,
            :main, :quote, :quote_author, :conclusion)";
    
    $stmt = $pdo->prepare($sql_insert_data);
    $stmt->bindParam(':user_name', $col_user_name);
    $stmt->bindParam(':title', $col_title);
    $stmt->bindParam(':descr', $col_descr);
    $stmt->bindParam(':title_img', $col_title_img);
    $stmt->bindParam(':content_img', $col_content_img);
    $stmt->bindParam(':introduction', $col_introduction);
    $stmt->bindParam(':main', $col_main);
    $stmt->bindParam(':quote', $col_quote);
    $stmt->bindParam(':quote_author', $col_quote_author);
    $stmt->bindParam(':conclusion', $col_conclusion);
    $stmt->execute();
} catch(PDOException $e) {
    array_push(ERROR, "Failed to insert data at Table: $e");
}



?>



