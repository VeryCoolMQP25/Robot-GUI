import React from "react";
import { useNavigate } from "react-router-dom";
import "./ExploreUnity.css"; 

function ExploreUnity() {
  const navigate = useNavigate();

  return (
    <div className="explore-unity-page">
      {/* Home Button */}
      <button 
        className="home-choice-button" 
        onClick={() => navigate("/")}
      >
        Home
      </button>

      <h1>Explore Unity Hall</h1>
      <p>Select a floor:</p>
      <div className="floor-selection">
        <button className="floor-choice-button" onClick={() => navigate("/floor1")}>Floor 1</button>
        <button className="floor-choice-button" onClick={() => navigate("/floor2")}>Floor 2</button>
        <button className="floor-choice-button" onClick={() => navigate("/floor3")}>Floor 3</button>
        <button className="floor-choice-button" onClick={() => navigate("/floor4")}>Floor 4</button>
        <button className="floor-choice-button" onClick={() => navigate("/floor5")}>Floor 5</button>
      </div>
      {/* Footer container for logo */}
      <div className="footer">
        <img src="/WPI_logo.png" alt="WPI Logo" className="wpi-logo" />
      </div>

    </div>
  );
}

export default ExploreUnity;
