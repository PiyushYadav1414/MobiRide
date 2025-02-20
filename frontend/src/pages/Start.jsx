// Importing React and Link component from react-router-dom for navigation between pages
import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      {/* This is the main container with a background image that covers the screen */}
      <div className='bg-cover bg-center bg-[url(https://img.freepik.com/free-photo/close-up-friends-holding-smartphone_23-2149137129.jpg?t=st=1740064861~exp=1740068461~hmac=0b6630ec9a7fae0a169eee894fee49605513d6ee3b4e61a8a7aee834ec0536c6&w=1800)] h-screen pt-8 flex justify-between flex-col w-full'>
        
        {/* Logo image with a fixed width */}
        <img className='w-[14rem] ml-8' src="https://www.coolgenerator.com/Data/Textdesign/202502/33a226f7dd99068d38a18cb5c1223a77.png" alt="" />
        
        {/* This container holds the title and the button */}
        <div className='bg-white pb-8 py-4 px-4'>
          {/* The title of the section */}
          <h2 className='text-[30px] font-semibold'>Get Started with MobiRide</h2>
          
  {/* This is a button that links to the '/login' route and will redirect us to UserLogin Component*/}
          <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>
            Continue
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Start
