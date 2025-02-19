// Import required modules
const socketIo = require('socket.io');  // For handling WebSocket connections

// We are importing uer and captain so that we can give each user or captain who is online or using our 
// application a socketId so that with the help of it we can send message
const userModel = require('./models/user.model');  // Import the user model
const captainModel = require('./models/captain.model');  // Import the captain model

let io; // Variable to hold the socket.io instance

// Function to initialize socket.io with the server
function initializeSocket(server) {
    // Create a socket.io instance and pass the server
    io = socketIo(server, {
        cors: {
            origin: '*',  // Allow all origins
            methods: ['GET', 'POST']  // Allow GET and POST methods
        }
    });

    // Event listener for new client connections
    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);  // Log client connection

// Below we are listening a event name "join" and we will get userId, userType from it and based on it we will give socketId to user and captain whoever logged in
        socket.on('join', async (data) => {
            const { userId, userType } = data;  // Destructure userId and userType from the data

            // If the type of user is user then we will give socketId to user 
            if (userType === 'user') {
                // Update the user model with the socket ID
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                // // If the type of user is user then we will give socketId to captain model 
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        // Event listener for updating the location of a captain
        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;  // Destructure userId and location from the data

            // Validate location data
            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });  // Emit an error if data is invalid
            }

            // Update the captain model with the new location
            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        });

        // Event listener for client disconnections
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);  // Log client disconnection
        });
    });
}

// Function to send a message to a specific socket ID
const sendMessageToSocketId = (socketId, messageObject) => {

    console.log(messageObject);  // Log the message object for debugging

    // Send the message to the socket ID if socket.io is initialized
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');  // Log an error if socket.io is not initialized
    }
}

// Export the functions for external use
module.exports = { initializeSocket, sendMessageToSocketId };
