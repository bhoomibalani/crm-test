const { spawn } = require('child_process');
const path = require('path');

const port = process.env.PORT || 8080;

console.log('Starting PHP server on port', port);

// Start PHP built-in server
const php = spawn('php', ['-S', `0.0.0.0:${port}`, '-t', '.'], {
  stdio: 'inherit',
  cwd: __dirname
});

php.on('error', (err) => {
  console.error('Failed to start PHP server:', err);
  process.exit(1);
});

php.on('exit', (code) => {
  console.log('PHP server exited with code', code);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  php.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  php.kill('SIGINT');
});
