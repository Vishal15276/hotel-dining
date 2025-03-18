import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AddRestaurant.css';

function AddRestaurant() {
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    image: '',
    cuisine: '',
    location: '',
    rating: '',
    is_veg: false,
    most_popular_dishes: '',
    city: '',
    seats_available: '',
  });

  const [isFormOpen, setIsFormOpen] = useState(true); // State to toggle form visibility
  const navigate = useNavigate();

  const addRestaurant = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/restaurants', newRestaurant);
      navigate('/admin'); // Redirect back to the admin page
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  };

  const closeForm = () => {
    setIsFormOpen(false); // Set form visibility to false
  };

  return (
    <div>
      {isFormOpen && (
        <div className="overlay-background">
          <div className="restaurant-form-container">
            <button className="close-button" onClick={closeForm}>X</button> {/* Close button */}
            <h2 className="form-heading">Add New Restaurant</h2>
            <form className="form-layout" onSubmit={addRestaurant}>
              <input
                className="form-input"
                type="text" 
                placeholder="Restaurant Name"
                value={newRestaurant.name}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
              />
              <input
                className="form-input"
                type="text"
                placeholder="Image URL"
                value={newRestaurant.image}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, image: e.target.value })}
              />
              <input
                className="form-input"
                type="text"
                placeholder="Cuisine"
                value={newRestaurant.cuisine}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, cuisine: e.target.value })}
              />
              <input
                className="form-input"
                type="text"
                placeholder="Location"
                value={newRestaurant.location}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, location: e.target.value })}
              />
              <input
                className="form-input"
                type="number"
                placeholder="Rating"
                value={newRestaurant.rating}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, rating: e.target.value })}
              />
              <label>
                Is Vegetarian?
                <input
                  type="checkbox"
                  checked={newRestaurant.is_veg}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, is_veg: e.target.checked })}
                />
              </label>
              <input
                className="form-input"
                type="text"
                placeholder="Most Popular Dishes"
                value={newRestaurant.most_popular_dishes}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, most_popular_dishes: e.target.value })}
              />
              <input
                className="form-input"
                type="text"
                placeholder="City"
                value={newRestaurant.city}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, city: e.target.value })}
              />
              <input
                className="form-input"
                type="number"
                placeholder="Seats Available"
                value={newRestaurant.seats_available}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, seats_available: e.target.value })}
              />
              <button className="submit-button" type="submit">Add Restaurant</button>
            </form>
          </div>
        </div>
      )}
      {/* Here, you can add the rest of your page content that remains visible */}
    </div>
  );
}

export default AddRestaurant;
