import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROSLIB from "roslib";
import "./App.css";

function Home() {
  const navigate = useNavigate();
  const [ros, setRos] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Coordinates for each room
  const roomCoordinates = {
    UH400: { x: 9.23, y: 0.18, z: 0.0, orientationZ: 0.00487, orientationW: 0.99999 },
    UH405: { x: 19.9, y: -1.25, z: 0.0, orientationZ: 0.1, orientationW: 0.99 },
    UH410: { x: 15.0, y: 1.5, z: 0.0, orientationZ: -0.1, orientationW: 0.99 },
    UH420: { x: 18.0, y: 5.0, z: 0.0, orientationZ: 0.2, orientationW: 0.98 },
  };

  const handleNavigation = (room) => {
    // Navigate to corresponding Path page
    navigate(`/Path/${room}`);

    // Publish coordinates to the /goal_pose topic 
    if (ros && isConnected) {
      const goalPublisher = new ROSLIB.Topic({
        ros: ros,
        name: "/goal_pose",
        messageType: "geometry_msgs/PoseStamped",
      });

      const currentTime = new Date();

      // Create goal message using coordinates for the selected room
      const coordinates = roomCoordinates[room];
      const goalMessage = new ROSLIB.Message({
        header: {
          stamp: {
            sec: Math.floor(currentTime.getTime() / 1000),
            nanosec: (currentTime.getTime() % 1000) * 1e6,
          },
          frame_id: "map",
        },
        pose: {
          position: {
            x: coordinates.x,
            y: coordinates.y,
            z: coordinates.z,
          },
          orientation: {
            x: 0.0,
            y: 0.0,
            z: coordinates.orientationZ,
            w: coordinates.orientationW,
          },
        },
      });

      try {
        goalPublisher.publish(goalMessage);
        console.log(`Published goal for room: ${room} to /goal_pose topic`);
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
      console.error("Error connecting to ROS WebSocket server:", error);
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

  return (
    <div className="app">
      <h1>Welcome to Unity Hall</h1>
      <p>Where would you like to go?</p>

      <div className="floor-map">
        <div onClick={() => handleNavigation("UH400")} className="room" id="UH400">
          <p>UH400</p>
        </div>
        <div onClick={() => handleNavigation("UH405")} className="room" id="UH405">
          <p>UH405</p>
        </div>
        <div onClick={() => handleNavigation("UH410")} className="room" id="UH410">
          <p>UH410</p>
        </div>
        <div onClick={() => handleNavigation("UH420")} className="room" id="UH420">
          <p>UH420</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
