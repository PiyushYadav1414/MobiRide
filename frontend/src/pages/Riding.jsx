import React from 'react'
import { Link, useLocation } from 'react-router-dom' // 📌 Import Link for navigation and useLocation to access route state
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext' // 📌 Importing socket context for real-time updates
import { useNavigate } from 'react-router-dom' // 📌 useNavigate for programmatic navigation
import LiveTracking from '../components/LiveTracking' // 📌 Importing LiveTracking component

const Riding = () => {
    const location = useLocation() // 📌 Get current route location
// Here we are retrieving ride data from state, fallback to empty object if undefined which we have passed while navigating to this page
    const { ride } = location.state || {}
    const { pickup, destination } = ride || {}; //Destructing pickup and destination locations from ride object
    const { socket } = useContext(SocketContext) // 📌 Access socket instance from context
    const navigate = useNavigate() // 📌 Hook for navigating between pages

// Listen for "ride-ended" event from ride.controller.jsx and navigate the user to home page when triggered
    socket.on("ride-ended", () => {
        navigate('/home')
    })

    return (
        <div className='h-screen'>
            {/* 🏠 Home button: Navigates user back to the home screen */}
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>

            {/* 🛰️ Live tracking map (Upper half of the screen) */}
            <div className='h-1/2'>
                <LiveTracking pickup={pickup} destination={destination} />
            </div>


            {/* 🚗 Ride details section (Lower half of the screen) */}
            <div className='h-1/2 p-4'>
                
                {/* 🚖 Driver and vehicle details */}
                <div className='flex items-center justify-between'>
                    {/* 📷 Vehicle image */}
                    <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="Vehicle" />
                    
                    {/* 🏷️ Driver and vehicle information */}
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname}</h2> {/* Driver's first name */}
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4> {/* Vehicle plate number */}
                        <p className='text-sm text-gray-600'>Mazda3 Sport GX</p> {/* Static vehicle name */}
                    </div>
                </div>

                {/* 📍 Ride details (Pickup and Fare) */}
                <div className='flex gap-2 justify-between flex-col items-center'>
                    <div className='w-full mt-5'>

                        {/* 📌 Drop-off location */}
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="text-lg ri-map-pin-2-fill"></i> {/* Location pin icon */}
                            <div>
                                <h3 className='text-lg font-medium'>Pickup</h3> {/* Static Address */}
                                <p className='text-sm -mt-1 text-gray-600'>{ride?.pickup}</p> {/* Dynamic drop-off location */}
                            </div>
                        </div>

                        {/* 💰 Fare details */}
                        <div className='flex items-center gap-5 p-3'>
                            <i className="ri-currency-line"></i> {/* Currency icon */}
                            <div>
                                <h3 className='text-lg font-medium'>${ride?.fare} </h3> {/* Display dynamic fare */}
                                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p> {/* Payment Mode (Static) */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 🏦 Payment Button */}
                <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>
                    Make a Payment
                </button>
            </div>
        </div>
    )
}

export default Riding
