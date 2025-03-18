  import React, { useState, useEffect } from 'react';
  import '../styles/RestaurantGridAndList.css';
  import Footer from './Footer';
  import { useNavigate } from 'react-router-dom';

  const RestaurantGridAndList = ({ selectedCity }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [cuisineFilter, setCuisineFilter] = useState("");
    const [tagFilter, setTagFilter] = useState("");
    const navigate = useNavigate();

    const cuisines = [
      'North Indian',
      'Chinese',
      'Fast Food',
      'South Indian',
      'Chettinad',
    ];

    const tags = [
      'Veg',
      'Non-Veg',
    ];

    // Fetch restaurant data from the API
    useEffect(() => {
      const fetchRestaurants = async () => {
        const url = selectedCity 
          ? `http://localhost:3000/api/restaurants?city=${selectedCity}`
          : 'http://localhost:3000/api/restaurants';
        
        try {
          const response = await fetch(url);
          const data = await response.json();
          console.log('Fetched restaurant data:', data);
          setRestaurants(data);
        } catch (error) {
          console.error('Error fetching restaurant data:', error);
        }
      };

      fetchRestaurants();
    }, [selectedCity]);

    const handleCuisineFilterClick = (cuisine) => {
      setCuisineFilter((prevFilter) => (prevFilter === cuisine ? "" : cuisine));
    };

    const handleTagFilterClick = (tag) => {
      setTagFilter((prevFilter) => (prevFilter === tag ? "" : tag));
    };

    const filteredRestaurants = restaurants.filter((restaurant) => {
      const matchesCuisine = cuisineFilter ? restaurant.cuisine === cuisineFilter : true;
      const matchesTag = tagFilter 
        ? (tagFilter === 'Veg' ? restaurant.is_veg === true : restaurant.is_veg === false) 
        : true; 
      return matchesCuisine && matchesTag;
    });

    const handleViewDetails = (id) => {
      navigate(`/restaurant/${id}`);
    };

    return (
      <div>
        <div className="restaurant-grid-container">
          <div className="restaurant-grid-sidebar">
            <h2 className="restaurant-grid-title">Quick Filters</h2>
            <div className="restaurant-grid-filter-section">
              <h3 className="restaurant-grid-subtitle">Cuisines</h3>
              <ul className="restaurant-grid-list">
                {cuisines.map((cuisine) => (
                  <li
                    key={cuisine}
                    className={`restaurant-grid-list-item ${cuisineFilter === cuisine ? 'active' : ''}`}
                    onClick={() => handleCuisineFilterClick(cuisine)}
                  >
                    {cuisine}
                  </li>
                ))}
              </ul>
            </div>
            <div className="restaurant-grid-filter-section">
              <h3 className="restaurant-grid-subtitle">Tags</h3>
              <ul className="restaurant-grid-list">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className={`restaurant-grid-list-item ${tagFilter === tag ? 'active' : ''}`}
                    onClick={() => handleTagFilterClick(tag)}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="restaurant-list">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="restaurant-card">
                <img src={`/assests/${restaurant.image}`} alt={restaurant.name} className="restaurant-img" />
                <div className="restaurant-info">
                  <h3 className={`restaurant-name-h3 ${restaurant.name === "Sangeetha Veg Restaurant" ? 'restaurant-name-h3-summa' : ''} `}>{restaurant.name}</h3>
                  <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
                  <p><strong>Location:</strong> {restaurant.location}</p>
                  <p><strong>Rating:</strong> ⭐ {restaurant.rating}/5</p>
                  <button className="view-details-btn" onClick={() => handleViewDetails(restaurant.id)}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  export default RestaurantGridAndList;
