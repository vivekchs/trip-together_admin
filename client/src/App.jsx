// App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Landing from "./Pages/LandingPage/LandingPage";
import Home from "./Pages/Home/Home";
import CategoryTrips from "./Pages/categoryTrips/CategoryTrips";
import TripDetails from "./Pages/tripDetails/tripDetails";
import GuideRegistration from "./Pages/guideRegistration/guideRegistration";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GuidesListing from "./Pages/Guides/Guides";
import GetAllTrips from "./Pages/trips/Trips";
import MyTrips from "./Pages/MyTrips/MyTrips";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import GuideSettings from "./Pages/GuideSettings/GuideSettings";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

    if (token && userInfo) {
      setIsAuthenticated(true);
      setUserRole(userInfo.role || "");

      if (location.pathname === "/") {
        if (userInfo.role === "admin") {
          navigate("/admin", { replace: true });
        } else if (userInfo.role === "guide") {
          navigate("/guides", { replace: true });
        } else {
          navigate("/home", { replace: true });
        }
      }
    } else {
      setIsAuthenticated(false);
      setUserRole("");
    }
  }, [location.pathname, navigate]);

  // Handle successful login/signup
  const handleAuthSuccess = () => {
    console.log("Authentication successful, closing popup and navigating...");
    setIsAuthenticated(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    setUserRole(userInfo?.role || "");
    setShowLogin(false);

    setTimeout(() => {
      if (userInfo?.role === "admin") {
        navigate("/admin", { replace: true });
      } else if (userInfo?.role === "guide") {
        navigate("/guides", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    }, 100);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    setIsAuthenticated(false);
    navigate("/", { replace: true });
  };

  // Close login popup
  const closeLoginPopup = () => {
    console.log("Closing login popup...");
    setShowLogin(false);
  };

  return (
    <div className="app-container">
      <Navbar
        setShowLogin={setShowLogin}
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        onLogout={handleLogout}
      />

      <Routes>
        {/* Landing at "/" */}
        <Route path="/" element={<Landing setShowLogin={setShowLogin} />} />
        
        {/* Admin-only routes */}
        {userRole === "admin" && (
          <Route path="/admin" element={<AdminDashboard />} />
        )}
        
        <Route path="/guides" element={<GuidesListing />} />
        {userRole !== "admin" && (
          <Route path="/become-guide" element={<GuideRegistration />} />
        )}
        {userRole !== "admin" && (
          <Route path="/mytrips" element={<MyTrips />} />
        )}
        {userRole === "guide" && (
          <Route path="/settings" element={<GuideSettings />} />
        )}

        {/* User-only routes */}
        {userRole === "user" && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/trips" element={<CategoryTrips />} />
            <Route path="/trip/:id" element={<TripDetails />} />
            <Route path="/getAlltrips" element={<GetAllTrips />} />
          </>
        )}
      </Routes>

      <Footer />

      {showLogin && (
        <LoginPopup
          setShowLogin={closeLoginPopup}
          onAuthSuccess={handleAuthSuccess}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
