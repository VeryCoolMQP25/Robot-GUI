import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./Start.css";
import axios from 'axios';

function Start() {
    const navigate = useNavigate();
    const [statusMessage, setStatusMessage] = useState("");
    const [output, setOutput] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [floorNumber, setFloorNumber] = useState("");

    useEffect(() => {
      // Only set up polling if we've initiated navigation
        if (statusMessage === "Please wait....." || statusMessage.includes("navigating")) {
            const interval = setInterval(() => {
                checkNavigationStatus();
            }, 5000); // Check every 5 seconds
            
            return () => clearInterval(interval);
        }
    }, [statusMessage]);


    const checkNavigationStatus = () => {
        axios.get('http://127.0.0.1:5000/api/navigation-status')
            .then(response => {
                console.log("Navigation status:", response.data);
                
                if (response.data.status === "active") { // room has been requested once, heading to nav stack 
                    setOutput(`Navigating to ${response.data.room} on floor ${response.data.floor}`);  
                    setRoomNumber(response.data.room);
                    setFloorNumber(response.data.floor);
                    navigate(`/Path/${response.data.room}`)
                }
            })
            .catch(error => {
                console.error("Error checking navigation status:", error);
            });
    };

    const speaker = () => {
        setStatusMessage("Please wait.....");
        axios.get('http://127.0.0.1:5000/api/run-script')
            .then(response => {
                console.log("Response from Flask:", response);
                setStatusMessage(response.data.message);
                
                if (response.data.room) {
                    setRoomNumber(response.data.room);
                    setFloorNumber(response.data.floor);
                } else {
                    setOutput(response.data.output || "Script executed successfully");
                }
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
                    <p className="caption">(Press the button & say "Hey Tori" when you are ready)</p>
                    {statusMessage && <p className="status-message">{statusMessage}</p>}
                    {output}
                </div>
            </div>
            
            {/* Display room information if available */}
            {roomNumber && (
                <div className="navigation-info">
                    <p>{output}</p>
                </div>
            )}
          {/* Footer container for logo */}
          <div className="footer">
            <img src="/WPI_logo.png" alt="WPI Logo" className="wpi-logo" />
          </div>
        </div>
    );
}

export default Start;