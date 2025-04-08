import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Start.css";
import axios from 'axios';


function Start() {
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState("");
  const [output, setOutput] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const audioRef = useRef(null); // Store the audio instance

    useEffect(() => {
      // Only set up polling if we've initiated navigation
        if (statusMessage === "Please wait....." || statusMessage.includes("navigating")) {
            const interval = setInterval(() => {
                checkNavigationStatus();
            }, 2000); // Check every 2 seconds
            
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

    useEffect(() => {
      speaker();
    }, []);
  


  const stopAudioAndNavigate = (path) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      console.log("Audio stopped");
    }
    navigate(path);
  };

  return (
    <div className="start-page">
      <h1>Welcome to Unity Hall!</h1>

      <div className="button-container">
        {/* <div className="option">
          <button className="choice-button" onClick={() => stopAudioAndNavigate("/destination-input")}>
            Take Me To...
          </button>
        </div> */}

        <div className="option">
          <button className="choice-button" onClick={() => stopAudioAndNavigate("/explore-unity")}>
            Explore Unity Hall
          </button>
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