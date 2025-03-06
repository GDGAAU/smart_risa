import fetch from 'node-fetch';

const apiKey = "pk.eyJ1IjoiaGVub2NrdCIsImEiOiJjbTY5OTdwcm4wODVjMmtzZTVlODRyMWFxIn0.Dj3dhnLSVFdns1Od2ziC7g";

// Function to get latitude and longitude from a location name using Mapbox Geocoding API
const getCoordinates = async (locationName) => {
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationName)}.json?access_token=${apiKey}`;
  
  const response = await fetch(geocodeUrl);
  const data = await response.json();
  
  if (data.features && data.features.length > 0) {
    const { center } = data.features[0];
    return { lat: center[1], lng: center[0] }; // Return latitude and longitude
  } else {
    throw new Error('Location not found');
  }
};

// Get coordinates for both locations
const getRoute = async (startLocation, endLocation) => {
  try {
    // Get coordinates for both start and destination locations
    const startCoords = await getCoordinates(startLocation);
    const endCoords = await getCoordinates(endLocation);
    
    const { lat: startLat, lng: startLng } = startCoords;
    const { lat: destLat, lng: destLng } = endCoords;
    
    // Now use these coordinates in the routing API
    const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${startLng},${startLat};${destLng},${destLat}?access_token=${apiKey}`;
    
    const routeResponse = await fetch(routeUrl);
    const routeData = await routeResponse.json();
    
    // Output the route data
    console.log('Route:', routeData.routes[0]);
    console.log('Start Location:', startLocation);
    console.log('Destination Location:', endLocation);
    
  } catch (error) {
    console.error('Error:', error);
  }
};

// Test with real locations in Addis Ababa
getRoute('Markato, Addis Ababa', 'Shiro Meda, Addis Ababa');
