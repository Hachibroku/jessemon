import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  convertDecimetersToFeetAndInches,
  convertHectogramsToPounds,
  formatPokemonTypes,
  getPokemonRegion
} from './conversions';


function PokemonList() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    // Fetch Pokémon data from the Express.js server
    axios.get('http://localhost:3000/api/pokemon')
      .then((response) => {
        setPokemonData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Pokémon data:', error);
      });
  }, []);

  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Type</th>
            <th>Evolution</th>
            <th>Region</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {pokemonData.map((pokemon) => (
            <tr key={pokemon.id}>
              <td>{pokemon.id}</td>
              <td>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</td>
              <td>{convertDecimetersToFeetAndInches(pokemon.height)}</td>
              <td>{convertHectogramsToPounds(pokemon.weight)}</td>
              <td>{formatPokemonTypes(pokemon.types)}</td>
              <td>{pokemon.evolution || 'N/A'}</td>
              <td>{getPokemonRegion(pokemon.id)}</td>
              <td>
                <img src={pokemon.picture_url} alt={pokemon.name} width="150" height="150" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PokemonList;
