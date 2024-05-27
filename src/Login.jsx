// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import "./Login.css";
// import Navbar from "./navbar";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   // Access the navigate function
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         // Authentication successful, navigate to /start
//         navigate('/start');
//       } else {
//         // Authentication failed, handle the error
//         setError("Invalid email or password");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       setError("An unexpected error occurred. Check the console for details.");
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="heading-container">
//         <h1 className="heading">UNDERBODY INSPECTION</h1>
//       </div>
//       <div className="container">
//         <div className="form-container">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-1">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-1">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <button className="Loginbtn" type="submit">
//                 Login
//               </button>
//             </div>
//           </form>
//           {error && <p className="error-message">{error}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from "react";
import "./Login.css";
import MainNavbar from "./MainNavbar";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Fetching data...');
  
      const response = await axios.post('http://192.168.0.144:5000/login', { "username": username, "password": password });
  
      if (response) {
        console.log('Login successful');
        // Set user login status in localStorage
        localStorage.setItem('isLoggedIn', true);
        navigate('/FinalPage');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <MainNavbar />
      <div className="login-heading-container">
        <h1 className="login-heading">UNDERBODY INSPECTION</h1>
      </div>
      <div className="login-container">
        <div className="login-form-container">
          <form onSubmit={handleLogin}>
            <div className="login-mb-1">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login-mb-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="login-Loginbtn">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;



