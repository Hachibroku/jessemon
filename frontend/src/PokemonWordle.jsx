import React, { useEffect, useState } from "react";
import { useMyStore } from "./store";

function PokemonWordle() {
  const {
    randomPokemon,
    pokemonData,
    firstLetterCapital,
    getPokemonRegion,
    regions,
    convertDecimetersToFeetAndInches,
    convertHectogramsToPounds,
  } = useMyStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const filteredPokemons = pokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    setSearchResults(filteredPokemons);
  }, [searchTerm, pokemonData]);

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);

    let feedbackMessage = "";
    let pokemonName = `${firstLetterCapital(pokemon.name)}`;

    if (pokemon.id !== randomPokemon.id) {
      feedbackMessage = `Incorrect! You guessed ${pokemonName}.\n`;

      const clickedTypes = pokemon.types.split(",").map((type) => type.trim());
      const chosenTypes = randomPokemon.types
        .split(",")
        .map((type) => type.trim());
      let shareTypesCount = [];

      if (
        clickedTypes[0] === chosenTypes[0] ||
        clickedTypes[0] === chosenTypes[1]
      ) {
        shareTypesCount.push(clickedTypes[0]);
      }
      if (
        clickedTypes[1] === chosenTypes[0] ||
        (clickedTypes[1] === chosenTypes[1] && clickedTypes != null)
      ) {
        shareTypesCount.push(clickedTypes[1]);
      }
      let count = shareTypesCount.length;

      if (count === 2) {
        feedbackMessage += `${pokemonName} shares both types! (${firstLetterCapital(
          shareTypesCount[0]
        )}/${firstLetterCapital(shareTypesCount[1])} \n`;
      } else if (count === 1) {
        feedbackMessage += `${pokemonName} shares 1 type. (${firstLetterCapital(
          shareTypesCount[0]
        )})\n`;
      } else if (count === 0) {
        feedbackMessage += `${pokemonName} shares 0 types.\n`;
      }

      if (pokemon.weight < randomPokemon.weight) {
        feedbackMessage += `${pokemonName} is lighter.\n`;
      } else if (pokemon.weight > randomPokemon.weight) {
        feedbackMessage += `${pokemonName} is heavier.\n`;
      } else {
        feedbackMessage += `${pokemonName} weighs the same.\n The weight is ${convertHectogramsToPounds(
          pokemon.weight
        )}`;
      }

      if (pokemon.height < randomPokemon.height) {
        feedbackMessage += `${pokemonName} is shorter.\n`;
      } else if (pokemon.height > randomPokemon.height) {
        feedbackMessage += `${pokemonName} is taller.\n`;
      } else {
        feedbackMessage += `${pokemonName} is the same height! (${convertDecimetersToFeetAndInches(
          pokemon.height
        )})\n`;
      }

      if (pokemon.evolution < randomPokemon.evolution) {
        feedbackMessage += `${pokemonName} is in an earlier stage of evolution.\n`;
      } else if (pokemon.evolution > randomPokemon.evolution) {
        feedbackMessage += `${pokemonName} is in a later stage of evolution.\n`;
      } else {
        feedbackMessage += `${pokemonName} Evolution Stage Matches! (Stage ${pokemon.evolution})\n`;
      }
      const clickedRegion = getPokemonRegion(pokemon.id);
      const chosenRegion = getPokemonRegion(randomPokemon.id);

      const clickedRegionIndex = regions.indexOf(clickedRegion);
      const chosenRegionIndex = regions.indexOf(chosenRegion);

      if (clickedRegion === chosenRegion) {
        feedbackMessage += `${pokemonName} is from the same generation as the chosen Pokémon (${chosenRegion}).\n`;
      } else if (clickedRegionIndex < chosenRegionIndex) {
        feedbackMessage += `${pokemonName} is from an earlier region.\n`;
      } else {
        feedbackMessage += `${pokemonName} is from a later region.\n`;
      }
    } else {
      feedbackMessage = `Correct! You guessed the Pokémon correctly. It was ${pokemonName}!`;
      setFeedback(feedbackMessage);

      window.location.reload();
    }
    window.alert(feedbackMessage);
  };

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
              <div className="wordle-placeholder"></div>
            </>
          )}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search Pokémon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchResults && searchResults.length > 0 && (
            <div className="search-results">
              <ul className="list-unstyled">
                {searchResults.map((pokemon) => (
                  <li
                    key={pokemon.id}
                    className="d-flex align-items-center"
                    onClick={() => handlePokemonClick(pokemon)}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="h2 mr-3">
                      {firstLetterCapital(pokemon.name)}
                    </span>
                    <img
                      src={pokemon.picture_url}
                      alt={pokemon.name}
                      className="pokemon-image"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokemonWordle;
