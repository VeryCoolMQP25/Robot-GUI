import ROSLIB from "roslib";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Start.css";

function Floor4() {
  const navigate = useNavigate();
  const [ros, setRos] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const roomCoordinates = {
    UH400: { x: 36.8, y: 2.27, z: 0.0, orientationZ: 0.00487, orientationW: 0.99999 },
    UH405: { x: 26.1, y: 1.73, z: 0.0, orientationZ: 0.1, orientationW: 0.99 },
    UH420: { x: 11.8, y: 1.49, z: 0.0, orientationZ: -0.1, orientationW: 0.99 },
    Elevator: { x: 18.9, y: 0.243, z: 0.0, orientationZ: 0.2, orientationW: 0.98 },
    Restrooms: { x: 17.1, y: 9.18, z: 0.0, orientationZ: 0.00487, orientationW: 0.99999 },
    Study_Area: { x: 48.7, y: -0.122, z: 0.0, orientationZ: 0.1, orientationW: 0.99 },
    Tech_Suites: { x: 26.9, y: -2.47, z: 0.0, orientationZ: -0.1, orientationW: 0.99 },
    Stairs: { x: 49.7, y: 3.58, z: 0.0, orientationZ: 0.2, orientationW: 0.98 },
  };

  const handleNavigation = (room) => {
    navigate(`/Path/${room}`);
  };

  useEffect(() => {
    const rosConnection = new ROSLIB.Ros({
      url: "ws://localhost:9090",
    });

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
      <h1>Floor 4</h1>
      <button className="home-button" onClick={() => navigate("/")}>Home</button>
      <div className="section classrooms-row">
        <p className="section-title">Classrooms</p>
        <div className="floor-map">
          <div onClick={() => handleNavigation("UH400")} className="room">UH400</div>
          <div onClick={() => handleNavigation("UH405")} className="room">UH405</div>
          <div onClick={() => handleNavigation("UH420")} className="room">UH420</div>
        </div>
      </div>
      <div className="section study-areas-row">
        <p className="section-title">Study Areas</p>
        <div className="floor-map">
          <div onClick={() => handleNavigation("Tech_Suites")} className="room">Tech Suites</div>
          <div onClick={() => handleNavigation("Study_Area")} className="room">Study Lounge</div>
        </div>
      </div>
      <div className="section another-floor-row">
        <p className="section-title">Another Floor</p>
        <div className="floor-map">
          <div onClick={() => handleNavigation("Stairs")} className="room">Stairs</div>
          <div onClick={() => handleNavigation("Elevator")} className="room">Elevator</div>
        </div>
      </div>
      <div className="section restrooms-row">
        <p className="section-title">Restrooms</p>
        <div className="floor-map">
          <div onClick={() => handleNavigation("Restrooms")} className="room restrooms-room">Restrooms</div>
        </div>
      </div>
    </div>
  );
}

export default Floor4;
