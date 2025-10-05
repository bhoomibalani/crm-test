<?php
// Script to set MySQL URL environment variable
echo "Setting MySQL URL environment variable...\n";

// The MySQL URL you provided
$mysql_url = "mysql://root:eKigxtGuYdePOTlGoaNxhcKhjdpfnBWS@trolley.proxy.rlwy.net:28103/railway";

// Parse the URL
$parsed = parse_url($mysql_url);
echo "Host: " . $parsed['host'] . "\n";
echo "Port: " . $parsed['port'] . "\n";
echo "Database: " . ltrim($parsed['path'], '/') . "\n";
echo "Username: " . $parsed['user'] . "\n";
echo "Password: " . str_repeat('*', strlen($parsed['pass'])) . "\n";

// Test connection
try {
    $dsn = "mysql:host=" . $parsed['host'] . ";port=" . $parsed['port'] . ";dbname=" . ltrim($parsed['path'], '/');
    $pdo = new PDO($dsn, $parsed['user'], $parsed['pass']);
    echo "✅ Database connection successful!\n";
} catch (PDOException $e) {
    echo "❌ Database connection failed: " . $e->getMessage() . "\n";
}
?>
