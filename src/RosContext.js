import React, { createContext, useContext, useState, useEffect } from "react";
import ROSLIB from "roslib";

const RosContext = createContext();

export const RosProvider = ({ children }) => {
  const [ros, setRos] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const rosConnection = new ROSLIB.Ros({
      url: "ws://localhost:9090",
    });

    rosConnection.on("connection", () => {
      console.log("Connected to ROS WebSocket server");
      setIsConnected(true);
      setRos(rosConnection);
    });

    rosConnection.on("error", (error) => {
      console.error("Error connecting to ROS WebSocket server:", error);
      setIsConnected(false);
    });

    rosConnection.on("close", () => {
      console.log("Connection to ROS WebSocket server closed");
      setIsConnected(false);
    });

    return () => {
      rosConnection.close();
    };
  }, []);

  return (
    <RosContext.Provider value={{ ros, isConnected }}>
      {children}
    </RosContext.Provider>
  );
};

export const useRos = () => {
  return useContext(RosContext);
};
