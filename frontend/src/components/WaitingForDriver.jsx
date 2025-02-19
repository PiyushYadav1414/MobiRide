import React from 'react'

// 🚕 Component to display ride details while waiting for the driver
const WaitingForDriver = (props) => {
  return (
    <div>
      {/* 🔽 Close button: Clicking hides the waiting screen */}
      <h5 
        className='p-1 text-center w-[93%] absolute top-0' 
        onClick={() => props.waitingForDriver(false)}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      {/* 🏎️ Driver and vehicle details */}
      <div className='flex items-center justify-between'>
        {/* 🚗 Driver's car image */}
        <img 
          className='h-[5rem]' 
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" 
          alt="Car"
        />

        {/* 👤 Driver details section */}
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'>
            {props.ride?.captain.fullname.firstname} {/* Driver's first name */}
          </h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>
            {props.ride?.captain.vehicle.plate} {/* Vehicle's plate number */}
          </h4>
          <p className='text-sm text-gray-600'>Mazda3 Sport GX</p> {/* Static car model name */}
          <h1 className='text-lg font-semibold'>  
            {props.ride?.otp} {/* OTP for verification */}
          </h1>
        </div>
      </div>

      {/* 📍 Ride details section */}
      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>

          {/* 🔹 Pickup location */}
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-user-fill"></i> {/* Location icon */}
            <div>
              <h3 className='text-lg font-medium'>Pickup</h3> {/* Static Address */}
              <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p> {/* Dynamic Pickup location */}
            </div>
          </div>

          {/* 🔹 Drop-off location */}
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i> {/* Destination icon */}
            <div>
              <h3 className='text-lg font-medium'>Drop off </h3> {/* Static Address */}
              <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p> {/* Dynamic Destination */}
            </div>
          </div>

          {/* 💰 Fare details */}
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line"></i> {/* Currency icon */}
            <div>
              <h3 className='text-lg font-medium'>${props.ride?.fare} </h3> {/* Ride Fare */}
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p> {/* Payment Mode (Static) */}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver
