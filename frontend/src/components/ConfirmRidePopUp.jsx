import React, { useState } from 'react' // Importing React and useState for state management
import { Link } from 'react-router-dom' // Importing Link for routing (although not used in this code)
import axios from 'axios' // Importing axios for making HTTP requests
import { useNavigate } from 'react-router-dom' // Importing useNavigate for programmatic navigation
import Loader from './Loader' // Importing the Loader component

const ConfirmRidePopUp = (props) => {
    // Declaring state to hold the OTP input value
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false) // Loader state
    // useNavigate hook to handle navigation after successful ride confirmation
    const navigate = useNavigate()

    // Submit handler for confirming the ride by sending OTP and ride ID to the server
    const submitHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true) // Start loading

        try {
            // Making an HTTP request to start the ride with the provided OTP and ride ID and here we will verify
            // that the OTP provided by user to captain(driver) is correct and if otp entered by captain in input
            // field here matches with user's OTP then we will start ride and will update the status of ride to
            // ongoing. It will further notify the user using sockets by emitting event name
            // 'ride-started' that his ride has been started and we will listen this event from Home.jsx
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
                params: {
                    rideId: props.ride._id,
                    otp: otp // Sending the OTP entered by the user
                },
                headers: {
                    // Passing the token for authentication in the request headers
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            // If the response is successful, proceed to update the state and navigate to the captain riding page
            // Here ride.controller.jsx is notifying that the OTP entered by captain has been verified and ride status has been updated to ongoing and ride has been started .
            // And we will navigate the captain to CaptainRiding.jsx page
            if (response.status === 200) {
                props.setConfirmRidePopupPanel(false) // Close the confirm ride popup
                props.setRidePopupPanel(false) // Close the initial ride popup
                // Navigate to the CaptainRiding.jsx page and we are passing ride data to it
                navigate('/captain-riding', { state: { ride: props.ride } })
            }
        } catch (error) {
            console.error("Error confirming ride:", error);
        } finally {
            setIsLoading(false) // Stop loading
        }
    }

    return (
        <div>
            {isLoading && <Loader />} {/* Show loader when isLoading is true */}
            {/* Close button (down arrow) to dismiss the ride popup */}
            <h5 className='p-1 text-center w-[93%] absolute top-0'
                onClick={() => props.setRidePopupPanel(false)}>
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            {/* Heading for confirming the ride */}
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>

            {/* Ride details card displaying user info and distance */}
            <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    {/* User's profile picture */}
                    <img
                        className='h-12 rounded-full object-cover w-12'
                        src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
                        alt="User Profile"
                    />
                    {/* Display rider's first name */}
                    <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname}</h2>
                </div>
                {/* Distance of the ride */}
                <div className='text-right'>
                    {/* Distance of the ride */}
                    <h5 className='text-lg font-semibold'>{props.ride?.distance} Km</h5>
                    {/* Duration of the ride */}
                    <h5 className='text-md'>{props.ride?.duration} min</h5>
                </div>
            </div>

            {/* Ride pickup, destination, and fare details */}
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>

                    {/* Pickup location details */}
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Pickup </h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>

                    {/* Destination details */}
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Drop Off </h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>
                    </div>

                    {/* Ride fare details */}
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>${props.ride?.fare} </h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>

                {/* Form for OTP input and action buttons */}
                <div className='mt-6 w-full'>
                    <form onSubmit={submitHandler}>
                        {/* OTP input field */}
                        <input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            type="text"
                            className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3'
                            placeholder='Enter OTP'
                        />

                        {/* Confirm button to submit the form */}
                        <button
                            className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Confirming...' : 'Confirm'}
                        </button>

                        {/* Cancel button to close the popups */}
                        <button
                            onClick={() => {
                                props.setConfirmRidePopupPanel(false) // Close the confirm ride popup
                                props.setRidePopupPanel(false) // Close the initial ride popup
                            }}
                            className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'>
                            Cancel
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp // Export the component for use in other parts of the app
