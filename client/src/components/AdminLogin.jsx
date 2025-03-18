import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminLogin.css';

function AdminLogin({ setIsAdmin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/admin-login', { email, password });
      
      if (response.data.success) {
        setIsAdmin(true);
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during admin login:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="admin-login-container">
      <h2 className="admin-login-title">Admin Login</h2>
      <input
        type="email"
        placeholder="Enter admin email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter admin password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default AdminLogin;
