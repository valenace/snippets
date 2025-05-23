// src/components/SidebarCourse.jsx
import React, { useState, useEffect } from 'react';
import { MdChevronRight, MdExpandMore } from 'react-icons/md';
import "../../../assets/css/sidebar_course.css"

// Función auxiliar para verificar si un elemento es el activo
const isActiveItem = (item, activePoint) => {
  if (!activePoint) return false;
  // Comparamos por el 'id' único que generamos en CourseLayout (m-X, sm-X, p-X)
  return activePoint.id === item.id || 
         // Si activePoint es un punto, y el item es un submódulo o módulo,
         // y el punto "pertenece" a ese submódulo/módulo, se considera activo para desplegarlo.
         (activePoint.isPoint && item.id === `sm-${activePoint.submoduloId}`) ||
         (activePoint.isPoint && item.id === `m-${activePoint.moduloId + 1}`) || // +1 porque moduloId era 0-based en el aplanado
         (activePoint.isSubmodule && item.id === `m-${activePoint.moduloId + 1}`);
};

// Componente para un solo Punto
const PointItem = ({ point, onPointClick, activePoint }) => {
  return (
    <li
      className={`theme-item ${isActiveItem(point, activePoint) ? 'is-active' : ''}`}
      onClick={() => onPointClick(point)} // Pasa el 'punto' completo
    >
      {point.titulo} {/* El título del punto es el texto que se ve en el sidebar */}
    </li>
  );
};

// Componente para un Submódulo
const SubmoduleItem = ({ submodule, onPointClick, activePoint, parentModuleId }) => { // Recibe parentModuleId
  const [isOpen, setIsOpen] = useState(false);

  // Un submódulo es "activo" si él mismo es el activePoint, o si alguno de sus puntos es el activePoint.
  const subIsActive = isActiveItem(submodule, activePoint) || 
                      (submodule.puntos && submodule.puntos.some(point => isActiveItem({...point, id: `p-${point.id}`}, activePoint)));

  // Al montar, si un submódulo o sus puntos están activos, lo abrimos
  useEffect(() => {
    if (subIsActive && !isOpen) {
      setIsOpen(true);
    }
  }, [subIsActive, isOpen]); // Añadir isOpen a las dependencias para evitar bucles si isOpen cambia

  const hasPoints = submodule.puntos && submodule.puntos.length > 0;

  return (
    <li className="submodule-item">
      <div
        className={`submodule-header ${subIsActive ? 'is-active' : ''}`}
        onClick={() => {
          // Crea un objeto para el submódulo que incluya info de sus padres para HeaderCourse
          const submoduleForDisplay = { 
            ...submodule, 
            id: `sm-${submodule.id}`, // Asegura el ID con prefijo
            moduloId: parentModuleId - 1, // Resta 1 para que sea 0-based si lo necesitas
            moduloTitulo: activePoint?.moduloTitulo || '', // Asume que activePoint tiene esto si ya hay un punto seleccionado
            submoduloTitulo: submodule.titulo,
            isSubmodule: true // Identificador para el tipo de elemento
          };
          onPointClick(submoduleForDisplay); // Siempre selecciona el submódulo al hacer clic
          if (hasPoints) {
            setIsOpen(!isOpen); // Pero solo alterna el despliegue si tiene puntos
          }
        }}
      >
        {hasPoints ? (isOpen ? <MdExpandMore className="icon" /> : <MdChevronRight className="icon" />) : null}
        {submodule.titulo}
      </div>
      {isOpen && hasPoints && ( // Solo renderiza los puntos si está abierto y tiene puntos
        <ul className="submodule-content sidebar-list">
          {submodule.puntos.map((punto) => ( // Itera sobre 'puntos'
            <PointItem
              key={`p-${punto.id}`} // Usar key con prefijo para evitar conflictos si IDs se repiten
              point={{
                  ...punto,
                  id: `p-${punto.id}`, // Pasa el ID con prefijo
                  moduloId: parentModuleId - 1, // Pasa el ID del módulo padre (0-based)
                  moduloTitulo: activePoint?.moduloTitulo || '', // Necesitaría una forma más robusta de obtener esto si no viene del activePoint
                  submoduloId: submodule.id,
                  submoduloTitulo: submodule.titulo,
                  isPoint: true // Identificador para el tipo de elemento
              }}
              onPointClick={onPointClick}
              activePoint={activePoint}
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

  // Un módulo es "activo" si él mismo es el activePoint, o si alguno de sus submódulos/puntos es el activePoint.
  const moduleIsActive = isActiveItem(module, activePoint) || 
                         (module.submodulos && module.submodulos.some(submodule => 
                           isActiveItem({...submodule, id: `sm-${submodule.id}`}, activePoint) ||
                           (submodule.puntos && submodule.puntos.some(point => isActiveItem({...point, id: `p-${point.id}`}, activePoint)))));

  // Al montar, si un módulo o sus hijos están activos, lo abrimos
  useEffect(() => {
    if (moduleIsActive && !isOpen) {
      setIsOpen(true);
    }
  }, [moduleIsActive, isOpen]); // Añadir isOpen a las dependencias

  const hasSubmodules = module.submodulos && module.submodulos.length > 0;

  return (
    <li className="module-item">
      <div
        className={`module-header ${moduleIsActive ? 'is-active' : ''}`}
        onClick={() => {
          const moduleForDisplay = {
            ...module,
            id: `m-${module.id}`, // Asegura el ID con prefijo
            moduloId: module.id - 1, // Pasa el ID del módulo (0-based)
            moduloTitulo: module.titulo,
            isModule: true // Identificador para el tipo de elemento
          };
          onPointClick(moduleForDisplay); // Siempre selecciona el módulo al hacer clic
          if (hasSubmodules) {
            setIsOpen(!isOpen); // Pero solo alterna el despliegue si tiene submódulos
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
              key={`sm-${submodule.id}`} // Usar key con prefijo
              submodule={submodule} // Pasa el submódulo (el ID con prefijo se crea en el onClick)
              onPointClick={onPointClick}
              activePoint={activePoint}
              parentModuleId={module.id} // Pasa el ID del módulo padre
            />
          ))}
        </ul>
      )}
    </li>
  );
};

// Componente principal SidebarCourse
const SidebarCourse = ({ datosCurso, onPointClick, activePoint }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">{datosCurso.nombre_curso || "Contenido del Curso"}</h2>
      <ul className="sidebar-list">
        {datosCurso.modulos.map((module) => (
          <ModuleItem
            key={`m-${module.id}`} // Usar key con prefijo
            module={module} // Pasa el módulo (el ID con prefijo se crea en el onClick)
            onPointClick={onPointClick}
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