import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./tripDetails.css";


const formatLocation = (location) => {
  if (typeof location === "string") return location;
  if (typeof location === "object" && location !== null) {
    const { city, state, country } = location;
    return [city, state, country].filter(Boolean).join(", ");
  }
  return "Unknown Location";
};



const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    participants: 1,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    emergencyContact: "",
    emergencyPhone: "",
    dietaryRestrictions: "",
    specialRequests: "",
    insurance: false
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  const fetchTripDetails = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5600";
      const res = await axios.post(
        `${API_URL}/dbApis/getTripDetails`,
        { tripId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setTrip(res.data.data);
    } catch (err) {
      console.error("Failed to fetch trip:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTripDetails();
  }, [id]);

  // Handle join trip click
  const handleJoinTrip = async () => {
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      // Redirect to login with return URL
      navigate(`/login?returnTo=/trip/${id}`);
      return;
    }

    try {
      // Check trip availability
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5600";
      const availabilityRes = await axios.get(`${API_URL}/trips/${id}/availability`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!availabilityRes.data.available) {
        alert("Sorry, this trip is fully booked!");
        return;
      }

      // Open booking modal
      setShowBookingModal(true);
      setBookingStep(1);
      
    } catch (error) {
      console.error("Error checking availability:", error);
      setShowBookingModal(true); // Continue with booking anyway
    }
  };

  // Handle booking form submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
      return;
    }

    setBookingLoading(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5600";
      const token = localStorage.getItem("authToken");
      
      const bookingPayload = {
        tripId: id,
        ...bookingData,
        totalAmount: calculateTotal(),
      };

      // const response = await axios.post(
      //   `${API_URL}/bookings/create`,
      //   bookingPayload,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      // Success - redirect to confirmation
      navigate(`/home`);
      alert("Booking successful! (This is a mock implementation.)");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    const basePrice = parseFloat(trip.price.replace(/[^0-9.-]+/g, ""));
    const participantTotal = basePrice * bookingData.participants;
    const insurance = bookingData.insurance ? participantTotal * 0.1 : 0;
    const taxes = participantTotal * 0.18; // 18% GST
    return participantTotal + insurance + taxes;
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading trip details...</p>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h2>Trip Not Found</h2>
        <p>The trip you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="trip-details-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-image-container">
          <img src={trip.imageUrl} alt={trip.name} className="hero-image" />
          <div className="hero-overlay">
            <div className="hero-content">
              <h1 className="trip-title">{trip.name}</h1>
              <div className="trip-meta">
                <span className="location">
                  <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  {formatLocation(trip.location)}
                </span>
                <span className="duration">
                  <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
                  </svg>
                  {trip.duration}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-grid">
          {/* Left Column - Trip Info */}
          <div className="trip-info-section">
            {/* Price Card */}
            <div className="price-card">
              <div className="price-label">Trip Price</div>
              <div className="price-value">{trip.price}</div>
              <button className="join-btn" onClick={handleJoinTrip}>
                <svg
                  className="btn-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>
                Join This Trip
              </button>
            </div>

            {/* Description */}
            <div className="info-card">
              <h2 className="section-title">About This Trip</h2>
              <p className="description">{trip.description}</p>
            </div>

            {/* Highlights */}
            <div className="info-card">
              <h2 className="section-title">Trip Highlights</h2>
              <div className="highlights-grid">
                {trip.highlights.map((item, index) => (
                  <div key={index} className="highlight-item">
                    <svg
                      className="highlight-icon"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Guide Info */}
          <div className="sidebar">
            <div className="guide-card">
              <h2 className="section-title">Your Guide</h2>
              <div className="guide-profile">
                <div className="guide-avatar">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                  </svg>
                </div>
                <div className="guide-info">
                  <h3 className="guide-name">{trip.guide.name}</h3>
                  <div className="guide-contact">
                    <svg
                      className="contact-icon"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
                    </svg>
                    <span>{trip.guide.phone}</span>
                  </div>
                </div>
              </div>
              <div className="guide-badges">
                <span className="badge">Certified Guide</span>
                <span className="badge">Local Expert</span>
              </div>
            </div>

            {/* Trip Stats */}
            <div className="stats-card">
              <h3 className="stats-title">Trip Statistics</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">4.8</div>
                  <div className="stat-label">Rating</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">156</div>
                  <div className="stat-label">Reviews</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">12</div>
                  <div className="stat-label">Max Group</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowBookingModal(false)}
        >
          <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Book Your Trip</h2>
              <button
                className="close-btn"
                onClick={() => setShowBookingModal(false)}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
              </button>
            </div>

            <div className="booking-progress">
              <div
                className={`progress-step ${bookingStep >= 1 ? "active" : ""}`}
              >
                <span>1</span>
                <p>Details</p>
              </div>
              <div
                className={`progress-step ${bookingStep >= 2 ? "active" : ""}`}
              >
                <span>2</span>
                <p>Review</p>
              </div>
              <div
                className={`progress-step ${bookingStep >= 3 ? "active" : ""}`}
              >
                <span>3</span>
                <p>Payment</p>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="booking-form">
              {bookingStep === 1 && (
                <div className="step-content">
                  <h3>Trip Details</h3>

                  <div className="form-group">
                    <label>Number of Participants</label>
                    <select
                      value={bookingData.participants}
                      onChange={(e) =>
                        handleInputChange(
                          "participants",
                          parseInt(e.target.value)
                        )
                      }
                      required
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Person" : "People"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        value={bookingData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        value={bookingData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={bookingData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        value={bookingData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Emergency Contact Name</label>
                      <input
                        type="text"
                        value={bookingData.emergencyContact}
                        onChange={(e) =>
                          handleInputChange("emergencyContact", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Emergency Contact Phone</label>
                      <input
                        type="tel"
                        value={bookingData.emergencyPhone}
                        onChange={(e) =>
                          handleInputChange("emergencyPhone", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Dietary Restrictions</label>
                    <textarea
                      value={bookingData.dietaryRestrictions}
                      onChange={(e) =>
                        handleInputChange("dietaryRestrictions", e.target.value)
                      }
                      placeholder="Any dietary restrictions or allergies..."
                      rows="3"
                    />
                  </div>

                  <div className="form-group">
                    <label>Special Requests</label>
                    <textarea
                      value={bookingData.specialRequests}
                      onChange={(e) =>
                        handleInputChange("specialRequests", e.target.value)
                      }
                      placeholder="Any special requests or needs..."
                      rows="3"
                    />
                  </div>
                </div>
              )}

              {bookingStep === 2 && (
                <div className="step-content">
                  <h3>Review Your Booking</h3>

                  <div className="booking-summary">
                    <div className="trip-summary">
                      <img
                        src={trip.imageUrl}
                        alt={trip.name}
                        className="summary-image"
                      />
                      <div>
                        <h4>{trip.name}</h4>
                        <p>{formatLocation(trip.location)}</p>
                        <p>{trip.duration}</p>
                      </div>
                    </div>

                    <div className="guest-info">
                      <h4>Guest Information</h4>
                      <p>
                        <strong>Name:</strong> {bookingData.firstName}{" "}
                        {bookingData.lastName}
                      </p>
                      <p>
                        <strong>Email:</strong> {bookingData.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {bookingData.phone}
                      </p>
                      <p>
                        <strong>Participants:</strong>{" "}
                        {bookingData.participants}
                      </p>
                    </div>

                    <div className="insurance-option">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={bookingData.insurance}
                          onChange={(e) =>
                            handleInputChange("insurance", e.target.checked)
                          }
                        />
                        <span className="checkmark"></span>
                        Add Travel Insurance (+10% of trip cost)
                      </label>
                    </div>

                    <div className="price-breakdown">
                      <div className="price-row">
                        <span>
                          Base Price ({bookingData.participants} × {trip.price})
                        </span>
                        <span>
                          ₹
                          {(
                            parseFloat(trip.price.replace(/[^0-9.-]+/g, "")) *
                            bookingData.participants
                          ).toLocaleString()}
                        </span>
                      </div>
                      {bookingData.insurance && (
                        <div className="price-row">
                          <span>Travel Insurance</span>
                          <span>
                            ₹
                            {(
                              parseFloat(trip.price.replace(/[^0-9.-]+/g, "")) *
                              bookingData.participants *
                              0.1
                            ).toLocaleString()}
                          </span>
                        </div>
                      )}
                      <div className="price-row">
                        <span>Taxes (18% GST)</span>
                        <span>
                          ₹
                          {(
                            parseFloat(trip.price.replace(/[^0-9.-]+/g, "")) *
                            bookingData.participants *
                            0.18
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="price-row total">
                        <span>
                          <strong>Total Amount</strong>
                        </span>
                        <span>
                          <strong>₹{calculateTotal().toLocaleString()}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {bookingStep === 3 && (
                <div className="step-content">
                  <h3>Payment</h3>

                  <div className="payment-section">
                    <div className="payment-summary">
                      <h4>Payment Summary</h4>
                      <div className="final-amount">
                        <span>Total Amount: </span>
                        <span className="amount">
                          ₹{calculateTotal().toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="payment-methods">
                      <h4>Choose Payment Method</h4>
                      <div className="payment-options">
                        <label className="payment-option">
                          <input
                            type="radio"
                            name="payment"
                            value="card"
                            defaultChecked
                          />
                          <div className="option-content">
                            <svg
                              className="payment-icon"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.11,4 20,4M20,18H4V12H20V18M20,8H4V6H20V8Z" />
                            </svg>
                            <span>Credit/Debit Card</span>
                          </div>
                        </label>
                        <label className="payment-option">
                          <input type="radio" name="payment" value="upi" />
                          <div className="option-content">
                            <svg
                              className="payment-icon"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6Z" />
                            </svg>
                            <span>UPI Payment</span>
                          </div>
                        </label>
                        <label className="payment-option">
                          <input type="radio" name="payment" value="wallet" />
                          <div className="option-content">
                            <svg
                              className="payment-icon"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M21,18V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V6H20A2,2 0 0,0 18,8V16A2,2 0 0,0 20,18M20,8V16H18V8H20Z" />
                            </svg>
                            <span>Digital Wallet</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="payment-security">
                      <div className="security-info">
                        <svg
                          className="security-icon"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5H16.3V16.5H7.7V11.5H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z" />
                        </svg>
                        <p>
                          Your payment is secured with 256-bit SSL encryption
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="modal-actions">
                {bookingStep > 1 && (
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setBookingStep(bookingStep - 1)}
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={bookingLoading}
                >
                  {bookingLoading ? (
                    <div className="loading-spinner-small"></div>
                  ) : bookingStep === 3 ? (
                    "Pay Now"
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripDetails;