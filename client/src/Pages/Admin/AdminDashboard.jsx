import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import { toast } from 'react-toastify';
import { FaTrash, FaCheck, FaTimes, FaClipboardList } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5600';

const AdminDashboard = () => {
  const [pendingGuides, setPendingGuides] = useState([]);
  const [approvedGuides, setApprovedGuides] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const token = localStorage.getItem('authToken');

  const fetchPendingGuides = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/getPendingGuides`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPendingGuides(response.data.data || []);
    } catch (error) {
      toast.error('Unable to load pending guides');
    }
  };

  const fetchApprovedGuides = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/guides`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApprovedGuides(response.data.data || []);
    } catch (error) {
      toast.error('Unable to load guides');
    }
  };

  const fetchTrips = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/trips`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTrips(response.data.data || []);
    } catch (error) {
      toast.error('Unable to load trips');
    }
  };

  const approveGuide = async (guideId) => {
    try {
      await axios.post(
        `${API_URL}/api/admin/approveGuide`,
        { guideId, approve: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Guide approved');
      fetchPendingGuides();
      fetchApprovedGuides();
    } catch (error) {
      toast.error('Unable to approve guide');
    }
  };

  const rejectGuide = async (guideId) => {
    try {
      await axios.post(
        `${API_URL}/api/admin/approveGuide`,
        { guideId, approve: false },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Guide rejected');
      fetchPendingGuides();
    } catch (error) {
      toast.error('Unable to reject guide');
    }
  };

  const deleteGuide = async (guideId) => {
    if (!window.confirm('Are you sure you want to delete this guide?')) return;
    try {
      await axios.delete(
        `${API_URL}/api/admin/guides/${guideId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Guide deleted');
      fetchApprovedGuides();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to delete guide');
    }
  };

  const deleteTrip = async (tripId) => {
    if (!window.confirm('Are you sure you want to delete this trip?')) return;
    try {
      await axios.delete(
        `${API_URL}/api/admin/trips/${tripId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Trip deleted');
      fetchTrips();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to delete trip');
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchPendingGuides(), fetchApprovedGuides(), fetchTrips()]).then(
      () => setLoading(false)
    );
  }, []);

  const totalUsers = approvedGuides.reduce((sum, guide) => sum + (guide.users?.length || 0), 0);

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p className="admin-subtitle">Manage guides, trips, and system activities</p>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`tab-button ${activeTab === 'activities' ? 'active' : ''}`}
          onClick={() => setActiveTab('activities')}
        >
          <FaClipboardList /> Activities
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <>
          <div className="admin-stats">
            <div className="stat-card">
              <span className="stat-label">Pending Guides</span>
              <span className="stat-value">{pendingGuides.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Total Guides</span>
              <span className="stat-value">{approvedGuides.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Total Trips</span>
              <span className="stat-value">{trips.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Total Users</span>
              <span className="stat-value">{totalUsers}</span>
            </div>
          </div>

          <section className="admin-section">
            <h2>Pending Guides Approval</h2>
            {loading ? (
              <p>Loading pending guides...</p>
            ) : pendingGuides.length === 0 ? (
              <p className="no-data">No pending guides found.</p>
            ) : (
              <div className="admin-table">
                <div className="admin-row admin-row-header">
                  <span>Name</span>
                  <span>Email</span>
                  <span>Phone</span>
                  <span>Actions</span>
                </div>
                {pendingGuides.map((guide) => (
                  <div className="admin-row" key={guide._id}>
                    <span>{guide.name}</span>
                    <span>{guide.email}</span>
                    <span>{guide.phone || 'N/A'}</span>
                    <div className="action-buttons">
                      <button
                        className="admin-button approve-btn"
                        onClick={() => approveGuide(guide._id)}
                        title="Approve"
                      >
                        <FaCheck /> Approve
                      </button>
                      <button
                        className="admin-button reject-btn"
                        onClick={() => rejectGuide(guide._id)}
                        title="Reject"
                      >
                        <FaTimes /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="admin-section">
            <h2>All Approved Guides</h2>
            {approvedGuides.length === 0 ? (
              <p className="no-data">No guides available yet.</p>
            ) : (
              <div className="admin-table">
                <div className="admin-row admin-row-header">
                  <span>Name</span>
                  <span>Email</span>
                  <span>Phone</span>
                  <span>Approved</span>
                  <span>Action</span>
                </div>
                {approvedGuides.map((guide) => (
                  <div className="admin-row" key={guide._id}>
                    <span>{guide.name}</span>
                    <span>{guide.email}</span>
                    <span>{guide.phone || 'N/A'}</span>
                    <span className={guide.isApproved ? 'status-yes' : 'status-no'}>
                      {guide.isApproved ? 'Yes' : 'No'}
                    </span>
                    <button
                      className="admin-button delete-btn"
                      onClick={() => deleteGuide(guide._id)}
                      title="Delete"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="admin-section">
            <h2>All Trips</h2>
            {trips.length === 0 ? (
              <p className="no-data">No trips found yet.</p>
            ) : (
              <div className="admin-table">
                <div className="admin-row admin-row-header">
                  <span>Trip Name</span>
                  <span>Location</span>
                  <span>Guide</span>
                  <span>Users</span>
                  <span>Duration</span>
                  <span>Action</span>
                </div>
                {trips.map((trip) => (
                  <div className="admin-row" key={trip._id}>
                    <span>{trip.name}</span>
                    <span>
                      {trip.location?.city ? `${trip.location.city}, ${trip.location.state}` : trip.location}
                    </span>
                    <span>{trip.guide?.name || 'Unknown'}</span>
                    <span>{trip.users?.length || 0}</span>
                    <span>{trip.duration || 'N/A'} days</span>
                    <button
                      className="admin-button delete-btn"
                      onClick={() => deleteTrip(trip._id)}
                      title="Delete"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {activeTab === 'activities' && (
        <section className="admin-section">
          <h2>System Activities</h2>
          <div className="activities-feed">
            <div className="activity-item">
              <div className="activity-icon approved">
                <FaCheck />
              </div>
              <div className="activity-content">
                <h3>System Summary</h3>
                <p>Total Guides: <strong>{approvedGuides.length}</strong></p>
                <p>Pending Approvals: <strong>{pendingGuides.length}</strong></p>
                <p>Total Trips: <strong>{trips.length}</strong></p>
                <p>Total Active Users: <strong>{totalUsers}</strong></p>
              </div>
            </div>

            {trips.length > 0 && (
              <div className="activity-item">
                <div className="activity-icon trip">
                  <FaClipboardList />
                </div>
                <div className="activity-content">
                  <h3>Latest Trips Created</h3>
                  {trips.slice(0, 3).map((trip) => (
                    <p key={trip._id}>
                      <strong>{trip.name}</strong> in {trip.location?.city || trip.location}
                      <span className="activity-meta"> • {trip.users?.length || 0} users</span>
                    </p>
                  ))}
                </div>
              </div>
            )}

            {approvedGuides.length > 0 && (
              <div className="activity-item">
                <div className="activity-icon guide">
                  <FaCheck />
                </div>
                <div className="activity-content">
                  <h3>Recent Guides Approved</h3>
                  {approvedGuides.slice(0, 3).map((guide) => (
                    <p key={guide._id}>
                      <strong>{guide.name}</strong>
                      <span className="activity-meta"> • {guide.email}</span>
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default AdminDashboard;
