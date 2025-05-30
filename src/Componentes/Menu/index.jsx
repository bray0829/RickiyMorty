// Componentes/Menu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // Asegúrate de tener estilos separados o globales

const Menu = () => {
  return (
    <nav className="menu">
      <Link to="/">Lista</Link>
      <Link to="/episodios">Episodios</Link>
      <Link to="/aleatorios">Aleatorio</Link>
      <Link to="/usuarios">Usuarios</Link>
      <Link to="/favoritos">Favoritos</Link>
    </nav>
  );
};

export default Menu;
