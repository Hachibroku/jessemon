const axios = require('axios');
const mongoose = require('mongoose');

// Create a Mongoose model for Evolution
const Evolution = mongoose.model('Evolution', new mongoose.Schema({
  id: Number,
  pokemonId: [Number],
}));

// Function to fetch Evolution Chain information by ID from the PokeAPI and insert into the database
async function fetchAndInsertEvolutionChainData(chainId) {
  const getUrl = `https://pokeapi.co/api/v2/evolution-chain/${chainId}/`;
  const postUrl = "http://localhost:3000/api/evolution/";

  try {
    const response = await axios.get(getUrl);
    const chainData = response.data;

    const evolutionIds = [];

    // Create a function to extract the IDs used in the URL
    const extractEvolutionIds = (chain) => {
      if (chain && chain.species && chain.species.url) {
        const match = chain.species.url.match(/\/(\d+)\/$/);
        if (match && match[1]) {
          evolutionIds.push(Number(match[1]));
        }

        if (chain.evolves_to && chain.evolves_to.length > 0) {
          chain.evolves_to.forEach((subChain) => {
            extractEvolutionIds(subChain);
          });
        }
      };
    };

    if (chainData && chainData.chain) {
      extractEvolutionIds(chainData.chain);
    }

    const newEvolution = {
      id: chainId,
      pokemonId: evolutionIds,
    };

    console.log(newEvolution);
    const postResponse = await axios.post(postUrl, newEvolution);

    console.log(`Evolution Chain ID ${chainId} created: ${postResponse.data.id}`);
  } catch (error) {
    console.error(`Error fetching Evolution Chain information and creating in the database for Chain ID ${chainId}:`, error);
  }
}

// Define the range of Evolution Chain IDs to fetch
const startChainId = 1;
const endChainId = 535;

for (let chainId = startChainId; chainId <= endChainId; chainId++) {
  fetchAndInsertEvolutionChainData(chainId);
}
