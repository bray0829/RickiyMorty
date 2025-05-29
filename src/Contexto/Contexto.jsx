import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    return JSON.parse(localStorage.getItem("rm_favoritos")) || [];
  });

  const [data, setData] = useState([]); // Personajes
  const [episodios, setEpisodios] = useState([]); // Episodios
  const [listaVistos, setListaVistos] = useState(() => {
    return JSON.parse(localStorage.getItem("episodios_vistos")) || [];
  });

  const [listaCapturados, setListaCapturados] = useState(() => {
    return JSON.parse(localStorage.getItem("personajes_capturados")) || [];
  });

  const [filtros, setFiltros] = useState({
    especie: 'All',
    estado: 'All',
    genero: 'All'
  });

  const [tipoSeleccionado, setTipoSeleccionado] = useState("All");

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("rm_favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  useEffect(() => {
    localStorage.setItem("episodios_vistos", JSON.stringify(listaVistos));
  }, [listaVistos]);

  useEffect(() => {
    localStorage.setItem("personajes_capturados", JSON.stringify(listaCapturados));
  }, [listaCapturados]);

  // Obtener personajes según filtros
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
      } catch (err) {
        console.error("Error al obtener personajes: ", err);
        setData([]);
      }
    };

    obtenerPersonajes();
  }, [filtros]);

  // Obtener todos los episodios
  useEffect(() => {
    const obtenerEpisodios = async () => {
      try {
        let todos = [];
        let nextUrl = 'https://rickandmortyapi.com/api/episode';

        while (nextUrl) {
          const res = await fetch(nextUrl);
          const json = await res.json();
          todos = [...todos, ...json.results];
          nextUrl = json.info.next;
        }

        setEpisodios(todos);
      } catch (err) {
        console.error("Error al obtener episodios: ", err);
        setEpisodios([]);
      }
    };

    obtenerEpisodios();
  }, []);

  return (
    <AppContext.Provider value={{
      favoritos, setFavoritos,
      data, setData,
      filtros, setFiltros,
      tipoSeleccionado, setTipoSeleccionado,
      listaCapturados, setListaCapturados,
      episodios, setEpisodios,
      listaVistos, setListaVistos
    }}>
      {children}
    </AppContext.Provider>
  );
}
