import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import Loader from '../components/Loader'

const UserSignup = () => {
  // State variables to store user input fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  // State to store user data (not used directly in this component)
  const [userData, setUserData] = useState({})

  // State to manage loading status
  const [isLoading, setIsLoading] = useState(false)

  // useNavigate hook for redirecting users after successful signup
  const navigate = useNavigate()

  // Accessing the UserDataContext to manage logged-in user data
  const { user, setUser } = useContext(UserDataContext)

  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true) // Start loading

    // Object to send in the signup request
    const newUser = {
      fullname: { firstname: firstName, lastname: lastName },
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
    } finally {
      setIsLoading(false) // Stop loading regardless of outcome
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl">
        {isLoading && <Loader />} {/* Show loader when isLoading is true */}
        <div>
          {/* Logo for the signup page */}
          <img className="mx-auto h-16 w-auto mb-8 transform hover:scale-110 transition-transform duration-300" src="https://www.coolgenerator.com/Data/Textdesign/202502/a366f73903697d91f7a6f7d5aa845c33.png" alt="App Logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join us and start your journey
          </p>
        </div>

        {/* Signup form */}
        <form className="mt-8 space-y-6" onSubmit={(e) => submitHandler(e)}>
          {/* Name input fields */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="first-name" className="sr-only">First name</label>
              <input
                id="first-name"
                name="first-name"
                type="text"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="last-name" className="sr-only">Last name</label>
              <input
                id="last-name"
                name="last-name"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Email input field */}
          <div>
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password input field */}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Signup button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              disabled={isLoading}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>

        {/* Link to login page for existing users */}
        <div className="text-sm text-center">
          <p>Already have an account? <Link to='/login' className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300">Login here</Link></p>
        </div>

        {/* reCAPTCHA notice */}
        <div className="text-xs text-center text-gray-500 mt-8">
          <p>
            This site is protected by reCAPTCHA and the 
            <a href="#" className="underline hover:text-indigo-600 transition-colors duration-300"> Google Privacy Policy</a> and 
            <a href="#" className="underline hover:text-indigo-600 transition-colors duration-300"> Terms of Service apply</a>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup
