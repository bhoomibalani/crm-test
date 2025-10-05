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
            // Fallback to individual environment variables (Railway uses DB_* prefix)
            $this->host = $_ENV['DB_HOST'] ?? $_ENV['MYSQL_HOST'] ?? 'localhost';
            $this->port = $_ENV['DB_PORT'] ?? $_ENV['MYSQL_PORT'] ?? 3306;
            $this->db_name = $_ENV['DB_NAME'] ?? $_ENV['MYSQL_DATABASE'] ?? 'rd_company_crm';
            $this->username = $_ENV['DB_USER'] ?? $_ENV['MYSQL_USER'] ?? 'root';
            $this->password = $_ENV['DB_PASS'] ?? $_ENV['MYSQL_PASSWORD'] ?? 'password';
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