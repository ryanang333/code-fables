<?php
    $language = strtolower($_POST['language']); 
    $code = $_POST['code'];
    $random = substr(md5(mt_rand()), 0, 7);
    $filePath =  __DIR__ . "/backend" . '/' . $random . "." . $language;
    $programFile = fopen($filePath, "w");
    fwrite($programFile, $code);
    fclose($programFile);
?>