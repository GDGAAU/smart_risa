const getCoordinates = async (locationName) => {
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationName)}.json?access_token=${apiKey}`;
    console.log(`Requesting coordinates for: ${locationName}`);
  
    const response = await fetch(geocodeUrl);
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      const { center } = data.features[0];
      console.log(`${locationName} coordinates:`, center);
      return { lat: center[1], lng: center[0] };
    } else {
      throw new Error('Location not found');
    }
  };
  