const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');


// Middleware for parsing JSON and URL-encoded data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Define a Mongoose schema for Pokemon
const evolutionSchema = new mongoose.Schema({
  id: Number,
  pokemonId: [Number],
});

// Create a Mongoose model for Pokemon
const Evolution = mongoose.model('Evolution', evolutionSchema);

// Create a new Pokemon
router.post('/evolution', async (req, res) => {
  try {
    const {  id, pokemonId } = req.body;
    const evolution = new Evolution({ id, pokemonId });
    await evolution.save();
    res.json(evolution);
  } catch (error) {
    console.error('Error creating evolution:', error);
    res.status(500).json({ error: 'Error creating evolution' });
  }
});

// Get all Pokemon
router.get('/evolution', async (req, res) => {
  try {
    const evolutionList = await Evolution.find().sort({id: 1});
    res.json(evolutionList);
  } catch (error) {
    console.error('Error getting evolution:', error);
    res.status(500).json({ error: 'Error getting evolution' });
  }
});

router.get('/evolution/:id', async (req, res) => {
    try {
      const evolution = await Evolution.findOne({ pokemonId: req.params.id });
      if (!evolution) {
        return res.status(404).json({ error: 'Pokemon not found in any evolution chain' });
      }

      // Find the index of the requested ID in the pokemonId array
      const place = evolution.pokemonId.indexOf(Number(req.params.id));
      if (place === -1) {
        return res.status(404).json({ error: 'Pokemon not found in any evolution chain' });
      } else {
        res.json({ place });
      }
    } catch (error) {
      console.error('Error getting Evolution by Pokemon ID:', error);
      res.status(500).json({ error: 'Error getting evolution by Pokemon ID' });
    }
  });



module.exports = router;
