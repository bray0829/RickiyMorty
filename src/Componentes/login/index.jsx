import { useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Por favor ingresa el correo y la contraseña');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);

    if (error) {
      setErrorMsg('Correo o contraseña incorrectos 😠');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="c-login">
      <h2>Iniciar sesión</h2>
      
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMsg && <p className="c-error">{errorMsg}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Iniciando sesión...' : 'Entrar'}
        </button>
      </form>

      <p>¿No tienes cuenta aún?</p>
      <button onClick={() => navigate('/registro')}>Regístrate aquí</button>
    </div>
  );
}

export default Login;
