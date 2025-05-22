// src/layouts/CourseLayout.jsx
import React, { useState } from 'react';
import datosCurso from "../../../api/curso.json";
import { MdMenu, MdClose } from 'react-icons/md';
import SidebarCourse from '../str/SidebarCourse';
// import '../App.css'; // Asegúrate de importar tu archivo CSS

const CourseLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activePoint, setActivePoint] = useState(null); // Estado para el punto seleccionado
  
    const handlePointSelection = (point) => {
      setActivePoint(point);
      setIsSidebarOpen(false); // Cierra el sidebar en móvil al seleccionar
      console.log("Punto seleccionado en layout:", point.titulo);
    };
  
    // Como el JSON se importa directamente, no hay estados de 'isLoading' ni 'error' por la carga de datos.
    // Pero aún podemos verificar si los datos son válidos.
    if (!datosCurso || !datosCurso.modulos || datosCurso.modulos.length === 0) {
      return (
        <div className="no-data-container">
          <p>Error: No se encontraron módulos para este curso en el archivo JSON.</p>
        </div>
      );
    }
  
    return (
      <div className="app-container">
        {/* Encabezado para dispositivos móviles */}
        <div className="mobile-header">
          <h1 className="course-title">{datosCurso.nombre_curso || "Mi Curso"}</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}>
            {isSidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>
  
        {/* Sidebar - Añade la clase 'is-open' condicionalmente */}
        <div className={`sidebar-wrapper ${isSidebarOpen ? 'is-open' : ''}`}>
          <SidebarCourse
            datosCurso={datosCurso} // Pasamos los datos del JSON directamente
            onPointClick={handlePointSelection}
          />
        </div>
  
        {/* Overlay para cerrar sidebar al hacer clic fuera en móviles */}
        {isSidebarOpen && (
          <div
            className="sidebar-overlay is-visible"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          ></div>
        )}
  
        {/* Contenido principal (children) */}
        <main className="main-content">
          {React.Children.map(children, child =>
            React.cloneElement(child, { activePoint: activePoint, courseTitle: datosCurso.nombre_curso })
          )}
        </main>
      </div>
    );
  };
  
  export default CourseLayout;