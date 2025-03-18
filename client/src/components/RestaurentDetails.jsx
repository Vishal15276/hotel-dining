import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/RestaurantDetails.css'; // Ensure this path is correct

const RestaurantDetails = () => {
  const { id } = useParams(); // Get the restaurant ID from the URL
  const navigate = useNavigate(); // For navigation
  const [restaurant, setRestaurant] = useState(null); // State to store restaurant details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch restaurant details based on ID
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/restaurants/${id}`); // Ensure this matches your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch restaurant details');
        }
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!restaurant) {
    return <div className="not-found">Restaurant not found!</div>;
  }

  const handleReserveClick = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check if user is logged in
    if (isLoggedIn) {
      navigate(`/book/${restaurant.id}`);
    } else {
      navigate('/login'); // Redirect to login page if not logged in
    }
  };

  return (
    <div className="restaurant-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      
      {/* Banner Image */}
      <div className="details-banner">
        <img src={`/assests/${restaurant.image}`} alt={restaurant.name} className="restaurant-details-img" />
      </div>
      
      {/* Restaurant Details */}
      <div className="restaurant-details-content">
        <h1 className="restaurant-name">{restaurant.name}</h1>
        <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
        <p><strong>Location:</strong> {restaurant.location}</p>
        <p><strong>Rating:</strong> ⭐ {restaurant.rating}/5</p>
        <p><strong>Seats Available:</strong> {restaurant.seats_available}</p>
        <p className="restaurant-description">{restaurant.description}</p>

        <h3>Most Popular Dishes:</h3>
        <p>{restaurant.most_popular_dishes}</p>

        <button className="reserve-btn" onClick={handleReserveClick}>
          Make a Reservation
        </button>
      </div>
    </div>
  );
};

export default RestaurantDetails;
