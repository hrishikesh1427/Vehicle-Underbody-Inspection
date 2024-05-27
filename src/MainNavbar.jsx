// Navbar.js

import React from "react";


import "./MainNavbar.css"; // Import the CSS file for Navbar styling
import logo from "./images/deevia_software_logo-removebg-preview.png"; // Import the logo image


function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
       
        {/* You can adjust the styling of the logo as needed */}
      </div>
      {/* Add any other navbar links or components as needed */}
      {/* <ul className="nav-links">
        <li>Dashboard</li>
    
        <li>Settings</li>
        <li></li>
      </ul> */}
    </nav>
  );
}
  
export default Navbar;
