import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/BookingPage.css'; // Ensure you have this file for styling

function BookingPage() {
  const { id } = useParams(); // Restaurant ID from URL
  const navigate = useNavigate();

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [reservationDate, setReservationDate] = useState('');
  const [userId, setUserId] = useState(null); // User ID will be dynamically set (e.g., from login)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // To store error messages

  // Simulate getting user info (you can replace this with your actual logic)
  useEffect(() => {
    const loggedInUser = localStorage.getItem('userId'); // Example: fetching from local storage
    if (loggedInUser) {
      setUserId(loggedInUser);
    }
  }, []);

  const handleBooking = async () => {
    // Validation for adults and children
    if (adults <= 0 && children <= 0) {
      alert('Please enter at least one adult or child.');
      return;
    }

    // Date validation (cannot be in the past)
    if (!reservationDate || new Date(reservationDate) < new Date()) {
      alert('Please select a valid reservation date.');
      return;
    }

    // Ensure only the date is sent (no time component)
    const formattedDate = new Date(reservationDate).toISOString().split('T')[0];

    const bookingData = {
      restaurant_id: id, // This is the restaurant ID from the URL
      adults,
      children,
      reservation_date: formattedDate, // Only the date part
      userId,
    };

    setLoading(true); // Set loading state to true while making request
    setError(null); // Reset error state before making a request

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/reservation_details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to book the table. Please try again.');
      }

      const responseJson = await response.json();

      if (responseJson.reservationId) {
        alert(`Booking confirmed! Your reservation ID is: ${responseJson.reservationId}`);
        navigate('/'); // Redirect to homepage or confirmation page
      } else {
        throw new Error('Unexpected response. No booking ID returned.');
      }
    } catch (error) {
      console.error('Error during booking:', error);
      setError(error.message); // Store the error message in the state
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="booking-page">
      <h2>Book a Table</h2>
      {error && <div className="error-message">{error}</div>} {/* Show error message if any */}
      <div className="booking-form">
        <label>
          Number of Adults:
          <input
            type="number"
            value={adults}
            onChange={(e) => setAdults(parseInt(e.target.value) || 0)}
            min="0"
          />
        </label>
        <label>
          Number of Children:
          <input
            type="number"
            value={children}
            onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
            min="0"
          />
        </label>

        <label>
          Reservation Date:
          <input
            type="date"
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
            required
          />
        </label>

        <button onClick={handleBooking} disabled={loading}>
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
}

export default BookingPage;
