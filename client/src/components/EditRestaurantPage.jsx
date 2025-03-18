import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/EditRestaurantPage.css';

function EditRestaurantPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState({
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

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/restaurants/${id}`);
        setRestaurant(response.data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurant();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRestaurant({
      ...restaurant,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRestaurant((prevState) => ({
          ...prevState,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (imageFile) {
      formData.append('image', imageFile);
    }
    formData.append('name', restaurant.name);
    formData.append('cuisine', restaurant.cuisine);
    formData.append('location', restaurant.location);
    formData.append('rating', restaurant.rating);
    formData.append('is_veg', restaurant.is_veg);
    formData.append('most_popular_dishes', restaurant.most_popular_dishes);
    formData.append('city', restaurant.city);
    formData.append('seats_available', restaurant.seats_available);

    try {
      await axios.put(`http://localhost:3000/api/restaurants/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/admin');
    } catch (error) {
      console.error('Error updating restaurant:', error);
    }
  };

  return (
    <div className="manage-restaurant-page">
      <h2 className="page-title">Edit Restaurant Details</h2>

      <form onSubmit={handleSubmit} className="restaurant-form">
        <div className="form-group">
          <label>Restaurant Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter restaurant name"
            value={restaurant.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {restaurant.image && (
            <div className="image-preview">
              <img
                src={restaurant.image}
                alt="Restaurant Preview"
                className="preview-img"
              />
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Cuisine</label>
          <input
            type="text"
            name="cuisine"
            placeholder="Enter cuisine type"
            value={restaurant.cuisine}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={restaurant.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Rating</label>
          <input
            type="number"
            name="rating"
            placeholder="Enter rating"
            value={restaurant.rating}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>
            Vegetarian?
            <input
              type="checkbox"
              name="is_veg"
              checked={restaurant.is_veg}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>Popular Dishes</label>
          <input
            type="text"
            name="most_popular_dishes"
            placeholder="Enter popular dishes"
            value={restaurant.most_popular_dishes}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder="Enter city"
            value={restaurant.city}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Seats Available</label>
          <input
            type="number"
            name="seats_available"
            placeholder="Enter seats available"
            value={restaurant.seats_available}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-btn">Update Restaurant</button>
      </form>
    </div>
  );
}

export default EditRestaurantPage;
