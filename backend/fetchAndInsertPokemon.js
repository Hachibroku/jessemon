const axios = require('axios');
const mongoose = require('mongoose');

// MongoDB Atlas connection string
const mongoUri = "mongodb+srv://jessejento:xfCCgKRdjCVrckaO@cluster0.ezwsx6w.mongodb.net/?retryWrites=true&w=majority";

// Create a Mongoose model for Pokemon
const Pokemon = mongoose.model('Pokemon', new mongoose.Schema({
  name: String,
  height: Number,
  weight: Number,
  picture_url: String,
  id: Number,
  types: String, // Modified to store types as a single string
}));

// Function to fetch Pokemon information by ID from the PokeAPI and insert into the database
async function fetchAndInsertPokemonData(pokemonId) {
  const getUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
  const postUrl = "http://localhost:3000/api/pokemon/";

  try {
    const response = await axios.get(getUrl);
    const pokemonData = response.data;

    const types = [];
    pokemonData.types.forEach((typeObj) => {
      types.push(typeObj.type.name);
    });
    const typesString = types.join(', ');

    const newPokemon = {
      name: pokemonData.name,
      height: pokemonData.height,
      weight: pokemonData.weight,
      picture_url: pokemonData.sprites.front_default,
      id: pokemonData.id,
      types: typesString,
    };

    console.log(newPokemon)
    const postResponse = await axios.post(postUrl, newPokemon);

    console.log(`Pokemon ID ${pokemonData.id} created: ${postResponse.data.name}`);
  } catch (error) {
    console.error(`Error fetching Pokemon information and creating in the database for ID ${pokemonId}:`, error);
  }
}

// Define the range of Pokemon IDs to fetch (1 to 1292)
const startId = 1;
const endId = 1010;

for (let pokemonId = startId; pokemonId <= endId; pokemonId++) {
  fetchAndInsertPokemonData(pokemonId);
}
