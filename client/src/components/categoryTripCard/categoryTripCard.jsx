import React from "react";
import "./CategoryTripCard.css"; // We'll create this CSS file

const CategoryTripCard = ({ trip }) => {
  // Handle location data which can be string or object
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
          <span className="trip-price">{trip.price || 'Price not specified'}</span>
        </div>
        
        <p className="trip-description">
          {trip.description || 'No description available'}
        </p>
        
        <div className="trip-meta">
          <span className="meta-item">
            <i className="fas fa-map-marker-alt"></i> {getLocationString()}
          </span>
          <span className="meta-item">
            <i className="fas fa-users"></i> {trip.userCount || 0} registered
          </span>
          {trip.duration && (
            <span className="meta-item">
              <i className="fas fa-clock"></i> {trip.duration}
            </span>
          )}
        </div>
        
        {trip.highlights && trip.highlights.length > 0 && (
          <div className="trip-highlights">
            <h4>Trip Highlights:</h4>
            <ul>
              {trip.highlights.slice(0, 3).map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        )}
        
        <button className="explore-button">
          Explore Trip
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default CategoryTripCard;


