import React from "react";
import { MyStoreProvider } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonList from "./PokemonList";
import PokemonGuesser from "./PokemonGuesser";
import PokemonWordle from "./PokemonWordle";
import Home from "./home";
import Nav from "./nav";

function App() {
  return (
    <MyStoreProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guesser" element={<PokemonGuesser />} />
          <Route path="/pokemon" element={<PokemonList />} />
          <Route path="/wordle" element={<PokemonWordle />} />
        </Routes>
      </BrowserRouter>
    </MyStoreProvider>
  );
}

export default App;
