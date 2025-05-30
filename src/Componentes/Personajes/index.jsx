import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { AppContext } from '../../Contexto/Contexto';

function Personajes() {
  const { id } = useParams(); 
  const [dataPersonaje, setDataPersonaje] = useState([]);
  const { favoritos, setFavoritos } = useContext(AppContext);

  const esFavorito = favoritos.some(p => p.id === dataPersonaje.id);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => response.json())
      .then(data => setDataPersonaje(data))
      .catch(error => console.error("Error:", error));
  }, [id]);

  const toggleFavorito = () => {
    if (esFavorito) {
      setFavoritos(favoritos.filter(p => p.id !== dataPersonaje.id));
    } else {
      setFavoritos([...favoritos, {
        id: dataPersonaje.id,
        nombre: dataPersonaje.name,
        image: dataPersonaje.image
      }]);
    }
  };

  if (!dataPersonaje || !dataPersonaje.id) return <p>Cargando...</p>;

  return (
    <div className={dataPersonaje.status.toLowerCase()}> {/* clase dinámica como con el tipo en Pokémon */}
      <img 
        src={dataPersonaje.image} 
        alt={dataPersonaje.name} 
        width="200"
      />

      <p>{dataPersonaje.name}</p>
      <p>ID: {dataPersonaje.id}</p>
      <p>Estado: {dataPersonaje.status}</p>
      <p>Especie: {dataPersonaje.species}</p>
      <p>Género: {dataPersonaje.gender}</p>
      <p>Origen: {dataPersonaje.origin?.name}</p>
      <p>Aparece en: {dataPersonaje.episode.length} episodios</p>

      <button onClick={toggleFavorito}>
        {esFavorito ? '❤️' : '🤍'}
      </button>
    </div>
  );
}

export default Personajes;
