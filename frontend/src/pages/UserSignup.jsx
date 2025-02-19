import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  // State variables to store user input fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  
  // State to store user data (not used directly in this component)
  const [userData, setUserData] = useState({})

  // useNavigate hook for redirecting users after successful signup
  const navigate = useNavigate()

  // Accessing the UserDataContext to manage logged-in user data
  const { user, setUser } = useContext(UserDataContext)

  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault()

    // Object to send in the signup request
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    try {
      // Sending signup request to the backend API
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

      if (response.status === 201) {
        const data = response.data

        // Updating the context with registered user data
        setUser(data.user)

        // Storing the authentication token in localStorage
        localStorage.setItem('token', data.token)

        // Redirecting the user to the home page after successful signup
        navigate('/home')
      }

      // Resetting input fields after form submission
      setEmail('')
      setFirstName('')
      setLastName('')
      setPassword('')
    } catch (error) {
      console.error("Signup failed:", error)
    }
  }

  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          {/* Logo for the signup page */}
          <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="Signup Logo" />

          {/* Signup form */}
          <form onSubmit={(e) => submitHandler(e)}>

            {/* Name input fields */}
            <h3 className='text-lg w-1/2 font-medium mb-2'>What's your name</h3>
            <div className='flex gap-4 mb-7'>
              <input
                required
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                type="text"
                placeholder='First name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                required
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                type="text"
                placeholder='Last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

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
              required
              type="password"
              placeholder='password'
            />

            {/* Signup button */}
            <button
              className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            >Create account</button>

          </form>

          {/* Link to login page for existing users .It will take us to UserLogin Component*/}
          <p className='text-center'>Already have an account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
        </div>

        {/* reCAPTCHA notice */}
        <div>
          <p className='text-[10px] leading-tight'>
            This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup
