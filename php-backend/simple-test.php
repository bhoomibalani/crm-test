<?php
// Simple test without database
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

echo json_encode(array(
    "message" => "Simple test endpoint working",
    "timestamp" => date('Y-m-d H:i:s'),
    "php_version" => phpversion()
));
?>
