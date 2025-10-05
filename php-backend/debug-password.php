<?php
// Debug password issue
include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

// Check what's in the database
$query = "SELECT id, email, password, name, role FROM users WHERE email = 'admin@rdcompany.com'";
$stmt = $db->prepare($query);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

echo "Database user data:\n";
print_r($user);

echo "\nTesting password verification:\n";
$test_password = 'password123';
$stored_hash = $user['password'];

echo "Test password: $test_password\n";
echo "Stored hash: $stored_hash\n";
echo "Password verify result: " . (password_verify($test_password, $stored_hash) ? 'TRUE' : 'FALSE') . "\n";

// Generate a new hash for testing
$new_hash = password_hash($test_password, PASSWORD_DEFAULT);
echo "New hash for '$test_password': $new_hash\n";

// Update the password in database
$update_query = "UPDATE users SET password = ? WHERE email = 'admin@rdcompany.com'";
$update_stmt = $db->prepare($update_query);
$update_stmt->execute([$new_hash]);

echo "\nPassword updated in database.\n";
echo "Testing with new hash: " . (password_verify($test_password, $new_hash) ? 'TRUE' : 'FALSE') . "\n";
?>
