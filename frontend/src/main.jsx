// Importing necessary libraries and components
import { StrictMode } from 'react'  // Enforces best practices and helps with development
import { createRoot } from 'react-dom/client'  // To create and render the React app in the DOM
import './index.css'  // Importing the CSS for styling
import App from './App.jsx'  // Importing the main App component
import { BrowserRouter } from 'react-router-dom';  // To enable client-side routing
import UserContext from './context/UserContext.jsx';  // Importing the UserContext provider
import CaptainContext from './context/CapatainContext.jsx';  // Importing the CaptainContext provider
import SocketProvider from './context/SocketContext.jsx';  // Importing the SocketContext provider

// Rendering the app inside the 'root' element in the HTML
createRoot(document.getElementById('root')).render(
  // Wrapping the app with multiple context providers to manage state globally
  <CaptainContext>
    <UserContext>
      <SocketProvider>
        <BrowserRouter>  {/* Enables client-side routing */}
          <App />  {/* The main application component */}
        </BrowserRouter>
      </SocketProvider>
    </UserContext>
  </CaptainContext>
)
