

import { useState } from "react";

interface DestinationComponentProps {
  setDestination: React.Dispatch<React.SetStateAction<string>>;
}

const DestinationComponent: React.FC<DestinationComponentProps> = ({ setDestination }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDestination(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your destination"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default DestinationComponent;
