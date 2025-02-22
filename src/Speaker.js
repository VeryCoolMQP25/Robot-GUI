import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Start.css';

function Home() {
  const [statusMessage, setStatusMessage] = useState("");
  const [output, setOutput] = useState("");
  const navigate = useNavigate();

  const speaker = () => {
    setStatusMessage("Please wait.....");
    axios.get('http://127.0.0.1:5000/api/run-script')  // Send GET request to backend
      .then(response => {
        console.log("Response from Flask:", response);
        setStatusMessage(response.data.message);  // Update the status message
        setOutput(response.data.output);  // Output from the Python script
      })
      .catch(error => {
        console.error("Error:", error);
        setStatusMessage("Error running the script.");
        setOutput(error.message);
      })
      
  };

  return (
    <div className="explore-unity-page">
      <button 
        className="home-choice-button" 
        onClick={() => navigate("/")}
      >
        Home
      </button>

      <div className="app">
        <p>Please click on the microphone when you are ready & speak clearly!</p>
        <button onClick={speaker}>
          <img src="https://www.iconpacks.net/icons/1/free-microphone-icon-342-thumb.png" alt="Microphone" />
        </button>
        <p>{statusMessage}</p>
        <pre>{output}</pre>  {/* Display output from the Python script */}
      </div>
    </div>
  );
}

export default Home;