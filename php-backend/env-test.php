<?php
// Test environment variables
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

// Get all environment variables
$all_env = getenv();

// Filter for database-related variables
$db_vars = array();
foreach ($all_env as $key => $value) {
    if (strpos($key, 'DB_') === 0 || strpos($key, 'MYSQL_') === 0) {
        $db_vars[$key] = $value;
    }
}

// Also check $_ENV
$env_vars = array();
foreach ($_ENV as $key => $value) {
    if (strpos($key, 'DB_') === 0 || strpos($key, 'MYSQL_') === 0) {
        $env_vars[$key] = $value;
    }
}

echo json_encode(array(
    "status" => "debug",
    "getenv_vars" => $db_vars,
    "env_vars" => $env_vars,
    "all_env_count" => count($all_env),
    "php_version" => phpversion()
));
?>
