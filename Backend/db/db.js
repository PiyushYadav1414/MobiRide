// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Function to connect to the database
function connectToDb() {
    // Connect to MongoDB using the connection string from environment variables (.env file)
    mongoose.connect(process.env.DB_CONNECT)
        .then(() => {
            console.log('Connected to DB'); // Log a success message when connected
        })
        .catch(err => console.log(err)); // Log any errors if the connection fails
}

// Export the function so it can be used in other files (e.g., app.js)
module.exports = connectToDb;
