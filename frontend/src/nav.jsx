import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand ml-2" to="/">Pokémon App</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link ml-3 btn btn-primary" to="/pokemon">Pokédex</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link ml-3 btn btn-success" to="/guesser">Guess that Pokémon!</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
