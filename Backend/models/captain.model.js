// Import required modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define the schema for captains (drivers)
const captainSchema = new mongoose.Schema({

    // 'fullname' field stores the captain's first and last name (Firstname is required)
    fullname: {
        firstname: { type: String, required: true, minlength: [3, 'Firstname must be at least 3 characters long'] },
        lastname: { type: String, minlength: [3, 'Lastname must be at least 3 characters long'] }
    },

    // 'email' field stores the captain's email (Required, Unique, Lowercase, and Validated)
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },

    // 'password' field stores the encrypted password (Required, Not selectable in queries)
    password: { type: String, required: true, select: false },

    // 'socketId' field stores the real-time socket connection ID (Optional)
    socketId: { type: String },

    // 'status' field represents the captain's availability for accepting ride (Default: 'inactive')
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },

    // 'vehicle' field stores details about the captain's vehicle (Required fields)
    vehicle: {
        color: { type: String, required: true, minlength: [3, 'Color must be at least 3 characters long'] },
        plate: { type: String, required: true, minlength: [3, 'Plate must be at least 3 characters long'] },
        capacity: { type: Number, required: true, min: [1, 'Capacity must be at least 1'] },
        vehicleType: { type: String, required: true, enum: ['car', 'motorcycle', 'auto'] }
    },

    // 'location' field stores the captain's current coordinates (Optional)
    location: {
        ltd: { type: Number }, // Latitude 
        lng: { type: Number }  // Longitude
    }

});

// Generate an authentication token for the captain (Valid for 24 hours)
captainSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Compare the entered password with the stored hashed password
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Hash a password before saving it to the database
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

// Export the model to use it in other parts of the application
const captainModel = mongoose.model('captain', captainSchema);
module.exports = captainModel;
