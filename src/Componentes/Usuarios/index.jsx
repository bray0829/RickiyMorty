import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import "./style.css";

export default function Usuario() {
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    fecha_nacimiento: "",
    telefono: "",
    roll: ""
  });

  const [nuevaUrl, setNuevaUrl] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    async function fetchUsuario() {
      const { data: { user }, error: errorUser } = await supabase.auth.getUser();
      if (errorUser || !user) return;

      const { data, error } = await supabase
        .from("usuario")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setUsuario(data);
        setForm(data);
        fetchImagenes(user.id);
      }
    }

    fetchUsuario();
  }, []);

  const fetchImagenes = async (usuarioid) => {
    const { data, error } = await supabase
      .from("multimedia")
      .select("*")
      .eq("usuarioid", usuarioid);

    if (data) setImagenes(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("usuario")
      .update(form)
      .eq("id", usuario.id);

    setMensaje(error ? " Error al actualizar" : "✅ Datos actualizados correctamente");

    setTimeout(() => setMensaje(""), 3000);
  };

  const handleAgregarUrl = async () => {
    if (!usuario) {
      alert("Usuario no autenticado.");
      return;
    }

    if (!nuevaUrl.trim()) {
      alert("URL vacía. Por favor, ingresa una URL.");
      return;
    }

    const { error } = await supabase
      .from("multimedia")
      .insert([{ url: nuevaUrl, usuarioid: usuario.id }]);

    if (!error) {
      setNuevaUrl("");
      fetchImagenes(usuario.id);
    } else {
      alert("Error al agregar la imagen");
    }
  };

  const handleEliminarImagen = async (id) => {
    const { error } = await supabase
      .from("multimedia")
      .delete()
      .eq("id", id);

    if (!error) {
      setImagenes(imagenes.filter((img) => img.id !== id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (!usuario) return <p className="cargando">Cargando...</p>;

  return (
    <div className="usuario-container">
      <h2>👽 Perfil de Usuario</h2>
      {mensaje && <p className="mensaje">{mensaje}</p>}

      <div className="formulario">
        <label>Nombre:
          <input name="nombre" value={form.nombre} onChange={handleChange} />
        </label>
        <label>Correo:
          <input name="correo" value={form.correo} onChange={handleChange} />
        </label>
        <label>Fecha de nacimiento:
          <input type="date" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} />
        </label>
        <label>Teléfono:
          <input name="telefono" value={form.telefono} onChange={handleChange} />
        </label>
        <label>Rol:
          <input name="roll" value={form.roll} onChange={handleChange} disabled />
        </label>

        <button onClick={handleUpdate}> Guardar cambios</button>
      </div>

      <hr />

      <div className="imagenes-section">
        <h3>🛸 Agregar imagen</h3>
        <input
          type="text"
          placeholder="URL de la imagen"
          value={nuevaUrl}
          onChange={(e) => setNuevaUrl(e.target.value)}
        />
        <button onClick={handleAgregarUrl}>➕ Agregar</button>

        {nuevaUrl && (
          <div className="preview">
            <p>Previsualización:</p>
            <img src={nuevaUrl} alt="Preview" />
          </div>
        )}

        <h3>Imágenes guardadas</h3>
        <ul className="imagenes-lista">
          {imagenes.map((img) => (
            <li key={img.id}>
              <img src={img.url} alt="Imagen subida" />
              <button onClick={() => handleEliminarImagen(img.id)}>🗑️ Eliminar</button>
            </li>
          ))}
        </ul>
      </div>

      <hr />
      <h2>¿Te quieres ir?</h2>
      <button className="logout" onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}
