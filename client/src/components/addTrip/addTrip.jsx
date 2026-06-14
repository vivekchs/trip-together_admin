// import React, { useState } from "react";
// import "./addTrip.css";
// import axios from 'axios';

// const AddTripPopup = ({ onClose, onSave }) => {
//   const [tripData, setTripData] = useState({
//     name: "",
//     location: "",
//     duration: "",
//     difficulty: "Moderate",
//     price: "",
//     description: "",
//     category: "Mountain Escape",
//     highlights: [""],
//     images: []
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [currentHighlight, setCurrentHighlight] = useState("");
//   const [imagePreviews, setImagePreviews] = useState([]);

//   const categories = {
//     "Beach Getaway": "beach_getaway",
//     "Mountain Escape": "mountain_escape",
//     "Cultural Exploration": "cultural_exploration",
//     "Wildlife Safari": "wildlife_safari",
//     "Adventure Sports": "adventure_sports",
//     "Spiritual Retreat": "spiritual_retreat",
//     "Desert Expedition": "desert_expedition",
//     "Backpacking Adventure": "backpacking_adventure"
//   };

//   const getUserEmail = () => {
//     const userInfo = localStorage.getItem('userInfo');
//     if (userInfo) {
//       try {
//         const parsedInfo = JSON.parse(userInfo);
//         return parsedInfo.email;
//       } catch (error) {
//         console.error('Error parsing userInfo:', error);
//         return null;
//       }
//     }
//     return null;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTripData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleHighlightAdd = () => {
//     if (currentHighlight.trim()) {
//       setTripData(prev => ({
//         ...prev,
//         highlights: [...prev.highlights, currentHighlight.trim()]
//       }));
//       setCurrentHighlight("");
//     }
//   };

//   const handleHighlightRemove = (index) => {
//     setTripData(prev => ({
//       ...prev,
//       highlights: prev.highlights.filter((_, i) => i !== index)
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length + tripData.images.length > 5) {
//       alert("Maximum 5 images allowed");
//       return;
//     }

//     const newImages = files.map(file => URL.createObjectURL(file));
//     setImagePreviews([...imagePreviews, ...newImages]);
//     setTripData(prev => ({
//       ...prev,
//       images: [...prev.images, ...files]
//     }));
//   };

//   const handleRemoveImage = (index) => {
//     const updatedPreviews = [...imagePreviews];
//     const updatedImages = [...tripData.images];

//     updatedPreviews.splice(index, 1);
//     updatedImages.splice(index, 1);

//     setImagePreviews(updatedPreviews);
//     setTripData(prev => ({
//       ...prev,
//       images: updatedImages
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!tripData.name || !tripData.location || !tripData.description) {
//       alert("Please fill in all required fields");
//       return;
//     }
//     const userEmail = getUserEmail();
//     if (!userEmail) {
//       alert("User email not found. Please login again.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const formData = {
//         category: categories[tripData.category],
//         userEmails: [userEmail],
//         tripData: {
//           name: tripData.name,
//           location: tripData.location,
//           duration: tripData.duration,
//           difficulty: tripData.difficulty,
//           price: tripData.price,
//           description: tripData.description,
//           highlights: tripData.highlights.filter(h => h),
//         }
//       };
//       const authToken = localStorage.getItem('authToken');

//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/dbApis/createTrip`, formData, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${authToken}`
//         }
//       });

//       if (response.data && response.data._id) {
//         onSave(tripData);
//         onClose();
//       } else {
//         throw new Error(response.data.message || 'Failed to create trip');
//       }
//     } catch (error) {
//       console.error('Error creating trip:', error);
//       alert(error.response?.data?.message || error.message || 'Failed to create trip. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="popup-overlay">
//       <div className="add-trip-popup">
//         <div className="popup-header">
//           <h2>Add New Trip</h2>
//           <button className="close-btn" onClick={onClose}>
//             &times;
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="trip-form">
//           <div className="form-section">
//             <h3>Basic Information</h3>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label>Trip Name*</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={tripData.name}
//                   onChange={handleChange}
//                   placeholder="e.g. Himalayan Trekking Adventure"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Location*</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={tripData.location}
//                   onChange={handleChange}
//                   placeholder="e.g. Manali, Himachal Pradesh"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Duration</label>
//                 <input
//                   type="text"
//                   name="duration"
//                   value={tripData.duration}
//                   onChange={handleChange}
//                   placeholder="e.g. 5 Days / 4 Nights"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Category</label>
//                 <select
//                   name="category"
//                   value={tripData.category}
//                   onChange={handleChange}
//                 >
//                   {Object.keys(categories).map((category, index) => (
//                     <option key={index} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Difficulty Level</label>
//                 <select
//                   name="difficulty"
//                   value={tripData.difficulty}
//                   onChange={handleChange}
//                 >
//                   <option value="Easy">Easy</option>
//                   <option value="Moderate">Moderate</option>
//                   <option value="Difficult">Difficult</option>
//                   <option value="Expert">Expert</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Price per person</label>
//                 <input
//                   type="text"
//                   name="price"
//                   value={tripData.price}
//                   onChange={handleChange}
//                   placeholder="e.g. ₹12,999 per person"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="form-section">
//             <h3>Trip Description*</h3>
//             <div className="form-group">
//               <textarea
//                 name="description"
//                 value={tripData.description}
//                 onChange={handleChange}
//                 placeholder="Describe the trip experience in detail..."
//                 rows="5"
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-section">
//             <h3>Trip Highlights</h3>
//             <div className="highlights-input">
//               <input
//                 type="text"
//                 value={currentHighlight}
//                 onChange={(e) => setCurrentHighlight(e.target.value)}
//                 placeholder="Add a highlight (e.g. Guided trek to Hampta Pass)"
//                 onKeyPress={(e) => e.key === 'Enter' && handleHighlightAdd()}
//               />
//               <button
//                 type="button"
//                 className="add-highlight-btn"
//                 onClick={handleHighlightAdd}
//               >
//                 <i className="fas fa-plus"></i> Add
//               </button>
//             </div>
//             <div className="highlights-list">
//               {tripData.highlights.filter(h => h).map((highlight, index) => (
//                 <div key={index} className="highlight-item">
//                   <span><i className="fas fa-check-circle"></i> {highlight}</span>
//                   <button
//                     type="button"
//                     className="remove-highlight"
//                     onClick={() => handleHighlightRemove(index)}
//                   >
//                     <i className="fas fa-times"></i>
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="form-section">
//             <h3>Trip Images (Max 5)</h3>
//             <div className="image-upload-container">
//               <label className="image-upload-btn">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={handleImageUpload}
//                   style={{ display: 'none' }}
//                 />
//                 <i className="fas fa-cloud-upload-alt"></i> Upload Images
//               </label>
//               <div className="image-previews">
//                 {imagePreviews.map((preview, index) => (
//                   <div key={index} className="image-preview">
//                     <img src={preview} alt={`Preview ${index}`} />
//                     <button
//                       type="button"
//                       className="remove-image"
//                       onClick={() => handleRemoveImage(index)}
//                     >
//                       <i className="fas fa-times"></i>
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="form-actions">
//             <button
//               type="button"
//               className="cancel-btn"
//               onClick={onClose}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="save-btn"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <>
//                   <i className="fas fa-spinner fa-spin"></i> Saving...
//                 </>
//               ) : (
//                 "Save Trip"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddTripPopup;

import React, { useState } from "react";
import axios from "axios";
import "./addTrip.css";
import TripSuccessPopup from "../TripSuccessPopup/TripSuccessPopup";

const AddTripPopup = ({ onClose, onSave }) => {
  const [tripData, setTripData] = useState({
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentHighlight, setCurrentHighlight] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [createdTrip, setCreatedTrip] = useState(null);

  const categories = {
    "Beach Getaway": "beach_getaway",
    "Mountain Escape": "mountain_escape",
    "Cultural Exploration": "cultural_exploration",
    "Wildlife Safari": "wildlife_safari",
    "Adventure Sports": "adventure_sports",
    "Spiritual Retreat": "spiritual_retreat",
    "Desert Expedition": "desert_expedition",
    "Backpacking Adventure": "backpacking_adventure",
  };

  const getUserEmail = () => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        return parsed.email;
      } catch (err) {
        console.error("Error parsing userInfo:", err);
      }
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userEmail = getUserEmail();
    if (!userEmail) {
      alert("User email not found. Please login again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = {
        description: tripData.description,
        userEmails: [userEmail],
      };

      const authToken = localStorage.getItem("authToken");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/dbApis/createTrip`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data && response.data._id) {
        setCreatedTrip(response.data);
        // DO NOT call onSave() yet
      } else {
        throw new Error(response.data.message || "Trip creation failed");
      }
    } catch (err) {
      console.error("Create trip error:", err);
      alert(err.response?.data?.message || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="popup-overlay">
        <div className="add-trip-popup">
          <div className="popup-header">
            <h2>Create New Adventure</h2>
            <button className="close-btn" onClick={onClose}>
              &times;
            </button>
          </div>

          <div className="popup-content-wrapper">
            <form onSubmit={handleSubmit} className="trip-form">
              <div className="form-section">
                <h3>
                  Describe your perfect trip, and we'll plan it for you! ✨
                </h3>
                <div className="form-group">
                  <textarea
                    name="description"
                    value={tripData.description}
                    onChange={handleChange}
                    placeholder="Describe the trip experience in detail..."
                    rows="5"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="save-btn"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Creating...
                </>
              ) : (
                <>
                  <i className="fas fa-plus-circle"></i> Create Trip
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {createdTrip && (
        <TripSuccessPopup
          trip={createdTrip}
          onClose={() => {
            setCreatedTrip(null);
            onSave && onSave(tripData); // ✅ Now trigger save/close only after user confirms
          }}
        />
      )}
    </>
  );
};

export default AddTripPopup;
