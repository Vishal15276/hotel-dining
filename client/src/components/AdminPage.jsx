import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AdminPage.css';

function AdminPage() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  // Fetch the list of restaurants
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/restaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  // Delete a restaurant from the system
  const deleteRestaurant = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this restaurant?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/restaurants/${id}`);
        fetchRestaurants(); // Re-fetch the restaurant list after deletion
      } catch (error) {
        console.error('Error deleting restaurant:', error);
      }
    }
  };

  useEffect(() => {
    fetchRestaurants(); // Fetch restaurants when the component mounts
  }, []);

  return (
    <div className="admin-page">
      <h2>Admin Restaurant Management</h2>

      {/* Button container for Add New Restaurant and View Bookings */}
      <div className="button-container">
        <button className="add-restaurant-btn" onClick={() => navigate('/admin/add')}>
          Add New Restaurant
        </button>

        <button className="view-bookings-btn" onClick={() => navigate('/admin/bookings')}>
          View Bookings
        </button>
      </div>

      {/* Restaurant List */}
      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card">
            <div className="restaurant-info">
              <h3>{restaurant.name}</h3>
              <p>{restaurant.location}</p>
              <p>{restaurant.cuisine}</p>
              <p>Rating: {restaurant.rating}</p>
              <p>Popular Dishes: {restaurant.most_popular_dishes}</p>
              <p>City: {restaurant.city}</p>
              <p>Seats Available: {restaurant.seats_available}</p>
            </div>
            {restaurant.image && (
              <div className="restaurant-image">
                <img src={`/assests/${restaurant.image}`} alt={restaurant.name} />
              </div>
            )}
            <div className="restaurant-actions">
              <button onClick={() => deleteRestaurant(restaurant.id)}>Delete</button>
              <Link to={`/admin/edit/${restaurant.id}`}>
                <button>Edit</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
