import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {

    // useNavigate hook for navigation
    const navigate = useNavigate()

// Function to end the ride, making a POST request to ride.controller.js to end the ride  and update its
// status to be completed and will notify the user using socket.io that ride has been completed(ended)
// by emiting event name 'ride-ended' and we will further navigate teh suer to Home.jsx after ride is ended
    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
            rideId: props.ride._id  // Sending the ride ID to end the specific ride
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`  // Authentication using token from localStorage
            }
        })

        // On successful response, navigate to captain-home page
        if (response.status === 200) {
            navigate('/captain-home')
        }
    }

    return (
        <div>
            {/* Close button to hide the Finish Ride panel */}
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setFinishRidePanel(false)  // Hides the panel when clicked
            }}>
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            {/* Title for the panel */}
            <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>
            
            {/* Displaying ride information */}
            <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    {/* User's image */}
                    <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
                    {/* User's name */}
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname}</h2>
                </div>
                {/* Distance of the ride */}
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            
            {/* Ride details */}
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    {/* Pickup location */}
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    
                    {/* Destination location */}
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Drop Off </h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    
                    {/* Fare information */}
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>${props.ride?.fare} </h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>

                {/* Finish ride button */}
                <div className='mt-10 w-full'>
          {/* On the click of Finish Ride button endRide function wil bbe trigerred           */}
                    <button
                        onClick={endRide}  // Trigger endRide function when clicked
                        className='w-full mt-5 flex text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>
                        Finish Ride
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FinishRide
