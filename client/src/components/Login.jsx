import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;

    if (!email) {
      valid = false;
      alert('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      valid = false;
      alert('Email is invalid');
    }

    if (!password) {
      valid = false;
      alert('Password is required');
    } else if (password.length < 6) {
      valid = false;
      alert('Password must be at least 6 characters long');
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          
           // "Login successful"
          setIsLoggedIn(true);  // Set the user as logged in
          navigate('/');  // Redirect to the homepage after login
        } else {
          const data = await response.json();
          alert(data.message); // "Invalid email or password"
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="loginbox">
      <img src="logo.gif" className="avatar" alt="Avatar" />

      <h1>Login Here</h1>
      <form onSubmit={handleSubmit}>
        <p>Email</p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />

        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />

        <input type="submit" value="Login" />
        <div className="reg-log">
          <h4>If you don't have an account</h4>
          <Link to="/register" className="now">Register Now</Link>

          <div>
          <Link to="/admin-login" className="now">AdminLogin</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
