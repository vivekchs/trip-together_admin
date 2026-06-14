import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          {/* About Column */}
          <div className="footer-col">
            <h4>Trip Explorer</h4>
            <p className="footer-about">
              Discover the best travel experiences with Trip Explorer. We help you find amazing destinations, 
              plan perfect itineraries, and create unforgettable memories.
            </p>
            <div className="social-links">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedin /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaYoutube /></a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/destinations">Destinations</Link></li>
              <li><Link to="/tours">Tours</Link></li>
              <li><Link to="/blog">Travel Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/refund">Refund Policy</Link></li>
              <li><Link to="/booking">Booking Guide</Link></li>
              <li><Link to="/covid">COVID-19 Updates</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul className="contact-info">
              <li>
                <MdLocationOn className="contact-icon" />
                <span>123 Travel Street, Wanderlust City, WC 12345</span>
              </li>
              <li>
                <MdPhone className="contact-icon" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <MdEmail className="contact-icon" />
                <span>info@tripexplorer.com</span>
              </li>
            </ul>
            
            <div className="newsletter">
              <h5>Subscribe to our newsletter</h5>
              <div className="newsletter-input">
                <input type="email" placeholder="Your email address" />
                <button type="submit">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} Trip Explorer. All rights reserved.</p>
          <div className="payment-methods">
            <span>We accept:</span>
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fab fa-cc-paypal"></i>
            <i className="fab fa-cc-amex"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;