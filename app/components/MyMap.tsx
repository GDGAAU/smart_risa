'use client'; // Mark this as a Client Component

import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS

// Define TypeScript types for the Mapbox map and container
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || '';

const INTITIAL_CENTER: [number, number] = [38.7525, 9.0192]; // Addis Ababa
const INTITIAL_ZOOM = 10;

const MyMap = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current || !process.env.NEXT_PUBLIC_MAPBOX_KEY) {
            console.error('Map container or API key is missing.');
            return;
        }

        // Initialize the map
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: INTITIAL_CENTER,
            zoom: INTITIAL_ZOOM,
            style: 'mapbox://styles/mapbox/streets-v12', // Map style
        });

        // Add navigation controls
        mapRef.current.addControl(new mapboxgl.NavigationControl(), 'bottom-left');

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation: [number, number] = [
                        position.coords.longitude,
                        position.coords.latitude,
                    ];
                    mapRef.current?.setCenter(userLocation);
                    new mapboxgl.Marker().setLngLat(userLocation).addTo(mapRef.current!);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
        // Cleanup on unmount
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, []);

    return <div ref={mapContainerRef} className="map-container" />;
};

export default MyMap;