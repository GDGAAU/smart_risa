// pages/index.tsx

import { useState } from "react";
import LocationComponent from "../components/LocationComponent"; // Optional, can be used later
import DestinationComponent from "../components/DestinationComponent"; // Optional, can be used later
import { busData, Bus } from "../utils/busData";

const Home: React.FC = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [destination, setDestination] = useState<string>(''); // State to hold the destination input

  // Function to handle the search action
  const handleDestinationChange = () => {
    if (!destination) {
      console.log("No destination entered");
      return; // If no destination, exit the function
    }

    // Filter buses that have the destination matching the user's input (case-insensitive and partial match)
    const matchingBuses = busData.filter((bus) =>
      bus.destination.name.toLowerCase().includes(destination.toLowerCase())
    );

    console.log("Matching Buses:", matchingBuses);

    // Set the buses that match the destination
    setBuses(matchingBuses);
  };

  return (
    <div>
      <h1>Smart Bus Tucking System</h1>
      
      {/* Location Component */}
      <LocationComponent setUserLocation={() => {}} />

      {/* Destination Component */}
      <DestinationComponent setDestination={(dest: string) => setDestination(dest)} />

      {/* Button to trigger the search */}
      <button onClick={handleDestinationChange}>Find Buses</button>

      {/* Display matching buses */}
      {buses.length > 0 ? (
        <div>
          <h2>Buses passing through your location:</h2>
          <ul>
            {buses.map((bus) => (
              <li key={bus.id}>
                <strong>Bus {bus.id}</strong>: From {bus.start.name} to {bus.destination.name}
                <ul>
                  {bus.checkpoints.map((checkpoint, index) => (
                    <li key={index}>
                      {checkpoint.name} (Lat: {checkpoint.lat}, Lng: {checkpoint.lng})
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No buses found for your destination</p>
      )}
    </div>
  );
};

export default Home;
