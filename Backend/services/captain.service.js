// Importing the captain model to interact with the database
const captainModel = require('../models/captain.model');

// Function to create a new captain
async function createCaptain({firstname, lastname, email, password, color, plate, capacity, vehicleType}) {
    // Checking if all required fields are provided, if not, throw an error
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required'); // Throw error if any field is missing
    }

    // Creating a new captain record in the database
    const captain = new captainModel({
        fullname: { // Captains' full name
            firstname, // First name from input
            lastname // Last name from input
        },
        email, // Captains' email from input
        password, // Captains' password from input
        vehicle: { // Vehicle details
            color, // Vehicle color from input
            plate, // Vehicle plate number from input
            capacity, // Vehicle capacity from input
            vehicleType // Type of vehicle (e.g., car, motorcycle, etc.) from input
        }
    });

    // Saving the captain record to the database
    await captain.save();

    // Returning the newly created captain object
    return captain;
}

// Exporting the function to be used in other files
module.exports = { createCaptain };
