// Import necessary services and utilities
const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');

/**
 * 📌 Create a new ride request
 */
async function createRide(req, res) {
    // Validate request input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract ride details from the request body
    const {  pickup, destination, vehicleType } = req.body;
    try {
        // Create a new ride record
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });

        // Send response with created ride details
        res.status(201).json(ride);

        // Get coordinates of the pickup location
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

        // Find captains within a 2km radius of the pickup location based on longitude and latitude of user
        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);

        // console.log(captainsInRadius);

        // Remove OTP from ride before sending notifications to captain(drivers) nearby user such that if teye accepts the ride then we will include and sedn otp
        ride.otp = "";

// Populate ride details with full user information as well not just userID it will give full userSchema
//  like his furstName, lastName, email along with the ride information  
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

        // Notify all nearby captains about the new ride request
        captainsInRadius.forEach((captain) => {
// Below is a function from socket.js and we are passing args socketId and object to it and it will further
// send message to event name 'new-ride' to CaptainHome.jsx and will send ride information to all the captains nearby user
            sendMessageToSocketId(captain.socketId, {event: 'new-ride',data: rideWithUser});
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};

/**
 * 🚕 Get estimated fare for a ride
 */
async function getFare(req, res) {
    // Validate request input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract pickup and destination from query parameters
    const { pickup, destination } = req.query;

    try {
        // Get fare estimate from rideService
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

/**
 * ✅ Confirm ride (Captain accepts ride request)
 */
async function confirmRide(req, res) {
    // Validate request input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract ride ID from request body
    const { rideId } = req.body;

    try {
        // Confirm the ride by assigning a captain
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

// We need to  Notify the user that his ride has been confirmed so we will do it by sending event name
// 'ride-confirmed' to user with capataidID, ride status to be  accepted and a OTP to share with captain
//  and we will listen this event from Home.jsx
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};

/**
 * 🚀 Start ride (Captain verifies OTP and begins trip)
 */
async function startRide(req, res) {
    // Validate request input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract ride ID and OTP from query parameters
    const { rideId, otp } = req.query;

    try {
        // Start the ride (validate OTP)
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        // Notify the user that the ride has started
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

/**
 * 🏁 End ride (Captain completes the trip)
 */
async function endRide(req, res) {
    // Validate request input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract ride ID from request body
    const { rideId } = req.body;

    try {
        // End the ride
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        // Notify the user that the ride has ended
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Export all functions at the end
module.exports = { createRide, getFare, confirmRide, startRide, endRide };
