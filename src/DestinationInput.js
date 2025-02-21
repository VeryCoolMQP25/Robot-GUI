import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ROSLIB from "roslib";
import "./DestinationInput.css"; 

function DestinationInput() {
  const [destination, setDestination] = useState("");
  const [validRooms, setValidRooms] = useState(new Set());
  const [ros, setRos] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/Unity_coords.json")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const rooms = new Set();
          Object.keys(data).forEach((floor) => {
            Object.keys(data[floor]).forEach((room) => {
              rooms.add(room);
            });
          });
          setValidRooms(rooms);
        }
      })
      .catch((error) => console.error("Error loading room names:", error));

    const rosConnection = new ROSLIB.Ros({ url: "ws://localhost:9090" });

    rosConnection.on("connection", () => console.log("Connected to ROS"));
    rosConnection.on("error", (error) => console.error("ROS connection error:", error));
    rosConnection.on("close", () => console.log("ROS connection closed"));

    setRos(rosConnection);

    return () => rosConnection.close();
  }, []);

  const handleSubmit = () => {
    const formattedDestination = destination.trim();

    if (!formattedDestination) {
      alert("Please enter a destination.");
      return;
    }

    if (!validRooms.has(formattedDestination)) {
      alert("Invalid destination. Please enter a valid room name.");
      return;
    }

    if (ros) {
      const topic = new ROSLIB.Topic({
        ros,
        name: "/destination",
        messageType: "std_msgs/String",
      });

      const message = new ROSLIB.Message({ data: formattedDestination });
      topic.publish(message);
      console.log("Sent to ROS:", formattedDestination);
    } else {
      console.error("ROS connection not available");
    }

    navigate(`/Path/${formattedDestination}`);
  };

  return (
    <div className="destination-container">
      <div className="dialog-box">
        <h2>Enter Your Destination</h2>
        <input 
          type="text" 
          className="destination-input"
          placeholder="Room name (e.g., UH400)" 
          value={destination} 
          onChange={(e) => setDestination(e.target.value)}
        />
        <button onClick={handleSubmit} className="submit-button">Submit</button>
        <button onClick={() => navigate("/")} className="home-button">Home</button>
      </div>
    </div>
  );
}

export default DestinationInput;
