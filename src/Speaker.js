// import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import './Start.css';

// function Home() {
//   const [statusMessage, setStatusMessage] = useState("");
//   const [output, setOutput] = useState("");
//   const navigate = useNavigate();
//   const [roomNumber, setRoomNumber] = useState(""); // Added state for room number


//   useEffect(() => {
//     const socket = new WebSocket("ws://localhost:8765"); // Connect to WebSocket server

//     socket.onopen = () => {
//       console.log("WebSocket connection established");
//     };

//     socket.onmessage = (event) => {
//       const receivedRoomNumber = event.data; // Receive the room number
//       console.log("Received room number:", receivedRoomNumber);
//       setRoomNumber(receivedRoomNumber); // Update the room number in state

//       // Optionally, navigate to the new URL based on the room number
//       navigate(`Path/${receivedRoomNumber}`);
//     };

//     socket.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     socket.onclose = () => {
//       console.log("WebSocket connection closed");
//     };

//     // Clean up the WebSocket connection when the component is unmounted
//     return () => {
//       socket.close();
//     };
//   }, [navigate]);

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
//       })
      
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

//       {/* Only display the room number if it has been received */}
//       {roomNumber && (
//         <p>Redirecting to room: {roomNumber}</p>
//       )}


//         <p>{statusMessage}</p>
//         <pre>{output}</pre>  {/* Display output from the Python script */}
//       </div>
//     </div>
//   );
// }

// export default Home;



import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Start.css';

function Home() {
  const [statusMessage, setStatusMessage] = useState("");
  const [output, setOutput] = useState("");
  const navigate = useNavigate();
  const [roomNumber, setRoomNumber] = useState(""); // Added state for room number

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8765"); // Connect to WebSocket server

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const receivedRoomNumber = event.data; // Receive the room number
      console.log("Received room number:", receivedRoomNumber);
      setRoomNumber(receivedRoomNumber); // Update the room number in state

      // Redirect to the path with room number
      navigate(`/room/${receivedRoomNumber}`);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, [navigate]);

  const speaker = () => {
    axios.get('http://127.0.0.1:5000/api/run-script')  // Send GET request to backend
      .then(response => {
        console.log("Response from Flask:", response);
        setStatusMessage(response.data.message);  // Update the status message
        setOutput(response.data.output);  // Output from the Python script
      })
      .catch(error => {
        console.error("Error:", error);
        setStatusMessage("Error running the script.");
        setOutput(error.message);
      });
  };

  return (
    <div className="app">
      <p>Please click on the microphone and clearly say "hey Tori" when you are ready!</p>
      <button onClick={speaker}>
        <img src="https://www.iconpacks.net/icons/1/free-microphone-icon-342-thumb.png" alt="Microphone" />
      </button>

      {/* Only display the room number if it has been received */}
      {roomNumber && (
        <p>Redirecting to room: {roomNumber}</p>
      )}
    </div>
  );
}

export default Home;
