import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../Contexto/Contexto';

function Aleatorios() {
  const { episodios, listaVistos, setListaVistos } = useContext(AppContext);
  const [aleatorio, setAleatorio] = useState([]);
  const navigate = useNavigate();

  const generar = () => {
    let nuevosAleatorios = [];

    while (nuevosAleatorios.length < 4 && episodios.length > 0) {
      const index = Math.floor(Math.random() * episodios.length);
      const episodio = episodios[index];

      if (!nuevosAleatorios.find(e => e.id === episodio.id)) {
        nuevosAleatorios.push(episodio);
      }
    }

    setAleatorio(nuevosAleatorios);

    // Guardar como vistos si no lo estaban
    const nuevosIds = nuevosAleatorios
      .map(e => e.id.toString())
      .filter(id => !listaVistos.includes(id));

    setListaVistos(prev => [...prev, ...nuevosIds]);
  };

  return (
    <section className="c-aleatorio c-lista">
      {aleatorio.map((episodio, index) => (
        <div
          className="c-lista-episodio c-un_aleatorio"
          key={index}
          onClick={() => navigate(`/Episodios/${episodio.id}`)}
        >
          <p>ID: {episodio.id}</p>
          <img
            src="/img/episodio_default.jpg" // Usa una imagen genérica o crea miniaturas propias
            alt={`Episodio ${episodio.name}`}
            width="100"
            height="100"
          />
          <p>{episodio.name}</p>
        </div>
      ))}
      <button onClick={generar}>Generar</button>
    </section>
  );
}

export default Aleatorios;
