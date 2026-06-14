// import React, { useState, useEffect, useRef } from "react";
// import "./Home.css";
// import CategoryCard from "../../components/categoryCard/categoryCard";
// import AddTripPopup from "../../components/addTrip/addTrip";

// const Home = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const trendingImagesRef = useRef(null);
//   const [showAddTripPopup, setShowAddTripPopup] = useState(false);
  
// const trendingTrips = [
//   {
//     image: "https://upload.wikimedia.org/wikipedia/commons/1/17/Sardari_Village.jpg",
//     title: "Kashmir Valley",
//     description: "Explore the heaven on Earth with serene lakes and lush valleys"
//   },
//   {
//     image: "https://www.holytreetravel.com/blog/IMAGE/ladakh5.jpg",
//     title: "Leh-Ladakh",
//     description: "Ride through the rugged terrain and experience Himalayan beauty"
//   },
//   {
//     image: "https://plus.unsplash.com/premium_photo-1697729789803-48b0c82365ff?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2l0eSUyMHBhbGFjZSUyMHVkYWlwdXIlMjBpbmRpYXxlbnwwfHwwfHx8MA%3D%3D",
//     title: "Udaipur",
//     description: "Discover royal palaces, shimmering lakes, and heritage charm"
//   },
//   {
//     image: "https://cdn.wallpapersafari.com/25/43/shVYSl.jpg",
//     title: "Goa Beaches",
//     description: "Party, relax, and explore the vibrant coastal life of Goa"
//   },
//   {
//     image: "https://www.keralatourism.org/_next/image/?url=http%3A%2F%2F127.0.0.1%2Fktadmin%2Fimg%2Fpages%2Flarge-desktop%2Fkerala-visuals-1714756369_966a6aeb7550ce9efd98.webp&w=3840&q=75",
//     title: "Kerala Backwaters",
//     description: "Unwind with houseboat cruises and lush green landscapes"
//   },
//   {
//     image: "https://s7ap1.scene7.com/is/image/incredibleindia/umiam-lake-shillong-meghalaya-hero?qlt=82&ts=1742155652533",
//     title: "Meghalaya",
//     description: "Trek through living root bridges and mystical waterfalls"
//   },
//   {
//     image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmFyYW5hc2klMjBnaGF0fGVufDB8fDB8fHww",
//     title: "Varanasi",
//     description: "Witness spiritual rituals on the banks of the holy Ganga"
//   },
// ];


  
// const categories = [
//   { title: "Beach Getaway", image: "https://bbtours.in/images/BARATANG_13-11-2018_1542093592.jpg", description: "Relax on sunny beaches." },
//   { title: "Mountain Escape", image: "https://images4.alphacoders.com/692/thumb-1920-692903.jpg", description: "Breathe in the mountain air." },
//   { title: "Historical Sites", image: "https://c.ndtvimg.com/gws/ms/historical-places-to-explore-in-south-india/assets/4.jpeg?1730213494", description: "Walk through history." },
//   { title: "Adventure Sports", image: "https://plus.unsplash.com/premium_photo-1661923734776-1a0417fb6a9f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXh0cmVtZSUyMHNwb3J0c3xlbnwwfHwwfHx8MA%3D%3D", description: "Thrill and adrenaline." },

//   { title: "Cultural ", image: "https://www.goldentriangletoursinindia.com/images/goldentriangletoursinindia.jpg", description: "Experience India's diverse traditions." },
//   { title: "Wildlife Safari", image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?cs=srgb&dl=pexels-pixabay-247376.jpg&fm=jpg", description: "Explore the wild and see exotic animals." },
//   { title: "Desert Experience", image: "https://images.wanderon.in/blogs/new/2024/05/desert-safari-in-jaisalmer.jpg", description: "Camel rides, dunes & folk dances." },
//   { title: "Pilgrimage", image: "https://www.nickkembel.com/wp-content/uploads/2019/01/pilgrimage-sites-india-header.jpg", description: "Visit sacred temples and spiritual spots." },

//   // { title: "Food Trails", image: "/images/food.jpg", description: "Savor regional delicacies across India." },
//   // { title: "Backwater Cruises", image: "/images/backwater.jpg", description: "Glide through Kerala’s serene canals." },
//   // { title: "Hill Stations", image: "/images/hillstation.jpg", description: "Cool escapes with colonial charm." },
//   // { title: "Romantic Retreats", image: "https://w0.peakpx.com/wallpaper/251/703/HD-wallpaper-the-perfect-getaway-hut-house-shore-grass-cottage-retreat-dusk-perfect-cabin-picnic-countryside-moon-painting-river-evening-reflection-light-blue-night-art-rest-quiet-calmness.jpg", description: "Perfect getaways for couples." },
// ];


//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex(prev => (prev + 1) % trendingTrips.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [trendingTrips.length]);

//   useEffect(() => {
//     if (trendingImagesRef.current) {
//       const imageCard = trendingImagesRef.current.children[currentImageIndex];
//       if (imageCard) {
//         trendingImagesRef.current.scrollTo({
//           left: imageCard.offsetLeft - 40,
//           behavior: 'smooth'
//         });
//       }
//     }
//   }, [currentImageIndex]);

//   return (
//     <div className="home-container">
//       <div className="header">
//         <button className="add-trip-btn" onClick={() => setShowAddTripPopup(true)}>
//           <span>+</span> Add Trip
//         </button>
//       </div>

//       <section className="trending-section">
//         <h2 className="section-title">Trending Now</h2>
//         <div className="image-carousel" ref={trendingImagesRef}>
//           {trendingTrips.map((trip, index) => (
//             <div 
//               key={index} 
//               className={`image-card-container ${index === currentImageIndex ? 'active' : ''}`}
//             >
//               <div 
//                 className="image-card" 
//                 style={{ 
//                   backgroundImage: `url(${trip.image})`,
//                   animation: index === currentImageIndex ? 'zoomIn 3s ease-in-out' : 'none'
//                 }} 
//               />
//               <div className="image-overlay"></div>
//               <div className="trip-info">
//                 <h3 className="trip-title">{trip.title}</h3>
//                 <p className="trip-description">{trip.description}</p>
//               </div>
//               <div className="image-indicator">
//                 {trendingTrips.map((_, i) => (
//                   <div 
//                     key={i} 
//                     className={`indicator-dot ${i === currentImageIndex ? 'active' : ''}`}
//                     onClick={() => setCurrentImageIndex(i)}
//                   />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="categories-section">
//         <h2 className="section-title">Explore Categories</h2>
//         <div className="categories-grid">
//           {categories.map((category, idx) => (
//             <CategoryCard key={idx} data={category} />
//           ))}
//         </div>
//       </section>

//       {showAddTripPopup && (
//         <AddTripPopup 
//           onClose={() => setShowAddTripPopup(false)}
//           onSave={(tripData) => {
//             console.log("New trip:", tripData);
//             setShowAddTripPopup(false);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default Home;



import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import CategoryCard from "../../components/categoryCard/categoryCard";
import AddTripPopup from "../../components/addTrip/addTrip";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const trendingImagesRef = useRef(null);
  const [showAddTripPopup, setShowAddTripPopup] = useState(false);
  
  const trendingTrips = [
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/1/17/Sardari_Village.jpg",
      title: "Kashmir Valley",
      description: "Explore the heaven on Earth with serene lakes and lush valleys"
    },
    {
      image: "https://www.holytreetravel.com/blog/IMAGE/ladakh5.jpg",
      title: "Leh-Ladakh",
      description: "Ride through the rugged terrain and experience Himalayan beauty"
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1697729789803-48b0c82365ff?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2l0eSUyMHBhbGFjZSUyMHVkYWlwdXIlMjBpbmRpYXxlbnwwfHwwfHx8MA%3D%3D",
      title: "Udaipur",
      description: "Discover royal palaces, shimmering lakes, and heritage charm"
    },
    {
      image: "https://cdn.wallpapersafari.com/25/43/shVYSl.jpg",
      title: "Goa Beaches",
      description: "Party, relax, and explore the vibrant coastal life of Goa"
    },
    {
      image: "https://www.keralatourism.org/_next/image/?url=http%3A%2F%2F127.0.0.1%2Fktadmin%2Fimg%2Fpages%2Flarge-desktop%2Fkerala-visuals-1714756369_966a6aeb7550ce9efd98.webp&w=3840&q=75",
      title: "Kerala Backwaters",
      description: "Unwind with houseboat cruises and lush green landscapes"
    },
    {
      image: "https://s7ap1.scene7.com/is/image/incredibleindia/umiam-lake-shillong-meghalaya-hero?qlt=82&ts=1742155652533",
      title: "Meghalaya",
      description: "Trek through living root bridges and mystical waterfalls"
    },
    {
      image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmFyYW5hc2klMjBnaGF0fGVufDB8fDB8fHww",
      title: "Varanasi",
      description: "Witness spiritual rituals on the banks of the holy Ganga"
    },
  ];

  const categories = [
    { title: "Beach Getaway", image: "https://bbtours.in/images/BARATANG_13-11-2018_1542093592.jpg", description: "Relax on sunny beaches." },
    { title: "Mountain Escape", image: "https://images4.alphacoders.com/692/thumb-1920-692903.jpg", description: "Breathe in the mountain air." },
    { title: "Historical Sites", image: "https://c.ndtvimg.com/gws/ms/historical-places-to-explore-in-south-india/assets/4.jpeg?1730213494", description: "Walk through history." },
    { title: "Adventure Sports", image: "https://plus.unsplash.com/premium_photo-1661923734776-1a0417fb6a9f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXh0cmVtZSUyMHNwb3J0c3xlbnwwfHwwfHx8MA%3D%3D", description: "Thrill and adrenaline." },
    { title: "Cultural ", image: "https://www.goldentriangletoursinindia.com/images/goldentriangletoursinindia.jpg", description: "Experience India's diverse traditions." },
    { title: "Wildlife Safari", image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?cs=srgb&dl=pexels-pixabay-247376.jpg&fm=jpg", description: "Explore the wild and see exotic animals." },
    { title: "Desert Experience", image: "https://images.wanderon.in/blogs/new/2024/05/desert-safari-in-jaisalmer.jpg", description: "Camel rides, dunes & folk dances." },
    { title: "Pilgrimage", image: "https://www.nickkembel.com/wp-content/uploads/2019/01/pilgrimage-sites-india-header.jpg", description: "Visit sacred temples and spiritual spots." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % trendingTrips.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [trendingTrips.length]);

  useEffect(() => {
    const scrollToImage = () => {
      if (trendingImagesRef.current) {
        const container = trendingImagesRef.current;
        const imageCard = container.children[currentImageIndex];
        
        if (imageCard) {
          const scrollLeft = imageCard.offsetLeft - (container.offsetWidth - imageCard.offsetWidth) / 2;
          
          container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
          });
        }
      }
    };

    scrollToImage();
  }, [currentImageIndex]);

  return (
    <div className="home-container">
      
        <button className="add-trip-btn" onClick={() => setShowAddTripPopup(true)}>
          <span>+</span> Plan you Journey
        </button>
      

      <section className="trending-section">
        <h2 className="section-title">Trending Now</h2>
        <div className="image-carousel" ref={trendingImagesRef}>
          {trendingTrips.map((trip, index) => (
            <div 
              key={index} 
              className={`image-card-container ${index === currentImageIndex ? 'active' : ''}`}
            >
              <div 
                className="image-card" 
                style={{ 
                  backgroundImage: `url(${trip.image})`,
                  animation: index === currentImageIndex ? 'zoomIn 3s ease-in-out' : 'none'
                }} 
              />
              <div className="image-overlay"></div>
              <div className="trip-info">
                <h3 className="trip-title">{trip.title}</h3>
                <p className="trip-description">{trip.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="image-indicator">
          {trendingTrips.map((_, i) => (
            <div 
              key={i} 
              className={`indicator-dot ${i === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(i)}
            />
          ))}
        </div>
      </section>

      <section className="categories-section">
        <h2 className="section-title">Explore Categories</h2>
        <div className="categories-grid">
          {categories.map((category, idx) => (
            <CategoryCard key={idx} data={category} />
          ))}
        </div>
      </section>

      {showAddTripPopup && (
        <AddTripPopup 
          onClose={() => setShowAddTripPopup(false)}
          onSave={(tripData) => {
            console.log("New trip:", tripData);
            setShowAddTripPopup(false);
          }}
        />
      )}
    </div>
  );
};

export default Home;