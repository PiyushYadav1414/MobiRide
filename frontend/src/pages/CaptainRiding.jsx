import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {

    // State to control the visibility of the finish ride panel
    const [finishRidePanel, setFinishRidePanel] = useState(false);

    // Reference to the finish ride panel for animation
    const finishRidePanelRef = useRef(null);

    // Retrieving ride data from the navigation state; fallback to an empty object if undefined
    const location = useLocation();
    const rideData = location.state?.ride;
    // Extract pickup and destination from rideData
    const { pickup, destination } = rideData;

    // GSAP animation hook for sliding in and out the finish ride panel
    useGSAP(() => {
        if (finishRidePanel) {
            // Slide panel into view when `finishRidePanel` is true
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            });
        } else {
            // Hide panel by sliding it down when `finishRidePanel` is false
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            });
        }
    }, [finishRidePanel]);

    return (
        <div className='h-screen relative'>
            {/* Background live tracking component - Covers the whole screen */}
            <div className='h-[80%] w-screen absolute top-0 left-0'>
            <LiveTracking pickup={pickup} destination={destination}  />
            </div>

            {/* Header with Uber logo and logout button */}
            <div className='absolute top-14 right-3 z-10'>
    <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-logout-box-r-line"></i>
    </Link>
</div>



            {/* Ride details section - Clicking opens the finish ride panel */}
            <div className='fixed bottom-0 left-0 w-full h-1/5 p-6 flex items-center justify-between bg-yellow-400 pt-10 z-10'
                onClick={() => setFinishRidePanel(true)}
            >
                {/* Arrow icon to indicate the panel can be expanded */}
                <h5 className='p-1 text-center w-[90%] absolute top-0'>
                    <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
                </h5>

                {/* Displaying ride distance (static text for now, replace with dynamic data if needed) */}
                <h4 className='text-xl font-semibold'>{'4 KM away'}</h4>

                {/* Button to mark the ride as completed */}
                <button className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>
                    Complete Ride
                </button>
            </div>

            {/* Sliding finish ride panel - Hidden by default */}
            <div ref={finishRidePanelRef} className='fixed w-full z-20 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
{/* Below compoenent will call a Function to end the ride, making a POST request to ride.controller.js 
to end the ride  and update its status to be completed and will notify the user using socket.io that 
ride has been completed(ended) by emiting event name 'ride-ended' and we will further navigate the captain
to Home.jsx after ride is ended.               */}
                <FinishRide
                    ride={rideData}  // Passing ride data to the FinishRide component
                    setFinishRidePanel={setFinishRidePanel} // Function to close the panel
                />
            </div>
        </div>
    );
}

export default CaptainRiding;
