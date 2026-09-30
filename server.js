require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware to parse JSON and allow CORS
app.use(cors());
app.use(express.json());

// Database connection
const PORT = process.env.PORT || 5000;
// We use environment variables to store sensitive data like connection strings
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/azure_mern_db';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working! Hello from Azure!' });
});

// Serve static files from the React frontend app
// This is necessary to host both backend and frontend on Azure App Service
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
