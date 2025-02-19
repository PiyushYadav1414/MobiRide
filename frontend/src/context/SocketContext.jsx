// Import necessary dependencies from React and Socket.io
import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

// Create a React Context for managing the socket connection
export const SocketContext = createContext();

// Initialize the socket connection using the environment variable for the server URL
const socket = io(`${import.meta.env.VITE_BASE_URL}`); 

// Define the SocketProvider component that will wrap the application
const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Event listener for successful connection to the socket server
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        // Event listener for disconnection from the socket server
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        // Cleanup function to remove event listeners when component unmounts
        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    return (
        // Provide the socket instance to the entire application via Context API
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
