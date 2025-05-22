// src/pages/CourseContentPage.jsx
import React, { lazy, Suspense } from 'react';
import "../../../assets/css/sidebar_course.css"
import HeaderCourse from '../str/HeaderCourse'; // Importa el HeaderCourse
import SwipText from '../SwipText';
// importamos los estilos de CourseLayout para poder usarlos aqui
// OJO: Si mueves 'styles' a un archivo aparte, este import cambiaría
// Por simplicidad, los pasamos como prop desde CourseLayout en este ejemplo.

// Objeto para mapear nombres de componentes a sus respectivas importaciones
const componentesDisponibles = {
  SwipText: lazy(() => import("../SwipText")),
  ShowScrollingText: lazy(() => import("../ShowScrollingText")),
  Puzzle: lazy(() => import("../Puzzle")),
  Boxes: lazy(() => import("../Boxes")),
  Timeline: lazy(() => import("../Timeline")),
  TestOpciones: lazy(() => import("../TestOpciones")),
  // Asegúrate de que todos tus componentes dinámicos estén aquí
};

const dCourseContentPage = ({ activePoint, courseTitle, styles }) => { // Recibe styles como prop
  // Función para renderizar el contenido de las dinámicas
  const renderDinamicaContent = (dinamica) => {
    const ComponenteDinamico = componentesDisponibles[dinamica.componente];
    if (ComponenteDinamico) {
      return (
        <Suspense fallback={<p>Cargando componente dinámico...</p>}>
          <ComponenteDinamico key={dinamica.id || Math.random()} datos={dinamica.contenido || []} />
        </Suspense>
      );
    }
    return <p style={styles.placeholderDinamica}>Componente "{dinamica.componente}" no reconocido o no implementado.</p>;
  };

  // Si no hay activePoint (p.ej., al inicio sin selección), muestra un mensaje de bienvenida
  if (!activePoint) {
    return (
      <div className="content-card" style={{paddingTop: "2rem"}}>
        <h1 style={styles.title}>Bienvenido al Curso de {courseTitle || "React"}</h1>
        <p style={{...styles.pointContentText, textAlign: 'center'}}>
          Usa el sidebar a la izquierda para navegar por los módulos, submódulos y temas del curso.
        </p>
        <p style={{...styles.pointContentText, fontStyle: 'italic', textAlign: 'center'}}>
          (Selecciona un elemento del sidebar para ver su contenido aquí.)
        </p>
      </div>
    );
  }

  // Si hay un activePoint, renderiza su contenido
  return (
    <>
      <HeaderCourse 
        courseTitle={courseTitle} 
        moduloId={activePoint.moduloId} 
        moduloTitulo={activePoint.moduloTitulo} 
        submoduloTitulo={activePoint.submoduloTitulo} 
      />
      
      <div className="content-card" style={styles.container}>
        <h2 style={styles.slideTitle}>{activePoint.titulo}</h2>
        {activePoint.contenido && <p style={styles.pointContentText}>{activePoint.contenido}</p>}
        
        {activePoint.dinamicas && activePoint.dinamicas.length > 0 ? (
          <div style={styles.contentContainer}>
            {activePoint.dinamicas.map((dinamica, idx) => (
              <div key={idx} className="dinamica-section">
                {renderDinamicaContent(dinamica)}
              </div>
            ))}
          </div>
        ) : (
          !activePoint.contenido && <p style={styles.placeholderDinamica}>No hay dinámicas ni contenido principal para este elemento.</p>
        )}
      </div>
    </>
  );
};

export default dCourseContentPage;