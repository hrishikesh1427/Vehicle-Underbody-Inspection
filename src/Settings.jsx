// import React, { useState, useEffect } from 'react';
// import './Settings.css'; // Import CSS file for styling
// import { useNavigate } from 'react-router-dom';
// import Navbar from "./navbar";

// const CameraComponent = () => {
//     const navigate = useNavigate();
//     const [cameraImages, setCameraImages] = useState([]);

//     // Function to fetch camera frames from the backend
//     const fetchDataAndDetect = async () => {
//         try {
//             const cameraFrameResponse = await fetch('http://192.168.68.118:5000/get_frames');
//             const cameraFrameData = await cameraFrameResponse.json();
//             setCameraImages(decodeAllImages(cameraFrameData));
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     // Function to decode all images received from the backend
//     const decodeAllImages = (encodedImages) => {
//         const decodedImagesArray = Object.keys(encodedImages).map((key) => {
//             const encodedImage = encodedImages[key];
//             try {
//                 const decoded = 'data:image/jpg;base64,' + encodedImage;
//                 return decoded;
//             } catch (error) {
//                 console.error(`Error decoding ${key}:`, error);
//                 return null;
//             }
//         });
//         return decodedImagesArray;
//     };

//     useEffect(() => {
//         // Fetch camera frames when the component mounts
//         fetchDataAndDetect();
//     }, []);

//     // Function to handle adding a new camera
//     const handleAddCamera = () => {
//         // Navigate to the Add Camera page
//         navigate('/addCamera');
//     };

//     // Function to handle editing a camera
//     const handleEditCamera = (index) => {
//         // Implement logic to edit the camera at the given index
//         console.log('Edit camera clicked for camera index:', index);
//     };

//     return (
//         <div>
//             <Navbar/>
        
//         <div className="camera-container">
//             <h2>Cameras</h2>
//             <div className="camera-grid">
//                 {/* Display camera images */}
//                 {cameraImages.map((image, index) => (
//                     <div key={index} className="camera-item">
//                         <img src={image} alt={`Cam ${index + 1} Image`} />
//                         {/* Add button to edit camera */}
//                         <button onClick={() => handleEditCamera(index)}>Edit</button>
//                     </div>
//                 ))}
//             </div>
//             {/* Button to add a new camera */}
//             <button onClick={handleAddCamera}>Add Camera</button>
//         </div>
//         </div>
//     );
// };

// export default CameraComponent;

// import React, { useState, useEffect } from 'react';
// import './Settings.css'; // Import CSS file for styling
// import { useNavigate } from 'react-router-dom';
// import Navbar from "./navbar";

// const CameraComponent = () => {
//     const navigate = useNavigate();
//     const [cameraImages, setCameraImages] = useState([]);

//     // Function to fetch camera frames from the backend
    // const fetchDataAndDetect = async () => {
    //     try {
    //         const cameraFrameResponse = await fetch('http://192.168.68.118:5000/get_frames');
    //         const cameraFrameData = await cameraFrameResponse.json();
    //         setCameraImages(decodeAllImages(cameraFrameData));
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

//     // Function to decode all images received from the backend
//     const decodeAllImages = (encodedImages) => {
//         const decodedImagesArray = Object.keys(encodedImages).map((key) => {
//             const encodedImage = encodedImages[key];
//             try {
//                 const decoded = 'data:image/jpg;base64,' + encodedImage;
//                 return decoded;
//             } catch (error) {
//                 console.error(`Error decoding ${key}:`, error);
//                 return null;
//             }
//         });
//         return decodedImagesArray;
//     };

//     useEffect(() => {
//         // Fetch camera frames when the component mounts
//         fetchDataAndDetect();
//     }, []);

//     // Function to handle adding a new camera
//     const handleAddCamera = () => {
//         // Navigate to the Add Camera page
//         navigate('/addCamera');
//     };

//     // Function to handle editing a camera
//     const handleEditCamera = (index) => {
//         // Implement logic to edit the camera at the given index
//         console.log('Edit camera clicked for camera index:', index);
//     };

//     return (
//         <div>
//             <Navbar/>
        
//         <div className="camera-container">
//             <h2>Cameras</h2>
//             <div className="camera-grid">
//                 {/* Display camera images */}
//                 {cameraImages.map((image, index) => (
//                     <div key={index} className="camera-item">
//                         <img src={image} alt={`Cam ${index + 1} Image`} />
//                         {/* Add button to edit camera */}
//                         <button onClick={() => handleEditCamera(index)}>Edit</button>
//                     </div>
//                 ))}
//             </div>
//             {/* Button to add a new camera */}
//             <button onClick={handleAddCamera}>Add Camera</button>
//         </div>
//         </div>
//     );
// };
// export default CameraComponent;


// import React, { useState, useEffect } from 'react';
// import './Settings.css'; 
// import { useNavigate } from 'react-router-dom';
// // import { navigate } from '@reach/router'; 
// import Navbar from "./navbar";

// import axios from 'axios';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';

// const CameraComponent = () => {
//     const navigate = useNavigate(); 
//     const [cameraFrameData, setCameraFrameData] = useState({});
//     const [cameraImages, setCameraImages] = useState([]);
//     const [cameraNames, setCameraNames] = useState([]);

//     const fetchDataAndDetect = async () => {
//         try {
//             const cameraFrameResponse = await fetch('http://192.168.0.144:5000/get_frames');
//             const cameraFrameData = await cameraFrameResponse.json();
//             console.log('Fetched camera frame data:', cameraFrameData);
            
//             // Extract camera names from the response data
//             const cameraNames = Object.keys(cameraFrameData);
//             console.log('Camera names:', cameraNames);
            
//             // Set the camera images and names in the state
//             setCameraFrameData(cameraFrameData);
//             setCameraImages(decodeAllImages(cameraFrameData));
            
//             setCameraNames(cameraNames);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     const decodeAllImages = (encodedImages) => {
//         const decodedImagesArray = Object.keys(encodedImages).map((key) => {
//             const encodedImage = encodedImages[key];
//             try {
//                 const decoded = { 
//                     name: key, 
//                     image: 'data:image/jpg;base64,' + encodedImage 
//                 };
//                 return decoded;
//             } catch (error) {
//                 console.error(`Error decoding ${key}:`, error);
//                 return null;
//             }
//         });
//         return decodedImagesArray;
//     };

//     useEffect(() => {
//         fetchDataAndDetect();
//     }, []);

//     const handleAddCamera = () => {
//         navigate('/addCamera');
//     };

//     const handleEditCamera = (name) => {
//         console.log('Edit camera clicked for camera name:', name);
//         navigate('/editCamera');
//     };

//     const whiteBox = "white-box";
//     const cameraGrid = "camera-grid";
//     const cameraItem = "camera-item";
//     const addCameraButton = "add-camera-button";

//     const handleDeleteCamera = async (name) => {
//         try {
//             // Make an HTTP POST request to delete the camera
//             const response = await fetch('http://192.168.0.144:5000/delete_cam', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ cam_name: name })
//             });
//             const data = await response.json();
//             console.log('Delete camera response:', data);
//             // If the camera is successfully deleted, remove it from the UI
//             if (response.ok) {
//                 // Filter out the deleted camera from the cameraImages array
//                 const updatedCameraImages = cameraImages.filter(camera => camera.name !== name);
//                 setCameraImages(updatedCameraImages);
//                 // Update the camera names based on the updated camera images
//                 const updatedCameraNames = updatedCameraImages.map(camera => camera.name);
//                 setCameraNames(updatedCameraNames);
//             } else {
//                 console.error('Error deleting camera:', data.error);
//             }
//         } catch (error) {
//             console.error('Error deleting camera:', error);
//         }
//     };

//     return (
//         <div>
//           <Navbar/>
//           <div className="settings-container">
//             <h2>Camera Feed</h2>
//             <div className={cameraGrid}>
//               {(cameraImages.length > 0 ? cameraImages : Array.from(Array(9).keys())).map((camera, index) => (
//                 <div key={index} className={cameraItem}>
//                     <div>{camera.name}</div>
//                   {cameraImages.length > 0 ? (
//                     <>
//                       <img src={camera.image} alt={`${camera.name} Image`} />
//                       <button onClick={() => handleEditCamera(camera.name)} className="edit-button">
//                           <EditIcon fontSize="small" className="icon" />
//                       </button>
//                       <button onClick={() => handleDeleteCamera(camera.name)} className="delete-button">
//                           <DeleteIcon fontSize="small" className="icon" />
//                       </button>
//                     </>
//                   ) : (
//                     <div className={whiteBox}></div>
//                   )}
//                 </div>
//               ))}
//             </div>
//             <button onClick={handleAddCamera} className={addCameraButton}>Add Camera</button>
//           </div>
//         </div>
//     );
// };

// export default CameraComponent;






import React, { useState, useEffect } from 'react';
import './Settings.css'; 
import { useNavigate } from 'react-router-dom';
import Navbar from "./navbar";
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CameraComponent = () => {
    const navigate = useNavigate(); 
    const [cameraFrameData, setCameraFrameData] = useState({});
    const [cameraImages, setCameraImages] = useState([]);
    const [cameraNames, setCameraNames] = useState([]);

    const fetchDataAndDetect = async () => {
        try {
            const cameraFrameResponse = await fetch('http://192.168.0.144:5000/get_frames');
            const cameraFrameData = await cameraFrameResponse.json();
            console.log('Fetched camera frame data:', cameraFrameData);
            
            const cameraNames = Object.keys(cameraFrameData);
            console.log('Camera names:', cameraNames);
            
            setCameraFrameData(cameraFrameData);
            setCameraImages(decodeAllImages(cameraFrameData));
            setCameraNames(cameraNames);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const decodeAllImages = (encodedImages) => {
        return Object.keys(encodedImages).map((key) => {
            const encodedImage = encodedImages[key];
            try {
                return { 
                    name: key, 
                    image: 'data:image/jpg;base64,' + encodedImage 
                };
            } catch (error) {
                console.error(`Error decoding ${key}:`, error);
                return null;
            }
        });
    };

    useEffect(() => {
        fetchDataAndDetect();
    }, []);

    const handleAddCamera = () => {
        navigate('/addCamera');
    };

    const handleEditCamera = (name) => {
        console.log('Edit camera clicked for camera name:', name);
        navigate('/editCamera');
    };

    const handleDeleteCamera = async (name) => {
        try {
            const response = await fetch('http://192.168.0.144:5000/delete_cam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cam_name: name })
            });
            const data = await response.json();
            console.log('Delete camera response:', data);

            if (response.ok) {
                const updatedCameraImages = cameraImages.filter(camera => camera.name !== name);
                setCameraImages(updatedCameraImages);
                setCameraNames(updatedCameraImages.map(camera => camera.name));
            } else {
                console.error('Error deleting camera:', data.error);
            }
        } catch (error) {
            console.error('Error deleting camera:', error);
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="settings-container">
                <h2>CAMERA FEED</h2>
                <div className="camera-grid">
                    {(cameraImages.length > 0 ? cameraImages : Array.from(Array(9).keys())).map((camera, index) => (
                        <div key={index} className="camera-item">
                            {cameraImages.length > 0 ? (
                                <>
                                    <img src={camera.image} alt={`${camera.name} Image`} />
                                    <div>{camera.name}</div>
                                    <button onClick={() => handleEditCamera(camera.name)} className="edit-button">
                                        <EditIcon fontSize="small" className="icon" />
                                    </button>
                                    <button onClick={() => handleDeleteCamera(camera.name)} className="delete-button">
                                        <DeleteIcon fontSize="small" className="icon" />
                                    </button>
                                </>
                            ) : (
                                <div className="white-box"></div>
                            )}
                        </div>
                    ))}
                </div>
                <button onClick={handleAddCamera} className="add-camera-button">Add Camera</button>
            </div>
        </div>
    );
};

export default CameraComponent;
