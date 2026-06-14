import React from 'react';
import './AboutTT.css';
import { contentData } from '../../assets/assets';

const AboutTT = () => {
  return (
    <section className="about-tt">
      <div className="section-header">
        <h2>Why Trip Together?</h2>
        <p className="section-subtitle">Discover the magic of shared journeys</p>
      </div>
      
      <div className="feature-cards">
        {contentData.map((item, index) => (
          <div key={index} className={`feature-card ${index % 2 === 0 ? '' : 'reversed'}`}>
            <div className="card-image">
              <img src={item.img} alt={item.heading} loading="lazy" />
            </div>
            <div className="card-content">
              <div className="content-wrapper">
                <h3>{item.heading}</h3>
                <div className="divider"></div>
                <p>{item.paragraph}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutTT;