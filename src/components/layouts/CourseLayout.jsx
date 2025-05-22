// src/layouts/CourseLayout.jsx
import React, { useState, useEffect } from 'react';
import datosCurso from "../../../api/curso.json";
import SidebarCourse from '../str/SidebarCourse';
import CourseContentPage from '../pages/CourseContentPage';
import { MdMenu, MdClose } from 'react-icons/md';
import "../../../assets/css/sidebar_course.css"

const CourseLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [datosCurso, setdatosCurso] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePoint, setActivePoint] = useState(null); // El punto/módulo/submódulo actualmente seleccionado

  useEffect(() => {
    const getdatosCurso = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/data/curso.json'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setdatosCurso(data);
        setError(null);

        // Opcional: Si quieres que un elemento específico se seleccione por defecto al cargar.
        // Por ejemplo, el primer punto del segundo submódulo del segundo módulo.
        if (data.modulos && data.modulos.length > 0) {
            // Asegúrate de que este ID sea único para el elemento (punto, submodulo, o modulo) que quieres cargar inicialmente
            const defaultActiveItemId = "p-2_1_1"; // ID del Punto 2.1.1
            let initialActive = null;

            // Buscamos el elemento por su ID único en toda la estructura
            data.modulos.some(modulo => {
                if (`m-${modulo.id}` === defaultActiveItemId) {
                    initialActive = { ...modulo, id: `m-${modulo.id}` };
                    return true;
                }
                if (modulo.submodulos) {
                    return modulo.submodulos.some(submodulo => {
                        if (`sm-${submodulo.id}` === defaultActiveItemId) {
                            initialActive = { ...submodulo, id: `sm-${submodulo.id}`, moduloTitulo: modulo.titulo, moduloId: modulo.id -1 };
                            return true;
                        }
                        if (submodulo.puntos) {
                            return submodulo.puntos.some(punto => {
                                if (`p-${punto.id}` === defaultActiveItemId) {
                                    initialActive = {
                                        ...punto,
                                        id: `p-${punto.id}`, // Usamos el ID con prefijo para que coincida con el sidebar
                                        moduloTitulo: modulo.titulo,
                                        moduloId: modulo.id - 1,
                                        submoduloTitulo: submodulo.titulo
                                    };
                                    return true;
                                }
                                return false;
                            });
                        }
                        return false;
                    });
                }
                return false;
            });
            setActivePoint(initialActive || null); // Establece el punto inicial o null
        }

      } catch (err) {
        console.error("Error al cargar los datos del curso:", err);
        setError("No se pudieron cargar los datos del curso: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getdatosCurso();
  }, []);

  // Esta función es llamada por SidebarCourse cuando se hace clic en un elemento
  const handlePointSelection = (point) => {
    setActivePoint(point);
    setIsSidebarOpen(false); // Cierra el sidebar en móvil al seleccionar
    console.log("Elemento seleccionado en CourseLayout:", point.titulo);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Cargando datos del curso...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <p>Por favor, asegúrate de que 'public/data/course_data.json' exista y sea accesible.</p>
      </div>
    );
  }

  if (!datosCurso || !datosCurso.modulos || datosCurso.modulos.length === 0) {
    return (
      <div className="no-data-container">
        <p>No se encontraron módulos para este curso. El archivo JSON podría estar vacío o mal formado.</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="mobile-header">
        <h1 className="course-title">{datosCurso.nombre_curso || "Mi Curso"}</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}>
          {isSidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>

      <div className={`sidebar-wrapper ${isSidebarOpen ? 'is-open' : ''}`}>
        <SidebarCourse
          datosCurso={datosCurso}
          onPointClick={handlePointSelection}
          activePoint={activePoint} // Pasamos el activePoint para el resaltado
        />
      </div>

      {isSidebarOpen && (
        <div
          className="sidebar-overlay is-visible"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      <main className="main-content">
        {/* CourseContentPage ahora recibe el activePoint y courseTitle */}
        <CourseContentPage 
          activePoint={activePoint} 
          courseTitle={datosCurso.nombre_curso}
          // Pasa los estilos directamente
          styles={styles} 
        />
      </main>
    </div>
  );
};

// Se mantienen los estilos en CourseLayout para que CourseContentPage los reciba
// o si prefieres, los puedes mover a un archivo de estilos compartido.
const styles = {
  container: {
    padding: "0 2rem 0 2rem", // Ajusta el padding superior si HeaderCourse es fijo
    fontFamily: "Arial, sans-serif",
    width: "90vw",
    // height: "100vh", // No es necesario si el contenido fluye
    margin: "auto",
    boxSizing: "border-box" // Asegura que el padding no cause desbordamiento
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "2rem",
    marginTop:"3rem"
  },
  moduleTitle: {
    fontSize: "1rem",
    color: "#555",
    fontWeight: "normal",
    marginBottom: "0.5rem",
  },
  slideTitle: { // Cambiado de slideTitle a general title for the content
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    color: "#333",
  },
  pointContentText: {
    marginTop: "1rem",
    lineHeight: "1.6",
    color: "#444",
  },
  contentContainer: {
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  lista: {
    paddingLeft: "1.2rem",
    listStyleType: "disc",
  },
  listaItem: {
    marginBottom: "0.5rem",
  },
  listaSubitems: {
    paddingLeft: "1.5rem",
    listStyleType: "circle",
  },
  listaSubitem: {
    marginBottom: "0.3rem",
  },
  placeholderDinamica: { // Estilo para el mensaje si no hay dinámicas
    fontStyle: "italic",
    color: "#718096",
    marginTop: "1rem",
  }
  // Se eliminan los estilos de progreso y botones porque ya no hay navegación de slides
};

export default CourseLayout;