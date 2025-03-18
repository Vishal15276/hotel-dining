const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json()); // Parse JSON bodies
app.use(
  cors({
    origin: 'http://localhost:3001', // Adjust to match your React app's URL
  })
);

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'localhost', // Your MySQL host
  user: 'root', // Your MySQL username
  password: 'vishal2005', // Your MySQL password
  database: 'hotel_dining', // Your MySQL database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

/* ------------------ USER ROUTES ------------------ */

// Register route to handle user registration
app.post('/register', (req, res) => {
  const { name, phone, email, password } = req.body;

  const query = `INSERT INTO users (name, phone_number, email, password) VALUES (?, ?, ?, ?)`;
  db.query(query, [name, phone, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting user into the database:', err);
      return res.status(500).send({ message: 'Error inserting user into the database' });
    }
    res.status(200).send({ message: 'User registered successfully' });
  });
});

// Login route to handle user login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).send({ message: 'Error fetching user from the database' });
    }
    if (result.length > 0) {
      res.status(200).json({ message: 'Login successful', user: result[0] });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});

// Fetch user details by email
app.get('/api/user-details', (req, res) => {
  const { email } = req.query;

  const query = `SELECT name, email FROM users WHERE email = ?`;
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Error fetching user details:', err);
      return res.status(500).send({ message: 'Error fetching user details' });
    }
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  });
});

/* ------------------ RESTAURANT ROUTES ------------------ */

// Add a new restaurant to the database
app.post('/api/restaurants', (req, res) => {
  const { name, image, cuisine, location, rating, is_veg, most_popular_dishes, city, seats_available } = req.body;

  // Check if all required fields are provided
  if (!name || !image || !cuisine || !location || !rating || !seats_available) {
    return res.status(400).send({ message: 'All required fields must be provided' });
  }

  const query = `
    INSERT INTO restaurants (name, image, cuisine, location, rating, is_veg, most_popular_dishes, city, seats_available)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Convert the is_veg to a boolean value (if it's not provided as a boolean)
  const isVeg = is_veg === 'true' || is_veg === true;

  db.query(query, [name, image, cuisine, location, rating, isVeg, most_popular_dishes, city, seats_available], (err, result) => {
    if (err) {
      console.error('Error adding restaurant:', err);
      return res.status(500).send({ message: 'Error adding restaurant' });
    }
    res.status(201).send({ message: 'Restaurant added successfully', restaurantId: result.insertId });
  });
});



/* ------------------ RESTAURANT ROUTES ------------------ */

// Delete a restaurant by ID
app.delete('/api/restaurants/:id', (req, res) => {
  const restaurantId = req.params.id;

  const query = 'DELETE FROM restaurants WHERE id = ?';

  db.query(query, [restaurantId], (err, result) => {
    if (err) {
      console.error('Error deleting restaurant:', err);
      return res.status(500).send({ message: 'Error deleting restaurant' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Restaurant not found' });
    }
    res.status(200).send({ message: 'Restaurant deleted successfully' });
  });
});



/* ------------------ ADMIN ROUTES ------------------ */

// Admin login route
app.post('/admin-login', (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM admins WHERE email = ? AND password = ?`;
  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error('Error fetching admin:', err);
      return res.status(500).send({ message: 'Error fetching admin from the database' });
    }
    if (result.length > 0) {
      res.status(200).json({ success: true, message: 'Admin login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  });
});

/* ------------------ RESTAURANT ROUTES ------------------ */

// Fetch all restaurant data with optional filtering
app.get('/api/restaurants', (req, res) => {
  const { cuisine, isVeg, city } = req.query;

  let query = 'SELECT * FROM restaurants';
  const queryParams = [];
  const conditions = [];

  if (cuisine) {
    conditions.push('cuisine = ?');
    queryParams.push(cuisine);
  }

  if (isVeg) {
    conditions.push('is_veg = ?');
    queryParams.push(isVeg === 'true');
  }

  if (city) {
    conditions.push('location LIKE ?');
    queryParams.push(`%${city}%`);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  db.query(query, queryParams, (err, result) => {
    if (err) {
      console.error('Error fetching restaurant data:', err);
      return res.status(500).send({ message: 'Error fetching restaurant data' });
    }
    res.status(200).json(result);
  });
});

// Fetch restaurant details by ID
app.get('/api/restaurants/:id', (req, res) => {
  const restaurantId = req.params.id;

  const query = 'SELECT * FROM restaurants WHERE id = ?';
  db.query(query, [restaurantId], (err, result) => {
    if (err) {
      console.error('Error fetching restaurant details:', err);
      return res.status(500).send({ message: 'Error fetching restaurant details' });
    }
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).send({ message: 'Restaurant not found' });
    }
  });
});

// Fetch top 10 restaurants based on rating
app.get('/api/top-rated-restaurants', (req, res) => {
  const query = `
    SELECT * FROM restaurants
    ORDER BY rating DESC
    LIMIT 10
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching top restaurants:', err);
      return res.status(500).send({ message: 'Error fetching top restaurants' });
    }
    res.status(200).json(result);
  });
});

/* ------------------ RESERVATION ROUTES ------------------ */

// Create a reservation
app.post('/api/reservation_details', (req, res) => {
  const { restaurant_id, adults, children, reservation_date } = req.body;

  // Extract only the date portion
  const formattedDate = new Date(reservation_date).toISOString().split('T')[0];

  const query = 'INSERT INTO reservation_details (restaurant_id, adults, children, reservation_date) VALUES (?, ?, ?, ?)';
  db.query(query, [restaurant_id, adults, children, formattedDate], (err, result) => {
    if (err) {
      console.error('Error adding reservation:', err);
      return res.status(500).send({ message: 'Error adding reservation' });
    }
    res.status(201).send({ message: 'Reservation created successfully', reservationId: result.insertId });
  });
});

// Fetch all reservations
app.get('/api/reservation_details', (req, res) => {
  const query = `
    SELECT 
      r.name AS restaurant_name,
      rd.adults,
      rd.children,
      rd.reservation_date
    FROM 
      reservation_details rd
    JOIN 
      restaurants r ON rd.restaurant_id = r.id
    ORDER BY rd.reservation_date DESC
  `;
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching reservation details:', err);
      return res.status(500).send({ message: 'Error fetching reservation details' });
    }
    res.status(200).json(result);
  });
});

app.put('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'accepted' or 'declined'

  const query = 'UPDATE bookings SET status = ? WHERE id = ?';
  connection.query(query, [status, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Booking status updated' });
  });
});



/* ------------------ SERVER CONFIGURATION ------------------ */

// Server configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
