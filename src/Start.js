// import React from "react";
import { useNavigate } from "react-router-dom";
import "./Start.css";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Start() {
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState("");
  const [output, setOutput] = useState("");

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
      });
  };

  return (
    <div className="start-page">
      <h1>Welcome to Unity Hall!</h1>
      <p>Choose your journey:</p>

      <div className="button-container">
        <div className="option">
          <button className="choice-button" onClick={() => navigate("/destination-input")}>
            Take Me To...
          </button>
          <p className="caption">(If you know where you're going)</p>
        </div>

        <div className="option">
          <button className="choice-button" onClick={() => navigate("/explore-unity")}>
            Explore Unity
          </button>
          <p className="caption">(If you're feeling adventurous)</p>
        </div>

        <div className="option">
          <button className="choice-button" onClick={speaker}>
            Speaker
          </button>
        </div>

      </div>

      {/* Footer container for logo */}
      <div className="footer">
        <img src="/WPI_logo.png" alt="WPI Logo" className="wpi-logo" />
      </div>
    </div>
  );
}

export default Start;
