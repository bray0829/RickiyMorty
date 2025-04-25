import "./style.css"
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <nav className="c-menu">
          <Link to="/">Lista</Link>
          <Link to="/Episodios">Episodios</Link>
          <Link to="/Aleatorios">Aleatorio</Link>
          <Link to="/Usuarios">Usuarios</Link>
          <Link to="/Favoritos">Favoritos</Link>
        </nav>
    )
  }
  
  export default Menu