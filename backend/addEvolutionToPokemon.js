const axios = require('axios');

async function updatePokemonPlaceById(id) {
  // Send a GET request to get the "place" field
  try {
    const getResponse = await axios.get(`http://localhost:3000/api/evolution/${id}`);
    const place = getResponse.data.place; // Assuming "place" is in the response

    // Increment the place by one, but not higher than 3
    const updatedPlace = Math.min(place + 1, 3);

    // Send a PATCH request to update the Pokemon by ID
    const patchResponse = await axios.patch(`http://localhost:3000/api/pokemon/${id}`, { place: updatedPlace });

    console.log(`Updated place for Pokemon with ID ${id} to ${updatedPlace}`);
  } catch (error) {
    console.error(`Error updating Pokemon with ID ${id}:`, error);
  }
}

// Define the range of Pokemon IDs to update
const startId = 1;
const endId = 1010;

// Loop through the IDs and update the Pokemon
for (let id = startId; id <= endId; id++) {
  updatePokemonPlaceById(id);
}
