import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'; // Import GSAP for animations
import gsap from 'gsap'; // GSAP for animations
import axios from 'axios'; // Axios for making HTTP requests
import 'remixicon/fonts/remixicon.css' // Importing Remix icons for UI elements
import LocationSearchPanel from '../components/LocationSearchPanel'; // Component for location search
import VehiclePanel from '../components/VehiclePanel'; // Panel to select vehicle
import ConfirmRide from '../components/ConfirmRide'; // Confirmation panel for ride
import LookingForDriver from '../components/LookingForDriver'; // Panel showing driver search status
import WaitingForDriver from '../components/WaitingForDriver'; // Panel to show waiting status
import { SocketContext } from '../context/SocketContext'; // Context for managing socket connections
import { useContext } from 'react'; // Hook for accessing context
import { UserDataContext } from '../context/UserContext'; // Context for user data
import { useNavigate } from 'react-router-dom'; // Hook for navigation between routes
import LiveTracking from '../components/LiveTracking'; // Component to show live tracking of ride

const Home = () => {
    // Declare state variables to manage ride data and UI states
    const [ pickup, setPickup ] = useState('')
    const [ destination, setDestination ] = useState('')
   

    const inputAreaRef = useRef(null); // Ref for the input area
    const vehiclePanelRef = useRef(null) // Ref for vehicle panel
    const confirmRidePanelRef = useRef(null) // Ref for confirmation panel
    const vehicleFoundRef = useRef(null) // Ref for vehicle found panel
    const waitingForDriverRef = useRef(null) // Ref for waiting for driver panel
    const panelRef = useRef(null) // Ref for location search panel
    const panelCloseRef = useRef(null) // Ref for panel close button


    const [ panelOpen, setPanelOpen ] = useState(false)
    const [inputAreaFullHeight, setInputAreaFullHeight] = useState(false); // State for expanding input area
    const [ vehiclePanel, setVehiclePanel ] = useState(false)
    const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)
    const [ vehicleFound, setVehicleFound ] = useState(false)
    const [ waitingForDriver, setWaitingForDriver ] = useState(false)


    const [ pickupSuggestions, setPickupSuggestions ] = useState([]) // List of pickup suggestions
    const [ destinationSuggestions, setDestinationSuggestions ] = useState([]) // List of destination suggestions
    const [ activeField, setActiveField ] = useState(null) // Which input field is active
    const [ fare, setFare ] = useState({}) // Fare data for the ride
    const [ vehicleType, setVehicleType ] = useState(null) // Selected vehicle type
    const [ ride, setRide ] = useState(null) // Ride details


    const navigate = useNavigate() // Hook to navigate to other routes

    const { socket } = useContext(SocketContext) // Socket connection context
    const { user } = useContext(UserDataContext) // User context to get current user data



// Join the user to the socket when the component mounts. In below we are calling event name 'join from 
// socket.js file in backend and we are sending userType and userID from userContext so that we can 
// assign each connected user a particular socketID so that we can send message to particular user like about ride detail or more.
    useEffect(() => {
        socket.emit("join", { userType: "user", userId: user._id })
    }, [ user ]) // Runs when the user data changes

// We need to  Notify the user that his ride has been confirmed so we will do it by sending event name
// 'ride-confirmed' to user from ride.controller.js with updated ride variable which will have capataidID,
//  ride status to be  accepted and a OTP to share with captain. 
    socket.on('ride-confirmed', ride => {
        // Update UI state when a ride is confirmed
        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
    })

// Here we are listening the event from ride.controller.jsx which is notifying our user the OTP entered
//  by captain has been verified and ride status has been updated to ongoing and ride has been started .
// And we will navigate the user to Riding.jsx page
    socket.on('ride-started', ride => {
        // Update UI state when the ride has started
        setWaitingForDriver(false)
    // Navigate to the Ride.jsx page and we are passing ride data to it 
        navigate('/riding', { state: { ride } }) // Navigate to riding screen with ride data
    })


    // Handle changes in the pickup input field
    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Pass token for authorization
                }
            })
           
            setPickupSuggestions(response.data) // Set pickup suggestions
        } catch {
            console.error('Error fetching pickup suggestions:', error); // Log the error for debugging
        }
    }

    // Handle changes in the destination input field
    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Pass token for authorization
                }
            })
            setDestinationSuggestions(response.data) // Set destination suggestions
        } catch {
            console.error('Error fetching destination suggestions:', error); // Log the error for debugging
        }
    }

    const submitHandler = (e) => {
        e.preventDefault() // Prevent form submission
    }

    // Handle panel animation using GSAP
    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, { height: '70%', padding: 24 }) // Open panel
            gsap.to(panelCloseRef.current, { opacity: 1 }) // Show close icon
        } else {
            gsap.to(panelRef.current, { height: '0%', padding: 0 }) // Close panel
            gsap.to(panelCloseRef.current, { opacity: 0 }) // Hide close icon
        }
    }, [ panelOpen ])

    // Handle vehicle panel animation
    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, { transform: 'translateY(0)' }) // Show vehicle panel
        } else {
            gsap.to(vehiclePanelRef.current, { transform: 'translateY(100%)' }) // Hide vehicle panel
        }
    }, [ vehiclePanel ])

    // Handle confirm ride panel animation
    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, { transform: 'translateY(0)' }) // Show confirm ride panel
        } else {
            gsap.to(confirmRidePanelRef.current, { transform: 'translateY(100%)' }) // Hide confirm ride panel
        }
    }, [ confirmRidePanel ])

    // Handle vehicle found panel animation
    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, { transform: 'translateY(0)' }) // Show vehicle found panel
        } else {
            gsap.to(vehicleFoundRef.current, { transform: 'translateY(100%)' }) // Hide vehicle found panel
        }
    }, [ vehicleFound ])

    // Handle waiting for driver panel animation
    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, { transform: 'translateY(0)' }) // Show waiting for driver panel
        } else {
            gsap.to(waitingForDriverRef.current, { transform: 'translateY(100%)' }) // Hide waiting for driver panel
        }
    }, [ waitingForDriver ])

    useGSAP(() => {
        gsap.to(inputAreaRef.current, {
            height: inputAreaFullHeight ? '100%' : '30%',
            duration: 0.3,
            ease: "power2.out"
        });
    }, [inputAreaFullHeight]);




    // Function to find the trip and calculate fare
    async function findTrip() {
// we have setVehiclePanel(true) so that vehicle panel can open which gives choice to user to choose veichle to ride       
        setVehiclePanel(true) // Show vehicle panel
        setPanelOpen(false) // Close the search panel
        setInputAreaFullHeight(false); // Shrink input area when "Find Trip" is clicked

// We need to show fare to user based on different vehicle type like differenet fare for [car,auto,motorcycle]        
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Pass token for authorization
            }
        })
// We have set the fare below which is an object like {auto: 100, car: 150, moto: 60} and we will show 
// fare to user depending on vehicle type and we will pass fare which is an object as prop to 
// <VehiclePanel> Component   
        setFare(response.data) // Set the calculated fare
    }



    // Function to create a new ride
    async function createRide() {
        try {
            console.log(pickup, destination, vehicleType)
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/create`,
                { pickup, destination, vehicleType },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Pass token for authorization
                    }
                }
            );
            // Handle successful ride creation response
            console.log("Ride created successfully:", response.data);
            // return response.data; // Return response if needed
        } catch (error) {
            // Handle errors
            console.error("Error creating ride:", error.response ? error.response.data : error.message);
            // // Optional: Show an alert or return a custom error message
            // return { success: false, message: error.response?.data?.message || "Failed to create ride" };
        }
    }
    

    return (
        <div className='h-screen relative overflow-hidden'>
            {/* <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" /> */}
            <div className='h-[70%] w-screen'>
                {/* Temporary live tracking display */}
                <LiveTracking pickup={pickup} destination={destination}/>
            </div>



{/* Input Area. Jese hi input field like pickup or destination pe user click krega vse hi setInputAreaFullHeight(true);
and iske corresonding wala gsap function hmare div ki height ko 30% se 100% krdega by targeting inputAreaRef*/}
                <div ref={inputAreaRef} className='absolute bottom-0 left-0 w-full h-[30%] p-6 bg-white transition-height duration-300 ease-out'>

{/* Panel for searching a trip. setPanelOpen: Controls whether a panel (like a dropdown or side menu) is visible or hidden. */}
{/* Below is the arrow icon we are importing. When we click on the arrow, it will set setPanelOpen to 
false. This action will hide the panel by triggering the gsap animation, which will set the panel's 
height back to 0%. Essentially, clicking the arrow collapses the panel and hides it from view.The 
ref={panelCloseRef} is attached to the arrow icon, which helps us target and control its visibility
 using gsap. When the panel is open, the arrow is initially hidden (opacity 0), and when we click it
 to close the panel, the opacity is set to 1, making the arrow visible.  */}
                    <h5 ref={panelCloseRef} onClick={() => {
                        setPanelOpen(false)
                        setInputAreaFullHeight(false); 
                    }} className='absolute opacity-0 right-6 top-6 text-2xl'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-2xl font-semibold'>Find a trip</h4>


{/* When we click on the input fields of the form (specifically the "pickup" and "destination" fields), the following happens: */}
{/* setPanelOpen with useState:
    1).We have a state variable setPanelOpen that is controlled using the useState hook.
    When either the pickup or destination input field is clicked, setPanelOpen is set to true. This 
    indicates that the panel (the dropdown or the div element) should be shown.

    2).panelRef:The panelRef is a reference to the div element that contains the panel.
    When setPanelOpen is set to true, the panel becomes visible, and this triggers the GSAP animation.
    
    3).GSAP Animation:GSAP (GreenSock Animation Platform) is used to handle the animation of the panel.
    If the pickup or destination input field is clicked and setPanelOpen is true, GSAP will animate the height of the div (panelRef) and set its height to 70%. This creates a smooth transition where the panel expands.
    If neither input field is clicked:
    If neither the "pickup" nor "destination" input fields are clicked (i.e., setPanelOpen remains false), GSAP will animate the panel to collapse and set the height of the div with panelRef to 0. This hides the panel. */}

            {/* Using form we're collecting a "pickup" location and a "destination" for a ride. */}
                    <form className='relative py-3' onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        {/* Input for pickup and destination */}
                        <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('pickup')
                                setInputAreaFullHeight(true); // Expand input area
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination')
                                setInputAreaFullHeight(true); // Expand input area
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                            type="text"
                            placeholder='Enter your destination' />
                    </form>
                    <button
                        onClick={findTrip}
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button>

                     {/* Below is the panel to show SUGGESSTIONS for Pickup Location and Destination */}
                <div ref={panelRef} className='bg-white h-auto'>
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        // setPanelOpen={setPanelOpen}
                        // setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>

            </div>


       


           
            {/* Conditional rendering of different panels */}
{/* The vehiclePanel state determines whether the VehiclePanel component is visible or hidden. When a user
 selects a location from the LocationSearchPanel, the function handleSuggestionClick sets vehiclePanel
  to true, triggering the useGSAP animation. This animation moves the panel into view by setting its 
  transform property to translateY(0). If the user clicks the arrow icon to close the panel, 
  setVehiclePanel(false) is called, causing useGSAP to run again and move the panel out of view with 
  translateY(100%). This mechanism ensures that the VehiclePanel appears when needed and disappears 
  when closed, providing a smooth user experience.*/}

            <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
{/* We got the fare from findTrip function and  fare is an object like {auto: 100, car: 150, moto: 60} 
which will help us to show different fare depending on different vehicle type to user. */}
{/* Below we are sending setVehicleType as prop so that we can know which vehicle type has been selected
 by user to ride so that further in <ConfirmRide/> Component we can send vehicleType as prop and can call 
 createRide function when user click on Confirm ride button */}
                <VehiclePanel pickup={pickup}
                        destination={destination}
                    selectVehicle={setVehicleType}
                    fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
            </div>
{/* Below we are sending createRide function,vehicleType as prop so that we can can call createRide function 
when user click on Confirm ride button which will create ride for user in backend which requires pickup, 
destination, fare which will be calculated depending on vehcile type selected by user and userID which we 
will get when we pass through authUser middleware in backend using req.user_id */}
            <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <ConfirmRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}

                    setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
            </div>
            <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <LookingForDriver
                    // createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound} />
            </div>
            <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12'>
{/* Below component will show drivers full detail with vehicle informataion to user incluing OTP to share
 with captain  */}
                <WaitingForDriver
                    ride={ride}
                    // setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver} />
            </div>
        </div>
    )
}

export default Home
