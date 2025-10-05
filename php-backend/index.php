<?php
// Root endpoint - redirect to health check
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

http_response_code(200);
echo json_encode(array(
    "message" => "RD Company CRM API",
    "version" => "1.0.0",
    "status" => "running",
    "endpoints" => array(
        "health" => "/health.php",
        "verify" => "/api/verify.php",
        "login" => "/api/simple-login.php"
    )
));
?>
