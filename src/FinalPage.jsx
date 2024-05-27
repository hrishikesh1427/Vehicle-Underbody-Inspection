

// import React, { useState, useEffect, useRef } from "react";
// import "./FinalPage.css";
// import Navbar from "./navbar";
// import DOMPurify from "dompurify";
// import { WebSocketSubject } from "rxjs/webSocket";

// const FinalPage = () => {
//   const [checklistItems, setChecklistItems] = useState([]);
//   const [cameraImages, setCameraImages] = useState([]);
//   const [showChecklist, setShowChecklist] = useState(true);
//   const [processedData, setProcessedData] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [failedItems, setFailedItems] = useState([]); // State for failed items
//   const socketRef = useRef();

//   useEffect(() => {
//     const socket = new WebSocket("ws://localhost:5000/echo");

//     socket.addEventListener("open", () => {
//       console.log("WebSocket connection opened");
//     });

//     socket.addEventListener("message", async (event) => {
//       const message = JSON.parse(event.data);
//       console.log("Message received:", message);

//       // Check for a condition in the message (e.g., value is true)
//       if (String(message)) {
//         console.log("Condition met, calling getFailedItems");
//         try {
//           await getFailedItems(); // Call getFailedItems asynchronously
//         } catch (error) {
//           console.error("Error calling getFailedItems:", error);
//         }
//       }
//     });
//     return () => {
//       console.log("Closing WebSocket connection");
//       socket.close();
//     };
//   }, []);

//   const fetchDataAndDetect = async () => {
//     try {
//       setIsLoading(true);
//       const [checklistResponse, cameraResponse] = await Promise.all([
//         fetch("http://localhost:5000/fetch_data").then((response) =>
//           response.json()
//         ),
//         fetch("http://localhost:5000/get_frames").then((response) =>
//           response.json()
//         ),
//       ]);

//       setChecklistItems(simulateAIDetection(checklistResponse));
//       setCameraImages(decodeAllImages(cameraResponse));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setIsLoading(false);
//     }
//   };

//   const decodeAllImages = (encodedImages) => {
//     const decodedImagesArray = Object.keys(encodedImages).map((key) => {
//       const encodedImage = encodedImages[key];
//       try {
//         const decoded = "data:image/jpg;base64," + encodedImage;
//         return decoded;
//       } catch (error) {
//         console.error(`Error decoding ${key}:`, error);
//         return null;
//       }
//     });
//     return decodedImagesArray;
//   };

//   const simulateAIDetection = (items) => {
//     return items;
//   };

//   const sendVariantInfo = async (variant) => {
//     try {
//       const response = await fetch("http://localhost:5000/variant", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ variant }),
//       });
//       if (response.ok) {
//         console.log(`Variant ${variant} information sent successfully.`);
//       } else {
//         console.error(`Failed to send variant ${variant} information.`);
//       }
//     } catch (error) {
//       console.error("Error sending variant information:", error);
//     }
//   };

//   const terminateCurrentInspection = async () => {
//     try {
//       const stopInspectionResponse = await fetch(
//         "http://your-backend-api/stop_inspection",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (stopInspectionResponse.ok) {
//         console.log("Current inspection stopped successfully.");
//       } else {
//         console.error("Failed to stop the current inspection.");
//       }
//     } catch (error) {
//       console.error("Error terminating the inspection:", error);
//     }
//   };

//   const handleNewInspection = async () => {
//     try {
//       await terminateCurrentInspection();
//       console.log("Starting a new inspection...");
//       setIsLoading(true);
//       await fetchDataAndDetect();
//     } catch (error) {
//       console.error("Error starting new inspection:", error);
//       setIsLoading(false);
//     }
//   };

//   const getFailedItems = async () => {
//     try {
//       console.log("Fetching failed items...");
//       const response = await fetch("http://localhost:5000/get_results");
//       if (!response.ok) {
//         throw new Error("Failed to fetch failed items");
//       }
//       const data = await response.json();
//       // Extract failed items from the data
//       const failedItemsList = Object.values(data).flatMap((camItems) =>
//         camItems.filter((item) => !item.present)
//       );
//       setFailedItems(failedItemsList);
//     } catch (error) {
//       console.error("Error fetching failed items:", error);
//       throw error; // Rethrow the error to handle it in the WebSocket event listener
//     }
//   };

//   const saveData = async () => {
//     try {
//       const response = await fetch("http://your-backend-api/save_data", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         console.log("Data saved successfully.");
//       } else {
//         console.error("Failed to save data.");
//       }
//     } catch (error) {
//       console.error("Error saving data:", error);
//     }
//   };

//   return (
//     <div>
//       <Navbar saveData={saveData} />
//       <div className="checklist-display">
//         {Object.entries(checklistItems).map(([camKey, camItems], index) => (
//           <div key={index} className="cam-column">
//             <h2>{camKey}</h2>
//             {showChecklist && (
//               <div className="scrollable-checklist">
//                 <ul>
//                   {camItems.map((item) => (
//                     <li key={item.part_id}>
//                       {item.part_name}
//                       {isLoading && <span className="loading"></span>}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             {failedItems.length > 0 &&
//               failedItems[camKey] && ( // Display failed items list if available for the current camera
//                 <div className="failed-items-list">
//                   <h3>Failed Items</h3>
//                   <ul>
//                     {failedItems[camKey].map(
//                       (failedItem, index) =>
//                         !failedItem.present && ( // Only display items with present: false
//                           <li key={index}>{failedItem.part_name}</li>
//                         )
//                     )}
//                   </ul>
//                 </div>
//               )}
//             <div className="cam-image">
//               <img src={cameraImages[index]} alt={`Cam ${index + 1} Image`} />
//             </div>
//           </div>
//         ))}
//         <div className="button-container">
//           <button
//             className="new-inspection-button"
//             onClick={handleNewInspection}
//           >
//             New Inspection
//           </button>
//           <button
//             className="variant-button"
//             onClick={() => sendVariantInfo("Variant 1")}
//           >
//             Variant 1
//           </button>
//           <button
//             className="variant-button"
//             onClick={() => sendVariantInfo("Variant 2")}
//           >
//             Variant 2
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default FinalPage;

// import React, { useState, useEffect, useRef } from "react";
// import "./FinalPage.css";
// import Navbar from "./navbar";
// import { WebSocketSubject } from "rxjs/webSocket";

// const FinalPage = () => {
//   const [checklistItems, setChecklistItems] = useState([]);
//   const [cameraImages, setCameraImages] = useState([]);
//   const [showChecklist, setShowChecklist] = useState(true);
//   const [processedData, setProcessedData] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [failedItems, setFailedItems] = useState({}); // Object to store failed items by camera
//   const socketRef = useRef();

//   useEffect(() => {
//     const socket = new WebSocket("ws://localhost:5000/echo");

//     socket.addEventListener("open", () => {
//       console.log("WebSocket connection opened");
//     });

//     socket.addEventListener("message", async (event) => {
//       const message = JSON.parse(event.data);
//       console.log("Message received:", message);

//       // Check for a condition in the message (e.g., value is true)
//       if (String(message) !== "false") {
//         console.log("Condition met, calling getFailedItems");
//         try {
//           await getFailedItems(); // Call getFailedItems asynchronously
//         } catch (error) {
//           console.error("Error calling getFailedItems:", error);
//         }
//       }
      
//     });
//     return () => {
//       console.log("Closing WebSocket connection");
//       socket.close();
//     };
//   }, []);

//   const fetchDataAndDetect = async () => {
//     try {
//       setIsLoading(true);
//       const [checklistResponse, cameraResponse] = await Promise.all([
//         fetch("http://localhost:5000/fetch_data").then((response) =>
//           response.json()
//         ),
//         fetch("http://localhost:5000/get_frames").then((response) =>
//           response.json()
//         ),
//       ]);

//       setChecklistItems(simulateAIDetection(checklistResponse));
//       setCameraImages(decodeAllImages(cameraResponse));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setIsLoading(false);
//     }
//   };

//   const decodeAllImages = (encodedImages) => {
//     const decodedImagesArray = Object.keys(encodedImages).map((key) => {
//       const encodedImage = encodedImages[key];
//       try {
//         const decoded = "data:image/jpg;base64," + encodedImage;
//         return decoded;
//       } catch (error) {
//         console.error(`Error decoding ${key}:`, error);
//         return null;
//       }
//     });
//     return decodedImagesArray;
//   };

//   const simulateAIDetection = (items) => {
//     return items;
//   };

//   const sendVariantInfo = async (variant) => {
//     try {
//       const response = await fetch("http://localhost:5000/variant", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ variant }),
//       });
//       if (response.ok) {
//         console.log(`Variant ${variant} information sent successfully.`);
//       } else {
//         console.error(`Failed to send variant ${variant} information.`);
//       }
//     } catch (error) {
//       console.error("Error sending variant information:", error);
//     }
//   };

//   const terminateCurrentInspection = async () => {
//     try {
//       const stopInspectionResponse = await fetch(
//         "http://your-backend-api/stop_inspection",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (stopInspectionResponse.ok) {
//         console.log("Current inspection stopped successfully.");
//       } else {
//         console.error("Failed to stop the current inspection.");
//       }
//     } catch (error) {
//       console.error("Error terminating the inspection:", error);
//     }
//   };

//   const handleNewInspection = async () => {
//     try {
//       await terminateCurrentInspection();
//       console.log("Starting a new inspection...");
//       setIsLoading(true);
//       await fetchDataAndDetect();
//     } catch (error) {
//       console.error("Error starting new inspection:", error);
//       setIsLoading(false);
//     }
//   };

//   const getFailedItems = async () => {
//     try {
//       console.log("Fetching failed items...");
//       const response = await fetch("http://localhost:5000/get_results");
//       if (!response.ok) {
//         throw new Error("Failed to fetch failed items");
//       }
//       const data = await response.json();
//       // Organize failed items by camera
//       const failedItemsObject = {};
//       Object.entries(data).forEach(([camKey, camItems]) => {
//         failedItemsObject[camKey] = camItems.filter((item) => !item.present);
//       });
//       setFailedItems(failedItemsObject);
//     } catch (error) {
//       console.error("Error fetching failed items:", error);
//       throw error; // Rethrow the error to handle it in the WebSocket event listener
//     }
//   };

//   const saveData = async () => {
//     try {
//       const response = await fetch("http://your-backend-api/save_data", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         console.log("Data saved successfully.");
//       } else {
//         console.error("Failed to save data.");
//       }
//     } catch (error) {
//       console.error("Error saving data:", error);
//     }
//   };

//   return (
//     <div>
//       <Navbar saveData={saveData} />
//       <div className="checklist-display">
//         {Object.entries(checklistItems).map(([camKey, camItems], index) => (
//           <div key={index} className="cam-column">
//             <h2>{camKey}</h2>
//             {showChecklist && (
//               <div className="scrollable-checklist">
//                 <ul>
//                   {camItems.map((item) => (
//                     <li key={item.part_id}>
//                       {item.part_name}
//                       {isLoading && <span className="loading"></span>}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             {failedItems && failedItems[camKey] && (
//               <div className="failed-items-list scrollable-failed-items">
//                 <h3>Failed Items</h3>
//                 <ul>
//                   {failedItems[camKey].map(
//                     (failedItem, index) =>
//                       !failedItem.present && (
//                         <li key={index}>{failedItem.part_name}</li>
//                       )
//                   )}
//                 </ul>
//               </div>
//             )}
//             <div className="cam-image">
//               <img src={cameraImages[index]} alt={`Cam ${index + 1} Image`} />
//             </div>
//           </div>
//         ))}
//         <div className="button-container">
//           <button className="new-inspection-button" onClick={handleNewInspection}>
//             New Inspection
//           </button>
//           <button className="variant-button" onClick={() => sendVariantInfo("Variant 1")}>
//             Variant 1
//           </button>
//           <button className="variant-button" onClick={() => sendVariantInfo("Variant 2")}>
//             Variant 2
//           </button>
//         </div>
//       </div>
//     </div>
//   );
  
  
// };
// export default FinalPage;


import React, { useState, useEffect, useRef } from "react";
import "./FinalPage.css";
import Navbar from "./navbar";
import { WebSocketSubject } from "rxjs/webSocket";

const FinalPage = () => {
  const [checklistItems, setChecklistItems] = useState({ cam1: [], cam2: [], cam3: [] ,cam4: [], cam5: [], cam6: [] });
  const [cameraImages, setCameraImages] = useState([]);
  const [showChecklist, setShowChecklist] = useState(true);
  const [processedData, setProcessedData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [failedItems, setFailedItems] = useState({}); 
  const [showFailedItemsOnly, setShowFailedItemsOnly] = useState(false);// Object to store failed items by camera
  const [inspectionButtonText, setInspectionButtonText] = useState("Start");
  const socketRef = useRef();

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.0.144:5000/echo");

    socket.addEventListener("open", () => {
      console.log("WebSocket connection opened");
    });

    socket.addEventListener("message", async (event) => {
      const message = JSON.parse(event.data);
      console.log("Message received:", message);

      // Check for a condition in the message (e.g., value is true)
      if (String(message) !== "false") {
        console.log("Condition met, calling getFailedItems");
        try {
          await getFailedItems(); // Call getFailedItems asynchronously
        } catch (error) {
          console.error("Error calling getFailedItems:", error);
        }
      }
      
    });
    return () => {
      console.log("Closing WebSocket connection");
      socket.close();
    };
  }, []);

  const fetchDataAndDetect = async () => {
    try {
      setIsLoading(true);
      const [checklistResponse, cameraResponse] = await Promise.all([
        fetch("http://192.168.0.144:5000/fetch_data").then((response) =>
          response.json()
        ),
        fetch("http://192.168.0.144:5000/get_frames").then((response) =>
          response.json()
        ),
      ]);

      setChecklistItems(simulateAIDetection(checklistResponse));
      setCameraImages(decodeAllImages(cameraResponse));
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const decodeAllImages = (encodedImages) => {
    const decodedImagesObject ={};
     Object.keys(encodedImages).forEach((key) => {
      const encodedImage = encodedImages[key];
      try {
        const decoded =  "data:image/jpg;base64," + encodedImage;
        decodedImagesObject[key] = decoded;
      } catch (error) {
        console.error(`Error decoding ${key}:`, error);
        return null;
      }
    });
    return decodedImagesObject;
  };

  const simulateAIDetection = (items) => {
    return items;
  };

  const sendVariantInfo = async (variant) => {
    try {
      const response = await fetch("http://192.168.0.144:5000/variant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ variant }),
      });
      if (response.ok) {
        console.log(`Variant ${variant} information sent successfully.`);
      } else {
        console.error(`Failed to send variant ${variant} information.`);
      }
    } catch (error) {
      console.error("Error sending variant information:", error);
    }
  };

  const terminateCurrentInspection = async () => {
    try {
      const stopInspectionResponse = await fetch(
        "http://your-backend-api/stop_inspection",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (stopInspectionResponse.ok) {
        console.log("Current inspection stopped successfully.");
      } else {
        console.error("Failed to stop the current inspection.");
      }
    } catch (error) {
      console.error("Error terminating the inspection:", error);
    }
  };

  const handleNewInspection = async () => {
    try {
      await terminateCurrentInspection();
      console.log("Starting a new inspection...");
      setIsLoading(true);
      await fetchDataAndDetect();
      setInspectionButtonText("New Inspection"); // Change button text after first inspection
    } catch (error) {
      console.error("Error starting new inspection:", error);
      setIsLoading(false);
    }
  };
  const getFailedItems = async () => {
    try {
      console.log("Fetching failed items...");
      setShowFailedItemsOnly(true); // Set showFailedItemsOnly to true
      const response = await fetch("http://192.168.0.144:5000/get_results");
      if (!response.ok) {
        throw new Error("Failed to fetch failed items");
      }
      const data = await response.json();
      const failedItemsObject = {};
      Object.entries(data).forEach(([camKey, camItems]) => {
        failedItemsObject[camKey] = camItems.filter((item) => !item.present);
      });
      setFailedItems(failedItemsObject);
    } catch (error) {
      console.error("Error fetching failed items:", error);
      throw error;
    }
  };

  const saveData = async () => {
    try {
      const response = await fetch("http://192.168.0.144:5000/save_results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Data saved successfully.");
      } else {
        console.error("Failed to save data.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  console.log("cameraImages:", cameraImages);
  return (
    <div>
    <Navbar saveData={saveData} />
    <div className="checklist-display">
    {Object.entries(checklistItems).map(([camKey, camItems], index) => (
  <div key={index} className="cam-column">
    <h2>{camKey}</h2>
    {!showFailedItemsOnly && showChecklist && camItems.length > 0 && (
      <div className="scrollable-checklist">
        <ul>
          {camItems.map((item) => (
            <li key={item.part_id}>
              {item.part_name}
              {isLoading && <span className="loading"></span>}
            </li>
          ))}
        </ul>
      </div>
    )}
          {failedItems && failedItems[camKey] && (
            <div className="failed-items-list scrollable-failed-items">
              <h3>Failed Items</h3>
              <ul>
                {failedItems[camKey].map(
                  (failedItem, index) =>
                    !failedItem.present && (
                      <li key={index}>{failedItem.part_name}</li>
                    )
                )}
              </ul>
            </div>
          )}
            <div className="cam-image">
              {cameraImages  && <img src={cameraImages[camKey]} alt={`Cam ${camKey} Image`} />}
            </div>
        </div>
      ))}
      <div className="button-container">
      <button className="new-inspection-button" onClick={handleNewInspection}>
            {inspectionButtonText} {/* Display dynamic button text */}
          </button>
        <button className="variant-button" onClick={() => sendVariantInfo("Variant 1")}>
          Variant 1
        </button>
        <button className="variant-button" onClick={() => sendVariantInfo("Variant 2")}>
          Variant 2
        </button>
      </div>
    </div>
  </div>



  );
  
  
};
export default FinalPage;
