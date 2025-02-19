// Import express to create and manage routes
const express = require('express');
const router = express.Router();

// Import express-validator for validating request body and query parameters
const { body, query } = require('express-validator');

// Import the ride controller to handle ride-related requests
const { createRide, getFare, confirmRide, startRide, endRide } = require('../controllers/ride.controller');

// Import authentication middleware for protecting routes
const { authUser, authCaptain } = require('../middlewares/auth.middleware');

// Route to create a new ride
// Validates 'pickup', 'destination', and 'vehicleType' in the request body
// Protects the route with user authentication
// Calls the 'createRide' method from the ride controller to process the request
// We have not send userId as we are doing authUser which will already validate user and we can have userId by req.userId
router.post('/create',
    authUser, // Protect route with user authentication
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'), // Validate 'pickup' address
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'), // Validate 'destination' address
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'), // Validate 'vehicleType'
    createRide // Call the controller method to create a ride
);

// Route to get the fare for a ride
// Validates 'pickup' and 'destination' in the query parameters
// Protects the route with user authentication
// Calls the 'getFare' method from the ride controller to calculate the fare
router.get('/get-fare',
    authUser, // Protect route with user authentication
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'), // Validate 'pickup' address
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'), // Validate 'destination' address
    getFare // Call the controller method to get the fare
);

// Route to confirm a ride by the captain
// Validates 'rideId' in the request body
// Protects the route with captain authentication
// Calls the 'confirmRide' method from the ride controller to confirm the ride
router.post('/confirm',
    authCaptain, // Protect route with captain authentication
    body('rideId').isMongoId().withMessage('Invalid ride id'), // Validate 'rideId'
    confirmRide // Call the controller method to confirm the ride
);

// Route to start the ride by the captain
// Validates 'rideId' and 'otp' in the query parameters
// Protects the route with captain authentication
// Calls the 'startRide' method from the ride controller to start the ride
router.get('/start-ride',
    authCaptain, // Protect route with captain authentication
    query('rideId').isMongoId().withMessage('Invalid ride id'), // Validate 'rideId'
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'), // Validate 'otp'
    startRide // Call the controller method to start the ride
);

// Route to end the ride by the captain
// Validates 'rideId' in the request body
// Protects the route with captain authentication
// Calls the 'endRide' method from the ride controller to end the ride
router.post('/end-ride',
    authCaptain, // Protect route with captain authentication
    body('rideId').isMongoId().withMessage('Invalid ride id'), // Validate 'rideId'
    endRide // Call the controller method to end the ride
);

// Export the router to be used in the main application
module.exports = router;
