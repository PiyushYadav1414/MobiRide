import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CapatainContext'

const CaptainLogin = () => {
  // State variables to store email and password input values
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Accessing the CaptainDataContext to manage logged-in captain data
  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  // useNavigate hook for redirecting users after successful login
  const navigate = useNavigate()

  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    // Object to send in the login request
    const captain = {
      email: email,
      password
    }

    try {
      // Sending login request to the backend API
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

      if (response.status === 200) {
        const data = response.data

        // Updating the context with logged-in captain data
        setCaptain(data.captain)

        // Storing the authentication token in localStorage
        localStorage.setItem('token', data.token)

        // Redirecting the captain to the captain dashboard/home page
        navigate('/captain-home')
      }

      // Resetting input fields after form submission
      setEmail('')
      setPassword('')
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        {/* Logo for the captain login page */}
        <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Captain Logo" />

        {/* Login form */}
        <form onSubmit={(e) => submitHandler(e)}>
          {/* Email input field */}
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          {/* Password input field */}
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required type="password"
            placeholder='password'
          />

          {/* Login button */}
          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>
        </form>

        {/* Link to the captain registration page */}
        <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
      </div>

      {/* Button to switch to user login */}
      <div>
        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
