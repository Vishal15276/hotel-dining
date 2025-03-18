import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Register.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!name) {
      valid = false;
      errors.name = 'Name is required';
    }

    if (!phone) {
      valid = false;
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      valid = false;
      errors.phone = 'Phone number must be exactly 10 digits';
    }

    if (!email) {
      valid = false;
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      valid = false;
      errors.email = 'Email is invalid';
    }

    if (!password) {
      valid = false;
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      valid = false;
      errors.password = 'Password must be at least 6 characters long';
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(''); // Reset success message
    setErrorMessage('');   // Reset error message

    if (validate()) {
      const userData = { name, phone, email, password };
      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          setSuccessMessage('User registered successfully!');
          console.log('User registered successfully');
        } else {
          const errorResponse = await response.json();
          setErrorMessage(errorResponse.message || 'Error registering user');
          console.error('Error registering user');
        }
      } catch (error) {
        setErrorMessage('Error: Unable to register. Please try again.');
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="registerbox">
      <h1>Register Here</h1>
      <form onSubmit={handleSubmit}>
        {errors.name && <p className="error">{errors.name}</p>}
        <p>Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
        />

        {errors.phone && <p className="error">{errors.phone}</p>}
        <p>Phone Number</p>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter Phone Number"
        />

        {errors.email && <p className="error">{errors.email}</p>}
        <p>Email</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />

        {errors.password && <p className="error">{errors.password}</p>}
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />

        <input type="submit" value="Register" />

        {successMessage && <p className="success">{successMessage}</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}

        <div className="reg-log">
          <h4>If you already registered</h4>
          <Link to="/login" className="now">Login here</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
