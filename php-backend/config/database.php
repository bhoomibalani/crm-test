<?php
class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    private $port;
    private $conn;

    public function __construct() {
        // Check for Railway MySQL URL first
        $mysql_url = $_ENV['MYSQL_URL'] ?? $_ENV['DATABASE_URL'] ?? null;
        
        if ($mysql_url) {
            // Parse MySQL URL: mysql://user:password@host:port/database
            $parsed = parse_url($mysql_url);
            $this->host = $parsed['host'];
            $this->port = $parsed['port'] ?? 3306;
            $this->db_name = ltrim($parsed['path'], '/');
            $this->username = $parsed['user'];
            $this->password = $parsed['pass'];
        } else {
            // Fallback to individual environment variables
            $this->host = $_ENV['MYSQL_HOST'] ?? $_ENV['DB_HOST'] ?? 'localhost';
            $this->port = $_ENV['MYSQL_PORT'] ?? $_ENV['DB_PORT'] ?? 3306;
            $this->db_name = $_ENV['MYSQL_DATABASE'] ?? $_ENV['DB_NAME'] ?? 'rd_company_crm';
            $this->username = $_ENV['MYSQL_USER'] ?? $_ENV['DB_USER'] ?? 'root';
            $this->password = $_ENV['MYSQL_PASSWORD'] ?? $_ENV['DB_PASS'] ?? 'password';
        }
    }

    public function getConnection() {
        $this->conn = null;

        try {
            $dsn = "mysql:host=" . $this->host . ";port=" . $this->port . ";dbname=" . $this->db_name;
            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
?>