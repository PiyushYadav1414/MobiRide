// Importing React and necessary hooks (createContext and useState)
import React, { createContext, useState } from 'react'

// Creating a context to store and share user data across components
export const UserDataContext = createContext()

// Creating a functional component called UserContext that will wrap other components
const UserContext = ({ children }) => {

    // useState is used to create the user state with initial values (email and full name)
    const [ user, setUser ] = useState({
        email: '',  // Initially setting email as an empty string
        fullName: {
            firstName: '',  // Initially setting first name as an empty string
            lastName: ''    // Initially setting last name as an empty string
        }
    })

    return (
        <div>
            {/* The context provider is passing down the 'user' and 'setUser' values */}
            <UserDataContext.Provider value={{ user, setUser }}>
                {/* This is where the child components (passed as 'children') will be rendered */}
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

// Exporting the UserContext component to be used in other parts of the application
export default UserContext
