// src/components/SidebarCourse.jsx
import React, { useState } from 'react';
import { MdChevronRight, MdExpandMore } from 'react-icons/md';

// Componente para un solo Punto
const PointItem = ({ point, onPointClick, isActive }) => {
  return (
    <li
      className={`theme-item ${isActive ? 'is-active' : ''}`}
      onClick={() => onPointClick(point)} // Pasa el 'punto' completo
    >
      {point.titulo} {/* El título del punto es el texto que se ve en el sidebar */}
    </li>
  );
};

// Componente para un Submódulo
const SubmoduleItem = ({ submodule, onPointClick, activePoint }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Si el submódulo tiene 'puntos', los muestra.
  const hasPoints = submodule.puntos && submodule.puntos.length > 0;

  return (
    <li className="submodule-item">
      <div
        className="submodule-header"
        onClick={() => {
          // Primero, siempre intenta seleccionar el submódulo como el activePoint
          onPointClick(submodule); 
          // Luego, si tiene puntos, alterna la visibilidad
          if (hasPoints) {
            setIsOpen(!isOpen);
          }
        }}
      >
        {hasPoints ? (isOpen ? <MdExpandMore className="icon" /> : <MdChevronRight className="icon" />) : null}
        {submodule.titulo}
      </div>
      {isOpen && hasPoints && ( // Solo renderiza los puntos si está abierto y tiene puntos
        <ul className="submodule-content sidebar-list">
          {submodule.puntos.map((point) => ( // Itera sobre 'puntos'
            <PointItem
              key={point.id}
              point={point} // Pasa el 'punto'
              onPointClick={onPointClick}
              isActive={activePoint && activePoint.id === point.id}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

// Componente para un Módulo
const ModuleItem = ({ module, onPointClick, activePoint }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubmodules = module.submodulos && module.submodulos.length > 0;

  return (
    <li className="module-item">
      <div
        className="module-header"
        onClick={() => {
          // Primero, siempre intenta seleccionar el módulo como el activePoint
          onPointClick(module);
          // Luego, si tiene submódulos, alterna la visibilidad
          if (hasSubmodules) {
            setIsOpen(!isOpen);
          }
        }}
      >
        {hasSubmodules ? (isOpen ? <MdExpandMore className="icon" /> : <MdChevronRight className="icon" />) : null}
        {module.titulo}
      </div>
      {isOpen && hasSubmodules && ( // Solo renderiza los submódulos si está abierto y tiene submódulos
        <ul className="module-content sidebar-list">
          {module.submodulos.map((submodule) => (
            <SubmoduleItem
              key={submodule.id}
              submodule={submodule}
              onPointClick={onPointClick}
              activePoint={activePoint}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

// Componente principal SidebarCourse
const SidebarCourse = ({ datosCurso, onPointClick: closeSidebarAndSelectPoint }) => {
  const [activePoint, setActivePoint] = useState(null);

  const handlePointClick = (point) => {
    setActivePoint(point);
    closeSidebarAndSelectPoint(point); // Llama a la función para cerrar el sidebar y pasar el punto
    console.log('Elemento seleccionado en Sidebar:', point.titulo);
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">{datosCurso.nombre_curso || "Contenido del Curso"}</h2>
      <ul className="sidebar-list">
        {datosCurso.modulos.map((module) => (
          <ModuleItem
            key={module.id}
            module={module}
            onPointClick={handlePointClick}
            activePoint={activePoint}
          />
        ))}
      </ul>
      {activePoint && (
        <div className="active-theme-display">
          <h3>Elemento Activo:</h3>
          <p>{activePoint.titulo}</p>
        </div>
      )}
    </div>
  );
};

export default SidebarCourse;