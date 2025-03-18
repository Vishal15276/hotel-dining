import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/BookingsPage.css';

function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  // Fetch the booking details from the server
  const fetchBookings = async () => {
    try {
      const userEmail = "user@example.com"; // Replace with the logged-in user's email
      const response = await axios.get('http://localhost:3000/api/reservation_details', {
        params: { email: userEmail },
      });

      // Ensure each booking has a status field (set default to 'pending' if missing)
      const updatedBookings = response.data.map((booking) => ({
        ...booking,
        status: booking.status || 'pending', // Default to 'pending'
      }));

      // Sort the bookings: pending first
      updatedBookings.sort((a, b) => (a.status === 'pending' ? -1 : 1));

      setBookings(updatedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings(); // Fetch bookings when the page loads
  }, []);

  return (
    <div className="bookings-page">
      <h2>Booking Details</h2>
      <div className="booking-list">
        <table>
          <thead>
            <tr>
              <th>Restaurant Name</th>
              <th>Adults</th>
              <th>Children</th>
              <th>Reservation Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.restaurant_name}</td>
                  <td>{booking.adults}</td>
                  <td>{booking.children}</td>
                  <td>{new Date(booking.reservation_date).toLocaleString()}</td>
                  <td>
                    <span>{booking.status === 'pending' ? 'Pending' : 'Accepted'}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No bookings available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingsPage;
