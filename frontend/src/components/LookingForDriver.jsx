import React from 'react'

// 🚕 Component to display the UI while searching for a driver
const LookingForDriver = (props) => {
    return (
        <div>
            {/* 🔽 Close button: Clicking hides the search screen */}
            <h5 
                className='p-1 text-center w-[93%] absolute top-0' 
                onClick={() => props.setVehicleFound(false)}
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            {/* 🔍 Searching message */}
            <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>

            {/* 📍 Ride details section */}
            <div className='flex gap-2 justify-between flex-col items-center'>

                {/* 🚗 Car image placeholder */}
                <img 
                    className='h-20' 
                    src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" 
                    alt="Car"
                />

                <div className='w-full mt-5'>

                    {/* 🔹 Pickup location */}
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i> {/* Pickup location icon */}
                        <div>
                            <h3 className='text-lg font-medium'>Pickup Location</h3> {/* Static Address */}
                            <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p> {/* Dynamic Pickup Location */}
                        </div>
                    </div>

                    {/* 🔹 Drop-off location */}
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i> {/* Destination location icon */}
                        <div>
                            <h3 className='text-lg font-medium'>Drop Off Location</h3> {/* Static Address */}
                            <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p> {/* Dynamic Destination */}
                        </div>
                    </div>

                    {/* 💰 Estimated Fare */}
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i> {/* Currency icon */}
                        <div>
                            <h3 className='text-lg font-medium'>${props.fare[props.vehicleType]} </h3> {/* Fare based on vehicle type */}
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p> {/* Payment Mode (Static) */}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LookingForDriver
