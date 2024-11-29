import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROSLIB from "roslib";
import "./App.css";

function Home() {
  const navigate = useNavigate();
  const [ros, setRos] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleNavigation = (room) => {
    // Navigate to corresponding room page
    navigate(`/Path/${room}`);

    // Publish room message to '/room' topic if ROS is connected
    if (ros && isConnected) {
      const roomPublisher = new ROSLIB.Topic({
        ros: ros,
        name: "/room",
        messageType: "std_msgs/String",
      });

      const message = new ROSLIB.Message({
        data: room, // Room name to send to '/room' topic
      });

      try {
        roomPublisher.publish(message);
        console.log(`Published room: ${room} to /room topic`);
      } catch (error) {
        console.error("Failed to publish message:", error);
      }
    } else {
      console.error("ROS connection is not established yet.");
    }
  };

  useEffect(() => {
    // Set up connection to ROS WebSocket 
    const rosConnection = new ROSLIB.Ros({
      url: "ws://localhost:9090", // WebSocket URL of ROS bridge
    });

    // Check if ROS connection is successful
    rosConnection.on("connection", () => {
      console.log("Connected to ROS WebSocket server");
      setIsConnected(true);  
    });

    rosConnection.on("error", (error) => {
      console.error("Error connecting to ROS WebSocket server: Try again loser", error);
      setIsConnected(false); 
    });

    rosConnection.on("close", () => {
      console.log("Connection to ROS WebSocket server closed");
      setIsConnected(false);  
    });

    setRos(rosConnection);

    return () => {
      if (rosConnection) {
        rosConnection.close();
      }
    };
  }, []);
  
// I need to fix ids
  return (
    <div className="app">
      <h1>Welcome to Unity Hall</h1>
      <p>Where would you like to go?</p>

      <div className="floor-map">
        <div onClick={() => handleNavigation("UH100")} className="room" id="UH400">  
          <p>UH100</p>
        </div>
        <div onClick={() => handleNavigation("UH105")} className="room" id="UH405">
          <p>UH105</p>
        </div>
        <div onClick={() => handleNavigation("UH110")} className="room" id="UH500">
          <p>UH110</p>
        </div>
        <div onClick={() => handleNavigation("UH120")} className="room" id="UH520">
          <p>UH120</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
