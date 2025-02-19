// Import required models and services
const User = require('../models/user.model');  // User model for database operations
const userService = require('../services/user.service');  // Service handling user-related logic
const { validationResult } = require('express-validator'); // Middleware for request validation
const blackListTokenModel = require('../models/blacklistToken.model')  // Model for blacklisted tokens

// Register a new user
async function registerUser(req, res, next) {
    // Validate request input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract user details from request body
    const { fullname, email, password } = req.body;

    // Check if user with the same email already exists
    const isUserAlready = await User.findOne({ email });

    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exists' });
    }

// Hash the user's password before saving to the database. hashPassword is a mtgod defined in User Schema
    const hashedPassword = await User.hashPassword(password);

    // Create a new user record by passing data to userService
    const user = await userService.createUser({
        firstname: fullname.firstname, // Extract first name from fullname object
        lastname: fullname.lastname, // Extract last name from fullname object
        email,
        password: hashedPassword
    });
    
    // Generate an authentication token for the user
    const token = user.generateAuthToken();

    // Return response with the generated token and user details
    res.status(201).json({ token, user });
}



// Login an existing user
async function loginUser(req, res, next) {
    // Validate request input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Extract login credentials from request body
    const { email, password } = req.body;

// 'password' is a required string, but it will be excluded when retrieving user data from the database (select: false).
// If you want to include the 'password' field in query results, you need to explicitly select it using '+password'.

    // Find the user by email and include the password field (if it's excluded by default)
    const user = await User.findOne({ email }).select('+password');
    console.log(user);
    // If user is not found, return an error
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password. CamparePassword is a method we defined in user model
    const isMatch = await user.comparePassword(password);

    // If password does not match, return an error
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a new authentication token for the user
    const token = user.generateAuthToken();

    // Store the token in a cookie for authentication
    res.cookie('token', token);

    // Return response with the token and user details
    res.status(200).json({ token, user });
}



// Get the logged-in user's profile
async function getUserProfile(req, res, next) {
    // Return the user details stored in the request (set by authentication middleware)
    res.status(200).json(req.user);
}



// Logout the user
async function logoutUser(req, res, next) {
    // Retrieve the token from either cookies or the Authorization header and we did split to seperate bearer keyword from token
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    // Store the token in the blacklist to prevent further use
    const blacklistedToken = new blackListTokenModel({ token });
    await blacklistedToken.save();

    // Clear the authentication cookie
    res.clearCookie('token');

    // Return a success response 
    res.status(200).json({ message: 'Logged out' });
}

// Export all functions at the end
module.exports = { registerUser, loginUser, getUserProfile, logoutUser };
