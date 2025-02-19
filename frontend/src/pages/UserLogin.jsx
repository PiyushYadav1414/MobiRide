 // Importing necessary React functions and modules  
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom' // Importing navigation tools
import { UserDataContext } from '../context/UserContext' // Importing user context for global user state
import axios from 'axios' // Importing axios for API requests

const UserLogin = () => {
  // State to store user email and password input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Accessing user context to manage logged-in user state  
  const { setUser } = useContext(UserDataContext) 

  // Hook for navigating to different pages after login  
  const navigate = useNavigate() 

  // Function to handle form submission  
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevents the page from reloading on form submission

    // Creating an object with user input data  
    const userData = {
      email: email,
      password: password
    }

    // Sending a POST request to the server for login  
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

    // If login is successful (status 200), store user data and navigate to the home page  
    if (response.status === 200) {
      const data = response.data // The response will have token and user 
      setUser(data.user) // Updating global user state
      localStorage.setItem('token', data.token) // Storing authentication token in local storage
      navigate('/home') // Redirecting user to home page
    }

    // Clearing input fields after submission  
    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        {/* App Logo */}
        <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="App Logo" />

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
          >Login</button>
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
