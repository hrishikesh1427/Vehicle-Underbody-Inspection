import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './addCamera.css'; // Import CSS file for styling
import Navbar from "./navbar";
const AddCamera = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cam_name: '',
    cam_username: '',
    cam_password: '',
    cam_ip: '',
    cam_port: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://192.168.0.144:5000/add_cam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        // Redirect to camera settings page after successful addition
        navigate('/Settings');
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error adding camera:', error);
    }
  };

  const handleCancel = () => {
    // Redirect back to camera settings page without saving
    navigate('/Settings');
  };

  return (
    <div>
        <Navbar/>
    
    <div className="add-camera-container">
      <h2>Add Camera</h2>
      <form className="add-camera-form">
        <div>
          <label>Camera Name:</label>
          <input type="text" name="cam_name" value={formData.cam_name} onChange={handleChange} />
        </div>
        <div>
          <label>Username:</label>
          <input type="text" name="cam_username" value={formData.cam_username} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="cam_password" value={formData.cam_password} onChange={handleChange} />
        </div>
        <div>
          <label>IP Address:</label>
          <input type="text" name="cam_ip" value={formData.cam_ip} onChange={handleChange} />
        </div>
        <div>
          <label>Port Number:</label>
          <input type="text" name="cam_port" value={formData.cam_port} onChange={handleChange} />
        </div>
      </form>
      <div className="button-container">
  <button className="save-button" onClick={handleSave}>Save</button>
  <button className="cancel-button" onClick={handleCancel}>Cancel</button>
</div>

    </div>
    </div>
  );
};

export default AddCamera;
