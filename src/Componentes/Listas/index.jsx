import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Filtro from "../Filtro"; // 👈 Asegúrate de importar el componente
import './style.css';

function Listas() {
  const [dataPersonajes, setDataPersonajes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtros, setFiltros] = useState({
    status: '',
    species: '',
    gender: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerPersonajes = async () => {
      try {
        const res = await fetch('https://rickandmortyapi.com/api/character');
        const json = await res.json();
        setDataPersonajes(json.results || []);
      } catch (error) {
        console.error("Error al obtener personajes:", error);
        setDataPersonajes([]);
      }
    };

    obtenerPersonajes();
  }, []);

  const aplicarFiltros = (personaje) => {
    const coincideNombre = busqueda.length >= 3
      ? personaje.name.toLowerCase().includes(busqueda.toLowerCase())
      : true;

    const coincideID = !isNaN(busqueda)
      ? personaje.id === Number(busqueda)
      : true;

    const coincideStatus = filtros.status
      ? personaje.status === filtros.status
      : true;

    const coincideSpecies = filtros.species
      ? personaje.species === filtros.species
      : true;

    const coincideGender = filtros.gender
      ? personaje.gender === filtros.gender
      : true;

    return (coincideNombre || coincideID) && coincideStatus && coincideSpecies && coincideGender;
  };

  const resultados = dataPersonajes.filter(aplicarFiltros);

  return (
    <>
      

      <Filtro filtros={filtros} onFiltroChange={setFiltros} />

      <section className="c-lista">
        {resultados.map((personaje) => (
          <div
            className="c-lista-personaje"
            key={personaje.id}
            onClick={() => navigate(`/Personajes/${personaje.id}`)}
          >
            <img
              src={personaje.image}
              alt={personaje.name}
              height="100"
              loading="lazy"
            />
            <p><strong>ID:</strong> {personaje.id}</p>
            <p>{personaje.name}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default Listas;
