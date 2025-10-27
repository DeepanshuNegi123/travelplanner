#!/usr/bin/env node

// Simple script to start mongo-express for database viewing
const { spawn } = require('child_process');

console.log('🚀 Starting MongoDB Database Viewer...');
console.log('📊 Access your database at: http://localhost:8081');
console.log('🔗 Default credentials: admin / pass');
console.log('⏹️  Press Ctrl+C to stop\n');

// Start mongo-express
const mongoExpress = spawn('npx', ['mongo-express'], {
  stdio: 'inherit',
  shell: true
});

mongoExpress.on('error', (err) => {
  console.error('❌ Error starting mongo-express:', err.message);
  console.log('💡 Make sure MongoDB is running: sudo systemctl start mongod');
});

mongoExpress.on('close', (code) => {
  console.log(`\n✅ Database viewer stopped (exit code: ${code})`);
});

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping database viewer...');
  mongoExpress.kill('SIGINT');
});


