import React from 'react'

// How They Work Together
// The Home component has a state (like a switch) to show or hide the VehiclePanel.
// When the user clicks on the map of Home component, the VehiclePanel appears.
// In VehiclePanel, the user clicks on a ride (Car, Bike, or Auto).
// After selecting, it hides the VehiclePanel and moves to the Confirm Ride screen.

const VehiclePanel = (props) => {
    return (
        <div>
            {/* Arrow icon to close the vehicle selection panel */}
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setVehiclePanel(false) // Close the vehicle panel when clicked
            }}>
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            {/* Title for vehicle selection */}
            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>


{/* Below, we have three vehicle options: Car, Auto, and Motorcycle. When a user selects any of these
 vehicles, setConfirmRidePanel(true) is called, setting confirmRidePanel to true. As a result, the 
 Confirm Ride Panel will open, allowing the user to proceed with their ride confirmation. */}

            {/* UberGo vehicle selection option */}
            <div onClick={() => {
                props.setConfirmRidePanel(true) // Open the ride confirmation panel
                props.selectVehicle('car') // Set the selected vehicle type to 'car'
            }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>

                {/* Vehicle image */}
                <img className='h-10' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="UberGo" />
                
                {/* Vehicle details */}
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>MobiGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                </div>

                {/* Display fare for UberGo */}
                <h2 className='text-lg font-semibold'>${props.fare.car}</h2>
            </div>

            {/* Moto vehicle selection option */}
            <div onClick={() => {
                props.setConfirmRidePanel(true) // Open the ride confirmation panel
                props.selectVehicle('moto') // Set the selected vehicle type to 'moto'
            }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>

                {/* Vehicle image */}
                <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="Moto" />

                {/* Vehicle details */}
                <div className='-ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
                    <h5 className='font-medium text-sm'>3 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
                </div>

                {/* Display fare for Moto */}
                <h2 className='text-lg font-semibold'>${props.fare.moto}</h2>
            </div>

            {/* UberAuto vehicle selection option */}
            <div onClick={() => {
                props.setConfirmRidePanel(true) // Open the ride confirmation panel
                props.selectVehicle('auto') // Set the selected vehicle type to 'auto'
            }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>

                {/* Vehicle image */}
                <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="UberAuto" />

                {/* Vehicle details */}
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>MobiAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
                    <h5 className='font-medium text-sm'>3 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable Auto rides</p>
                </div>

                {/* Display fare for UberAuto */}
                <h2 className='text-lg font-semibold'>${props.fare.auto}</h2>
            </div>
        </div>
    )
}

export default VehiclePanel
