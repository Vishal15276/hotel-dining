import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/HotelDetails.css'; // Import the CSS file
function HotelDetails({ hotels, isLoggedIn }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = hotels[id]; // Access hotel by ID

  if (!hotel) {
    return <p>Hotel not found</p>;
  }

  const handleBookTable = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      // Booking logic here
      navigate('/book/:id');
    }
  };

  return (
    <div className="hotel-details">
      <h2>{hotel.name}</h2>
      <img src={hotel.image} alt={hotel.name} />
      <div className='book1'>
      <p>Rating: {hotel.rating}</p>
      <p>Location: {hotel.location}</p>
      <p>Foods Served: {hotel.foodsServed.join(', ')}</p>
      <p>Timings: {hotel.timings}</p>
      <button onClick={handleBookTable}>Book a Table</button>
      </div>
    </div>
  );
}

export default HotelDetails;
