import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Search, Star, Phone, MapPin, Award, Users, Calendar, CheckCircle, X, Plus } from 'lucide-react';
import './Guides.css';

// Guide data from the provided file
const categories = [
  "Beach Getaway",
  "Mountain Escape", 
  "Historical Sites",
  "Adventure Sports",
  "Cultural",
  "Wildlife Safari",
  "Desert Experience",
  "Pilgrimage",
];

const guidesData = [
  // Beach Getaway
  { 
    name: "Arjun Mehta", 
    phone: "9876543210", 
    rating: 4.8, 
    category: "Beach Getaway", 
    img: "/guides/1.jpg",
    experience: "8 years",
    languages: ["Hindi", "English", "Gujarati"],
    price: "₹2,500/day",
    verified: true,
    totalTrips: 156,
    speciality: "Coastal tours & water sports"
  },
 
  { 
    name: "Ravi Kapoor", 
    phone: "9123456780", 
    rating: 4.7, 
    category: "Beach Getaway", 
    img: "/guides/3.jpg",
    experience: "6 years",
    languages: ["Hindi", "English", "Marathi"],
    price: "₹2,300/day",
    verified: false,
    totalTrips: 142,
    speciality: "Island hopping & snorkeling"
  },
  { 
    name: "Radha Rawat", 
    phone: "9898989898", 
    rating: 4.8, 
    category: "Mountain Escape", 
    img: "/guides/10.jpg",
    experience: "8 years",
    languages: ["Hindi", "English", "Garhwali"],
    price: "₹2,600/day",
    verified: true,
    totalTrips: 176,
    speciality: "Wildlife & nature photography"
  },

  // Historical Sites
  { 
    name: "Rohit Malhotra", 
    phone: "9823412345", 
    rating: 4.6, 
    category: "Historical Sites", 
    img: "/guides/11.jpg",
    experience: "6 years",
    languages: ["Hindi", "English", "Urdu"],
    price: "₹2,200/day",
    verified: true,
    totalTrips: 145,
    speciality: "Mughal architecture tours"
  },
  { 
    name: "Nandini Das", 
    phone: "9841234567", 
    rating: 4.7, 
    category: "Historical Sites", 
    img: "/guides/12.jpg",
    experience: "5 years",
    languages: ["Hindi", "English", "Bengali"],
    price: "₹2,100/day",
    verified: true,
    totalTrips: 112,
    speciality: "Ancient temple complexes"
  },
  { name: "Vikram Chauhan", phone: "9890345671", rating: 4.8, category: "Historical Sites", img: "/guides/13.jpg", experience: "7 years", languages: ["Hindi", "English"], price: "₹2,400/day", verified: true, totalTrips: 189, speciality: "Fort & palace tours" },
  { name: "Sanjana Pillai", phone: "9876201345", rating: 4.5, category: "Historical Sites", img: "/guides/14.jpg", experience: "4 years", languages: ["Hindi", "English", "Tamil"], price: "₹2,000/day", verified: false, totalTrips: 94, speciality: "South Indian heritage" },
  { name: "Ayaan Sheikh", phone: "9832109876", rating: 4.9, category: "Historical Sites", img: "/guides/15.jpg", experience: "9 years", languages: ["Hindi", "English", "Arabic"], price: "₹2,800/day", verified: true, totalTrips: 234, speciality: "Islamic architecture" },

  // Adventure Sports
  { name: "Rahul Yadav", phone: "9834567800", rating: 4.7, category: "Adventure Sports", img: "/guides/16.jpg", experience: "8 years", languages: ["Hindi", "English"], price: "₹3,200/day", verified: true, totalTrips: 178, speciality: "River rafting & kayaking" },
  { name: "Priya Tiwari", phone: "9823456712", rating: 4.6, category: "Adventure Sports", img: "/guides/17.jpg", experience: "6 years", languages: ["Hindi", "English"], price: "₹2,900/day", verified: true, totalTrips: 145, speciality: "Paragliding & skydiving" },
  { name: "Suraj Bhandari", phone: "9870011223", rating: 4.8, category: "Adventure Sports", img: "/guides/18.jpg", experience: "7 years", languages: ["Hindi", "English", "Nepali"], price: "₹3,100/day", verified: true, totalTrips: 167, speciality: "Bungee jumping & zip-lining" },
  { name: "Anjali Reddy", phone: "9812233445", rating: 4.9, category: "Adventure Sports", img: "/guides/19.jpg", experience: "5 years", languages: ["Hindi", "English", "Telugu"], price: "₹2,800/day", verified: true, totalTrips: 123, speciality: "Rock climbing & rappelling" },
  { name: "Yash Verma", phone: "9800987654", rating: 4.5, category: "Adventure Sports", img: "/guides/20.jpg", experience: "4 years", languages: ["Hindi", "English"], price: "₹2,500/day", verified: false, totalTrips: 89, speciality: "Trekking & camping" },

  // Cultural
  { name: "Shweta Nair", phone: "9845001122", rating: 4.8, category: "Cultural", img: "/guides/21.jpg", experience: "9 years", languages: ["Hindi", "English", "Malayalam"], price: "₹2,400/day", verified: true, totalTrips: 201, speciality: "Folk dance & music tours" },
  { name: "Dev Mishra", phone: "9876123450", rating: 4.7, category: "Cultural", img: "/guides/22.jpg", experience: "6 years", languages: ["Hindi", "English"], price: "₹2,200/day", verified: true, totalTrips: 156, speciality: "Art & craft workshops" },
  { name: "Pooja Jain", phone: "9865432100", rating: 4.6, category: "Cultural", img: "/guides/23.jpg", experience: "5 years", languages: ["Hindi", "English", "Rajasthani"], price: "₹2,100/day", verified: true, totalTrips: 134, speciality: "Traditional festivals" },
  { name: "Mohit Rao", phone: "9856741234", rating: 4.9, category: "Cultural", img: "/guides/24.jpg", experience: "11 years", languages: ["Hindi", "English", "Marathi"], price: "₹2,700/day", verified: true, totalTrips: 278, speciality: "Heritage walks & storytelling" },
  { name: "Kiran Salvi", phone: "9845678901", rating: 4.5, category: "Cultural", img: "/guides/25.jpg", experience: "4 years", languages: ["Hindi", "English"], price: "₹2,000/day", verified: false, totalTrips: 98, speciality: "Local cuisine tours" },

  // Wildlife Safari
  { name: "Harsh Vardhan", phone: "9811111111", rating: 4.7, category: "Wildlife Safari", img: "/guides/26.jpg", experience: "10 years", languages: ["Hindi", "English"], price: "₹3,500/day", verified: true, totalTrips: 245, speciality: "Tiger tracking & bird watching" },
  { name: "Rina Saxena", phone: "9833333333", rating: 4.9, category: "Wildlife Safari", img: "/guides/27.jpg", experience: "8 years", languages: ["Hindi", "English"], price: "₹3,200/day", verified: true, totalTrips: 189, speciality: "Photography safaris" },
  { name: "Ankur Meena", phone: "9822222222", rating: 4.8, category: "Wildlife Safari", img: "/guides/28.jpg", experience: "7 years", languages: ["Hindi", "English"], price: "₹3,000/day", verified: true, totalTrips: 167, speciality: "Jungle expeditions" },
  { name: "Deepa Pawar", phone: "9800000000", rating: 4.6, category: "Wildlife Safari", img: "/guides/29.jpg", experience: "6 years", languages: ["Hindi", "English", "Marathi"], price: "₹2,800/day", verified: true, totalTrips: 145, speciality: "Elephant safaris" },
  { name: "Ajay Chauhan", phone: "9899999999", rating: 4.5, category: "Wildlife Safari", img: "/guides/30.jpg", experience: "5 years", languages: ["Hindi", "English"], price: "₹2,600/day", verified: false, totalTrips: 123, speciality: "Conservation tours" },

  // Desert Experience
  { name: "Kunal Rathore", phone: "9812341234", rating: 4.6, category: "Desert Experience", img: "/guides/31.jpg", experience: "8 years", languages: ["Hindi", "English", "Rajasthani"], price: "₹2,900/day", verified: true, totalTrips: 178, speciality: "Camel safaris & dune bashing" },
  { name: "Shraddha Yadav", phone: "9823456789", rating: 4.7, category: "Desert Experience", img: "/guides/32.jpg", experience: "6 years", languages: ["Hindi", "English"], price: "₹2,700/day", verified: true, totalTrips: 145, speciality: "Desert camping & stargazing" },
  { name: "Lakhan Singh", phone: "9834509876", rating: 4.8, category: "Desert Experience", img: "/guides/33.jpg", experience: "9 years", languages: ["Hindi", "English", "Rajasthani"], price: "₹3,100/day", verified: true, totalTrips: 201, speciality: "Royal desert experiences" },
  { name: "Aarti Joshi", phone: "9845612345", rating: 4.9, category: "Desert Experience", img: "/guides/34.jpg", experience: "7 years", languages: ["Hindi", "English"], price: "₹2,800/day", verified: true, totalTrips: 167, speciality: "Cultural desert tours" },
  { name: "Zoya Khan", phone: "9856723456", rating: 4.5, category: "Desert Experience", img: "/guides/35.jpg", experience: "5 years", languages: ["Hindi", "English", "Urdu"], price: "₹2,500/day", verified: false, totalTrips: 112, speciality: "Photography & folklore" },

  // Pilgrimage
  { name: "Bhavya Patel", phone: "9876789012", rating: 4.8, category: "Pilgrimage", img: "/guides/36.jpg", experience: "10 years", languages: ["Hindi", "English", "Gujarati"], price: "₹2,300/day", verified: true, totalTrips: 234, speciality: "Temple circuits & rituals" },
  { name: "Gopal Das", phone: "9843210987", rating: 4.7, category: "Pilgrimage", img: "/guides/37.jpg", experience: "12 years", languages: ["Hindi", "English", "Sanskrit"], price: "₹2,500/day", verified: true, totalTrips: 289, speciality: "Spiritual guidance & mantras" },
  { name: "Lata Kumari", phone: "9812098765", rating: 4.6, category: "Pilgrimage", img: "/guides/38.jpg", experience: "8 years", languages: ["Hindi", "English"], price: "₹2,200/day", verified: true, totalTrips: 178, speciality: "Holy river ceremonies" },
  { name: "Shivam Bhatt", phone: "9801324576", rating: 4.9, category: "Pilgrimage", img: "/guides/39.jpg", experience: "11 years", languages: ["Hindi", "English", "Sanskrit"], price: "₹2,600/day", verified: true, totalTrips: 267, speciality: "Char Dham yatra specialist" },
  { name: "Rekha Sharma", phone: "9832104321", rating: 4.5, category: "Pilgrimage", img: "/guides/40.jpg", experience: "6 years", languages: ["Hindi", "English"], price: "₹2,100/day", verified: false, totalTrips: 134, speciality: "Family pilgrimage tours" },
];

const GuideCard = ({ guide }) => {
  return (
    <div className="guide-card">
      <div className="guide-card-header">
        <div className="guide-avatar">
          <div className="avatar-placeholder">
            {guide.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        {guide.verified && (
          <div className="verified-badge">
            <CheckCircle size={12} />
            Verified
          </div>
        )}
        <div className="category-tag">
          {guide.category}
        </div>
      </div>
      
      <div className="guide-card-body">
        <div className="guide-card-title">
          <h3 className="guide-name">{guide.name}</h3>
          <div className="rating-badge">
            <Star className="star-icon" />
            <span>{guide.rating}</span>
          </div>
        </div>
        
        <p className="guide-speciality">{guide.speciality}</p>
        
        <div className="guide-details">
          <div className="detail-item">
            <Calendar className="detail-icon" />
            <span>{guide.experience} experience</span>
          </div>
          <div className="detail-item">
            <Users className="detail-icon" />
            <span>{guide.totalTrips} trips completed</span>
          </div>
          <div className="detail-item">
            <MapPin className="detail-icon" />
            <span>{guide.languages.join(', ')}</span>
          </div>
        </div>
        
        <div className="guide-card-footer">
          <div className="price">{guide.price}</div>
          <a href={`tel:${guide.phone}`} className="contact-btn">
            <Phone className="phone-icon" />
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

const RegistrationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: '',
    experience: '',
    languages: '',
    price: '',
    speciality: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registration submitted successfully! We will contact you soon.');
    setFormData({
      name: '',
      phone: '',
      category: '',
      experience: '',
      languages: '',
      price: '',
      speciality: ''
    });
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Register as Guide</h2>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter your phone number"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Experience *</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="e.g., 5 years"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Languages Spoken *</label>
            <input
              type="text"
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="e.g., Hindi, English, Gujarati"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Price per Day *</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="e.g., ₹2,500/day"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Speciality *</label>
            <textarea
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              required
              rows={3}
              className="form-textarea"
              placeholder="Describe your speciality and expertise"
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditProfileModal = ({ isOpen, onClose, form, setForm }) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5600';
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(`${API_URL}/api/updateGuideProfile`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(response.data.message || 'Profile submitted for review');
      // mark local userInfo as pending
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null') || {};
      userInfo.isApproved = false;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      window.dispatchEvent(new Event('authChanged'));
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update profile');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Edit Guide Profile</h2>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} disabled className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input name="email" value={form.email} onChange={handleChange} disabled className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Experience</label>
            <input name="experience" value={form.experience} onChange={handleChange} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Specialization</label>
            <input name="specialization" value={form.specialization} onChange={handleChange} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} className="form-textarea" />
          </div>
          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="submit-btn">Save & Submit for Review</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const GuidesListing = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5600';
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    experience: '',
    rating: '',
    specialization: '',
    image: '',
    bio: ''
  });
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  const userRole = userInfo?.role || '';
  const isGuide = userRole === 'guide';
  const isAdmin = userRole === 'admin';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const guidesPerPage = 12;

  const filteredGuides = useMemo(() => {
    return guidesData.filter(guide => {
      const matchesSearch = guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           guide.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           guide.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredGuides.length / guidesPerPage);
  const startIndex = (currentPage - 1) * guidesPerPage;
  const currentGuides = filteredGuides.slice(startIndex, startIndex + guidesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="guides-listing">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <h1 className="header-title">
           {isGuide ? 'Become a Guide. Earn by Exploring' : 'Find Your Perfect Tour Guide'}
          </h1>
          <p className="header-subtitle">
            {isGuide ? 'Turn Your Local Knowledge Into Meaningful Earnings' : 'Discover experienced local guides for your next adventure.'}
          </p>
          <div className="header-note">
            {isGuide ? (
              <p>Browse guide profiles and details without registering as a guide. If you want to join as a guide, you can apply directly from this page.</p>
            ) : (
              <p>Browse guide profiles and details without registering as a guide.</p>
            )}
          </div>
        </div>
        {/* {isGuide && (
          <div className="guide-actions">
            <button className="mytrips-btn" onClick={() => navigate('/mytrips')}>My Trips</button>
            <button className="edit-profile-btn" onClick={() => {
              setEditForm({
                name: userInfo?.name || '',
                email: userInfo?.email || '',
                phoneNumber: userInfo?.phone || '',
                experience: userInfo?.experience || '',
                rating: userInfo?.rating || '',
                specialization: userInfo?.specialization || '',
                image: userInfo?.image || '',
                bio: userInfo?.bio || ''
              });
              setIsEditOpen(true);
            }}>Edit Profile</button>
          </div>
        )} */}
      </div>

      <div className="main-content">
        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-filter-content">
            {/* Search Bar */}
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search guides by name, speciality, or category..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="search-input"
              />
            </div>
            
            {/* Category Filter */}
            <div className="category-filter">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="category-select"
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Register Button */}
            {isGuide && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="register-btn"
              >
                <Plus className="plus-icon" />
                Register as Guide
              </button>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <p className="results-text">
            Showing {startIndex + 1}-{Math.min(startIndex + guidesPerPage, filteredGuides.length)} of {filteredGuides.length} guides
          </p>
          {filteredGuides.length === 0 && (
            <p className="no-results">No guides found matching your criteria</p>
          )}
        </div>

        {/* Guides Grid */}
        <div className="guides-grid">
          {currentGuides.map((guide, index) => (
            <GuideCard key={index} guide={guide} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              const isCurrentPage = page === currentPage;
              const shouldShow = 
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 2 && page <= currentPage + 2);
              
              if (!shouldShow) {
                if (page === currentPage - 3 || page === currentPage + 3) {
                  return <span key={page} className="pagination-ellipsis">...</span>;
                }
                return null;
              }
              
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`pagination-btn ${isCurrentPage ? 'active' : ''}`}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        )}

        {/* Stats Section */}
        <div className="stats-section">
          <h2 className="stats-title">
            Why Choose Our Guides?
          </h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon purple">
                <CheckCircle size={32} />
              </div>
              <h3 className="stat-title">Verified Guides</h3>
              <p className="stat-description">All our guides are thoroughly verified and background checked</p>
            </div>
            <div className="stat-item">
              <div className="stat-icon blue">
                <Star size={32} />
              </div>
              <h3 className="stat-title">Highly Rated</h3>
              <p className="stat-description">Average rating of 4.7+ stars from thousands of satisfied travelers</p>
            </div>
            <div className="stat-item">
              <div className="stat-icon green">
                <Users size={32} />
              </div>
              <h3 className="stat-title">Local Experts</h3>
              <p className="stat-description">Deep local knowledge and authentic cultural experiences</p>
            </div>
            <div className="stat-item">
              <div className="stat-icon yellow">
                <Award size={32} />
              </div>
              <h3 className="stat-title">Best Value</h3>
              <p className="stat-description">Competitive pricing with transparent costs and no hidden fees</p>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Edit Profile Modal for guides */}
      <EditProfileModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} form={editForm} setForm={setEditForm} />
    </div>
  );
};

export default GuidesListing;