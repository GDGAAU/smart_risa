// components/LocationComponent.tsx

import React from 'react';
import { useGeolocated } from 'react-geolocated';

interface LocationProps {
  setUserLocation: React.Dispatch<React.SetStateAction<{ lat: number, lng: number } | null>>;
}

const LocationComponent: React.FC<LocationProps> = ({ setUserLocation }) => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
    userDecisionTimeout: 5000,
  });

  React.useEffect(() => {
    if (coords) {
      setUserLocation({ lat: coords.latitude, lng: coords.longitude });
    }
  }, [coords, setUserLocation]);

  if (!isGeolocationAvailable) return <div>Your browser does not support Geolocation</div>;
  if (!isGeolocationEnabled) return <div>Geolocation is not enabled</div>;

  return coords ? (
    <div>Current Location: {coords.latitude}, {coords.longitude}</div>
  ) : (
    <div>Getting the location...</div>
  );
};

export default LocationComponent;
