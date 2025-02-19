// Import the map service, which handles communication with a mapping API
const mapService = require('../services/maps.service');

// Import validationResult from express-validator to validate user inputs
const { validationResult } = require('express-validator');



// 🌍 Get the coordinates of a given address
async function getCoordinates(req, res, next) {
    // Validate the request input (checks if required fields are provided)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Return validation errors
    }

    // Extract the address parameter from the query string
    const { address } = req.query;

    try {
        // Call the map service to get coordinates based on the address
        const coordinates = await mapService.getAddressCoordinate(address);

        // Send the coordinates as a response
        res.status(200).json(coordinates);
    } catch (error) {
        // If the address is invalid or not found, send a 404 error response
        res.status(404).json({ message: 'Coordinates not found' });
    }
}




// 📏 Get the distance and time between two locations i.e pickup and destination
async function getDistanceTime(req, res, next) {
    try {
        // Validate the request input (checks if required fields are provided)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Return validation errors
        }

        // Extract origin and destination parameters from the query string
        const { origin, destination } = req.query;

        // Call the map service to calculate the distance and time
        const distanceTime = await mapService.getDistanceTime(origin, destination);

        // Send the calculated distance and time as a response
        res.status(200).json(distanceTime);
    } catch (err) {
        // Log the error for debugging
        console.error(err);

        // Send a generic server error response
        res.status(500).json({ message: 'Internal server error' });
    }
}




// 🔍 Get autocomplete suggestions for locations
async function getAutoCompleteSuggestions(req, res, next) {
    try {
        // Validate the request input (checks if required fields are provided)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Return validation errors
        }

        // Extract the input query parameter (the partial address or search term)
        const { input } = req.query;

        // Call the map service to get autocomplete suggestions
        const suggestions = await mapService.getAutoCompleteSuggestions(input);

        // Send the suggestions as a response
        res.status(200).json(suggestions);
    } catch (err) {
        // Log the error for debugging
        console.error(err);

        // Send a generic server error response
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Export all functions at the end
module.exports = { getCoordinates, getDistanceTime, getAutoCompleteSuggestions };
