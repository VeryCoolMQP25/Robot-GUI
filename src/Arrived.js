import "./Arrived.css"; 
import { useNavigate } from "react-router-dom";
import ROSLIB from "roslib";
import { useRos } from "./RosContext"; 
import React, { useEffect, useRef } from "react";
import faceImage from "./face.jpg";
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'


function Arrived() {
  const { ros, isConnected } = useRos(); // Get the ROS connection from context
  const audioRef = useRef(null); // Store the audio instance
  const navigate = useNavigate();

//   useEffect(() => {
//     // Create the audio object and play it
//     const audio = new Audio(followMeAudio);
//     audioRef.current = audio;
    
//     audio.play().catch((error) => console.error("Autoplay blocked:", error));

//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current.currentTime = 0;
//       }
//     };
//   }, []);

//   const stopAudio = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//       console.log("Audio stopped");
//     }
//   };

 

  const handleExit = () => {
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
  
      const { width, height } = useWindowSize()
      return (
      <div className="path-page" style={{ 
        backgroundImage: `url(${faceImage})`, 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        height: "100vh", 
        width: "100vw" 
      }}>
        <h1 className="left-heading">We have arrived!</h1>
        <button onClick={handleExit} className="exit-button">
          Exit
        </button>
        <Confetti
        width={width}
        height={height}
      />
      </div>
    );
}

// import React from 'react'
// import { useWindowSize } from 'react-use'
// import Confetti from 'react-confetti'

// export default () => {
//   const { width, height } = useWindowSize()
//   return (
//     <Confetti
//       width={width}
//       height={height}
//     />
//   )
// }
export default Arrived;
