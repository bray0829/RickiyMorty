import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Filtro from '../Filtro';
import './style.css';

function Listas() {
  const [data, setData] = useState([]);
  const [filtros, setFiltros] = useState({
    especie: 'All',
    estado: 'All',
    genero: 'All'
  });
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerPersonajes = async () => {
      try {
        let url = 'https://rickandmortyapi.com/api/character';
        const queryParams = [];

        if (filtros.especie !== 'All') queryParams.push(`species=${filtros.especie}`);
        if (filtros.estado !== 'All') queryParams.push(`status=${filtros.estado}`);
        if (filtros.genero !== 'All') queryParams.push(`gender=${filtros.genero}`);

        if (queryParams.length) {
          url += `?${queryParams.join('&')}`;
        }

        const res = await fetch(url);
        const json = await res.json();
        setData(json.results || []);
      } catch (error) {
        console.error("Error al obtener personajes:", error);
        setData([]);
      }
    };

    obtenerPersonajes();
  }, [filtros]);

  const handleFiltroChange = (nuevoFiltro) => {
    setFiltros(nuevoFiltro);
  };

  let resultados = data;

  if (busqueda.length >= 3 && isNaN(busqueda)) {
    resultados = data.filter((p) =>
      p.name.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  if (!isNaN(busqueda)) {
    resultados = data.filter((p) => p.id === Number(busqueda));
  }

  return (
    <>
      <input
        type="text"
        placeholder="Buscar personaje"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      <Filtro onFiltroChange={handleFiltroChange} />

      <section className="c-lista">
        {resultados.map((personaje) => (
          <div
            className="c-lista-personaje"
            key={personaje.id}
            onClick={() => navigate(`/detalle/${personaje.id}`)}
          >
            <img src={personaje.image} alt={personaje.name} height="100" loading="lazy" />
            <p><strong>ID:</strong> {personaje.id}</p>
            <p>{personaje.name}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default Listas;
