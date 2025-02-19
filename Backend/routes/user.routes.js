// Import express to create and manage routes
const express = require('express');
const router = express.Router();

// Import express-validator for validating request body
const { body } = require("express-validator");

// Import the user controller to handle user-related requests
const { registerUser, loginUser, getUserProfile, logoutUser } = require('../controllers/user.controller');


// Import authentication middleware to protect routes
const { authUser } = require('../middlewares/auth.middleware');

// Route to register a new user
// Validates 'email', 'fullname.firstname', and 'password' in the request body
// Calls the 'registerUser' method from the user controller to process the registration
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'), // Validate 'email' to ensure it's a valid email
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'), // Validate first name
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long') // Validate password length
], 
    registerUser // Calls the controller method to register the user
);

// Route to log in an existing user
// Validates 'email' and 'password' in the request body
// Calls the 'loginUser' method from the user controller to process the login
router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'), // Validate 'email' to ensure it's a valid email
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long') // Validate password length
], 
    loginUser // Calls the controller method to log in the user
);

// Route to get the authenticated user's profile
// Protects the route with 'authUser' middleware to ensure the user is logged in
// Calls the 'getUserProfile' method from the user controller to fetch the profile details
router.get('/profile', authUser, getUserProfile);

// Route to log out the authenticated user
// Protects the route with 'authUser' middleware to ensure the user is logged in
// Calls the 'logoutUser' method from the user controller to handle the logout process
router.get('/logout', authUser, logoutUser);

// Export the router to be used in the main application
module.exports = router;
