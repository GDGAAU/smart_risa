// pages/index.tsx

import { useState } from "react";
import LocationComponent from "../components/LocationComponent"; // You can leave this component for future use
import DestinationComponent from "../components/DestinationComponent"; // You can leave this component for future use
import { busData, Bus } from "../utils/busData";

const Home: React.FC = () => {
  const [buses, setBuses] = useState<Bus[]>([]);

  // Display random buses when the user clicks "Find Buses"
  const handleDestinationChange = () => {
    // Simply use the dummy bus data for now
    setBuses(busData); // Setting all dummy buses to be displayed
  };

  return (
    <div>
      <h1>Smart Bus Tucking System</h1>
      <LocationComponent setUserLocation={() => {}} /> {/* For future use */}
      <DestinationComponent setDestination={() => {}} /> {/* For future use */}

      <button onClick={handleDestinationChange}>Find Buses</button>

      {buses.length > 0 && (
        <div>
          <h2>Buses passing through your location:</h2>
          <ul>
            {buses.map((bus) => (
              <li key={bus.id}>
                <strong>Bus {bus.id}</strong>: From {bus.start.name} to {bus.destination.name}
                <ul>
                  {bus.checkpoints.map((checkpoint, index) => (
                    <li key={index}>{checkpoint.name} (Lat: {checkpoint.lat}, Lng: {checkpoint.lng})</li>
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
