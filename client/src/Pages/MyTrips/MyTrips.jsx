import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

import "react-loading-skeleton/dist/skeleton.css";
import "./MyTrips.css";

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const getLocationString = (trip) => {
    if (typeof trip.location === "string") return trip.location;
    if (trip.location?.city && trip.location?.state) {
      return `${trip.location.city}, ${trip.location.state}`;
    }
    return "Location not specified";
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
  const isGuide = userInfo?.role === 'guide';

  useEffect(() => {
    const fetchTrips = async () => {
      const email = getUserEmail();
      if (!email) {
        navigate("/");
        return;
      }

      // If the logged in user is a guide, fetch trips for guide
      const userInfoRaw = localStorage.getItem("userInfo");
      const userInfo = userInfoRaw ? JSON.parse(userInfoRaw) : null;
      if (userInfo?.role === 'guide') {
        try {
          const guideId = userInfo.id;
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/dbApis/getTripsForGuide`,
            { guideId }
          );
          setTrips(response?.data?.data || []);
        } catch (error) {
          console.error("Failed to fetch guide trips:", error);
        } finally {
          setLoading(false);
        }
        return;
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/dbApis/getTripsForUser`,
          { email }
        );
        setTrips(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch user trips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  useEffect(() => {
    const header = document.querySelector(".my-trips-header");

    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add("shrink");
      } else {
        header.classList.remove("shrink");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="my-trips-container">
      <div className="my-trips-header">
        <div className="my-trips-header-inner">
          <h2 className="my-trips-title">{isGuide ? 'My Guided Trips' : 'Your Adventure Journal'}</h2>
          {isGuide && (
            <div className="header-actions">
              <button className="edit-profile-btn" onClick={() => navigate('/settings')}>Edit Profile</button>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <Skeleton count={3} height={150} style={{ marginBottom: "1rem" }} />
      ) : trips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        <div className="trips-grid">
          {trips.map((trip) => (
            <div key={trip._id} className="category-trip-card">
              <div className="trip-image-container">
                <img
                  src={trip.imageUrl || "/images/default-trip.jpg"}
                  alt={trip.name}
                  className="trip-image"
                  loading="lazy"
                />
                <div className="image-overlay"></div>
              </div>

              <div className="trip-content">
                <div className="trip-header">
                  <h3 className="trip-name">{trip.name}</h3>
                  <span className="trip-price">
                    ₹{trip.price || "Price not specified"}
                  </span>
                </div>

                <p className="trip-description">
                  {trip.description || "No description available"}
                </p>

                <div className="trip-meta">
                  <span className="meta-item">
                    <i className="fas fa-map-marker-alt"></i>{" "}
                    {getLocationString(trip)}
                  </span>
                  <span className="meta-item">
                    <i className="fas fa-users"></i> {trip.users?.length || 0}{" "}
                    registered
                  </span>
                  {trip.duration && (
                    <span className="meta-item">
                      <i className="fas fa-clock"></i> {trip.duration}
                    </span>
                  )}
                </div>
                {isGuide && (
                  <div className="card-actions">
                    <button className="manage-trip-btn" onClick={() => navigate(`/trip/${trip._id}`)}>Manage Trip</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrips;
