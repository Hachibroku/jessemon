import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useMyStore } from "./store";

function PokemonModal({ show, onHide, pokemon }) {
  const {
    getPokemonRegion,
    convertDecimetersToFeetAndInches,
    convertHectogramsToPounds,
    formatPokemonTypes,
    suffixAdder,
    firstLetterCapital,
  } = useMyStore();

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{firstLetterCapital(pokemon.name)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={pokemon.picture_url}
          alt={pokemon.name}
          width="200"
          height="200"
          className="img-fluid rounded"
        />
        <p>
          <strong>ID:</strong> {pokemon.id}
        </p>
        <p>
          <strong>Height:</strong>{" "}
          {convertDecimetersToFeetAndInches(pokemon.height)}
        </p>
        <p>
          <strong>Weight:</strong> {convertHectogramsToPounds(pokemon.weight)}
        </p>
        <p>
          <strong>Type:</strong> {formatPokemonTypes(pokemon.types)}
        </p>
        <p>
          <strong>Evolution:</strong> {suffixAdder(pokemon.evolution) || "N/A"}
        </p>
        <p>
          <strong>Region:</strong> {getPokemonRegion(pokemon.id)}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PokemonModal;
