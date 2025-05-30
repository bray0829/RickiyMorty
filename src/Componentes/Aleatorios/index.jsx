import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../Contexto/Contexto';

function Aleatorios() {
  const { data, listaVistos, setListaVistos, setTipoSeleccionado } = useContext(AppContext);
  const [aleatorio, setAleatorio] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTipoSeleccionado("All");
  }, [setTipoSeleccionado]);

  const generar = () => {
    if (!Array.isArray(data) || data.length === 0) return;

    let nuevosAleatorios = [];
    const usados = new Set();

    while (nuevosAleatorios.length < 4 && usados.size < data.length) {
      const index = Math.floor(Math.random() * data.length);
      const personaje = data[index];

      if (!usados.has(personaje.id)) {
        usados.add(personaje.id);
        nuevosAleatorios.push(personaje);
      }
    }

    setAleatorio(nuevosAleatorios);

    const nuevosIds = nuevosAleatorios
      .map(p => p.id.toString())
      .filter(id => !listaVistos.includes(id));

    if (nuevosIds.length > 0) {
      setListaVistos(prev => [...prev, ...nuevosIds]);
    }
  };

  return (
    <section className="c-aleatorio c-lista">
      {aleatorio.map((personaje) => (
        <div
          className="c-lista-episodio c-un_aleatorio"
          key={personaje.id}
          onClick={() => navigate(`/Personaje/${personaje.id}`)}
        >
          <p>ID: {personaje.id}</p>
          <img
            src={personaje.image}
            alt={`Personaje ${personaje.name}`}
            width="100"
            height="100"
          />
          <p>{personaje.name}</p>
        </div>
      ))}
      <button onClick={generar}>Generar</button>
    </section>
  );
}

export default Aleatorios;
