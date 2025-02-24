// Importing React and Link component from react-router-dom for navigation between pages
import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      {/* This is the main container with a background image that covers the screen */}
      <div className='bg-cover bg-center h-screen pt-8 flex justify-between flex-col w-full' style={{ backgroundImage: "url('start.jpg')" }}>

        {/* Logo image with a fixed width */}

        <img className='w-[14rem] ml-8' src="https://www.coolgenerator.com/Data/Textdesign/202502/e77b995101aba1789c0e2540362ab26b.png" alt="" />

        <img className='w-[14rem] ml-5' src="https://www.coolgenerator.com/Data/Textdesign/202502/e77b995101aba1789c0e2540362ab26b.png" alt="" />

        
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
