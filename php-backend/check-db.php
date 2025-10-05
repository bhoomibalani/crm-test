<?php
/**
 * Quick database connection test
 * Run this to test your MySQL connection before running setup.php
 */

echo "MySQL Connection Test\n";
echo "====================\n\n";

// Test different common configurations
$configs = [
    ["host" => "localhost", "user" => "root", "pass" => ""],
    ["host" => "localhost", "user" => "root", "pass" => "root"],
    ["host" => "localhost", "user" => "root", "pass" => "password"],
    ["host" => "localhost", "user" => "root", "pass" => "admin"],
    ["host" => "127.0.0.1", "user" => "root", "pass" => ""],
    ["host" => "127.0.0.1", "user" => "root", "pass" => "root"],
];

$connected = false;

foreach ($configs as $config) {
    try {
        $pdo = new PDO("mysql:host={$config['host']}", $config['user'], $config['pass']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "✓ SUCCESS: Host={$config['host']}, User={$config['user']}, Password=" . ($config['pass'] ? "'{$config['pass']}'" : "none") . "\n";
        $connected = true;
        
        // Update database.php with working credentials
        $dbConfig = "<?php
class Database {
    private \$host = \"{$config['host']}\";
    private \$db_name = \"rd_company_crm\";
    private \$username = \"{$config['user']}\";
    private \$password = \"{$config['pass']}\";
    private \$conn;

    public function getConnection() {
        \$this->conn = null;

        try {
            \$this->conn = new PDO(
                \"mysql:host=\" . \$this->host . \";dbname=\" . \$this->db_name,
                \$this->username,
                \$this->password
            );
            \$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            \$this->conn->exec(\"set names utf8\");
        } catch(PDOException \$exception) {
            echo \"Connection error: \" . \$exception->getMessage();
        }

        return \$this->conn;
    }
}
?>";
        
        file_put_contents('config/database.php', $dbConfig);
        echo "✓ Updated config/database.php with working credentials\n";
        break;
        
    } catch(PDOException $e) {
        echo "✗ FAILED: Host={$config['host']}, User={$config['user']}, Password=" . ($config['pass'] ? "'{$config['pass']}'" : "none") . " - " . $e->getMessage() . "\n";
    }
}

if (!$connected) {
    echo "\n✗ No working configuration found.\n";
    echo "Please check:\n";
    echo "1. MySQL server is running\n";
    echo "2. Try: mysql -u root -p (to test connection manually)\n";
    echo "3. Update config/database.php manually with your credentials\n";
} else {
    echo "\n✓ Database configuration updated successfully!\n";
    echo "You can now run: php setup.php\n";
}
?>
