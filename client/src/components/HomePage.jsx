import React, { useState, useEffect } from 'react';
import Header from './Header';
import '../styles/homePage.css';
import Footer from './Footer';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [topRatedRestaurants, setTopRatedRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopRatedRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/top-rated-restaurants');
        if (!response.ok) throw new Error('Failed to fetch top-rated restaurants');
        const data = await response.json();
        setTopRatedRestaurants(data);
      } catch (error) {
        console.error('Error fetching top-rated restaurants:', error);
      }
    };

    fetchTopRatedRestaurants();
  }, []);

  useEffect(() => {
    const fetchAllRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/restaurants');
        if (!response.ok) throw new Error('Failed to fetch all restaurants');
        const data = await response.json();
        setAllRestaurants(data);
        setFilteredRestaurants(data);
      } catch (error) {
        console.error('Error fetching all restaurants:', error);
      }
    };

    fetchAllRestaurants();
  }, []);

  useEffect(() => {
    const filtered = allRestaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRestaurants(filtered);
    setCurrentIndex(0);
  }, [searchQuery, allRestaurants]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % topRatedRestaurants.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? topRatedRestaurants.length - 1 : prevIndex - 1
    );
  };

  const handleViewDetails = (id) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <>
      <div className="home-header">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="home-page">
        {searchQuery ? (
          <div>
            <h2 className="search-results-heading">Search Results</h2>
            <div className="search-results">
              {filteredRestaurants.length > 0 ? (
                filteredRestaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="hotel-card"
                    onClick={() => handleViewDetails(restaurant.id)}
                  >
                    <img
                      src={`/assests/${restaurant.image}`} // Use relative path from public
                      alt={restaurant.name}
                      className="hotel-img"
                    />
                    <h3>{restaurant.name}</h3>
                    <p>Location: {restaurant.location}</p>
                    <p>Rating: {restaurant.rating}</p>
                    <p>{restaurant.description}</p>
                  </div>
                ))
              ) : (
                <p>No restaurants found matching your search.</p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="top-rated-heading">Top 10 Restaurants</h2>
            <div className="top-rated-hotels">
              {topRatedRestaurants.length > 0 ? (
                <div className="hotel-slider">
                  <button onClick={handlePrev} aria-label="Previous">
                    <FaArrowLeft />
                  </button>
                  <div
                    className="hotel-card"
                    onClick={() => handleViewDetails(topRatedRestaurants[currentIndex]?.id)}
                  >
                    <img
                      src={`/assests/${topRatedRestaurants[currentIndex]?.image}`} // Use relative path from public
                      alt={topRatedRestaurants[currentIndex]?.name}
                      className="hotel-img"
                    />
                    <h3 className='hotel-card-h3'>{topRatedRestaurants[currentIndex]?.name}</h3>
                    <p>Location: {topRatedRestaurants[currentIndex]?.location}</p>
                    <p>Rating: {topRatedRestaurants[currentIndex]?.rating}</p>
                    <p>{topRatedRestaurants[currentIndex]?.description}</p>
                  </div>
                  <button onClick={handleNext} aria-label="Next">
                    <FaArrowRight />
                  </button>
                </div>
              ) : (
                <p>No top-rated restaurants found.</p>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
