import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../Contexto/Contexto';
import "./style.css";

function Episodios() {
  const { listaVistos, setListaVistos } = useContext(AppContext);
  const [episodios, setEpisodios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEpisodios = async () => {
      try {
        let allEpisodes = [];
        let nextUrl = 'https://rickandmortyapi.com/api/episode';

        while (nextUrl) {
          const res = await fetch(nextUrl);
          const data = await res.json();
          allEpisodes = allEpisodes.concat(data.results);
          nextUrl = data.info.next;
        }

        setEpisodios(allEpisodes);
      } catch (error) {
        console.error('Error cargando episodios:', error);
      } finally {
        setCargando(false);
      }
    };

    fetchEpisodios();
  }, []);

  const toggleVisto = (id) => {
    const idStr = id.toString();
    if (listaVistos.includes(idStr)) {
      setListaVistos(listaVistos.filter(e => e !== idStr));
    } else {
      setListaVistos([...listaVistos, idStr]);
    }
  };

  if (cargando) {
    return <p>Cargando episodios...</p>;
  }

  return (
    <>
      <p style={{ fontWeight: 'bold', marginBottom: '1em' }}>
        Episodios vistos: {listaVistos.length} / {episodios.length}
      </p>
      <section className="c-aleatorio c-lista">
        {episodios.map((ep) => {
          const visto = listaVistos.includes(ep.id.toString());
          return (
            <div
              key={ep.id}
              className={visto ? "c-unpoke c-mios-pokemon" : "c-unpoke"}
              onClick={() => navigate(`/Episodios/${ep.id}`)}
              style={{ position: 'relative' }}
            >
              <p>{ep.episode} - {ep.name}</p>
              <p style={{ fontSize: "0.8em", color: "#888" }}>{ep.air_date}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVisto(ep.id);
                }}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  fontSize: '0.8em',
                  padding: '3px 6px',
                  background: visto ? "#d33" : "#3d3",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                {visto ? "Quitar" : "Marcar"}
              </button>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Episodios;
