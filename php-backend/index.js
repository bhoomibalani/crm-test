const { spawn } = require('child_process');
const path = require('path');

const port = process.env.PORT || 8080;

console.log('Starting PHP server on port', port);

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

process.on('SIGTERM', () => {
  php.kill('SIGTERM');
});

process.on('SIGINT', () => {
  php.kill('SIGINT');
});
