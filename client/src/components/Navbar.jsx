import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

// List of all districts in Tamil Nadu
const tamilNaduDistricts = [
  "Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri",
  "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur",
  "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Perambalur",
  "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga",
  "Thanjavur", "Theni", "Tiruchirappalli", "Tirunelveli", "Tirupathur",
  "Tiruvallur", "Tiruvannamalai", "Vellore", "Virudhunagar",
  "Thiruvarur", "Tenkasi", "Nilgiris"
];

const Navbar = ({ isLoggedIn, setIsLoggedIn, setSelectedCity }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // Fetch the username from localStorage on component mount
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    const storedUserEmail = localStorage.getItem('userEmail');
    
    if (!storedUserName && storedUserEmail) {
      // Fetch user details if not already stored
      fetch(`http://localhost:3000/api/user-details?email=${storedUserEmail}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.name) {
            setUserName(data.name);
            localStorage.setItem('userName', data.name);
          }
        })
        .catch((err) => console.error('Error fetching user details:', err));
    } else if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  // Toggle the mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle location selection change
  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);
    setSelectedCity(location); // Pass the selected city to App.js for filtering
  };

  // Handle user logout
  const handleLogout = () => {
    setIsLoggedIn(false); // Update the login status
    localStorage.setItem('isLoggedIn', 'false'); // Update local storage
    localStorage.removeItem('userName'); // Remove the username from local storage
    localStorage.removeItem('userEmail'); // Remove the email from local storage
    navigate('/'); // Redirect to homepage on logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div style={{flexDirection:"row", display:'flex'}}>
        <div className="logo">
          <Link to="/">FREENCY DINE-IN</Link>
        </div>

        <select className="location-selector" value={selectedLocation} onChange={handleLocationChange}>
          <option value="">Select Location</option>
          {tamilNaduDistricts.map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>
        </div>

        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <span className="hamburger-icon">{isMobileMenuOpen ? '✖' : '☰'}</span>
        </div>

        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={toggleMobileMenu}>Home</Link>
          <Link to="/book-table" onClick={toggleMobileMenu}>Book a Table</Link>
          {isLoggedIn ? (
            <div className="user-info">
              
              <button className="logout-btn" onClick={handleLogout}>LOGOUT</button>
            </div>
          ) : (
            <Link to="/login" className="login-btn" onClick={toggleMobileMenu}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
