<?php
/**
 * Setup script for RD & Company CRM PHP Backend
 * This script helps set up the database and initial configuration
 */

// Database configuration
$host = "localhost";
$db_name = "rd_company_crm";
$username = "root";

// Common password combinations to try
$passwords = ["", "root", "password", "admin", "123456"];

echo "RD & Company CRM - PHP Backend Setup\n";
echo "=====================================\n\n";

// Test database connection with different passwords
$pdo = null;
$connected = false;

foreach ($passwords as $password) {
    try {
        $pdo = new PDO("mysql:host=$host", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "✓ Database connection successful with password: " . ($password ? "'$password'" : "no password") . "\n";
        $connected = true;
        break;
    } catch(PDOException $e) {
        echo "✗ Failed with password: " . ($password ? "'$password'" : "no password") . " - " . $e->getMessage() . "\n";
    }
}

if (!$connected) {
    echo "\n✗ Could not connect to MySQL with any common password.\n";
    echo "Please check:\n";
    echo "1. MySQL server is running\n";
    echo "2. Update the password in php-backend/config/database.php\n";
    echo "3. Or run: mysql -u root -p and set a password\n";
    exit(1);
}

// Create database
try {
    $pdo->exec("CREATE DATABASE IF NOT EXISTS $db_name");
    echo "✓ Database '$db_name' created/verified\n";
} catch(PDOException $e) {
    echo "✗ Failed to create database: " . $e->getMessage() . "\n";
    exit(1);
}

// Connect to the database
try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "✗ Failed to connect to database: " . $e->getMessage() . "\n";
    exit(1);
}

// Create users table
$createTableSQL = "
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'sales', 'office', 'client') NOT NULL DEFAULT 'client',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

try {
    $pdo->exec($createTableSQL);
    echo "✓ Users table created/verified\n";
} catch(PDOException $e) {
    echo "✗ Failed to create users table: " . $e->getMessage() . "\n";
    exit(1);
}

// Check if users exist
$stmt = $pdo->query("SELECT COUNT(*) FROM users");
$userCount = $stmt->fetchColumn();

if ($userCount == 0) {
    // Insert sample users
    $insertUsersSQL = "
    INSERT INTO users (email, password, name, role) VALUES
    ('admin@rdcompany.com', ?, 'Admin User', 'admin'),
    ('manager@rdcompany.com', ?, 'Manager User', 'manager'),
    ('sales@rdcompany.com', ?, 'Sales User', 'sales'),
    ('office@rdcompany.com', ?, 'Office User', 'office'),
    ('client@rdcompany.com', ?, 'Client User', 'client')
    ";
    
    $hashedPassword = password_hash('password123', PASSWORD_DEFAULT);
    
    try {
        $stmt = $pdo->prepare($insertUsersSQL);
        for ($i = 0; $i < 5; $i++) {
            $stmt->execute([$hashedPassword]);
        }
        echo "✓ Sample users created\n";
        echo "  - All users have password: password123\n";
    } catch(PDOException $e) {
        echo "✗ Failed to insert sample users: " . $e->getMessage() . "\n";
        exit(1);
    }
} else {
    echo "✓ Users already exist in database\n";
}

echo "\nSetup completed successfully!\n";
echo "\nNext steps:\n";
echo "1. Make sure your web server is running\n";
echo "2. Place this folder in your web server directory\n";
echo "3. Update the API_BASE_URL in src/config/api.js if needed\n";
echo "4. Test the login with: admin@rdcompany.com / password123\n";
?>
