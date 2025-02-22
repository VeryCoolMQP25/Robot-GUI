import ROSLIB from "roslib";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";

function Floor3() {
  const navigate = useNavigate();
  const [ros, setRos] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [roomCoordinates, setRoomCoordinates] = useState({});
  const [floor3Rooms, setFloor3Rooms] = useState([]);

  useEffect(() => {
    console.log("Fetching room coordinates...");
    fetch("/Unity_coords.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Room coordinates loaded:", data);
        setRoomCoordinates(data);
  
        if (data.floor_3) {
          const allRooms = Object.keys(data.floor_3); // Get all room names
          setFloor3Rooms(allRooms); // Store all rooms
        } else {
          console.error("Floor 3 data missing in JSON");
        }
      })
      .catch((error) => {
        console.error("Error loading coordinates:", error);
        setRoomCoordinates({});
      });
  }, []);
      
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
      <h1 className="floor-title">Floor 3</h1>

      {Object.keys(roomCoordinates).length > 0 ? (
        <>
          <div className="section classrooms-row">
            <p className="section-title">Classrooms</p>
            <div className="floor-map">
              {floor3Rooms
                .filter((room) => room.startsWith("UH")) // Selects only rooms that start with "UH"
                .map((room) => (
                  <div key={room} onClick={() => handleNavigation(room)} className="room">
                    {room}
                  </div>
                ))}
            </div>
          </div>

          <div className="section study-areas-row">
            <p className="section-title">Study Areas</p>
            <div className="floor-map">
              {["Tech_Suites", "Study_Area"].map((room) => (
                <div
                  key={room}
                  onClick={() => handleNavigation(room)}
                  className="room"
                >
                  {room.replace("_", " ")}
                </div>
              ))}
            </div>
          </div>

          <div className="section another-floor-row">
            <p className="section-title">Another Floor</p>
            <div className="floor-map">
              {["Stairs", "Elevator"].map((room) => (
                <div
                  key={room}
                  onClick={() => handleNavigation(room)}
                  className="room"
                >
                  {room}
                </div>
              ))}
            </div>
          </div>

          <div className="section restrooms-row">
            <p className="section-title">Restrooms</p>
            <div className="floor-map">
              <div
                onClick={() => handleNavigation("Restrooms")}
                className="room restrooms-room"
              >
                Restrooms
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading room coordinates...</p>
      )}
      <button className="home-button" onClick={() => navigate("/")}>Home</button>
    </div>
  );
}

export default Floor3;
