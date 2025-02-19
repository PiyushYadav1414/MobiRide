// Import express to create and manage routes
const express = require('express');
const router = express.Router();

// Import authentication middleware to protect routes
const { authUser } = require('../middlewares/auth.middleware');

// Import the map controller to handle map-related requests
const { getCoordinates, getDistanceTime, getAutoCompleteSuggestions } = require('../controllers/map.controller');

// Import express-validator for validating query parameters
const { query } = require('express-validator');

// Route to get coordinates based on the address
// Validates 'address' query parameter to ensure it's a string with at least 3 characters
// Authenticates the user using the 'authUser' middleware
// Calls 'getCoordinates' method from the map controller
router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }), // Validate 'address' query parameter
    authUser, // Protect the route with authentication
    getCoordinates // Calls the controller method to get coordinates
);

// Route to get the distance and time between two locations (origin and destination)
// Validates 'origin(pickup)' and 'destination' query parameters to ensure they are strings with at least 3 characters
// Authenticates the user using the 'authUser' middleware
// Calls 'getDistanceTime' method from the map controller
router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }), // Validate 'origin' query parameter
    query('destination').isString().isLength({ min: 3 }), // Validate 'destination' query parameter
    authUser, // Protect the route with authentication
    getDistanceTime // Calls the controller method to get distance and time
);

// Route to get auto-complete suggestions based on input of address in pickup and dropoff input field
// Validates 'input' query parameter to ensure it's a string with at least 3 characters
// Authenticates the user using the 'authUser' middleware
// Calls 'getAutoCompleteSuggestions' method from the map controller
router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }), // Validate 'input' query parameter
    authUser, // Protect the route with authentication
    getAutoCompleteSuggestions // Calls the controller method to get suggestions
);

// Export the router to be used in the main application
module.exports = router;
