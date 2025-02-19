const Ride = require('../models/ride.model'); // Import the ride model for database interaction
const mapService = require('./maps.service'); // Import the map service to handle distance and time calculations
const crypto = require('crypto'); // Import crypto for OTP generation


// Function to calculate fare based on pickup, destination, and vehicle type
async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required'); // Validate input
    }

    // Get the distance and duration between the pickup and destination from the map service
    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    // Define lower base fare, per kilometer rate, and per minute rate for each vehicle type in CAD
    const baseFareCAD = { auto: 1.5, car: 2.5, moto: 1 }; // Example base fares in CAD (lowered)
    const perKmRateCAD = { auto: 0.75, car: 1.25, moto: 0.5 }; // Example per km rates in CAD (lowered)
    const perMinuteRateCAD = { auto: 0.25, car: 0.5, moto: 0.2 }; // Example per minute rates in CAD (lowered)

    // Calculate fare for each vehicle type based on distance and time
    const fare = Object.fromEntries(
        Object.keys(baseFareCAD).map(vehicleType => [
            vehicleType, 
            Math.round(baseFareCAD[vehicleType] + 
                ((distanceTime.distance.value / 1000) * perKmRateCAD[vehicleType]) + 
                ((distanceTime.duration.value / 60) * perMinuteRateCAD[vehicleType]))
        ])
    );

    return fare; // Return the calculated fare in CAD for all vehicle types
}



// Function to generate OTP with a given number of digits
function getOtp(num) {
    return crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString(); // Generate OTP
}



// Function to create a new ride
async function createRide({ user, pickup, destination, vehicleType }) {
    // console.log(user,pickup,destination,vehicleType);
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required'); // Validate input
    }

    // Get the fare for the ride based on pickup, destination, and vehicle type
    const fare = await getFare(pickup, destination);

    // Create a new ride in the database with the user, pickup, destination, OTP, and fare
    const ride =  await Ride.create({
        user,
        pickup,
        destination,
        otp: getOtp(6), // Generate a 6-digit OTP for the ride by calling getOpt function above
        fare: fare[vehicleType] // Calculate the fare based on the vehicle type selected by user to ride
    });

   

    return ride; // Return the created ride
}



// Function to confirm the ride by accepting the ride and assigning a captain and adding OTP with 
// updated ride information. So that we can send OTP to user so that he can confirm it with Captain for security reasons 
async function confirmRide({ rideId, captain }) {
    if (!rideId) {
        throw new Error('Ride id is required'); // Validate input
    }

    // Update the ride status to 'accepted' and assign the captain to the ride who have accpeted the ride
    const ride = await Ride.findOneAndUpdate(
        { _id: rideId }, 
        { status: 'accepted', captain: captain._id },
        { new: true }
    ).populate('user').populate('captain').select('+otp'); // Select OTP field explicitly

    if (!ride) {
        throw new Error('Ride not found'); // Handle case if the ride does not exist
    }

    return ride; // Return the confirmed ride
}




// Function to start the ride after OTP validation
async function startRide({ rideId, otp, captain }) {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required'); // Validate input
    }

    // Fetch the ride with populated user and captain details
    const ride = await Ride.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp'); // Select OTP field explicitly

    if (!ride) {
        throw new Error('Ride not found'); // Handle case if the ride does not exist
    }

    // Ensure that the ride is in 'accepted' status before starting
    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted'); // Throw error if the ride is not accepted
    }

    // Validate the OTP entered by the user
    if (ride.otp !== otp) {
        throw new Error('Invalid OTP'); // Throw error if the OTP is incorrect
    }

    // Update the ride status to 'ongoing'
    await Ride.findOneAndUpdate({ _id: rideId }, { status: 'ongoing' });

    return ride; // Return the ongoing ride
}




// Function to end the ride and mark it as completed
async function endRide({ rideId, captain }) {
    if (!rideId) {
        throw new Error('Ride id is required'); // Validate input
    }

// Fetch the ride with populated user and captain details. Below we make sure that correct captain is
//  assosiated with our ongoing ride 
    const ride = await Ride.findOne({
        _id: rideId,
        captain: captain._id // Ensure that the captain is associated with the ride
    }).populate('user').populate('captain').select('+otp'); // Select OTP field explicitly

    if (!ride) {
        throw new Error('Ride not found'); // Handle case if the ride does not exist
    }

    // Ensure that the ride is in 'ongoing' status before ending
    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing'); // Throw error if the ride is not ongoing
    }

    // Update the ride status to 'completed'
    await Ride.findOneAndUpdate({ _id: rideId }, { status: 'completed' });

    return ride; // Return the completed ride
}

// Export all functions in one line
module.exports = { getFare, getOtp, createRide, confirmRide, startRide, endRide };
