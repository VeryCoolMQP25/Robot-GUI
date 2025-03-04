import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Start.css";
import toriGreeting from "./tori-greeting.mp3"; 

function Start() {
  const navigate = useNavigate();
  const audioRef = useRef(null); // Store the audio instance

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
          <button className="choice-button" onClick={() => stopAudioAndNavigate("/speaker")}>
            Speaker
          </button>
        </div>
      </div>
    </div>
  );
}

export default Start;
