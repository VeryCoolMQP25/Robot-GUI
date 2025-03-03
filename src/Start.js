import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./Start.css";
import axios from 'axios';

function Start() {
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState("");
  const [output, setOutput] = useState("");

  const speaker = () => {
    setStatusMessage("Please wait.....");
    axios.get('http://127.0.0.1:5000/api/run-script')
      .then(response => {
        console.log("Response from Flask:", response);
        setStatusMessage(response.data.message);
        setOutput(response.data.output);
      })
      .catch(error => {
        console.error("Error:", error);
        setStatusMessage("Error running the script.");
        setOutput(error.message);
      });
  };

  useEffect(() => {
    if (statusMessage === "Script executed successfully!") {
      navigate(`/Path/room`); // will try again to set up websocket server to get room number 
    }
  }, [statusMessage]);

  // // Set up WebSocket connection  //NOT WORKING - STILL DEBUGGING THIS CONNECTION 
  // useEffect(() => {
  //   // Create WebSocket connection
  //   const socket = new WebSocket('ws://localhost:8765');

  //   // Handle connection open
  //   socket.onopen = function(event) {
  //     console.log('Connected to the WebSocket server');
  //   };

  //   // Handle messages received from server
  //   socket.onmessage = function(event) {
  //     try {
  //       const data = JSON.parse(event.data);
        
  //       // Check if it's a navigation message
  //       if (data.type === "navigation") {
  //         console.log('Received navigation event for room:', data.room);
  //         // Use React Router's navigate function
  //         navigate(`/Path/${data.room}`);
  //       }
  //     } catch (error) {
  //       console.error('Error processing message:', error);
  //     }
  //   };

  //   // Handle errors
  //   socket.onerror = function(error) {
  //     console.error('WebSocket Error:', error);
  //   };

  //   // Handle connection close
  //   socket.onclose = function(event) {
  //     console.log('Disconnected from the WebSocket server');
  //   };

  //   // Clean up the WebSocket connection when the component unmounts
  //   return () => {
  //     socket.close();
  //   };
  // }, [navigate]); // Add navigate to dependency array

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
          {statusMessage && <p className="status-message">{statusMessage}</p>}
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