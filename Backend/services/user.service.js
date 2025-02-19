// Import the user model to interact with the database
const userModel = require('../models/user.model');

// Function to create a new user
async function createUser({ firstname, lastname, email, password }) {
    // Check if the required fields (firstname, email, password) are provided
    if (!firstname || !email || !password) {
        throw new Error('All fields are required'); // If any of these fields are missing, throw an error
    }

    // Create a new user by calling the `create` method on the user model
    const user = new userModel({
        fullname: {
            firstname, // Store the first name in the fullname object
            lastname   // Store the last name in the fullname object
        },
        email,   // Store the email address
        password // Store the password (though you might want to hash the password before saving)
    });

    // Saving the user record to the database
    await user.save();

    return user; // Return the created user object
}

// Export the function
module.exports = { createUser };
