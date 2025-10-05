<?php
// Simple health check endpoint for Railway
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: https://crm-test-gamma.vercel.app");

// Basic health check - just return OK
http_response_code(200);
echo json_encode(array(
    "status" => "healthy",
    "message" => "API is running",
    "timestamp" => date('Y-m-d H:i:s'),
    "php_version" => phpversion()
));
?>
