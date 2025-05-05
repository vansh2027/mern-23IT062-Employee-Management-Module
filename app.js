const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Check if MONGODB_URI is defined
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in .env file');
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    // Check if the database exists
    const db = mongoose.connection.db;
    db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error('Error listing collections:', err);
        return;
      }
      console.log('Available collections:', collections.map(c => c.name));
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if database connection fails
  });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employees', require('./routes/employees'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
