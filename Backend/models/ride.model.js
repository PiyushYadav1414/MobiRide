// Import Mongoose to define the schema and interact with MongoDB
const mongoose = require('mongoose');


// In below we should have userId of user who is booking the ride and his pickup and dropoff location thats why they are required: true 
// `captainId` is not required initially, as it will be assigned once a captain accepts the ride.
// The userId, pickup and destination will be given by user. The `captainId` will be assigned once a 
// captain accepts the ride.For fare we need to calculate it by ourself based on distance and time 
// between pickup and dropoff location

// Define the schema for ride details
const rideSchema = new mongoose.Schema({
    
    // 'user' field stores the reference to the user who booked the ride (Required)
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },

    // 'captain' field stores the reference to the captain (driver) assigned to the ride (Optional)
    captain: { type: mongoose.Schema.Types.ObjectId, ref: 'captain' },

    // 'pickup' field stores the starting location of the ride (Required)
    pickup: { type: String, required: true },

    // 'destination' field stores the ending location of the ride (Required)
    destination: { type: String, required: true },

    // 'fare' field stores the cost of the ride (Required)
    fare: { type: Number, required: true },

    // 'status' field represents the current state of the ride (Default: 'pending')
    status: { type: String, enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'], default: 'pending' },

    // 'duration' field stores the estimated ride time in seconds (Optional)
    duration: { type: Number },

    // 'distance' field stores the estimated ride distance in meters (Optional)
    distance: { type: Number },

    // 'paymentID' field stores the unique ID for payment transactions (Optional)
    paymentID: { type: String },

    // 'orderId' field stores the unique order ID for tracking the ride payment (Optional)
    orderId: { type: String },

    // 'signature' field stores the digital signature for payment verification (Optional)
    signature: { type: String },

    // 'otp' field stores a One-Time Password (OTP) for ride verification (Required, Not selectable in queries)
    otp: { type: String, select: false, required: true }

});

// Export the model so it can be used in other parts of the application
module.exports = mongoose.model('ride', rideSchema);
