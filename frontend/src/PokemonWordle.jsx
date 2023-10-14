import React, { useEffect } from "react";
import { useMyStore } from "./store";

function PokemonWordle() {
  const { fetchRandomPokemon, randomPokemon } = useMyStore();

  useEffect(() => {
    // Fetch a random Pokémon when the component mounts
    fetchRandomPokemon();
  }, [fetchRandomPokemon]);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Pokemon Wordle</h5>
          <p className="card-text">Guess the name of the Pokémon!</p>
          {randomPokemon && (
            <>
              <img
                src={randomPokemon.picture_url}
                alt={randomPokemon.name}
                className="card-img-top"
              />
              {/* Display a placeholder for the wordle game */}
              <div className="wordle-placeholder">
                {/* Your wordle game component can go here */}
                {/* Replace the following line with your wordle game component */}
                <p>Wordle Game Placeholder</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokemonWordle;
