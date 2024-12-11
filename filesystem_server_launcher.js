// filesystem_server_launcher.js
const { spawn } = require('child_process');

// Define the command and arguments to launch the MCP Filesystem server
const command = 'node';
const args = [
    './index.js', // Path to the MCP server script (replace with the actual path)
    './test-dir', // Example directory to allow access
];

// Function to start the MCP Filesystem server
function startFilesystemServer() {
    console.log('Starting the MCP Filesystem server...');

    // Spawn the server process
    const serverProcess = spawn(command, args, { stdio: 'pipe' });

    // Log stdout
    serverProcess.stdout.on('data', (data) => {
        console.log(`[MCP Server Output]: ${data.toString()}`);
    });

    // Log stderr
    serverProcess.stderr.on('data', (data) => {
        console.error(`[MCP Server Error]: ${data.toString()}`);
    });

    // Handle server exit
    serverProcess.on('close', (code) => {
        console.log(`MCP Filesystem server exited with code ${code}`);
    });

    return serverProcess;
}

// Run the filesystem server
const server = startFilesystemServer();

// Graceful shutdown on process termination signals
process.on('SIGINT', () => {
    console.log('Shutting down the MCP Filesystem server...');
    server.kill('SIGINT');
    process.exit(0);
});
