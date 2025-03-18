import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import HomePage from './components/HomePage';
import RestaurantGridAndList from './components/RestaurantGridAndList';
import React, { useState, useEffect } from 'react';
import BookingPage from './components/BookingPage';
import BookingsPage from './components/BookingsPage';

import HotelCards from './components/HotelCards';
import Header from './components/Header';
import RestaurantDetails from './components/RestaurentDetails';
import About from './components/About';
import './styles/About.css';
import './styles/RestaurantGridAndList.css';
import AdminLogin from './components/AdminLogin';
import AdminPage from './components/AdminPage';
import EditRestaurantPage from './components/EditRestaurantPage';
import AddRestaurant from './components/AddRestaurant'; // Import the AddRestaurant component

// Protected Route Component for User
function ProtectedRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/login" />;
}

// Protected Route Component for Admin
function AdminProtectedRoute({ isAdmin, children }) {
  return isAdmin ? children : <Navigate to="/admin-login" />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });
  const [selectedCity, setSelectedCity] = useState(''); // State for selected city

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('isAdmin', isAdmin);
  }, [isAdmin]);

  return (
    <Router>
      <Navbar 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
        setSelectedCity={setSelectedCity} 
      />
      <Routes>
        <Route path="/header" element={<Header />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/hotel-cards" element={<HotelCards />} />
        <Route path="/book-table" element={<RestaurantGridAndList selectedCity={selectedCity} />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin-login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />

        {/* Restaurant Details Route */}
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />

        {/* Edit Restaurant Route - Protected for Admin */}
        <Route
          path="/admin/edit/:id"
          element={
            <AdminProtectedRoute isAdmin={isAdmin}>
              <EditRestaurantPage />
            </AdminProtectedRoute>
          }
        />

        {/* Add New Restaurant - Protected for Admin */}
        <Route
          path="/admin/add"
          element={
            <AdminProtectedRoute isAdmin={isAdmin}>
              <AddRestaurant />
            </AdminProtectedRoute>
          }
        />

<Route
  path="/admin/bookings"
  element={
    <AdminProtectedRoute isAdmin={isAdmin}>
      <BookingsPage />
    </AdminProtectedRoute>
  }
/>


        {/* Protect the BookingPage route */}
        <Route
          path="/book/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <BookingPage />
            </ProtectedRoute>
          }
        />

        {/* Protect the AdminPage route */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute isAdmin={isAdmin}>
              <AdminPage />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
