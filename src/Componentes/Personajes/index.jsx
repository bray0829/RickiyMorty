import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

function traducirEstado(estado) {
  switch (estado) {
    case 'Alive': return 'Vivo';
    case 'Dead': return 'Muerto';
    case 'unknown': return 'Desconocido';
    default: return estado;
  }
}

function traducirGenero(genero) {
  switch (genero) {
    case 'Male': return 'Masculino';
    case 'Female': return 'Femenino';
    case 'Genderless': return 'Sin género';
    case 'unknown': return 'Desconocido';
    default: return genero;
  }
}

function traducirEspecie(especie) {
  if (especie === 'Human') return 'Humano';
  if (especie === 'Alien') return 'Alienígena';
  return especie;
}

function Personaje() {
  const { name } = useParams();
  const [personajes, setPersonajes] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
      .then(response => response.json())
      .then(responseData => {
        if (responseData.results) {
          setPersonajes(responseData.results); // guarda todos
        } else {
          setPersonajes([]);
        }
      })
      .catch(error => console.error("Error:", error));
  }, [name]);

  const toggleFavorito = (personaje) => {
    const esFavorito = favoritos.some(p => p.id === personaje.id);
    if (esFavorito) {
      setFavoritos(favoritos.filter(p => p.id !== personaje.id));
    } else {
      setFavoritos([...favoritos, { id: personaje.id, nombre: personaje.name }]);
    }
  };

  if (personajes.length === 0) {
    return <p>Buscando en otra dimensión...</p>;
  }

  return (
    <div className="personajes-grid">
      {personajes.map((personaje) => {
        const esFavorito = favoritos.some(p => p.id === personaje.id);
        return (
          <div key={personaje.id} className="personaje-card">
            <img src={personaje.image} alt={personaje.name} width="200" />
            <h2>{personaje.name}</h2>
            <p>Estado: {traducirEstado(personaje.status)}</p>
            <p>Especie: {traducirEspecie(personaje.species)}</p>
            <p>Género: {traducirGenero(personaje.gender)}</p>
            <p>Origen: {personaje.origin?.name}</p>
            <button onClick={() => toggleFavorito(personaje)}>
              {esFavorito ? '❤️' : '🤍'}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Personaje;
