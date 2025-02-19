// Importing necessary libraries and components
import React from 'react'
import axios from 'axios'  // To make API requests
import { useNavigate } from 'react-router-dom'  // For page navigation

// Defining the CaptainLogout component
export const CaptainLogout = () => {
    // Get the captain's token from localStorage
    const token = localStorage.getItem('captain-token')
    
    // Using useNavigate hook to navigate to different pages
    const navigate = useNavigate()

    // Making a GET request to log the captain out by calling the logout API
    axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
        headers: {
            Authorization: `Bearer ${token}`  // Pass the captain's token for authentication
        }
    }).then((response) => {
        // If the logout is successful (status 200), remove the token and navigate to the login page
        if (response.status === 200) {
            localStorage.removeItem('captain-token')  // Remove the captain's token from localStorage
            navigate('/captain-login')  // Redirect the captain to the login page
        }
    })

    // Rendering the "CaptainLogout" message (optional, could be replaced or removed)
    return (
        <div>CaptainLogout</div>
    )
}

// Exporting the CaptainLogout component so it can be used in other parts of the app
export default CaptainLogout
