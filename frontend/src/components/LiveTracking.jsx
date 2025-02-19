import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const LiveTracking = ({ pickup, destination }) => {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [directions, setDirections] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const googleMapRef = useRef(null);
    const [libraries] = useState(['places']);
    const [originLatLng, setOriginLatLng] = useState(null);
    const [destinationLatLng, setDestinationLatLng] = useState(null);

    const mapOptions = useCallback(() => ({
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: true,
        fullscreenControl: false,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_RIGHT,
            mapTypeIds: [
                google.maps.MapTypeId.ROADMAP,
                google.maps.MapTypeId.SATELLITE,
            ],
        },
    }), []);

    const fetchDirections = useCallback(() => {
        if (!pickup || !destination || !isLoaded || !google) return;

        const directionsService = new google.maps.DirectionsService();

        directionsService.route(
            {
                origin: pickup,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    }, [pickup, destination, isLoaded]);

    const extractLatLng = useCallback((address) => {
        return new Promise((resolve, reject) => {
            if (!isLoaded || !google) {
                reject('Google Maps not loaded');
                return;
            }
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address }, (results, status) => {
                if (status === 'OK') {
                    const location = results[0].geometry.location;
                    resolve({
                        lat: location.lat(),
                        lng: location.lng()
                    });
                } else {
                    console.error('Geocode was not successful for the following reason:', status);
                    reject(status);
                }
            });
        });
    }, [isLoaded]);

    useEffect(() => {
        if (isLoaded && google) {
            if (pickup) {
                extractLatLng(pickup)
                    .then(latLng => setOriginLatLng(latLng))
                    .catch(error => console.error("Error extracting origin latlng", error));
            }
            if (destination) {
                extractLatLng(destination)
                    .then(latLng => setDestinationLatLng(latLng))
                    .catch(error => console.error("Error extracting destination latlng", error));
            }
        }
    }, [pickup, destination, extractLatLng, isLoaded]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Error getting user location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    useEffect(() => {
        if (googleMapRef.current && currentPosition) {
            googleMapRef.current.panTo(currentPosition);
        }
    }, [currentPosition]);

    useEffect(() => {
        if (isLoaded && google) {
            fetchDirections();
        }
    }, [fetchDirections, isLoaded]);

    return (
        <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            libraries={libraries}
            onLoad={() => setIsLoaded(true)}
        >
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentPosition || { lat: 0, lng: 0 }}
                    zoom={15}
                    options={mapOptions}
                    onLoad={(map) => {
                        googleMapRef.current = map;
                    }}
                >
                    {(() => {
                        const markerStyle = {
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 10,
                            fillColor: "#4285F4",
                            fillOpacity: 1,
                            strokeWeight: 2,
                            strokeColor: "white",
                        };

                        return (
                            <>
                                {directions && (
                                    <DirectionsRenderer
                                        directions={directions}
                                        options={{
                                            polylineOptions: {
                                                strokeColor: "#0b4ff4",
                                                strokeOpacity: 1,
                                                strokeWeight: 5,
                                            },
                                            suppressMarkers: true,
                                        }}
                                    />
                                )}
                                {currentPosition && <Marker position={currentPosition} />}
                                {originLatLng && <Marker position={originLatLng} icon={markerStyle} />}
                                {destinationLatLng && <Marker position={destinationLatLng} icon={markerStyle} />}
                            </>
                        );
                    })()}
                </GoogleMap>
            )}
        </LoadScript>
    );
};

export default LiveTracking;
