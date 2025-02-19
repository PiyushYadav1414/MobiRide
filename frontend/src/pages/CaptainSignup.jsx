import React, { useState } from 'react'  // Importing React and useState hook for managing state
import { Link } from 'react-router-dom'  // For linking to other routes within the app
import { CaptainDataContext } from '../context/CapatainContext'  // Importing the CaptainDataContext for state management
import { useNavigate } from 'react-router-dom'  // For navigation after signup
import axios from 'axios'  // For making HTTP requests

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

  // Accessing the CaptainDataContext to manage global state for the captain
  const { captain, setCaptain } = React.useContext(CaptainDataContext)

   
  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault()  // Prevents the default form submission behavior to handle it manually
    
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

    // Sending a POST request to register the captain
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
    
    if (response.status === 201) {  // If the signup is successful (status code 201)
      const data = response.data  // Getting the response data
      setCaptain(data.captain)  // Updating global captain state
      localStorage.setItem('token', data.token)  // Storing the received token in localStorage for future use
      navigate('/captain-home')  // Redirecting the user to the captain's home page after successful signup
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
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
        {/* Logo Image */}
        <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Uber Driver" />

        {/* Signup Form */}
        <form onSubmit={submitHandler}>

          {/* Name Input Fields */}
          <h3 className='text-lg w-full font-medium mb-2'>What's our Captain's name</h3>
          <div className='flex gap-4 mb-7'>
            <input required className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base' type="text" placeholder='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input required className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base' type="text" placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>

          {/* Email Input */}
          <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
          <input required className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder='email@example.com' value={email} onChange={(e) => setEmail(e.target.value)} />

          {/* Password Input */}
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input required className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />

          {/* Vehicle Information Section */}
          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input required className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base' type="text" placeholder='Vehicle Color' value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} />
            <input required className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base' type="text" placeholder='Vehicle Plate' value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)} />
          </div>
          <div className='flex gap-4 mb-7'>
            <input required className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base' type="number" placeholder='Vehicle Capacity' value={vehicleCapacity} onChange={(e) => setVehicleCapacity(e.target.value)} />
            <select required className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base' value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          {/* Signup Button */}
          <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>Create Captain Account</button>
        </form>
        
        {/* Login Link */}
        <p className='text-center'>Already have an account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
      </div>
      
      {/* reCAPTCHA Notice */}
      <div>
        <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default CaptainSignup
