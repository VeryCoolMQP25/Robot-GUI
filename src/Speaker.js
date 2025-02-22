import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Start.css';

function Home() {
  const [statusMessage, setStatusMessage] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const speaker = () => {
    if (isLoading) return;  // Prevent multiple calls if already loading

    setIsLoading(true);  // Set loading state to true
    axios.get('http://127.0.0.1:5000/api/run-script')  // Send GET request to backend
      .then(response => {
        // Log the response to confirm it's being received
        console.log("Response from Flask:", response);
        
        setStatusMessage(response.data.message);  // Update the status message
        setOutput(response.data.output);  // Output from the Python script
      })
      .catch(error => {
        console.error("Error:", error);
        setStatusMessage("Error running the script.");
        setOutput(error.message);
      })
      .finally(() => {
        setIsLoading(false);  // Reset loading state after request finishes
      });
  };

  return (
    <div className="app">
      <button onClick={speaker} disabled={isLoading}>
        {isLoading ? "Loading..." : "Speaker"}
      </button>
      <p>{statusMessage}</p>
      <pre>{output}</pre>  {/* Display output from the Python script */}
    </div>
  );
}

export default Home;
