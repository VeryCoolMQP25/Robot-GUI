import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Start.css";
import toriGreeting from "./tori-greeting.mp3"; 
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
  
  useEffect(() => {
    const audio = new Audio(toriGreeting);
    audioRef.current = audio;
    
    audio.play().catch(error => console.error("Autoplay blocked:", error));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
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
        <div className="option">
          <button className="choice-button" onClick={() => stopAudioAndNavigate("/destination-input")}>
            Take Me To...
          </button>
        </div>

        <div className="option">
          <button className="choice-button" onClick={() => stopAudioAndNavigate("/explore-unity")}>
            Explore Unity
          </button>
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