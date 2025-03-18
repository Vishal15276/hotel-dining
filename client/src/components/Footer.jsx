import React from 'react';
import '../styles/Footer.css'; // Import the corresponding CSS file
import { Link } from 'react-router-dom'; // For navigation links
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Social media icons

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* About Us Section */}
        <div className="footer-section about">
          <h3>Restaurant Reserve</h3>
          <p>
            Restaurant Reserve is your one-stop solution for booking tables at the best restaurants in your area. Experience seamless reservations and enjoy your dining experience without the hassle.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/restaurants">Restaurants</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p><strong>Email:</strong> support@restaurantreserve.com</p>
          <p><strong>Phone:</strong> +1 234 567 890</p>
          <p><strong>Address:</strong> 123 Food Street, Flavor Town, NY 10001</p>
        </div>

        {/* Social Media Section */}
        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription Section */}
      <div className="footer-bottom">
        {/* <div className="newsletter">
          <h4>Subscribe to Our Newsletter</h4>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div> */}
        <p>&copy; {new Date().getFullYear()} RestaurantReserve. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
