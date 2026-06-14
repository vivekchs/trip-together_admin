import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './GuideSettings.css';

const GuideSettings = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    experience: '',
    rating: '',
    specialization: '',
    image: '',
    bio: ''
  });
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5600';

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
    if (!userInfo) {
      navigate('/');
      return;
    }
    setForm({
      name: userInfo.name || '',
      email: userInfo.email || '',
      phoneNumber: userInfo.phone || '',
      experience: userInfo.experience || '',
      rating: userInfo.rating || '',
      specialization: userInfo.specialization || '',
      image: userInfo.image || '',
      bio: userInfo.bio || ''
    });
  }, [navigate]);

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
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null') || {};
      userInfo.isApproved = false;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      window.dispatchEvent(new Event('authChanged'));
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <div className="guide-settings-container">
      <div className="settings-header">
        <div className="settings-avatar">{(form.name || 'G').split(' ').map(n=>n[0]).join('').toUpperCase()}</div>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
            <div className="settings-title">Guide Settings</div>
            <div className="status-badge">{form.isApproved ? 'Approved' : 'Pending'}</div>
          </div>
          <div style={{color:'#6b7280',marginTop:'0.25rem'}}>Edit your public guide profile — changes will be reviewed by admin.</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="settings-form">
        <div>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} disabled />
        </div>
        <div>
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} disabled />
        </div>

        <div>
          <label>Phone</label>
          <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
        </div>
        <div>
          <label>Experience</label>
          <input name="experience" value={form.experience} onChange={handleChange} />
        </div>

        <div>
          <label>Specialization</label>
          <input name="specialization" value={form.specialization} onChange={handleChange} />
        </div>
        <div>
          <label>Rating</label>
          <input name="rating" value={form.rating} onChange={handleChange} />
        </div>

        <div style={{gridColumn:'1 / -1'}}>
          <label>Bio</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} rows={4} />
        </div>

        <div className="actions">
          <button type="submit" className="submit-btn">Save & Submit for Review</button>
        </div>
      </form>
    </div>
  );
};

export default GuideSettings;
