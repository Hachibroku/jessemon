import React, { useState, useEffect } from "react";
import axios from "axios";

function PokemonGuesser() {
  const [randomPokemon, setRandomPokemon] = useState(null);

  useEffect(() => {
    function getRandomPokemonId() {
      return Math.floor(Math.random() * 1010) + 1;
    }
    const randomId = getRandomPokemonId();

    axios
      .get(`http://localhost:3000/api/pokemon/${randomId}/`)
      .then((response) => {
        setRandomPokemon(response.data);
      })
      .catch((error) => {
        console.error("Error fetching random Pokémon data:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Guess the Pokémon</h5>
          <p className="card-text">Can you guess the name of this Pokémon?</p>
          {randomPokemon && (
            <img
              src={randomPokemon.picture_url}
              alt={randomPokemon.name}
              className="card-img-top"
            />
          )}
          <form>
            <div className="mb-3">
              <label className="form-label">Your Guess</label>
              <input type="text" className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PokemonGuesser;
