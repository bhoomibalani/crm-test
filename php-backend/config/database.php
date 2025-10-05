<?php
class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    private $conn;

    public function __construct() {
        // Use environment variables for Railway, fallback to local values
        $this->host = $_ENV['MYSQL_HOST'] ?? $_ENV['DB_HOST'] ?? 'localhost';
        $this->db_name = $_ENV['MYSQL_DATABASE'] ?? $_ENV['DB_NAME'] ?? 'rd_company_crm';
        $this->username = $_ENV['MYSQL_USER'] ?? $_ENV['DB_USER'] ?? 'root';
        $this->password = $_ENV['MYSQL_PASSWORD'] ?? $_ENV['DB_PASS'] ?? 'password';
    }

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
?>