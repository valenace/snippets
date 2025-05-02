import React, { useState, useEffect } from 'react';


function CourseSidebar() {
  const [modulos, setModulos] = useState([]);
  const [expandedModule, setExpandedModule] = useState(null);

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await fetch('http://localhost:3001/modulos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setModulos(data);
      } catch (error) {
        console.error('Error fetching modulos:', error);
      }
    };

    fetchModulos();
  }, []);

  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  // Función para calcular el total de submódulos (para la barra de progreso)
  const totalSubmodulos = modulos.reduce((total, modulo) => total + modulo.submodulos.length, 0);

  // Simulación del número de submódulos completados
  const [completedSubmodulos, setCompletedSubmodulos] = useState(2); // Puedes ajustar este valor

  const progressPercentage = totalSubmodulos > 0 ? (completedSubmodulos / totalSubmodulos) * 100 : 0;

  return (
    <div className="course-sidebar">
      <h2 className="course-title">Course Contents</h2>
      <div className="completion-status">
        <span>{completedSubmodulos}/{totalSubmodulos} COMPLETED</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <button className="calendar-button">🗓️</button>
      </div>

      <div className="module-list">
        {modulos.map((modulo) => (
          <div key={modulo.id} className="module-item">
            <div className="module-header" onClick={() => toggleModule(modulo.id)}>
              <div className="module-info">
                <span className="module-name">{modulo.nombre}</span>
                <div className="module-details">
                  {/* Por ahora no tenemos duración ni número total de lecciones en este nivel del JSON */}
                  {/* Puedes agregar esas propiedades si las necesitas */}
                </div>
              </div>
              <button className="dropdown-button">{expandedModule === modulo.id ? '▲' : '▼'}</button>
            </div>
            {modulo.submodulos && expandedModule === modulo.id && (
              <ul className="submodule-list">
                {modulo.submodulos.map((submodulo) => (
                  <li key={submodulo.id} className="submodule-item">
                    <span className="submodule-name">{submodulo.nombre}</span>
                    {/* Por ahora no tenemos duración ni estado de bloqueo en los submódulos */}
                    {/* Puedes agregar esas propiedades si las necesitas */}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseSidebar;