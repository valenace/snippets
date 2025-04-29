import React, { useState, useEffect } from 'react';

// Importa aquí los componentes de las dinámicas que vas a usar
// Por ejemplo:
// import MultipleChoiceTest from './components/MultipleChoiceTest';
// import FillInTheBlank from './components/FillInTheBlank';

function ModuloDetalle() {
  const [modulo, setModulo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModulo = async () => {
      try {
        const response = await fetch('http://localhost:3001/modulos/1?_embed=submodulos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setModulo(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchModulo();
  }, []);

  const renderDinamica = (dinamica) => {
    switch (dinamica.componente) {
      case 'MultipleChoiceTest':
        // Asegúrate de pasar las props correctas a tu componente
        // return <MultipleChoiceTest {...dinamica} />;
        return <div>Componente MultipleChoiceTest (Implementar)</div>;
      case 'FillInTheBlank':
        // Asegúrate de pasar las props correctas a tu componente
        // return <FillInTheBlank {...dinamica} />;
        return <div>Componente FillInTheBlank (Implementar)</div>;
      // Agrega más casos para otros tipos de dinámicas
      default:
        return null;
    }
  };

  if (loading) {
    return <p>Cargando módulo...</p>;
  }

  if (error) {
    return <p>Error al cargar el módulo: {error.message}</p>;
  }

  if (!modulo) {
    return <p>Módulo no encontrado.</p>;
  }

  return (
    <div>
      <h1>{modulo.nombre}</h1>
      {modulo.submodulos && modulo.submodulos.map((submodulo) => (
        <div key={submodulo.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px' }}>
          <h3>{submodulo.nombre}</h3>
          <p>{submodulo.contenido}</p>
          {submodulo.dinamicas && submodulo.dinamicas.map((dinamica, index) => (
            <div key={index} style={{ marginTop: '10px', border: '1px dashed #ddd', padding: '10px' }}>
              <h4>Dinámica: {dinamica.tipo}</h4>
              {renderDinamica(dinamica)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ModuloDetalle;