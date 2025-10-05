<?php
// Simple health check endpoint for Railway
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

// Basic health check - just return OK without database test
http_response_code(200);
echo json_encode(array(
    "status" => "healthy",
    "message" => "API is running",
    "timestamp" => date('Y-m-d H:i:s'),
    "php_version" => phpversion()
));
?>
