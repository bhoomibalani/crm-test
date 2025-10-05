<?php
// Database health check endpoint
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

// Test database connection
try {
    include_once 'config/database.php';
    $database = new Database();
    $db = $database->getConnection();
    
    if ($db) {
        // Test a simple query
        $stmt = $db->query("SELECT 1 as test");
        $result = $stmt->fetch();
        
        if ($result) {
            http_response_code(200);
            echo json_encode(array(
                "status" => "healthy",
                "message" => "Database is connected and working",
                "database" => "connected",
                "timestamp" => date('Y-m-d H:i:s')
            ));
        } else {
            http_response_code(503);
            echo json_encode(array(
                "status" => "unhealthy",
                "message" => "Database query failed"
            ));
        }
    } else {
        http_response_code(503);
        echo json_encode(array(
            "status" => "unhealthy",
            "message" => "Database connection failed"
        ));
    }
} catch (Exception $e) {
    http_response_code(503);
    echo json_encode(array(
        "status" => "unhealthy",
        "message" => "Database error: " . $e->getMessage()
    ));
}
?>
