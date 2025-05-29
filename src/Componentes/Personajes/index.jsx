import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { AppContext } from '../../Contexto/Contexto';

function Personajes() {
  const { id } = useParams();
  const [personaje, setPersonaje] = useState(null);
  const { favoritos, setFavoritos } = useContext(AppContext);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => res.json())
      .then(data => setPersonaje(data))
      .catch(err => console.error("Error cargando personaje:", err));
  }, [id]);

  const esFavorito = personaje && favoritos.some(p => p.id === personaje.id);

  const toggleFavorito = () => {
    if (!personaje) return;

    if (esFavorito) {
      setFavoritos(favoritos.filter(p => p.id !== personaje.id));
    } else {
      setFavoritos([
        ...favoritos,
        {
          id: personaje.id,
          nombre: personaje.name,
          image: personaje.image
        }
      ]);
    }
  };

  if (!personaje) return <p>Cargando...</p>;

  return (
    <div className="detalle-personaje">
      <h2>{personaje.name}</h2>
      <img src={personaje.image} alt={personaje.name} width="200" />
      <p><strong>ID:</strong> {personaje.id}</p>
      <p><strong>Estado:</strong> {personaje.status}</p>
      <p><strong>Especie:</strong> {personaje.species}</p>
      <p><strong>Género:</strong> {personaje.gender}</p>
      <p><strong>Origen:</strong> {personaje.origin?.name}</p>
      <p><strong>Aparece en:</strong> {personaje.episode.length} episodio(s)</p>

      <button onClick={toggleFavorito}>
        {esFavorito ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
      </button>
    </div>
  );
}

export default Personajes;
