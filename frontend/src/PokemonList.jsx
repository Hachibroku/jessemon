import React, { useState } from "react";
import { useMyStore } from "./store";
import PokemonModal from "./pokemonModal";

function PokemonList() {
  const {
    getPokemonRegion,
    convertDecimetersToFeetAndInches,
    convertHectogramsToPounds,
    formatPokemonTypes,
    pokemonData,
    regions,
    suffixAdder,
    firstLetterCapital,
  } = useMyStore();

  const [selectedRegion, setSelectedRegion] = useState("All");
  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const openModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
    setShowModal(false);
  };

  const filteredPokemon =
    selectedRegion === "All"
      ? pokemonData
      : pokemonData.filter(
          (pokemon) => getPokemonRegion(pokemon.id) === selectedRegion
        );

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container">
          <ul className="navbar-nav">
            {regions.map((region) => (
              <li key={region} className="nav-item">
                <button
                  className={`btn btn-link nav-link btn-danger text-white ${
                    selectedRegion === region ? "active" : ""
                  }`}
                  onClick={() => handleRegionChange(region)}
                >
                  {region}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

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
          {filteredPokemon.map((pokemon) => (
            <tr key={pokemon.id} onClick={() => openModal(pokemon)}>
              <td>{pokemon.id}</td>
              <td>{firstLetterCapital(pokemon.name)}</td>
              <td>{convertDecimetersToFeetAndInches(pokemon.height)}</td>
              <td>{convertHectogramsToPounds(pokemon.weight)}</td>
              <td>{formatPokemonTypes(pokemon.types)}</td>
              <td>{suffixAdder(pokemon.evolution) || "N/A"}</td>
              <td>{getPokemonRegion(pokemon.id)}</td>
              <td>
                <img
                  src={pokemon.picture_url}
                  alt={pokemon.name}
                  width="150"
                  height="150"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <PokemonModal
          show={showModal}
          onHide={closeModal}
          pokemon={selectedPokemon}
        />
      )}
    </div>
  );
}

export default PokemonList;
