import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRos } from "./RosContext"; 
import ROSLIB from "roslib";
import "./App.css";
import {ReactComponent as Home} from './house-solid.svg';
import {ReactComponent as Back} from './arrow-left-solid.svg';
import {ReactComponent as StairsIcon} from './stairs-solid.svg';
import {ReactComponent as ElevatorIcon} from './elevator-solid.svg';
import {ReactComponent as RestroomIcon} from './restroom-solid.svg';

function Floor5() {
  const navigate = useNavigate();
  const { ros, isConnected } = useRos(); // Get the ROS connection from context
  const [roomCoordinates, setRoomCoordinates] = useState({});
  const [floor5Rooms, setFloor5Rooms] = useState([]);

  useEffect(() => {
    console.log("Fetching room coordinates...");
    fetch("/Unity_coords.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Room coordinates loaded:", data);
        setRoomCoordinates(data);

        if (data.floor_5) {
          const allRooms = Object.keys(data.floor_5); // Get all room names for Floor 5
          setFloor5Rooms(allRooms); // Store all rooms for Floor 5
        } else {
          console.error("Floor 5 data missing in JSON");
        }
      })
      .catch((error) => {
        console.error("Error loading coordinates:", error);
        setRoomCoordinates({});
      });
  }, []);

  const handleNavigation = (room) => {
    navigate(`/Path/${room}`);

    if (ros && isConnected && roomCoordinates.floor_5[room]) {
      
      // Publisher for current floor
      const floorPublisher = new ROSLIB.Topic({
        ros: ros,
        name: "/requested_floor",
        messageType: "std_msgs/Int32",
      });

      const floorMessage = new ROSLIB.Message({ data: 5 });
      floorPublisher.publish(floorMessage);
      console.log("Published requested floor:", floorMessage);
      
      const goalPublisher = new ROSLIB.Topic({
        ros: ros,
        name: "/filtered_goal_pose",
        messageType: "geometry_msgs/PoseStamped",
      });

      const currentTime = new Date();
      const coordinates = roomCoordinates.floor_5[room]; // Using floor_5 coordinates

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
            z: coordinates.z || 0.0,
          },
          orientation: {
            x: 0.0,
            y: 0.0,
            z: coordinates.orientationZ,
            w: coordinates.orientationW,
          },
        },
      });

      goalPublisher.publish(goalMessage);
      console.log("Published goal pose:", goalMessage);
    } else {
      console.error("ROS is not connected or coordinates are missing for", room);
    }
  };

  return (
    <div className="app">
      <h1 className="floor-title">Floor 5</h1>

      {Object.keys(roomCoordinates).length > 0 ? (
        <>
          <div className="section classrooms-row">
            <p className="section-title"></p>
            <div className="floor-map">
              {floor5Rooms
                .filter((room) => room.startsWith("UH")) // Selects only rooms that start with "UH"
                .map((room) => (
                  <div key={room} onClick={() => handleNavigation(room)} className="room">
                    {room}
                  </div>
                ))}
            </div>
          </div>

          <div className="section study-areas-row">
            <p className="section-title"></p>
            <div className="floor-map">
              {["Study_Lounge"].map((room) => (
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

          <div className="section career-development-row">
            <p className="section-title"></p>
            <div className="floor-map">
              <div
                onClick={() => handleNavigation("Career_Development_Center")}
                className="room career-room"
              >
                Career Development Center
              </div>
            </div>
          </div>

          {/* <div className="section another-floor-row">
            <p className="section-title"></p>
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
 */}
          {/* <div className="section restrooms-row">
            <p className="section-title"></p>
            <div className="floor-map">
              <div
                onClick={() => handleNavigation("Restrooms")}
                className="room restrooms-room"
              >
                Restrooms
              </div>
            </div>
          </div> */}
        </>
      ) : (
        <p>Loading room coordinates...</p>
      )}

      {/* <button className="home-button" onClick={() => navigate("/")}><Home className='logo' /> </button> */}
      <button className="back-button" onClick={() => navigate("/explore-unity")}><Back className='logo'/></button>
      <button className="stairs-button" onClick={() => handleNavigation("Stairs")}><StairsIcon className='logo'/></button>
      <button className="elevator-button" onClick={() => handleNavigation("Elevator")}><ElevatorIcon className='logo'/></button>
      <button className="restrooms-button" onClick={() => handleNavigation("Restrooms")}><RestroomIcon className='logo'/></button>

      {/* <button className="restroom-button" onClick={() => navigate("/explore-unity")}><Back className='logo'/></button> */}

    </div>
  );
}

export default Floor5;
