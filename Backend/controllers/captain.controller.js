// Import required models and services
const captainModel = require('../models/captain.model'); // Captain model for database interactions
const captainService = require('../services/captain.service'); // Service for handling captain-related logic
const blackListTokenModel = require('../models/blacklistToken.model'); // Model to store blacklisted tokens
const { validationResult } = require('express-validator'); // Middleware for validating user input

// 🚀 Register a new captain
async function registerCaptain(req, res, next) {
    // Validate request input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract captain details from request body
    const { fullname, email, password, vehicle } = req.body;

    // Check if a captain with the same email already exists
    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await captainModel.hashPassword(password);

    // Create a new captain
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,  // Extract first name from fullname object
        lastname: fullname.lastname,    // Extract last name from fullname object
        email,
        password: hashedPassword,       // Store hashed password
        color: vehicle.color,           // Store vehicle details
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    // Generate an authentication token for the captain
    const token = captain.generateAuthToken();

    // Store token in a cookie for authentication
    res.cookie('token', token);

    // Return the generated token and captain details
    res.status(201).json({ token, captain });
}

// 🔑 Login captain (authentication)
async function loginCaptain(req, res, next) {
    // Validate request input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract login credentials from request body
    const { email, password } = req.body;

    // Find captain by email, including the password field
    const captain = await captainModel.findOne({ email }).select('+password');

    // If captain not found, return an error
    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare provided password with the stored hashed password
    const isMatch = await captain.comparePassword(password);

    // If password does not match, return an error
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a new authentication token for the captain
    const token = captain.generateAuthToken();

    // Store token in a cookie for authentication
    res.cookie('token', token);

    // Return response with the token and captain details
    res.status(200).json({ token, captain });
}

// 👤 Get captain profile (requires authentication)
async function getCaptainProfile(req, res, next) {
    // Return the captain's profile from the request (set by authentication middleware)
    res.status(200).json({ captain: req.captain });
}

// 🚪 Logout captain
async function logoutCaptain(req, res, next) {
    // Retrieve the token from cookies or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    // Store the token in the blacklist to prevent further use
    const blacklistedToken = new blackListTokenModel({ token });
    await blacklistedToken.save();

    // Clear the authentication token from cookies
    res.clearCookie('token');

    // Send success response
    res.status(200).json({ message: 'Logout successful' });
}

// Export all functions at the end
module.exports = { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain };
