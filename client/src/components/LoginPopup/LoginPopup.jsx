import React, { useState } from 'react';
import './LoginPopup.css';
import { FaTimes, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin, onAuthSuccess }) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5600';

  const [mode, setMode] = useState('Login'); // 'Login' or 'Sign Up'
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('user');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!form.email || !form.password || (mode === 'Sign Up' && !form.name)) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (mode === 'Sign Up' && role === 'guide' && !form.phoneNumber) {
      toast.error('Guide signup requires phone number');
      return;
    }

    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      let endpoint;
      if (mode === 'Login') {
        if (role === 'user') endpoint = '/api/userLogin';
        else if (role === 'guide') endpoint = '/api/guideLogin';
        else endpoint = '/api/adminLogin';
      } else {
        endpoint = role === 'guide' ? '/api/guideSignup' : '/api/userSignup';
      }

      const requestData =
        mode === 'Login'
          ? { email: form.email, password: form.password }
          : {
              name: form.name,
              email: form.email,
              password: form.password,
              ...(role === 'guide' ? { phoneNumber: form.phoneNumber } : {}),
            };

      const response = await axios.post(`${API_URL}${endpoint}`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      const { data } = response;
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            id: data.user?.id || undefined,
            name: data.user?.name || form.name,
            email: data.user?.email || form.email,
            role: data.user?.role || role,
            isApproved: data.user?.isApproved ?? (role !== 'guide'),
          })
        );
        window.dispatchEvent(new Event('authChanged'));

        toast.success(mode === 'Login' ? 'Logged in successfully!' : 'Account created successfully!');

        setForm({ name: '', email: '', password: '', phoneNumber: '' });
        if (onAuthSuccess) onAuthSuccess();
      } else {
        toast.error(data.message || 'Authentication failed');
      }
    } catch (err) {
      let errorMessage = 'An error occurred. Please try again.';
      if (err.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Please check your connection.';
      } else if (err.response) {
        errorMessage = err.response.data?.message || `Server error: ${err.response.status}`;
      } else if (err.request) {
        errorMessage = 'Network error. Please check your connection.';
      } else {
        errorMessage = err.message;
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setMode(m => m === 'Login' ? 'Sign Up' : 'Login');
    setForm({ name: '', email: '', password: '', phoneNumber: '' });
    setRole('user');
  };

  const closePopup = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Closing popup via close button...');
    setShowLogin();
  };

  const handleOverlayClick = (e) => {
    // Only close if clicking the overlay itself, not its children
    if (e.target === e.currentTarget) {
      console.log('Closing popup via overlay click...');
      setShowLogin();
    }
  };

  return (
    <div className="login-popup-overlay" onClick={handleOverlayClick}>
      <div className="login-popup" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="login-popup-container">
          <div className="login-popup-title">
            <h2>{mode}</h2>
            <button
              type="button"
              className="close-btn"
              onClick={closePopup}
              disabled={loading}
              aria-label="Close popup"
            >
              <FaTimes />
            </button>
          </div>

          <div className="role-select-group">
            <span className="role-select-label">Choose your role</span>
            <div className="role-options">
              <button
                type="button"
                className={`role-option ${role === 'user' ? 'active' : ''}`}
                onClick={() => setRole('user')}
                disabled={loading}
              >
                User
              </button>
              <button
                type="button"
                className={`role-option ${role === 'guide' ? 'active' : ''}`}
                onClick={() => setRole('guide')}
                disabled={loading}
              >
                Guide
              </button>
              {mode === 'Login' && (
                <button
                  type="button"
                  className={`role-option ${role === 'admin' ? 'active' : ''}`}
                  onClick={() => setRole('admin')}
                  disabled={loading}
                >
                  Admin
                </button>
              )}
            </div>
            <p className="role-help">
              {mode === 'Sign Up'
                ? 'Sign up as a traveler or guide. Admin login is for existing accounts only.'
                : 'Select the account type you want to access.'}
            </p>
          </div>

          {mode === 'Sign Up' && (
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Full name"
                required
                disabled={loading}
                autoComplete="name"
              />
            </div>
          )}

          {mode === "Sign Up" && role === 'guide' && (
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                type="text"
                placeholder="Phone number"
                required
                disabled={loading}
                autoComplete="tel"
              />
            </div>
          )}

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Your email"
              required
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="Password (min 6 characters)"
              required
              disabled={loading}
              minLength={6}
              autoComplete={mode === "Login" ? "current-password" : "new-password"}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading || !form.email || !form.password || (mode === "Sign Up" && !form.name)}
            className="submit-btn"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                {mode === "Login" ? "Logging in..." : "Creating Account..."}
              </>
            ) : mode === "Login" ? "Login" : "Create Account"}
          </button>

          <div className="login-popup-toggle">
            {mode === "Login" ? (
              <p>
                Don't have an account?{' '}
                <span 
                  onClick={toggleMode} 
                  className="toggle-link"
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && toggleMode()}
                >
                  Sign up
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <span 
                  onClick={toggleMode} 
                  className="toggle-link"
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && toggleMode()}
                >
                  Login
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;