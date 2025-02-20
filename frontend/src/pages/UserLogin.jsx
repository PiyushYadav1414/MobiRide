// Importing necessary React functions and modules  
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom' // Importing navigation tools
import { UserDataContext } from '../context/UserContext' // Importing user context for global user state
import axios from 'axios' // Importing axios for API requests
import Loader from '../components/Loader' // Importing the Loader component

const UserLogin = () => {
  // State to store user email and password input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false) // New state for loading

  // Accessing user context to manage logged-in user state  
  const { setUser } = useContext(UserDataContext) 

  // Hook for navigating to different pages after login  
  const navigate = useNavigate() 

  // Function to handle form submission  
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevents the page from reloading on form submission
    setIsLoading(true) // Start loading

    // Creating an object with user input data  
    const userData = {
      email: email,
      password: password
    }

    try {
      // Sending a POST request to the server for login  
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

      // If login is successful (status 200), store user data and navigate to the home page  
      if (response.status === 200) {
        const data = response.data // The response will have token and user 
        setUser(data.user) // Updating global user state
        localStorage.setItem('token', data.token) // Storing authentication token in local storage
        navigate('/home') // Redirecting user to home page
      }
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false) // Stop loading regardless of outcome
    }

    // Clearing input fields after submission  
    setEmail('')
    setPassword('')
  }

  return (
    <div 
      className='p-7 h-screen flex flex-col justify-between bg-cover bg-center'
      style={{
        backgroundImage: "url('img3.png')"
      }}
    >
      {isLoading && <Loader />} {/* Show loader when isLoading is true */}
      <div className='bg-white p-6 mt-[8rem] rounded-lg shadow-lg'>
        
        {/* App Logo */}
        <img className='w-[10rem] mb-7' src="https://www.coolgenerator.com/Data/Textdesign/202502/a366f73903697d91f7a6f7d5aa845c33.png" alt="App Logo" />

        {/* Login Form */}
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>

          {/* Email Input Field */}
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

          {/* Password Input Field */}
          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required type="password"
            placeholder='password'
          />

          {/* Login Button */}
          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Link to UserSignup Page */}
        <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
      </div>

      {/* Button for Captain (driver) Login  and it will take us to CaptainLogin Component*/}
      <div>
        <Link
          to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin
