import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const MyStoreContext = createContext();

const MyStoreProvider = ({ children }) => {
  const [pokemonData, setPokemonData] = useState([]);

  const fetchPokemonData = () => {
    axios
      .get("http://localhost:3000/api/pokemon")
      .then((response) => {
        setPokemonData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon data:", error);
      });
  };

  const getRandomPokemonId = () => {
    return Math.floor(Math.random() * 1010) + 1;
  };

  const fetchRandomPokemon = () => {
    const randomId = getRandomPokemonId();
    axios
      .get(`http://localhost:3000/api/pokemon/${randomId}/`)
      .then((response) => {
        setRandomPokemon(response.data);
      })
      .catch((error) => {
        console.error("Error fetching random Pokémon data:", error);
      });
  };

  const [randomPokemon, setRandomPokemon] = useState(null);

  const convertDecimetersToFeetAndInches = (heightInDecimeters) => {
    const heightInMeters = heightInDecimeters * 0.1;
    const heightInFeet = heightInMeters * 3.28084;
    const feet = Math.floor(heightInFeet);
    const inches = Math.round((heightInFeet - feet) * 12);
    return `${feet} feet ${inches} inches`;
  };

  const convertHectogramsToPounds = (weightInHectograms) => {
    const pounds = Math.floor(weightInHectograms * 0.220462);
    return pounds + " pounds";
  };

  const formatPokemonTypes = (typesString) => {
    const typesArray = typesString.split(", ");
    const formattedTypes = typesArray
      .map((type) => type.charAt(0).toUpperCase() + type.slice(1))
      .join(" / ");
    return formattedTypes;
  };

  const getPokemonRegion = (id) => {
    switch (true) {
      case id >= 1 && id <= 151:
        return "Kanto";
      case id >= 152 && id <= 251:
        return "Johto";
      case id >= 252 && id <= 386:
        return "Hoenn";
      case id >= 387 && id <= 493:
        return "Sinnoh";
      case id >= 494 && id <= 649:
        return "Unova";
      case id >= 650 && id <= 721:
        return "Kalos";
      case id >= 722 && id <= 809:
        return "Alola";
      case id >= 810 && id <= 905:
        return "Galar";
      case id >= 906 && id <= 1017:
        return "Paldea";
      default:
        return "Digimon";
    }
  };
  const regions = [
    "All",
    "Kanto",
    "Johto",
    "Hoenn",
    "Sinnoh",
    "Unova",
    "Kalos",
    "Alola",
    "Galar",
    "Paldea",
  ];

  useEffect(() => {
    fetchPokemonData();
    fetchRandomPokemon();
  }, []);

  return (
    <MyStoreContext.Provider
      value={{
        convertDecimetersToFeetAndInches,
        convertHectogramsToPounds,
        formatPokemonTypes,
        getPokemonRegion,
        fetchPokemonData,
        regions,
        pokemonData,
        getRandomPokemonId,
        fetchRandomPokemon,
        randomPokemon,
      }}
    >
      {children}
    </MyStoreContext.Provider>
  );
};

// Step 5: Create a custom hook to access the store
const useMyStore = () => {
  const context = useContext(MyStoreContext);
  if (!context) {
    throw new Error("useMyStore must be used within a MyStoreProvider");
  }
  return context;
};

export { MyStoreProvider, useMyStore };