import React, { useState } from 'react'  // Importing React and useState hook for managing state
import { Link } from 'react-router-dom'  // For linking to other routes within the app
import { CaptainDataContext } from '../context/CapatainContext'  // Importing the CaptainDataContext for state management
import { useNavigate } from 'react-router-dom'  // For navigation after signup
import axios from 'axios'  // For making HTTP requests
import Loader from '../components/Loader'  // Importing the Loader component

const CaptainSignup = () => {
  // Hook for navigation after signup
  const navigate = useNavigate()

  // State variables for capturing user input
  const [email, setEmail] = useState('')  // Captures the email entered by the user
  const [password, setPassword] = useState('')  // Captures the password entered by the user
  const [firstName, setFirstName] = useState('')  // Captures the first name entered by the user
  const [lastName, setLastName] = useState('')  // Captures the last name entered by the user
  
  // State variables for capturing vehicle details
  const [vehicleColor, setVehicleColor] = useState('')  // Captures the vehicle color entered by the user
  const [vehiclePlate, setVehiclePlate] = useState('')  // Captures the vehicle plate entered by the user
  const [vehicleCapacity, setVehicleCapacity] = useState('')  // Captures the vehicle capacity entered by the user
  const [vehicleType, setVehicleType] = useState('')  // Captures the vehicle type selected by the user

  // State variable for loading status
  const [isLoading, setIsLoading] = useState(false)  // Manages the loading state

  // Accessing the CaptainDataContext to manage global state for the captain
  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault()  // Prevents the default form submission behavior to handle it manually
    setIsLoading(true)  // Start loading
    
    // Constructing the captain data object for the API request
    const captainData = {
      fullname: {
        firstname: firstName,  // Capturing the first name
        lastname: lastName  // Capturing the last name
      },
      email: email,  // Capturing the email
      password: password,  // Capturing the password
      vehicle: {
        color: vehicleColor,  // Capturing the vehicle color
        plate: vehiclePlate,  // Capturing the vehicle plate number
        capacity: vehicleCapacity,  // Capturing the vehicle's capacity
        vehicleType: vehicleType  // Capturing the type of vehicle
      }
    }

    try {
      // Sending a POST request to register the captain
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
      
      if (response.status === 201) {  // If the signup is successful (status code 201)
        const data = response.data  // Getting the response data
        setCaptain(data.captain)  // Updating global captain state
        localStorage.setItem('token', data.token)  // Storing the received token in localStorage for future use
        navigate('/captain-home')  // Redirecting the user to the captain's home page after successful signup
      }
    } catch (error) {
      console.error("Signup failed:", error)
    } finally {
      setIsLoading(false)  // Stop loading regardless of outcome
    }

    // Resetting all the form fields after submission
    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl">
        {isLoading && <Loader />} {/* Show loader when isLoading is true */}
        <div>
          {/* Logo Image */}
          <img className="mx-auto h-16 w-auto mb-8 transform hover:scale-110 transition-transform duration-300" src="https://www.coolgenerator.com/Data/Textdesign/202502/a366f73903697d91f7a6f7d5aa845c33.png" alt="App Logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Captain Account</h2>
        </div>

        {/* Signup Form */}
        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
          {/* Name Input Fields */}
          <div>
            <h3 className="text-lg font-medium mb-2">What's our Captain's name</h3>
            <div className="flex gap-4">
              <input required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <h3 className="text-lg font-medium mb-2">What's our Captain's email</h3>
            <input required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          {/* Password Input */}
          <div>
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {/* Vehicle Information Section */}
          <div>
            <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
            <div className="flex gap-4 mb-4">
              <input required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" placeholder="Vehicle Color" value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} />
              <input required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" placeholder="Vehicle Plate" value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)} />
            </div>
            <div className="flex gap-4">
              <input required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="number" placeholder="Vehicle Capacity" value={vehicleCapacity} onChange={(e) => setVehicleCapacity(e.target.value)} />
              <select required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                <option value="" disabled>Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>
          </div>

          {/* Signup Button */}
          <div>
            <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Captain Account'}
            </button>
          </div>
        </form>
        
        {/* Login Link */}
        <div className="text-sm text-center">
          <p>Already have an account? <Link to='/captain-login' className="font-medium text-indigo-600 hover:text-indigo-500">Login here</Link></p>
        </div>
      
        {/* reCAPTCHA Notice */}
        <div className="text-xs text-center text-gray-500 mt-8">
          <p>This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service apply</span>.</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignup
