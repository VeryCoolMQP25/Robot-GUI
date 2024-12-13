import React from "react";
import { useNavigate } from "react-router-dom";
import "./Start.css"; 

function Start() {
  const navigate = useNavigate();

  const handleStartButtonClick = () => {
    navigate("/home");  // Navigate to home when the button is clicked
  };

  return (
    <div className="start-page">
      <div className="content">
        {/* <h1>Welcome to Unity Hall</h1> */}
        <button className="start-button" onClick={handleStartButtonClick}>
          Start
        </button>
      </div>
    </div>
  );
}

export default Start;
