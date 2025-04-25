function Filtro({ onFiltroChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFiltroChange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="c-filtro">
      <select name="status" onChange={handleChange}>
        <option value="">Estado</option>
        <option value="Vivo">Vivo</option>
        <option value="Muero">Muerto</option>
        <option value="unknown">Desconocido</option>
      </select>

      <select name="species" onChange={handleChange}>
        <option value="">Especie</option>
        <option value="humano">Humano</option>
        <option value="alien">Alien</option>
        <option value="robot">Robot</option>
        <option value="mitologico">Mitológico</option>
        <option value="Desconocido">Desconocido</option>
      </select>

      <select name="gender" onChange={handleChange}>
        <option value="">Género</option>
        <option value="Femenino">Femenino</option>
        <option value="Masculino">Masculino</option>
        <option value="Sin Genero">Sin género</option>
        <option value="Desconocido">Desconocido</option>
      </select>
    </div>
  );
}

export default Filtro;
