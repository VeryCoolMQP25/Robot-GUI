import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Start.css"; 

function DestinationInput() {
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (destination.trim()) {
      navigate(`/Path/${destination}`); 
    }
  };

  return (
    <div className="dialog-box">
      <h2>Enter Your Destination</h2>
      <input 
        type="text" 
        placeholder="Room name (e.g., UH400)" 
        value={destination} 
        onChange={(e) => setDestination(e.target.value)}
      />
      <button onClick={handleSubmit} className="submit-button">Submit</button>
    </div>
  );
}

export default DestinationInput;
