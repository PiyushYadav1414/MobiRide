// Import Mongoose for defining the schema and interacting with MongoDB
const mongoose = require('mongoose');

// Import bcrypt for hashing and comparing passwords
const bcrypt = require('bcrypt');

// Import jsonwebtoken for generating authentication tokens
const jwt = require('jsonwebtoken');

// Define the user schema using Mongoose
const userSchema = new mongoose.Schema({
    
    // Define the 'fullname' field as an object containing first and last names
    fullname: {
        
        // 'firstname' is a required string with a minimum length of 3 characters
        firstname: { type: String, required: true, minlength: [3, 'First name must be at least 3 characters long'] },
        
        // 'lastname' is an optional string with a minimum length of 3 characters
        lastname: { type: String, minlength: [3, 'Last name must be at least 3 characters long'] }
    },

    // 'email' is a required and unique string with a minimum length of 5 characters
    email: { type: String, required: true, unique: true, minlength: [5, 'Email must be at least 5 characters long'] },

// 'password' is a required string, but it will be excluded when retrieving user data from the database (select: false).
// If you want to include the 'password' field in query results, you need to explicitly select it using '+password'.
    password: { type: String, required: true, select: false },

    // 'socketId' is an optional string field for storing the user's WebSocket ID
    socketId: { type: String }
});

// Method to generate an authentication token using JWT
// This method generates a JWT token for a specific user. this._id refers to the current user document's _id.

// 1. .methods (Instance Methods)
// Used to define methods that can be called on a specific document (an instance of a model).
// These methods have access to the document's data (this refers to the document itself).
// Typically used when you need to perform operations on a single user or entity.
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Method to compare a given password with the hashed password stored in the database for that specific user.
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// 2. .statics (Static Methods)
// Used to define methods that can be called on the model itself instead of an instance.
// These are useful for operations that don’t require a specific document.
// Static method to hash a password before saving it to the database
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

// Create the 'user' model using the defined schema
const userModel = mongoose.model('user', userSchema);

// Export the model so it can be used in other files
module.exports = userModel;
