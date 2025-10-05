<?php
// CORS test endpoint
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Max-Age: 3600");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

echo json_encode(array(
    "status" => "success",
    "message" => "CORS is working",
    "method" => $_SERVER['REQUEST_METHOD'],
    "timestamp" => date('Y-m-d H:i:s')
));
?>
