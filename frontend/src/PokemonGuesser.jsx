import React, { useState, useEffect } from "react";
import { useMyStore } from "./store";

function PokemonGuesser() {
  const { newPokemonList, firstLetterCapital } = useMyStore();
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    if (newPokemonList && newPokemonList.length === 5) {
      const shuffledOptions = [...newPokemonList];
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [
          shuffledOptions[j],
          shuffledOptions[i],
        ];
      }

      setOptions(shuffledOptions);
      setCorrectAnswer(newPokemonList[0].name);
    }
  }, [newPokemonList]);

  const handleOptionSelect = (selectedName) => {
    if (selectedName === correctAnswer) {
      alert("Correct! You guessed the Pokémon!");
    } else {
      alert("Sorry, that's not the correct Pokémon.");
    }
    window.location.reload();
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Guess the Pokémon</h5>
          <p className="card-text">Can you guess the name of this Pokémon?</p>
          {newPokemonList && newPokemonList.length === 5 && (
            <>
              <img
                src={newPokemonList[0].picture_url}
                alt={newPokemonList[0].name}
                className="card-img-top"
              />
              <div className="options">
                {options.map((option) => (
                  <button
                    key={option.id}
                    className="btn btn-dark m-2 mt-3"
                    onClick={() => handleOptionSelect(option.name)}
                  >
                    {firstLetterCapital(option.name)}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokemonGuesser;
