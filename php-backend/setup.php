<?php
/**
 * Setup script for RD & Company CRM PHP Backend
 * This script helps set up the database and initial configuration
 */

// Use the same database configuration as the main app
include_once 'config/database.php';

echo "RD & Company CRM - PHP Backend Setup\n";
echo "=====================================\n\n";

// Test database connection
try {
    $database = new Database();
    $pdo = $database->getConnection();
    
    if (!$pdo) {
        echo "✗ Database connection failed\n";
        exit(1);
    }
    
    echo "✓ Database connection successful\n";
} catch(Exception $e) {
    echo "✗ Database connection failed: " . $e->getMessage() . "\n";
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
    // Insert sample users one by one
    $hashedPassword = password_hash('password123', PASSWORD_DEFAULT);
    
    $users = [
        ['admin@rdcompany.com', 'Admin User', 'admin'],
        ['manager@rdcompany.com', 'Manager User', 'manager'],
        ['sales@rdcompany.com', 'Sales User', 'sales'],
        ['office@rdcompany.com', 'Office User', 'office'],
        ['client@rdcompany.com', 'Client User', 'client']
    ];
    
    try {
        $stmt = $pdo->prepare("INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)");
        
        foreach ($users as $user) {
            $stmt->execute([$user[0], $hashedPassword, $user[1], $user[2]]);
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
