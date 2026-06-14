import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { RiCompassDiscoverLine } from "react-icons/ri";
import "./Navbar.css";

const Navbar = ({ setShowLogin, onLogout, userRole: externalUserRole }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const [userRole, setUserRole] = useState(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    return externalUserRole || userInfo?.role || "";
  });
  const navigate = useNavigate();

 useEffect(() => {
   const updateAuth = () => {
     const storedToken = localStorage.getItem("authToken");
     setToken(storedToken || "");
     const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
     setUserRole(userInfo?.role || "");
   };

   updateAuth();
   window.addEventListener("authChanged", updateAuth);

   return () => {
     window.removeEventListener("authChanged", updateAuth);
   };
 }, []);
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    setToken("");
    setUserRole("");
    navigate("/");
    setMobileMenuOpen(false);
    if (onLogout) onLogout();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <RiCompassDiscoverLine className="logo-icon" />
          <span>TripTogether</span>
        </Link>

        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`navbar-menu ${mobileMenuOpen ? "active" : ""}`}>
          {userRole == "user" && (
            <li>
              <Link
                to="/guides"
                onClick={() => setMobileMenuOpen(false)}
                className="navbar-link"
              >
                Guides
              </Link>
            </li>
          )}
          {userRole === "user" && (
            <>
              <li>
                <Link
                  to="/home"
                  onClick={() => setMobileMenuOpen(false)}
                  className="navbar-link"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/getAlltrips"
                  onClick={() => setMobileMenuOpen(false)}
                  className="navbar-link"
                >
                  Trips
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="navbar-right">
          <div className="search-icon">
            <FaSearch />
          </div>

          {token ? (
            <div className="user-dropdown">
              <button
                className="user-button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <FaUserCircle />
              </button>
              <div className="dropdown-content">
                {userRole === "guide" && (
                  <Link
                    to="/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="dropdown-item"
                  >
                    Settings
                  </Link>
                )}
                {userRole !== "admin" && (
                  <Link
                    to="/mytrips"
                    onClick={() => setMobileMenuOpen(false)}
                    className="dropdown-item"
                  >
                    My Trips
                  </Link>
                )}
                <Link to="/" onClick={logout} className="dropdown-item">
                  Logout <FaSignOutAlt />
                </Link>
              </div>
            </div>
          ) : (
            <button
              className="auth-button sign-in"
              onClick={() => {
                setShowLogin(true);
              }}
            >
              <FaUserCircle /> Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
