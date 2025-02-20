import React from 'react'

// LocationSearchPanel component accepts props such as suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, and activeField.
const LocationSearchPanel = ({ suggestions,pickup,destination, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

    // Function to handle click on a suggestion
    const handleSuggestionClick = (suggestion) => {
        // Based on the active field (either pickup or destination), update the corresponding state (pickup or destination)
        if (activeField === 'pickup') {
            setPickup(suggestion) // Set the pickup location
            // console.log("Pickup: "+ pickup);
        } else if (activeField === 'destination') {
            setDestination(suggestion) // Set the destination location
            // console.log("Pickup: "+ destination);
        }
// The following lines are commented out but are intended to trigger actions like they open vehicle panel 
// directly if i setup pickup field and doesnot allow me to setup destination field then as it dretcly 
// opens the vehicle panela nd closes panelOpen after a suggestion is selected: We just have a button in 
// Home.jsx which runs the method onClick={findTrip} when clicked and sets setVehiclePanel(true) and 
// setPanelOpen(false)
        // setVehiclePanel(true) // Show the vehicle selection panel
        // setPanelOpen(false) // Close the search panel
    }

    return (
        <div>
            {/* Iterate over the suggestions array and display each suggestion */}
            {
                suggestions.map((elem, idx) => (
                    // Each suggestion is wrapped in a div with click handler to select the suggestion
                    <div key={idx}  onMouseDown={() => handleSuggestionClick(elem)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                        {/* Icon representing the suggestion */}
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
                            <i className="ri-map-pin-fill"></i> {/* Map pin icon */}
                        </h2>
                        {/* Display the suggestion text */}
                        <h4 className='font-medium'>{elem}</h4>
                        
                    </div>
                ))
            }
        </div>
    )
}

export default LocationSearchPanel
