import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CapatainContext';
import axios from 'axios';
import Loader from '../components/Loader'; // Importing the Loader component

const CaptainHome = () => {
    // State to manage the visibility of ride and confirmation popups
    const [ridePopupPanel, setRidePopupPanel] = useState(false);
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

    // References to the ride and confirmation popup panels for animations
    const ridePopupPanelRef = useRef(null);
    const confirmRidePopupPanelRef = useRef(null);

    // State to store the current ride details
    const [ride, setRide] = useState(null);

    // Accessing socket connection and captain data from context
    const { socket } = useContext(SocketContext);
    const { captain } = useContext(CaptainDataContext);

    const [isLoading, setIsLoading] = useState(false); // Loader state

// Effect to handle socket events and location updates.Join the user to the socket when the component 
// mounts. In below we are calling event name 'join from socket.js file in backend and we are sending 
// userType (captain) and captainID from captainContext so that we can assign each connected user a 
// particular socketID so that we can send message to particular captain like about ride detail or more.
    useEffect(() => {
        // Join the socket room for the captain
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain',
        });

// Function to update the captain's location after every 10 sec time so that we can live track the driver 
// location as he drives. We are calling update-location-captain event from socket.js (backend). In simpler
// words we are getting the ive location of captain(uber driver) assigned to us
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude,
                        },
                    });
                });
            }
        };

        // Update location every 10 seconds
        const locationInterval = setInterval(updateLocation, 5000);
        updateLocation(); // Initial call

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(locationInterval);
    }, []);


// Captain is Listening for a new ride requests from the server ride.controller.js. After getting ride
//  request we will show ride pop panel showing if captain wants to ride to accept or reject the ride like in uber .
    socket.on('new-ride', (data) => {
        setRide(data);
        setRidePopupPanel(true);
    });

// Function to confirm a ride it will make post request in ride.controller.js and will call confirmRide
// method which will further update status of ride from pending to accepted and will assign the captain
// to the ride who have accpeted the ride using findOneAndUpdate and also with the help of 
// socket we will emit event name ride-confirmed and will notify user that his ride is accpeted by any 
// captain and will give open panel for user which has driver detail along with OTP to share
    async function confirmRide() {
        setIsLoading(true); // Start loading
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
                {
                    rideId: ride._id,
                    captainId: captain._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            // Close ride popup and open confirmation popup
            setRidePopupPanel(false);
            setConfirmRidePopupPanel(true);
        } catch (error) {
            console.error("Error confirming ride:", error);
        } finally {
            setIsLoading(false); // Stop loading
        }
    }


 // Animation for ride popup panel using GSAP
    useGSAP(
        function () {
            if (ridePopupPanel) {
                gsap.to(ridePopupPanelRef.current, {
                    transform: 'translateY(0)',
                });
            } else {
                gsap.to(ridePopupPanelRef.current, {
                    transform: 'translateY(100%)',
                });
            }
        },
        [ridePopupPanel]
    );

    // Animation for confirmation popup panel using GSAP
    useGSAP(
        function () {
            if (confirmRidePopupPanel) {
                gsap.to(confirmRidePopupPanelRef.current, {
                    transform: 'translateY(0)',
                });
            } else {
                gsap.to(confirmRidePopupPanelRef.current, {
                    transform: 'translateY(100%)',
                });
            }
        },
        [confirmRidePopupPanel]
    );

    return (
        <div className="h-screen">
            {isLoading && <Loader />} {/* Show loader when isLoading is true */}
            {/* Header with Uber logo and logout button */}
            <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
                <img
                    className="w-[7rem]"
                    src="https://www.coolgenerator.com/Data/Textdesign/202502/a366f73903697d91f7a6f7d5aa845c33.png"
                    alt="Uber Logo"
                />
                <Link
                    to="/captain-home"
                    className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
                >
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            {/* Map Section (Placeholder Image) */}
            <div className="h-3/5">
                <img
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt="Map Animation"
                />
            </div>

            {/* Captain Details Section */}
            <div className="h-2/5 p-6">
                <CaptainDetails />
            </div>

            {/* Ride Request Popup */}
            <div
                ref={ridePopupPanelRef}
                className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
            >
{/* Below pannel will open when captain receives a ride request then this pannel will show user detail 
and ride information like pickup,destination,distance,time,fare and a accept or decline ride button.
We are sending confirmRide function which will be called when driver confirms teh ride offer and it will 
send post request to /rides/confirm route in ride.controller.js and will call confirmRide method which
 will further update status of ride from pending to accepted and will assign the captain
to the ride who have accpeted the ride using findOneAndUpdate
            */}
                <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>

            {/* Ride Confirmation Popup */}
            <div
                ref={confirmRidePopupPanelRef}
                className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
            >
{/* Sending ride so that we can show  details of captain(driver).
// Making an HTTP request to /rides/start-ride in ride.controller.jsx to start the ride with the provided 
// OTP and ride ID and here we will verify that the OTP provided by user to captain(driver) is correct 
// and if otp entered by captain in input field here matches with user's OTP then we will start ride and will update the status
// of ride to ongoing. It will further notify the user using sockets by emitting event name 
// 'ride-started' that his ride has been started and we will listen this event from Home.jsx   */}
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    setRidePopupPanel={setRidePopupPanel}
                />
            </div>
        </div>
    );
};

export default CaptainHome;
