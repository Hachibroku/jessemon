const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

// Load environment variables from .env file
require('dotenv').config();

// Get the username and password from environment variables
const USER_NAME = process.env.USER_NAME;
const USER_PASSWORD = process.env.USER_PASSWORD;

const url = `mongodb+srv://${USER_NAME}:${USER_PASSWORD}@cluster0.ezwsx6w.mongodb.net/?retryWrites=true&w=majority`;

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB using Mongoose
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Import the Pokemon routes
const pokemonRoutes = require('./pokemonRoutes');
const evolutionRoutes = require('./evolutionRoutes');

// Use the Pokemon routes
app.use('/api', pokemonRoutes);
app.use('/api', evolutionRoutes);

// Start the Express server
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
