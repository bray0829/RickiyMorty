import { useContext } from 'react';
import { AppContext } from '../../Contexto/Contexto';
import { useNavigate } from "react-router-dom";

function Favoritos() {

  const { favoritos, setFavoritos } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      {favoritos.length === 0 ? (
        <p>No hay personajes favoritos aún.</p>
      ) : (
        <div className='c-lista'>
          {favoritos.map((personaje, index) => (
            <div
              className='c-lista-personaje'
              onClick={() => navigate(`/Personajes/${personaje.id}`)}
              key={index}
            >
              <img
                src={personaje.image}
                alt={`Personaje ${personaje.nombre}`}
                width='auto'
                height='60'
                loading='lazy'
              />
              <p>{personaje.nombre}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Favoritos;
