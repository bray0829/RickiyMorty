import { useState, useEffect } from "react";
import "./style.css";

const traducciones = {
  Alive: "Vivo",
  Dead: "Muerto",
  unknown: "Desconocido",
  Female: "Femenino",
  Male: "Masculino",
  Genderless: "Sin género",
  Human: "Humano",
  Alien: "Alien",
  Robot: "Robot",
  "Mythological Creature": "Mitológico",
};

function Filtro() {
  const [personajes, setPersonajes] = useState([]);
  const [filtros, setFiltros] = useState({
    status: "",
    species: "",
    gender: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchPersonajes = async () => {
      try {
        let all = [];
        let nextUrl = 'https://rickandmortyapi.com/api/character';

        while (nextUrl) {
          const res = await fetch(nextUrl);
          const data = await res.json();
          all = all.concat(data.results);
          nextUrl = data.info.next;
        }

        setPersonajes(all);
      } catch (error) {
        console.error("Error cargando personajes:", error);
      }
    };

    fetchPersonajes();
  }, []);

  const personajesFiltrados = personajes
    .filter(p => !filtros.status || p.status === filtros.status)
    .filter(p => !filtros.species || p.species === filtros.species)
    .filter(p => !filtros.gender || p.gender === filtros.gender);

  return (
    <div>
      <div className="c-filtro">
        <select name="status" onChange={handleChange}>
          <option value="">Estado</option>
          <option value="Alive">Vivo</option>
          <option value="Dead">Muerto</option>
          <option value="unknown">Desconocido</option>
        </select>

        <select name="species" onChange={handleChange}>
          <option value="">Especie</option>
          <option value="Human">Humano</option>
          <option value="Alien">Alien</option>
          <option value="Robot">Robot</option>
          <option value="Mythological Creature">Mitológico</option>
          <option value="unknown">Desconocido</option>
        </select>

        <select name="gender" onChange={handleChange}>
          <option value="">Género</option>
          <option value="Female">Femenino</option>
          <option value="Male">Masculino</option>
          <option value="Genderless">Sin género</option>
          <option value="unknown">Desconocido</option>
        </select>
      </div>

      <div className="c-lista">
        {personajesFiltrados.map(p => (
          <div key={p.id} className="c-unpoke">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>Estado: {traducciones[p.status] || p.status}</p>
            <p>Especie: {traducciones[p.species] || p.species}</p>
            <p>Género: {traducciones[p.gender] || p.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filtro;
