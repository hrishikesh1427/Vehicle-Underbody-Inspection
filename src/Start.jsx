import React from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "./navbar";
import "./Start.css";

function Start() {
  const navigate = useNavigate();

  const handleStartButtonClick = () => {
    // Navigate to the FinalPage route without fetching data
    navigate('/FinalPage');
  };

  return (
    <div>
      <Navbar />
      <div className="start-boxy">
        {/* Add a white box and text inside */}
        <div className="start-white-box">
          <p>CLICK ON START TO BEGIN THE INSPECTION</p>
        
        {/* Modify the button to trigger navigation to the FinalPage */}
        <button className="start-button" onClick={handleStartButtonClick}>
          Start
        </button>
        
        </div>
      </div>
    </div>
  );
}

export default Start;
