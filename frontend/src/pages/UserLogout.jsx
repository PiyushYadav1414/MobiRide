// Importing necessary libraries for React, axios, and navigation
import React from 'react'
import axios from 'axios'  // To make API requests
import { useNavigate } from 'react-router-dom'  // For navigation to different pages

// Defining the UserLogout component
export const UserLogout = () => {

    // Getting the token from localStorage (used for authentication)
    const token = localStorage.getItem('token')
    
    // Using useNavigate hook for page navigation
    const navigate = useNavigate()

    // Making a GET request to log the user out by calling the logout API
    axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`  // Passing the token for authentication
        }
    }).then((response) => {
        // If the logout is successful (status 200), remove the token and navigate to the login page
        if (response.status === 200) {
            localStorage.removeItem('token')  // Remove the token from localStorage
            navigate('/login')  // Redirect the user to the login page
        }
    })

    // Rendering the message "UserLogout" (optional, can be removed as it's not being used)
    return (
        <div>UserLogout</div>
    )
}

// Exporting the UserLogout component so it can be used in other parts of the app
export default UserLogout
