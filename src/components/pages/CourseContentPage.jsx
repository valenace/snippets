// src/pages/CourseContentPage.jsx
import React from 'react';
import "../../../assets/css/sidebar_course.css"

const CourseContentPage = ({ activePoint, courseTitle }) => {
    const renderDinamicaContent = (dinamica) => {
      switch (dinamica.componente) {
        case 'TextoSimple':
          return <p className="text-dinamica">{dinamica.contenido}</p>;
        case 'Cita':
          return <blockquote className="quote-dinamica">{dinamica.contenido}</blockquote>;
        case 'ListaViñetas':
          return (
            <ul className="list-dinamica">
              {dinamica.contenido.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          );
        case 'LineaDeTiempo':
          return (
            <div className="timeline-dinamica">
              {dinamica.contenido.map((evento) => (
                <div key={evento.id} className="timeline-item">
                  <h3>{evento.titulo} ({evento.fecha})</h3>
                  <p>{evento.descripcionLarga}</p>
                </div>
              ))}
            </div>
          );
        case 'DefinicionesCortas':
          return (
            <div className="definitions-dinamica">
              {dinamica.contenido.map((def, index) => (
                <div key={index}>
                  <h4>{def.titulo}</h4>
                  <p>{def.descipcion}</p>
                </div>
              ))}
            </div>
          );
        case 'ArrastrarYSoltar':
          return <p className="placeholder-dinamica">Componente "Arrastrar y Soltar" (requeriría lógica compleja).</p>;
        case 'Acordeon':
          return (
            <div className="accordion-dinamica">
              {dinamica.contenido[0]?.pieces.map((piece) => (
                <details key={piece.id} className="accordion-item">
                  <summary>{piece.titulo}</summary>
                  <p>{piece.descripcion}</p>
                </details>
              ))}
            </div>
          );
        case 'CuestionarioMultipleChoice':
          return <p className="placeholder-dinamica">Componente "Cuestionario Múltiple Choice" (requeriría lógica compleja).</p>;
        default:
          return <p className="placeholder-dinamica">Tipo de componente desconocido: {dinamica.componente}</p>;
      }
    };
  
    return (
      <>
        {activePoint ? (
          <div className="content-card">
            <h2>{activePoint.titulo}</h2>
            
            {/* Muestra el contenido del punto/submódulo/módulo si existe */}
            {activePoint.contenido && <p className="point-content-text">{activePoint.contenido}</p>}
            
            {/* Muestra las dinámicas solo si el activePoint tiene un array de dinámicas */}
            {activePoint.dinamicas && activePoint.dinamicas.length > 0 && (
              <div className="point-dinamicas">
                <h3>Dinamicas Asociadas:</h3>
                {activePoint.dinamicas.map((dinamica, index) => (
                  <div key={index} className="dinamica-section">
                    {renderDinamicaContent(dinamica)}
                  </div>
                ))}
              </div>
            )}
  
            {/* Mensaje si no hay contenido ni dinámicas explícitas para el elemento seleccionado */}
            {(!activePoint.contenido && (!activePoint.dinamicas || activePoint.dinamicas.length === 0)) && (
              <p className="point-content-text italic">
                Este elemento no tiene contenido textual ni dinámicas asociadas directamente. 
                Explora sus sub-elementos si están disponibles.
              </p>
            )}
  
          </div>
        ) : (
          <div className="content-card">
            <h1>Bienvenido al Curso de {courseTitle || "React"}</h1>
            <p>
              Usa el sidebar para navegar por los módulos, submódulos y puntos del curso.
              Al seleccionar un elemento, su contenido principal se cargará aquí.
            </p>
            <p className="italic">
              (Selecciona un elemento del sidebar para ver su contenido aquí.)
            </p>
          </div>
        )}
      </>
    );
  };

export default CourseContentPage;