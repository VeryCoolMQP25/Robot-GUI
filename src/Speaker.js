// import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import './Start.css';

// function Home() {
//   const [statusMessage, setStatusMessage] = useState("");
//   const [output, setOutput] = useState("");
//   const navigate = useNavigate();
//   const [roomNumber, setRoomNumber] = useState(""); 
//   const [floorNumber, setFloorNumber] = useState(""); 
//   const [messageCount, setMessageCount] = useState(0);

//   useEffect(() => {
//     const socket = new WebSocket("ws://localhost:8765"); 

//     socket.onopen = () => {
//       console.log("WebSocket connection established");
//     };

//     socket.onmessage = (event) => {
//       console.log("Message received from WebSocket server:", event.data);
//       try {
//         const receivedData = JSON.parse(event.data); // Try parsing the data as JSON
        
//         const { room_number, floor_number } = receivedData;
//         console.log("Received room number:", room_number);
//         console.log("Received floor number:", floor_number);
    
//         setRoomNumber(room_number); // Update the room number in state
//         setFloorNumber(floor_number); // Update the floor number in state
//       } catch (error) {
//         // If it's not a JSON, it's likely just a room number as a string
//         const receivedRoomNumber = event.data;
//         console.log("Received room number:", receivedRoomNumber);
//         setRoomNumber(receivedRoomNumber);
//         navigate(`/Path/${receivedRoomNumber}`); // Navigate to the new room path
//       }
      // setMessageCount(prevCount => prevCount + 1); // Increment the message count

      // if (messageCount === 0) {
      //   const receivedData = JSON.parse(event.data); // Assuming the server sends a JSON string with room_number and floor_number
      //   const { room_number, floor_number } = receivedData;

      //   console.log("First message received")
      //   console.log("Received room number:", room_number);
      //   console.log("Received floor number:", floor_number);

      //   setRoomNumber(room_number); // Update the room number in state
      //   setFloorNumber(floor_number); // Update the floor number in state
      // }
      // else{
      //   const receivedRoomNumber = event.data; // Receive the room number
      //   console.log("Received room number:", receivedRoomNumber);
      //   console.log("Subsequent message received, heading to:", receivedRoomNumber);
      //   setRoomNumber(receivedRoomNumber);
      //   navigate(`/Path/${receivedRoomNumber}`); // Not working!!
      // }


    // };

  //   socket.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //   };

  //   socket.onclose = () => {
  //     console.log("WebSocket connection closed");
  //   };

  //   return () => {
  //     socket.close();
  //   };
  // }, [navigate]);

//   const speaker = () => {
//     setStatusMessage("Please wait.....");
//     axios.get('http://127.0.0.1:5000/api/run-script')  // Send GET request to backend
//       .then(response => {
//         console.log("Response from Flask:", response);
//         setStatusMessage(response.data.message);  // Update the status message
//         setOutput(response.data.output);  // Output from the Python script
//       })
//       .catch(error => {
//         console.error("Error:", error);
//         setStatusMessage("Error running the script.");
//         setOutput(error.message);
//       });
//   };

//   return (
//     <div className="explore-unity-page">
//       <button 
//         className="home-choice-button" 
//         onClick={() => navigate("/")}
//       >
//         Home
//       </button>
//       <div className="app">
//         <p>Please click on the microphone and clearly say "hey Tori" when you are ready!</p>
//         <button onClick={speaker}>
//           <img src="https://www.iconpacks.net/icons/1/free-microphone-icon-342-thumb.png" alt="Microphone" />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Home;
