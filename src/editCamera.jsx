import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "./navbar";
import './editCamera.css'
const EditCamera = () => {
  const { index } = useParams(); // Get the camera index from URL params
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [formData, setFormData] = useState({
    cam_name: '',
    cam_username: '',
    cam_password: '',
    cam_ip: '',
    cam_port: ''
  });

  useEffect(() => {
    // Fetch camera details using the index when the component mounts
    fetchCameraDetails(index);
  }, [index]);

  // Function to fetch camera details based on the index
  const fetchCameraDetails = async (index) => {
    try {
      const response = await fetch(`http://192.168.0.144:5000/get_camera?index=${index}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching camera details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://192.168.0.144:5000/edit_cam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        navigate('/Settings');
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error saving camera:', error);
    }
  };

  const handleCancel = () => {
    navigate('/Settings');
  };

  return (
    <div>
        <Navbar/>
    
    <div className="edit-camera-container">
      <h2>Edit Camera</h2>
      <form className="edit-camera-form">
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

export default EditCamera;
