// Importing necessary hooks and functions from React
import { createContext, useState, useContext } from 'react';

// Creating a new context for the Captain data
export const CaptainDataContext = createContext();

// Creating the CaptainContext component which provides the context to its children
const CaptainContext = ({ children }) => {
    // useState is used to manage the captain data, loading state, and error state
    const [ captain, setCaptain ] = useState(null);  // Stores captain data
    const [ isLoading, setIsLoading ] = useState(false);  // Tracks if data is loading
    const [ error, setError ] = useState(null);  // Tracks any errors during data fetch

    // Function to update the captain's data
    const updateCaptain = (captainData) => {
        setCaptain(captainData);  // Updates the captain state with new data
    };

    // The value object holds all the states and functions to be shared with the context
    const value = {
        captain,  // The captain's data
        setCaptain,  // Function to set the captain's data
        isLoading,  // Loading state
        setIsLoading,  // Function to set loading state
        error,  // Error state
        setError,  // Function to set error state
        updateCaptain  // Function to update the captain's data
    };

    // The CaptainDataContext.Provider wraps the children components and shares the context value
    return (
        <CaptainDataContext.Provider value={value}>
            {children}   {/* Passes the context value to the children */}
        </CaptainDataContext.Provider>
    );
};

// Exporting the CaptainContext component to be used elsewhere in the app
export default CaptainContext;
