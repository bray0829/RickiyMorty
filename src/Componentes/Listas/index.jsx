import { useState, useEffect } from 'react';
import './style.css';
import Filtro from '../Filtro';
import { useNavigate } from "react-router-dom";

function Listas() {
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtros, setFiltros] = useState({
    status: '',
    species: '',
    gender: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerTodosLosPersonajes = async () => {
      try {
        let baseURL = `https://rickandmortyapi.com/api/character/?`;

        if (busqueda.length >= 3) {
          baseURL += `&name=${busqueda}`;
        }

        Object.entries(filtros).forEach(([key, value]) => {
          if (value) baseURL += `&${key}=${value}`;
        });

        let allResults = [];
        let nextURL = baseURL;

        while (nextURL) {
          const res = await fetch(nextURL);
          const json = await res.json();

          if (json.results) {
            allResults = [...allResults, ...json.results];
            nextURL = json.info.next;
          } else {
            nextURL = null;
          }
        }

        setData(allResults);
      } catch (error) {
        console.error("Error al obtener personajes:", error);
        setData([]);
      }
    };

    obtenerTodosLosPersonajes();
  }, [busqueda, filtros]);

  return (
    <>
      <input
        type="text"
        placeholder="Buscar personaje"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      <Filtro onFiltroChange={setFiltros} />

      <section className='c-lista'>
        {data.map((personaje) => (
          <div
            className='c-lista-pokemon'
            onClick={() => navigate(`/Personajes/${personaje.name}`)}
            key={personaje.id}
          >
            <p>ID: {personaje.id}</p>
            <img
              src={personaje.image}
              alt={personaje.name}
              width='auto'
              height='100'
              loading='lazy'
            />
            <p>{personaje.name}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default Listas;
