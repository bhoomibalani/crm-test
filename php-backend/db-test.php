<?php
// Database connection test
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

// Show environment variables (for debugging)
$env_vars = array(
    'DB_HOST' => $_ENV['DB_HOST'] ?? 'not set',
    'DB_NAME' => $_ENV['DB_NAME'] ?? 'not set',
    'DB_USER' => $_ENV['DB_USER'] ?? 'not set',
    'DB_PASS' => $_ENV['DB_PASS'] ? '***' : 'not set',
    'MYSQL_HOST' => $_ENV['MYSQL_HOST'] ?? 'not set',
    'MYSQL_DATABASE' => $_ENV['MYSQL_DATABASE'] ?? 'not set',
    'MYSQL_USER' => $_ENV['MYSQL_USER'] ?? 'not set',
    'MYSQL_PASSWORD' => $_ENV['MYSQL_PASSWORD'] ? '***' : 'not set',
    'MYSQL_URL' => $_ENV['MYSQL_URL'] ? '***' : 'not set'
);

try {
    include_once 'config/database.php';
    $database = new Database();
    $db = $database->getConnection();
    
    if ($db) {
        http_response_code(200);
        echo json_encode(array(
            "status" => "success",
            "message" => "Database connected",
            "env_vars" => $env_vars
        ));
    } else {
        http_response_code(503);
        echo json_encode(array(
            "status" => "error",
            "message" => "Database connection failed",
            "env_vars" => $env_vars
        ));
    }
} catch (Exception $e) {
    http_response_code(503);
    echo json_encode(array(
        "status" => "error",
        "message" => "Database error: " . $e->getMessage(),
        "env_vars" => $env_vars
    ));
}
?>
