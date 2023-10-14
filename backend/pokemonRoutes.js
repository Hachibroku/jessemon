const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');


// Middleware for parsing JSON and URL-encoded data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Define a Mongoose schema for Pokemon
const pokemonSchema = new mongoose.Schema({
  name: String,
  height: Number,
  weight: Number,
  picture_url: String,
  id: Number,
  types: String,
  evolution: Number
});

// Create a Mongoose model for Pokemon
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

// Create a new Pokemon
router.post('/pokemon', async (req, res) => {
  try {
    const { name, height, weight, picture_url, id, types } = req.body;
    const pokemon = new Pokemon({ name, height, weight, picture_url, id, types });
    await pokemon.save();
    res.json(pokemon);
  } catch (error) {
    console.error('Error creating Pokemon:', error);
    res.status(500).json({ error: 'Error creating Pokemon' });
  }
});

// Get all Pokemon
router.get('/pokemon', async (req, res) => {
  try {
    const pokemonList = await Pokemon.find().sort({id: 1});
    res.json(pokemonList);
  } catch (error) {
    console.error('Error getting Pokemon:', error);
    res.status(500).json({ error: 'Error getting Pokemon' });
  }
});

// Get a specific Pokemon by ID
router.get('/pokemon/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ id: req.params.id });
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    res.json(pokemon);
  } catch (error) {
    console.error('Error getting Pokemon by ID:', error);
    res.status(500).json({ error: 'Error getting Pokemon by ID' });
  }
});

// Get a specific Pokemon by name
router.get('/pokemon/name/:name', async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ name: req.params.name });
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    res.json(pokemon);
  } catch (error) {
    console.error('Error getting Pokemon by name:', error);
    res.status(500).json({ error: 'Error getting Pokemon by name' });
  }
});

// Update a specific Pokemon by ID
router.patch('/pokemon/:id', async (req, res) => {
  try {
    const updatedPokemon = await Pokemon.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!updatedPokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    res.json(updatedPokemon);
  } catch (error) {
    console.error('Error updating Pokemon by ID:', error);
    res.status(500).json({ error: 'Error updating Pokemon by ID' });
  }
});

// Delete a specific Pokemon by ID
router.delete('/pokemon/:id', async (req, res) => {
  try {
    const deletedPokemon = await Pokemon.findOneAndDelete(req.params.id);
    if (!deletedPokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    res.json(deletedPokemon);
  } catch (error) {
    console.error('Error deleting Pokemon by ID:', error);
    res.status(500).json({ error: 'Error deleting Pokemon by ID' });
  }
});

module.exports = router;
