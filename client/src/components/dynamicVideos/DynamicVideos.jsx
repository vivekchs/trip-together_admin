import React, { useEffect, useState } from 'react';
import './DynamicVideos.css';

const DynamicVideos = ({ setShowLogin }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [rotatingWord, setRotatingWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  
  const baseText = 'Plan a trip for ';
  const rotatingWords = [
    { text: 'adventure', font: "'Dancing Script', cursive" },
    { text: 'vacation', font: "'Great Vibes', cursive" },
    { text: 'exploration', font: "'Parisienne', cursive" },
    { text: 'discovery', font: "'Sacramento', cursive" },
    { text: 'getaway', font: "'Tangerine', cursive" },
    { text: 'journey', font: "'Alex Brush', cursive" }
  ];

  const landing_images = [
    'https://wallpapers.com/images/hd/heaven-pictures-5ojcbi0jbdnh9i6e.jpg',
    'https://himalayadarshankausani.com/wp-content/uploads/WhatsApp-Image-2025-04-16-at-11.47.09-AM-2.jpeg',
    'https://afar.brightspotcdn.com/dims4/default/0833f21/2147483647/strip/false/crop/3000x2002+0+0/resize/1486x992!/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2Faf%2F54%2F5842f50e4cc592a4b645de602504%2F10citiesrefresh-singapore-2.jpg',
    'https://neuroject.com/wp-content/uploads/2024/01/Top-11-Smart-Cities-in-the-World-2024-Review-Neuroject-Main.jpg',
    'https://images.newscientist.com/wp-content/uploads/2024/08/30153815/SEI_218897070.jpg',
    'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ];

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Alex+Brush&family=Dancing+Script:wght@400;700&family=Great+Vibes&family=Parisienne&family=Sacramento&family=Tangerine:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Initialize text properly
  useEffect(() => {
    setDisplayedText('');
    setRotatingWord('');
  }, []);

  // Rotate words effect
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex(prev => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(wordInterval);
  }, []);

  // Typewriter effect for base text
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < baseText.length) {
        setDisplayedText(prev => prev + baseText[i++]);
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  // Update rotating word
  useEffect(() => {
    let i = 0;
    const currentWord = rotatingWords[wordIndex]?.text || '';
    setRotatingWord('');
    
    const typingInterval = setInterval(() => {
      if (i < currentWord.length) {
        setRotatingWord(prev => prev + currentWord[i++]);
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, [wordIndex]);

  // Image slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => {
        const next = (prev + 1) % landing_images.length;
        setNextImageIndex((next + 1) % landing_images.length);
        return next;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className="dynamic-images">
      <div className="image-container">
        {landing_images.map((imageUrl, index) => (
          <img
            key={index}
            className={`image-bg ${
              index === currentImageIndex 
                ? 'active loaded' 
                : index === nextImageIndex 
                ? 'next' 
                : ''
            }`}
            src={imageUrl}
            alt={`Adventure ${index + 1}`}
            onLoad={index === 0 ? handleImageLoad : undefined}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      <div className="overlay"></div>
      <div className="gradient-overlay"></div>

      <div className="floating-elements">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
      </div>

      <div className="image-contents">
        <h1 className="typing-text">
          <span className="base-text">{displayedText}</span>
          {rotatingWord && (
            <span 
              className="rotating-word" 
              style={{ fontFamily: rotatingWords[wordIndex]?.font }}
            >
              {rotatingWord}
            </span>
          )}
          <span className="cursor">|</span>
        </h1>
      </div>

      <div className="image-indicators">
        {landing_images.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default DynamicVideos;