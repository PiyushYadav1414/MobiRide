import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CapatainContext' // Import the Captain data context

// Functional component to display captain details
const CaptainDetails = () => {

    // Getting captain's data from the context so thatr we can show captain details 
    const { captain } = useContext(CaptainDataContext)

    return (
        <div>
            {/* Section displaying captain's name and earnings */}
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    {/* Profile picture of the captain */}
                    <img 
                        className='h-10 w-10 rounded-full object-cover' 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" 
                        alt="Captain Profile" 
                    />
                    {/* Display captain's full name */}
                    <h4 className='text-lg font-medium capitalize'>
                        {captain.fullname.firstname + " " + captain.fullname.lastname}
                    </h4>
                </div>
                {/* Section displaying earnings */}
                <div>
                    <h4 className='text-xl font-semibold'>$195.20</h4>
                    <p className='text-sm text-gray-600'>Earned</p>
                </div>
            </div>

            {/* Statistics section - Hours online, rides completed, etc. */}
            <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
                {/* First stat - Total hours online */}
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>

                {/* Second stat - Placeholder, should be a different metric */}
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
                    <h5 className='text-lg font-medium'>8.7</h5>
                    <p className='text-sm text-gray-600'>Hours Active</p> {/* This label might need an update */}
                </div>

                {/* Third stat - Another metric, possibly total rides completed */}
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
                    <h5 className='text-lg font-medium'>16</h5>
                    <p className='text-sm text-gray-600'>Total trips</p> {/* Consider updating this label */}
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails // Export the component for use in other parts of the app
