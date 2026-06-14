import React, { useState, useEffect } from "react";
import { useLocation , useNavigate  } from "react-router-dom";
import axios from "axios";
import "./CategoryTrips.css";

const CategoryTripCard = ({ trip }) => {
  // Handle location data which can be string or object

const navigate = useNavigate();


  const getLocationString = () => {
    if (typeof trip.location === 'string') return trip.location;
    if (trip.location?.city && trip.location?.state) {
      return `${trip.location.city}, ${trip.location.state}`;
    }
    return 'Location not specified';
  };

  return (
    <div className="category-trip-card">
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
            {trip.price || "Price not specified"}
          </span>
        </div>

        <p className="trip-description">
          {trip.description || "No description available"}
        </p>

        <div className="trip-meta">
          <span className="meta-item">
            <i className="fas fa-map-marker-alt"></i> {getLocationString()}
          </span>
          <span className="meta-item">
            <i className="fas fa-users"></i> {trip.users.length || 0} registered
          </span>
          {trip.duration && (
            <span className="meta-item">
              <i className="fas fa-clock"></i> {trip.duration}
            </span>
          )}
        </div>

        <button
          className="explore-button"
          onClick={() => navigate(`/trip/${trip._id}`)}
        >
          Explore Trip
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

const CategoryTrips = () => {
  const location = useLocation();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const categoryDisplayNames = {
    beach_getaway: "Beach Getaway",
    mountain_escape: "Mountain Escape",
    cultural_exploration: "Cultural Exploration",
    wildlife_safari: "Wildlife Safari",
    adventure_sports: "Adventure Sports",
    spiritual_retreat: "Spiritual Retreat",
    desert_expedition: "Desert Expedition",
    backpacking_adventure: "Backpacking Adventure"
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    
    if (category) {
      fetchTripsByCategory(category);
      setCategoryName(categoryDisplayNames[category] || category);
    } else {
      setLoading(false);
      setCategoryName("All Trips");
    }
  }, [location.search]);

  const fetchTripsByCategory = async (category) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/getTripsByCategory`,
        { category },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
        }
      );

      if (response.data && response.data.status === "success") {
        setTrips(response.data.data);
      } else {
        setError(response.data?.message || "No trips found for this category");
        setTrips([]);
      }
    } catch (err) {
      console.error("Error fetching trips:", err);
      setError(err.response?.data?.message || "Failed to load trips. Please try again.");
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="category-trips-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i> Loading trips...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-trips-container">
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="category-trips-container">
      <div className="category-header">
        <h2>{categoryName} Trips</h2>
        <p className="subtitle">
          {trips.length > 0 
            ? `Showing ${trips.length} ${categoryName.toLowerCase()} trips`
            : `No ${categoryName.toLowerCase()} trips available yet`}
        </p>
      </div>
      <div className="trips-grid">
        {trips.length > 0 ? (
          trips.map((trip) => <CategoryTripCard key={trip._id} trip={trip} />)
        ) : (
          <div className="no-trips-message">
            No trips found for this category. Check back later!
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryTrips;