import React, { useState } from 'react';
import DynamicVideos from '../../components/dynamicVideos/DynamicVideos';
import AboutTT from '../../components/AboutTT/AboutTT';
import './LandingPage.css';
import CategoryCard from '../../components/categoryCard/categoryCard';
import Footer from '../../components/Footer/Footer';

const Landing = ({ setShowLogin }) => {
  const [category, setCategory] = useState("All");
const categories = [
  {
    title: "Taj Mahal, Agra",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg",
    description: "Marvel at the white marble wonder."
  },
  {
    title: "Jaipur, Rajasthan",
    image: "https://s7ap1.scene7.com/is/image/incredibleindia/hawa-mahal-jaipur-rajasthan-city-1-hero?qlt=82&ts=1742200253577",
    description: "Explore the Pink City’s royal palaces."
  },
  {
    title: "Goa Beaches",
    image: "https://cdn.wallpapersafari.com/34/36/Ji6aGx.jpg",
    description: "Relax on the sun-kissed beaches."
  },
  {
    title: "Varanasi, Uttar Pradesh",
    image: "https://www.mapsofindia.com/ci-moi-images/my-india//varanasi.jpg",
    description: "Witness spirituality on the Ganges."
  },
  {
    title: "Leh-Ladakh, Jammu & Kashmir",
    image: "https://www.holytreetravel.com/blog/IMAGE/ladakh5.jpg",
    description: "Experience adventure in high altitudes."
  },
  {
    title: "Kerala Backwaters",
    image: "https://static.toiimg.com/photo/msid-91888972,width-96,height-65.cms",
    description: "Cruise through serene backwaters."
  },
  {
    title: "Mysore Palace, Karnataka",
    image: "https://karnatakatourism.org/wp-content/uploads/2020/06/Mysuru-Palace-banner-1920_1100.jpg",
    description: "Feel royal at the grand Mysore Palace."
  },
  {
    title: "Amritsar, Punjab",
    image: "https://plus.unsplash.com/premium_photo-1697730324062-c012bc98eb13?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW1yaXRzYXJ8ZW58MHx8MHx8fDA%3D",
    description: "Visit the golden heart of Punjab."
  },
//   {
//     title: "Ranthambore National Park",
//     image: "https://www.andbeyond.com/wp-content/uploads/sites/5/tiger-ranthambore.jpg",
//     description: "Spot tigers in their natural habitat."
//   },
//   {
//     title: "Meghalaya Living Root Bridges",
//     image: "https://travenjo.com/wp-content/uploads/2019/06/Living-Root-Bridge-Mawlynnong-.jpg?x58748",
//     description: "Trek to nature’s handmade wonders."
//   },
//   {
//     title: "Rishikesh, Uttarakhand",
//     image: "https://s7ap1.scene7.com/is/image/incredibleindia/laxman%20jhula-rishikesh-uttrakhand-hero?qlt=82&ts=1726646312953",
//     description: "Seek adventure and peace by the Ganga."
//   },
//   {
//     title: "Hampi, Karnataka",
//     image: "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2025/02/12133950/Hampi-places-to-visit-FI-1600x900.jpg",
//     description: "Discover ruins of a glorious empire."
//   }
];



  return (
    <div className="landing-page">
      <DynamicVideos setShowLogin={setShowLogin} />
      <div className="landing-content">
        <AboutTT />


              <section className="categories-section">
        <h2 className="section-title">Most Visited Places</h2>
        <div className="categories-grid">
          {categories.map((category, idx) => (
            <CategoryCard key={idx} data={category} />
          ))}
        </div>
      </section>
      </div>
    </div>
  );
};

export default Landing;