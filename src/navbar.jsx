// Navbar.js

// import React from "react";


// import "./navbar.css"; // Import the CSS file for Navbar styling
// import logo from "./images/deevia_software_logo-removebg-preview.png"; // Import the logo image


// function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="logo-container">
//         <img src={logo} alt="Navbar Logo" className="navbar-logo" />
//         {/* You can adjust the styling of the logo as needed */}
//       </div>
//       {/* Add any other navbar links or components as needed */}
//       <ul className="nav-links">
//         <li>Dashboard</li>
    
//         <li>Settings</li>
//         <li></li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;
import React from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import logo from "./images/deevia_software_logo-removebg-preview.png";

import "./navbar.css"; // Import the CSS file for Navbar styling

function Navbar({ saveData }) {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const goToSettings = () => {
    navigate("/Settings"); // Navigate to the Settings page
  };
  const goToDashboard = () => {
    navigate("/FinalPage"); // Navigate to the Settings page
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
       
      </div>
      <ul className="nav-links">
        <li className="nav-item">
          <button className="savestyle" onClick={saveData}>Save</button>
        </li>
        <li className="nav-item" onClick={goToDashboard}>Dashboard</li>
        <li className="nav-item" onClick={goToSettings}>Settings</li>
        <li></li>
      </ul>
    </nav>
  );
}

export default Navbar;
