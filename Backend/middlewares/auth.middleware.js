// Import required models and libraries
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistToken.model');
const Captain = require('../models/captain.model');

// Authenticate users
const authUser = async (req, res, next) => {
    
    // Extract token from cookies or authorization header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    // Check if token is missing
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    // Check if the token is blacklisted (logged out).If the token is found in the blacklist, it means the user has logged out or the token has been revoked. The server denies access with a 401 Unauthorized response.
    const isBlacklisted = await blackListTokenModel.findOne({ token });
    if (isBlacklisted) return res.status(401).json({ message: 'Unauthorized' });

    try {
// Verify and decode token and we will only get that data in decoded variable which we have put while setting up the the token which is onlu user_id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from database so that we can give full user data to req.user 
        const user = await User.findById(decoded._id);

        // Attach user to request object
        req.user = user;

        return next(); // Proceed to next middleware or route handler
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

// Authenticate captains
const authCaptain = async (req, res, next) => {

    // Extract token from cookies or authorization header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    // Check if token is missing
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    // Check if the token is blacklisted
    const isBlacklisted = await blackListTokenModel.findOne({ token });
    if (isBlacklisted) return res.status(401).json({ message: 'Unauthorized' });

    try {
        // Verify and decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch captain from database
        const captain = await Captain.findById(decoded._id);

        // Attach captain to request object
        req.captain = captain;

        return next(); // Proceed to next middleware or route handler
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

// Export methods at the end
module.exports = {
    authUser,
    authCaptain
};
