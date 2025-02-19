// Load environment variables from a .env file into process.env
const dotenv = require('dotenv');
dotenv.config();

// Import the Express framework to create a web server
const express = require('express');

// Import the CORS middleware to allow cross-origin requests (useful for APIs)
const cors = require('cors');

// Create an instance of an Express application
const app = express();

// Import the cookie-parser middleware to handle cookies in requests
const cookieParser = require('cookie-parser');

// Import the function that connects to the database
const connectToDb = require('./db/db'); 

// Import route handlers for different parts of the application
const userRoutes = require('./routes/user.routes');  // Handles user-related API requests
const captainRoutes = require('./routes/captain.routes'); // Handles captain-related API requests
const mapsRoutes = require('./routes/maps.routes');  // Handles maps-related API requests
const rideRoutes = require('./routes/ride.routes');  // Handles ride-related API requests

// Call the function to connect to the database when the server starts
connectToDb();

// Use middleware functions to process incoming requests

// Enable CORS so that requests from different domains can access the API
app.use(cors());

// Parse incoming JSON request bodies (needed for APIs that send JSON data)
app.use(express.json());

// Parse URL-encoded data (helps process form data sent from clients)
app.use(express.urlencoded({ extended: true }));

// Enable cookie parsing so the server can read and write cookies in requests
app.use(cookieParser());

// Define a basic route to check if the server is running
app.get('/', (req, res) => {
    res.send('Hello World'); // Sends a simple response when the root URL is accessed
});

// Use imported route handlers for different API endpoints
app.use('/users', userRoutes);    // Routes related to users
app.use('/captains', captainRoutes); // Routes related to captains
app.use('/maps', mapsRoutes);    // Routes related to maps
app.use('/rides', rideRoutes);   // Routes related to rides

// Export the app so it can be used in another file (e.g., server.js)
module.exports = app;
