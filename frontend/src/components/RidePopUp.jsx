import React from 'react'

// Functional component to display ride request popup
const RidePopUp = (props) => {
    return (
        <div>
            {/* Close button (down arrow) to dismiss the ride popup */}
            <h5 className='p-1 text-center w-[93%] absolute top-0' 
                onClick={() => props.setRidePopupPanel(false)}>
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            {/* Heading for new ride notification */}
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>

            {/* Ride details card displaying user info, distance, and duration */}
            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    {/* User's profile picture */}
                    <img 
                        className='h-12 rounded-full object-cover w-12' 
                        src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" 
                        alt="User Profile" 
                    />
                    {/* Display rider's full name */}
                    <h2 className='text-lg font-medium'>
                        {props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}
                    </h2>
                </div>
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

                {/* Action buttons: Accept or Ignore ride */}
                <div className='mt-5 w-full'>
                    {/* Accept Ride button: Opens confirmation popup and triggers ride confirmation */}
                    <button 
                        onClick={() => {
                            // props.setConfirmRidePopupPanel(true) // Show confirmation popup
                            props.confirmRide() // Trigger ride confirmation logic
                        }} 
                        className='bg-green-600 w-full text-white font-semibold p-2 px-10 rounded-lg'>
                        Accept
                    </button>

                    {/* Ignore Ride button: Closes the ride popup */}
                    <button 
                        onClick={() => props.setRidePopupPanel(false)} 
                        className='mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg'>
                        Ignore
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RidePopUp // Export the component for use in other parts of the app
