// Importing necessary libraries and components
import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'  // Accessing the user data context
import { useNavigate } from 'react-router-dom'  // For navigation to different pages
import axios from 'axios'  // For making API requests

const UserProtectWrapper = ({
    children  // This represents the child components wrapped by this wrapper
}) => {
    // Getting the token stored in localStorage (used for authentication)
    const token = localStorage.getItem('token')
    
    // Using useNavigate hook to navigate to different pages
    const navigate = useNavigate()
    
    // Using context to get and set user data
    const { user, setUser } = useContext(UserDataContext)
    
    // State to track whether data is still loading
    const [ isLoading, setIsLoading ] = useState(true)

    // useEffect hook runs when the component mounts
    useEffect(() => {
        // If there is no token, redirect the user to the login page
        if (!token) {
            navigate('/login')
        }

        // Making an API call to get the user's profile data
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`  // Sending the token in the header for authentication
            }
        }).then(response => {
            // If the API call is successful (status 200), set the user data and stop loading
            if (response.status === 200) {
                setUser(response.data)
                setIsLoading(false)  // Mark loading as complete
            }
        })
            .catch(err => {
                // If there's an error, log it, remove the token, and redirect to the login page
                console.log(err)
                localStorage.removeItem('token')
                navigate('/login')
            })
    }, [ token ])  // The effect depends on the token value

    // While the data is loading, display a loading message
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

export default UserProtectWrapper
