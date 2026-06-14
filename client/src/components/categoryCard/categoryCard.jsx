import React from "react";
import { useNavigate } from "react-router-dom";
import "./categoryCard.css";

const CategoryCard = ({ data }) => {
  const navigate = useNavigate();

  const categoriesMapping = {
    "Beach Getaway": "beach_getaway",
    "Mountain Escape": "mountain_escape",
    "Cultural Exploration": "cultural_exploration",
    "Wildlife Safari": "wildlife_safari",
    "Adventure Sports": "adventure_sports",
    "Spiritual Retreat": "spiritual_retreat",
    "Desert Expedition": "desert_expedition",
    "Backpacking Adventure": "backpacking_adventure"
  };

  const handleExplore = () => {
    const apiCategory = categoriesMapping[data.title];
    if (apiCategory) {
      navigate(`/trips?category=${apiCategory}`);
    } else {
      navigate('/trips'); // Fallback if category not found
    }
  };

  return (
    <div className="category-card" onClick={handleExplore}>
      <div className="card-image-container">
        <img 
          src={data.image} 
          alt={data.title} 
          loading="lazy"
          className="card-image"
        />
        <div className="image-overlay"></div>
      </div>
      <div className="card-info">
        <h3 className="card-title">{data.title}</h3>
        <p className="card-description">{data.description}</p>
        <button className="explore-button" onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the card's onClick
          handleExplore();
        }}>
          Explore
          <svg className="arrow-icon" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;