

import { useState } from "react";
import LocationComponent from "../components/LocationComponent";
import DestinationComponent from "../components/DestinationComponent";
import { busData, Bus } from "../utils/busData";
import { calculateDistance } from "../utils/helpers";

const Home: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [destination, setDestination] = useState<string>("");
  const [buses, setBuses] = useState<Bus[]>([]);

  const handleDestinationChange = () => {
    if (!userLocation) return;

    const busesAtLocation = busData.filter((bus) => {
      return bus.checkpoints.some((checkpoint) => {
        const distance = calculateDistance(userLocation.lat, userLocation.lng, checkpoint.lat, checkpoint.lng);
        return distance < 1; // Within 1km
      });
    });

    setBuses(busesAtLocation);
  };

  return (
    <div>
      <LocationComponent setUserLocation={setUserLocation} />
      <DestinationComponent setDestination={setDestination} />

      <button onClick={handleDestinationChange}>Find Buses</button>

      {buses.length > 0 && (
        <div>
          <h2>Buses passing through your location:</h2>
          <ul>
            {buses.map((bus) => (
              <li key={bus.id}>
                Bus {bus.id} - From {bus.start.name} to {bus.destination.name}
                <ul>
                  {bus.checkpoints.map((checkpoint, index) => (
                    <li key={index}>{checkpoint.name}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
