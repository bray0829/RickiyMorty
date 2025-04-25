import { useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Aleatorios from './Componentes/Aleatorios'
import Episodios from './Componentes/Episodios'
import Favoritos from './Componentes/Favoritos'
import Listas from './Componentes/Listas'
import Personajes from './Componentes/Personajes'
import Usuarios from './Componentes/Usuarios'
import Menu from './Componentes/Menu';

import './App.css'

function App() {
  
  return (

    
    <>
      

      <Router>
        <Menu/>
        <Routes>
          <Route path = "/Aleatorios" element={<Aleatorios/>}/>
          <Route path = "/Episodios" element={<Episodios/>}/>
          <Route path = "/Favoritos" element={<Favoritos/>}/>
          <Route path = "/" element={<Listas/>}/>
          <Route path = "/Personajes/:name" element={<Personajes/>}/>
          <Route path = "/Usuarios" element={<Usuarios/>}/>

        </Routes>
      </Router>
    </>
    
  )
}

export default App
