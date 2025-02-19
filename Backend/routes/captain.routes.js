// Import the individual methods from the Captain controller
const { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } = require('../controllers/captain.controller');

// Import Express to create and manage routes
const express = require('express');
const router = express.Router();

// Import express-validator for request validation
const { body } = require("express-validator");

// Import authentication middleware for protected routes
const { authCaptain } = require('../middlewares/auth.middleware');

// Route to register a captain
// Validates the request body to ensure proper input format
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),  // Validate email format
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'), // Ensure first name is at least 3 characters
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), // Enforce password length
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'), // Vehicle color must have at least 3 characters
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'), // Vehicle plate must have at least 3 characters
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'), // Ensure vehicle capacity is at least 1
    body('vehicle.vehicleType').isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle type') // Vehicle type must be one of the allowed options
], registerCaptain); // Pass request to the registerCaptain function

// Route to log in a captain
// Validates email and password
router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'), // Validate email format
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long') // Ensure password length is at least 6 characters
], loginCaptain); // Pass request to the loginCaptain function

// Route to get captain's profile (protected route)
// Requires authentication middleware before accessing the controller function
router.get('/profile', authCaptain, getCaptainProfile); // Pass request to the getCaptainProfile function

// Route to log out a captain (protected route)
// Requires authentication middleware before processing logout
router.get('/logout', authCaptain, logoutCaptain); // Pass request to the logoutCaptain function

// Export the router to be used in the main application
module.exports = router;
