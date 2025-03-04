import React from "react";
import { useNavigate } from "react-router-dom";
import "./Start.css";

function Start() {
  const navigate = useNavigate();

  return (
    <div className="start-page">
      <h1>Welcome to Unity Hall!</h1>
      {/* <p>Choose your journey:</p> */}

      <div className="button-container">
        <div className="option">
          <button className="choice-button" onClick={() => navigate("/destination-input")}>
            Take Me To...
          </button>
          {/* <p className="caption">(If you know where you're going)</p> */}
        </div>

        <div className="option">
          <button className="choice-button" onClick={() => navigate("/explore-unity")}>
            Explore Unity
          </button>
          {/* <p className="caption">(If you're feeling adventurous)</p> */}
        </div>

        <div className="option">
          <button className="choice-button" onClick={() => navigate("/speaker")}>
            Speaker
          </button>
        </div>

      </div>

1    </div>
  );
}

export default Start;
