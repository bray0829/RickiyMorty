import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Filtro() {
  const [personajes, setPersonajes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [especie, setEspecie] = useState('');
  const [estado, setEstado] = useState('');
  const [genero, setGenero] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerTodos = async () => {
      try {
        let todos = [];
        let url = 'https://rickandmortyapi.com/api/character';

        while (url) {
          const res = await fetch(url);
          const data = await res.json();
          todos = todos.concat(data.results);
          url = data.info.next;
        }

        setPersonajes(todos);
      } catch (error) {
        console.error('Error al obtener personajes:', error);
        setPersonajes([]);
      }
    };

    obtenerTodos();
  }, []);

  const filtrados = personajes.filter((p) => {
    const coincideBusqueda =
      p.name.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.id.toString().includes(busqueda);

    const coincideEspecie = especie ? p.species === especie : true;
    const coincideEstado = estado ? p.status === estado : true;
    const coincideGenero = genero ? p.gender === genero : true;

    return coincideBusqueda && coincideEspecie && coincideEstado && coincideGenero;
  });

  return (
    <div className="c-filtros">
      <h2>Filtro de Personajes</h2>
      <input
        type="text"
        placeholder="Buscar por nombre o ID"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      <select value={especie} onChange={(e) => setEspecie(e.target.value)}>
        <option value="">Todas las especies</option>
        <option value="Human">Humano</option>
        <option value="Alien">Alien</option>
        <option value="Robot">Robot</option>
        <option value="Mythological Creature">Criatura Mítica</option>
      </select>

      <select value={estado} onChange={(e) => setEstado(e.target.value)}>
        <option value="">Todos los estados</option>
        <option value="Alive">Vivo</option>
        <option value="Dead">Muerto</option>
        <option value="unknown">Desconocido</option>
      </select>

      <select value={genero} onChange={(e) => setGenero(e.target.value)}>
        <option value="">Todos los géneros</option>
        <option value="Male">Masculino</option>
        <option value="Female">Femenino</option>
        <option value="Genderless">Sin género</option>
        <option value="unknown">Desconocido</option>
      </select>

      <section className="c-lista">
        {filtrados.map((p) => (
          <div
            key={p.id}
            className="c-lista-personaje"
            onClick={() => navigate(`/Personajes/${p.id}`)}
          >
            <img src={p.image} alt={p.name} height="100" />
            <p><strong>{p.name}</strong></p>
            <p>ID: {p.id}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Filtro;
