<?php
// Simple test endpoint without database
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

http_response_code(200);
echo json_encode(array(
    "status" => "success",
    "message" => "PHP server is working",
    "timestamp" => date('Y-m-d H:i:s'),
    "php_version" => phpversion(),
    "server" => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown'
));
?>
