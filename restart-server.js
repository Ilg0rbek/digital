#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');

console.log('🔄 Restarting server...');

// Kill any existing Node.js processes (be careful with this in production)
exec('pkill -f "node.*main.js"', (error) => {
    if (error) {
        console.log('No existing server processes found');
    } else {
        console.log('✅ Killed existing server processes');
    }
    
    // Wait a moment for processes to fully terminate
    setTimeout(() => {
        console.log('🚀 Starting server...');
        exec('node main.js', (error, stdout, stderr) => {
            if (error) {
                console.error('❌ Error starting server:', error);
                return;
            }
            if (stderr) {
                console.error('❌ Server stderr:', stderr);
            }
            console.log('✅ Server output:', stdout);
        });
    }, 2000);
}); 