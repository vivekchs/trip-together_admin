import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

import "react-loading-skeleton/dist/skeleton.css";
import "./Trips.css";

const CategoryTripCard = ({ trip }) => {
  const navigate = useNavigate();

  const getLocationString = () => {
    if (typeof trip.location === "string") return trip.location;
    if (trip.location?.city && trip.location?.state) {
      return `${trip.location.city}, ${trip.location.state}`;
    }
    return "Location not specified";
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
          <span className="trip-price">₹{trip.price || "Not specified"}</span>
        </div>

        <p className="trip-description">
          {trip.description || "No description available"}
        </p>

        <div className="trip-meta">
          <span className="meta-item">
            <i className="fas fa-map-marker-alt"></i> {getLocationString()}
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

        <button
          className="explore-button"
          onClick={() => navigate(`/trip/${trip._id}`)}
        >
          Explore Trip <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

const GetAllTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHeaderShrunk, setIsHeaderShrunk] = useState(false);
  const headerRef = useRef();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
  fetchAllTrips();
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const scrollThreshold = 180;
    const hysteresis = 40;

    if (!isHeaderShrunk && currentScrollY > scrollThreshold) {
      setIsHeaderShrunk(true);
    } else if (
      isHeaderShrunk &&
      currentScrollY < scrollThreshold - hysteresis
    ) {
      setIsHeaderShrunk(false);
    }

    lastScrollY.current = currentScrollY;
    ticking.current = false;
  };

  const onScroll = () => {
    if (!ticking.current) {
      requestAnimationFrame(handleScroll);
      ticking.current = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", onScroll);
  };
}, [isHeaderShrunk]);

  const fetchAllTrips = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/dbApis/getTripsFromDB`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (Array.isArray(response.data) && response.data.length > 0) {
        setTrips(response.data);
      } else {
        setError("No trips found.");
      }
    } catch (err) {
      console.error("Failed to fetch trips:", err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="trips-grid">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="category-trip-card">
            <Skeleton height={180} />
            <Skeleton height={20} style={{ marginTop: "10px" }} />
            <Skeleton count={3} />
            <Skeleton width={100} height={30} style={{ marginTop: "10px" }} />
          </div>
        ))}
      </div>
    );
  }

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="category-trips-container">
      <div
        className={`trips-header ${isHeaderShrunk ? "shrink" : ""}`}
        ref={headerRef}
      >
        <h1 className="trips-title">Explore Incredible Adventures</h1>
        <p className="trips-subtitle">Discover, Join, and Experience</p>
        <p className="trips-count">
          {trips.length} unforgettable trip{trips.length !== 1 ? "s" : ""}{" "}
          crafted for every explorer.
        </p>
      </div>

      <div className="trips-grid">
        {trips.map((trip) => (
          <CategoryTripCard key={trip._id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default GetAllTrips;
