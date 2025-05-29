import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AppProvider } from './Contexto/Contexto';

import { supabase } from './supabase';
import Menu from './Componentes/Menu';
import Aleatorios from './Componentes/Aleatorios';
import Episodios from './Componentes/Episodios';
import Favoritos from './Componentes/Favoritos';
import Listas from './Componentes/Listas';
import Personajes from './Componentes/Personajes';
import Usuarios from './Componentes/Usuarios';
import Login from './Componentes/login';
import Registro from './Componentes/Registro';
import Administrador from './Componentes/Administrador';

import './App.css';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function verificarSesion() {
      const { data: { session } } = await supabase.auth.getSession();
      setUsuario(session?.user || null);
      setCargando(false);
    }

    verificarSesion();

    supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user || null);
    });
  }, []);

  if (cargando) return <p>Cargando...</p>;

  return (
    <AppProvider>
      <Router>
        {usuario && <Menu />}

        <Routes>
          {/* Rutas privadas */}
          <Route path="/" element={usuario ? <Listas /> : <Navigate to="/login" />} />
          <Route path="/aleatorios" element={usuario ? <Aleatorios /> : <Navigate to="/login" />} />
          <Route path="/episodios" element={usuario ? <Episodios /> : <Navigate to="/login" />} />
          <Route path="/favoritos" element={usuario ? <Favoritos /> : <Navigate to="/login" />} />
          <Route path="/detalle/:id" element={usuario ? <Personajes /> : <Navigate to="/login" />} />
          <Route path="/usuarios" element={usuario ? <Usuarios /> : <Navigate to="/login" />} />

          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/administrador" element={<Administrador />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
