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

  useEffect(() => {
    // Create the audio object and play it
    const audio = new Audio(followMeAudio);
    audioRef.current = audio;
    
    audio.play().catch((error) => console.error("Autoplay blocked:", error));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      console.log("Audio stopped");
    }
  };

  useEffect(() => {
    if (ros && isConnected) {
  
      // Subscriber for close to goal pose
      const goal_subscriber = new ROSLIB.Topic({
        ros: ros,
        name: "/check_goal_proximity",
        messageType: "std_msgs/Int32",
      });

    // console.log("Listenting for messages on " + goal_subscriber.name);
    const handleArrived = (message) => {
      console.log('Received message on ' + goal_subscriber.name + ': ' + message.data); 
      if(message.data == 1){
        navigate(`/Arrived`);
      }
    };

    goal_subscriber.subscribe(handleArrived)

    return () => {goal_subscriber.unsubscribe()};
  }}, 
      [ros, isConnected, navigate]
    );
 

  const handleExit = () => {
    stopAudio(); // Stop the audio when the button is clicked
    navigate("/");
  };

    // const checkArrived = () => {
      
    //   if (ros && isConnected) {
  
    //     // Subscriber for close to goal pose
    //     const goal_subscriber = new ROSLIB.Topic({
    //       ros: ros,
    //       name: "/check_goal_proximity",
    //       messageType: "std_msgs/Int32",
    //     });
  
    //     goal_subscriber.subscribe(handleArrived(message));
    //     console.log('Received message on ' + goal_subscriber.name + ': ' + message.data);
    //           } else {
    //     console.error("ROS is not connected");
    //   }
    // };

    // const handleArrived = () => {
    //   if(message.data == 1){
    //     navigate(`/Arrived`);
    //   }
    // };
  

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
