import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonList from "./PokemonList"; // Adjust the import path
import PokemonGuesser from "./PokemonGuesser";
import Home from "./home";
import Nav from "./nav";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guesser" element={<PokemonGuesser />} />
        <Route path="/pokemon" element={<PokemonList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
