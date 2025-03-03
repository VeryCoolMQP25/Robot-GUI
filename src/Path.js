import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ROSLIB from "roslib";
import "./Path.css";
import faceImage from "./face.jpg";

function Path() {
  const { room } = useParams(); // Get room number from URL
  const navigate = useNavigate();
  const [ros, setRos] = useState(null);

  useEffect(() => {
    // Set up connection to ROS WebSocket server
    const rosConnection = new ROSLIB.Ros({
      url: "ws://localhost:9090", // WebSocket URL of ROS bridge thing
    });

    // Check if ROS connection is successful
    rosConnection.on("connection", () => {
      console.log("Connected to ROS WebSocket server (in Path js) ");
    });

    rosConnection.on("error", (error) => {
      console.error("Error connecting to ROS WebSocket server:", error);
    });

    rosConnection.on("close", () => {
      console.log("Connection to ROS WebSocket server closed");
    });

    setRos(rosConnection); // Set ROS connection

    return () => {
      if (rosConnection) {
        rosConnection.close();
      }
    };
  }, []);

  const handleExit = () => {
    // Check if ros is initialized
    if (ros) {
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
      console.error("ROS connection not initialized.");
    }

    navigate("/"); // Navigate back to home page
  };

  const pathStyle = {
    backgroundImage: `url(${faceImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw"
  };
  
  
  return (
    <div className="path-page" style ={pathStyle}>
      <h1 className="left-heading">Follow Me!</h1>
      <button onClick={handleExit} className="exit-button">
        Exit
      </button>
    </div>
  );
}

export default Path;
