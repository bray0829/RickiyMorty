import { useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    password: '',
    fechaNacimiento: '',
    telefono: '',
  });

  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    try {
      // Validaciones simples
      if (formulario.password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres.");
        setCargando(false);
        return;
      }

      if (!/^\d{7,15}$/.test(formulario.telefono)) {
        setError("El teléfono debe contener solo números (mínimo 7, máximo 15).");
        setCargando(false);
        return;
      }

      // 1. Crear usuario en Auth
      const { data, error: errorAuth } = await supabase.auth.signUp({
        email: formulario.correo,
        password: formulario.password,
      });

      if (errorAuth) {
        setError(errorAuth.message);
        setCargando(false);
        return;
      }

      const uid = data.user.id;

      // 2. Insertar en tabla "usuario"
      const { error: errorInsert } = await supabase.from("usuario").insert([{
        id: uid,
        nombre: formulario.nombre,
        correo: formulario.correo,
        fecha_nacimiento: formulario.fechaNacimiento,
        telefono: formulario.telefono,
        roll: "usuario",
      }]);

      if (errorInsert) {
        setError("Usuario creado pero error en tabla usuarios: " + errorInsert.message);
      } else {
        setFormulario({
          nombre: '',
          correo: '',
          password: '',
          fechaNacimiento: '',
          telefono: '',
        });
        navigate("/login");
      }

    } catch (err) {
      setError("Error inesperado. Intenta de nuevo.");
    }

    setCargando(false);
  };

  return (
    <section>
      <h2>Registro</h2>
      <form onSubmit={handleRegistro}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formulario.correo}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formulario.password}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fechaNacimiento"
          value={formulario.fechaNacimiento}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formulario.telefono}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={cargando}>
          {cargando ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      <h2>¿Ya tienes cuenta?</h2>
      <button onClick={() => navigate("/login")}>Iniciar sesión</button>
    </section>
  );
}

export default Registro;
