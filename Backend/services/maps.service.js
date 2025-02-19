// Importing axios for making HTTP requests and captain model to interact with the database
const axios = require('axios');
const captainModel = require('../models/captain.model');

// Function to get the coordinates (latitude, longitude) of a particular address of User 
// so that we can know where the user is so that the driver can pick him up
async function getAddressCoordinate(address) {
    const apiKey = process.env.GOOGLE_MAPS_API; // Get the Google Maps API key from environment variables
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        // Making GET request to Google Maps Geocode API
        const response = await axios.get(url);

        // Check if the API call was successful and returned a valid result
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location; // Get the latitude and longitude from the first result
            return {
                ltd: location.lat, // Returning latitude
                lng: location.lng  // Returning longitude
            };
        } else {
            throw new Error('Unable to fetch coordinates'); // Throw error if API status is not OK
        }
    } catch (error) {
        console.error(error); // Log error in case of failure
        throw error; // Rethrow error
    }
}

// Function to get the distance and travel time between origin (pickup) and destination
async function getDistanceTime(origin, destination) {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required'); // Check if origin and destination are provided
    }

    const apiKey = process.env.GOOGLE_MAPS_API; // Get the Google Maps API key
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        // Making GET request to Google Maps Distance Matrix API
        const response = await axios.get(url);

        // Check if the API call was successful
        if (response.data.status === 'OK') {
            // Check if a valid route is found, otherwise throw an error
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }

            return response.data.rows[0].elements[0]; // Returning the distance and time details from the response
        } else {
            throw new Error('Unable to fetch distance and time'); // Throw error if API status is not OK
        }
    } catch (err) {
        console.error(err); // Log error in case of failure
        throw err; // Rethrow error
    }
}

// Function to get autocomplete suggestions for an input query (address) in pickup and dropoff input field
async function getAutoCompleteSuggestions(input) {
    if (!input) {
        throw new Error('Query is required'); // Ensure that input is provided
    }

    const apiKey = process.env.GOOGLE_MAPS_API; // Get the Google Maps API key
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        // Making GET request to Google Maps Places API for autocomplete suggestions
        const response = await axios.get(url);

        // Check if the API call was successful
        if (response.data.status === 'OK') {
            // Extracting predictions and returning only the description of the place
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions'); // Throw error if API status is not OK
        }
    } catch (err) {
        console.error(err); // Log error in case of failure
        throw err; // Rethrow error
    }
}

// Function to find captains within a specified radius of a given latitude and longitude
async function getCaptainsInTheRadius(ltd, lng, radius) {
    // radius is in kilometers

    // Querying the database for captains within the given radius
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371] // Convert radius from km to radians
            }
        }
    });

    return captains; // Returning the list of captains within the radius
}

// Export all functions at once
module.exports = {
    getAddressCoordinate,
    getDistanceTime,
    getAutoCompleteSuggestions,
    getCaptainsInTheRadius
};
