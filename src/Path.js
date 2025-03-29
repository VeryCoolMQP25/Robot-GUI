import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ROSLIB from "roslib";
import { useRos } from "./RosContext"; // Use the custom hook
import "./Path.css";
import faceImage from "./face.jpg";
import followMeAudio from "./follow.mp3";

function Path() {
  const { room } = useParams();
  const navigate = useNavigate();
  const { ros, isConnected } = useRos(); // Get the ROS connection from context
  const audioRef = useRef(null); // Store the audio instance

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      console.log("Audio stopped");
    }
  };

  const handleExit = () => {
    stopAudio(); // Stop the audio when the button is clicked

    if (ros && isConnected) {
      const roomPublisher = new ROSLIB.Topic({
        ros: ros,
        name: "/room",
        messageType: "std_msgs/String",
      });

      const stopMessage = new ROSLIB.Message({
        data: "stop",
      });

      roomPublisher.publish(stopMessage);
      console.log("Published stop message to /room topic");
    } else {
      console.error("ROS connection not initialized or disconnected.");
    }

    navigate("/");
  };

  return (
    <div className="path-page" style={{ 
      backgroundImage: `url(${faceImage})`, 
      backgroundSize: "cover", 
      backgroundPosition: "center", 
      height: "100vh", 
      width: "100vw" 
    }}>
      <h1 className="left-heading">Follow Me!</h1>
      <button onClick={handleExit} className="exit-button">
        Exit
      </button>
    </div>
  );
}

export default Path;
