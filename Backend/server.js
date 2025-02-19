// Import the built-in 'http' module to create an HTTP server
const http = require('http');

// Import the Express application from the 'app' file
const app = require('./app');

// Import the function to set up WebSocket communication
const { initializeSocket } = require('./socket');

// Define the port number for the server
// If an environment variable (PORT) is set, use that; otherwise, default to 3000
const port = process.env.PORT || 3000;

// Create an HTTP server using the Express application
const server = http.createServer(app);

// Initialize WebSocket communication using the created server
initializeSocket(server);

// Start the server and listen for incoming requests on the defined port
server.listen(port, () => {
    console.log(`Server is running on port ${port}`); // Log a message when the server starts
});
