import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./guideRegistration.css";

const GuideRegistration = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    experience: "",
    rating: "",
    specialization: "",
    image: "",
    bio: "",
    phoneNumber: "",
  });

  // Define your base URL here or use an environment variable
  const url = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    // Get user info from localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    const token = localStorage.getItem("authToken");

    if (!token || !userInfo) {
      toast.error("Please sign up first to become a guide");
      navigate("/");
      return;
    }

    // Pre-fill email and name from logged-in user
    setFormData((prev) => ({
      ...prev,
      email: userInfo.email || "",
      name: userInfo.name || "",
    }));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${url}/api/registerAsGuide`, formData);

      if (response.status === 201) {
        toast.success("Guide profile submitted successfully! Waiting for admin approval.");
        // Clear form
        setFormData({
          email: "",
          name: "",
          experience: "",
          rating: "",
          specialization: "",
          image: "",
          bio: "",
          phoneNumber: "",
        });
        // Redirect to guides page
        navigate("/guides");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="guide-registration-wrapper">
      <div className="guide-registration-container">
        <h2 className="form-title">Register as Guide</h2>
        <p className="form-subtitle">Fill in your guide profile details. Admin will review and approve your application.</p>
        
        <form onSubmit={handleSubmit} className="registration-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <input
            type="text"
            name="experience"
            placeholder="Experience (e.g., 8 years)"
            value={formData.experience}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="rating"
            placeholder="Rating (e.g., 4.9/5)"
            value={formData.rating}
            onChange={handleChange}
          />
          <input
            type="text"
            name="specialization"
            placeholder="Specialization (e.g., Mountain Treks)"
            value={formData.specialization}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Profile Image URL"
            value={formData.image}
            onChange={handleChange}
          />
          <textarea
            name="bio"
            placeholder="Short Bio (About yourself as a guide)"
            rows="4"
            value={formData.bio}
            onChange={handleChange}
          />
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit for Approval"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GuideRegistration;
