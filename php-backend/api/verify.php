<?php
// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Origin: https://crm-test-gamma.vercel.app");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Max-Age: 3600");
    http_response_code(200);
    exit();
}

header("Access-Control-Allow-Origin: https://crm-test-gamma.vercel.app");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

session_start();

if(isset($_SESSION['user_id'])) {
    include_once '../config/database.php';
    include_once '../models/User.php';

    $database = new Database();
    $db = $database->getConnection();

    $user = new User($db);
    
    if($user->getUserById($_SESSION['user_id'])) {
        http_response_code(200);
        echo json_encode(array(
            "success" => true,
            "user" => array(
                "id" => $user->id,
                "email" => $user->email,
                "name" => $user->name,
                "role" => $user->role
            )
        ));
    } else {
        http_response_code(401);
        echo json_encode(array(
            "success" => false,
            "message" => "User not found"
        ));
    }
} else {
    http_response_code(401);
    echo json_encode(array(
        "success" => false,
        "message" => "Not authenticated"
    ));
}
?>
