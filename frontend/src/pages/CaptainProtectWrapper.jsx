// Importing necessary libraries and components
import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CapatainContext'  // Access the Captain data context
import { useNavigate } from 'react-router-dom'  // For navigation to different pages
import axios from 'axios'  // To make API requests

const CaptainProtectWrapper = ({
    children  // This represents the child components wrapped by this wrapper
}) => {

    // Get the token from localStorage (used for authentication)
    const token = localStorage.getItem('token')
    
    // Using useNavigate hook to navigate to different pages
    const navigate = useNavigate()
    
    // Accessing the captain's data and the function to update it from the context
    const { captain, setCaptain } = useContext(CaptainDataContext)
    
    // State to track whether data is still loading
    const [ isLoading, setIsLoading ] = useState(true)

    // useEffect hook runs when the component mounts
    useEffect(() => {
        // If there is no token, redirect the user to the captain's login page
        if (!token) {
            navigate('/captain-login')
        }

        // Making an API call to get the captain's profile data
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`  // Sending the token in the header for authentication
            }
        }).then(response => {
            // If the API call is successful (status 200), update the captain's data and stop loading
            if (response.status === 200) {
                setCaptain(response.data.captain)
                setIsLoading(false)  // Mark loading as complete
            }
        })
            .catch(err => {
                // If there's an error (like an invalid token or session), remove the token and redirect to the login page
                localStorage.removeItem('token')
                navigate('/captain-login')
            })
    }, [ token ])  // The effect depends on the token value

    // If data is still loading, display a loading message
    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    // Once data is loaded, render the child components passed to this wrapper
    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper
