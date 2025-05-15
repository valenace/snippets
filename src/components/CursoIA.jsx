// src/components/CursoIA.jsx
import { useEffect, useState } from "react";
import datosCurso from "../../api/curso.json";


const CursoIA = () => {
  const [todosLosSlides, setTodosLosSlides] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [porcentajeProgreso, setPorcentajeProgreso] = useState(0);

  // Extraer todos los submodulos como slides
  useEffect(() => {
    const obtenerSlides = (modulo) => {
      let resultados = [];

      modulo.modulos.forEach((mod) => {
        if (mod.submodulos) {
          mod.submodulos.forEach((submod) => {
            resultados.push({
              moduloTitulo: mod.titulo,
              slide: submod,
            });
          });
        }
      });

      return resultados;
    };

    const listaSlides = obtenerSlides(datosCurso);
    setTodosLosSlides(listaSlides);

    // Cargar avance guardado
    const avanceGuardado = localStorage.getItem("avanceCursoIA");
    if (avanceGuardado !== null) {
      const indice = parseInt(avanceGuardado);
      if (indice >= 0 && indice < listaSlides.length) {
        setIndiceActual(indice);
      }
    }
  }, []);

  // Actualizar progreso y guardar avance
  useEffect(() => {
    if (todosLosSlides.length > 0) {
      const porcentaje = ((indiceActual + 1) / todosLosSlides.length) * 100;
      setPorcentajeProgreso(porcentaje);
      localStorage.setItem("avanceCursoIA", indiceActual);
    }
  }, [indiceActual, todosLosSlides]);

  const siguienteSlide = () => {
    if (indiceActual < todosLosSlides.length - 1) {
      setIndiceActual(indiceActual + 1);
    }
  };

  const anteriorSlide = () => {
    if (indiceActual > 0) {
      setIndiceActual(indiceActual - 1);
    }
  };

  if (todosLosSlides.length === 0) {
    return <div>Cargando contenido...</div>;
  }

  const { moduloTitulo, slide } = todosLosSlides[indiceActual];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{datosCurso.nombre_curso}</h1>

      {/* Títulos */}
      <div style={styles.card}>
        <h3 style={styles.moduleTitle}>Módulo: {moduloTitulo}</h3>
        <h2 style={styles.slideTitle}>Submódulo: {slide.titulo}</h2>
        <p>ID: {slide.id}</p>
      </div>

      {/* Contenido de puntos */}
      <div style={styles.contentContainer}>
        <h4 style={styles.sectionTitle}>Contenido:</h4>
        <ul style={styles.lista}>
          {slide.puntos?.map((punto, idx) => (
            <li key={idx} style={styles.listaItem}>
              {punto.titulo}
              {punto.subpuntos && punto.subpuntos.length > 0 && (
                <ul style={styles.listaSubitems}>
                  {punto.subpuntos.map((sp, i) => (
                    <li key={i} style={styles.listaSubitem}>
                      {sp.titulo}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Barra de progreso */}
      <div style={styles.progressContainer}>
        <p style={styles.progressText}>
          Submódulo {indiceActual + 1} de {todosLosSlides.length}
        </p>
        <div style={styles.progressBarBackground}>
          <div
            style={{
              ...styles.progressBar,
              width: `${porcentajeProgreso}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Botones */}
      <div style={styles.buttonContainer}>
        <button
          onClick={anteriorSlide}
          disabled={indiceActual === 0}
          style={{
            ...styles.button,
            backgroundColor: indiceActual === 0 ? "#ccc" : "#2196f3",
          }}
        >
          Anterior
        </button>
        <button
          onClick={siguienteSlide}
          disabled={indiceActual === todosLosSlides.length - 1}
          style={{
            ...styles.button,
            backgroundColor:
              indiceActual === todosLosSlides.length - 1
                ? "#ccc"
                : "#4caf50",
          }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

// Estilos simples
const styles = {
  container: {
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "auto",
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
  },
  moduleTitle: {
    fontSize: "1rem",
    color: "#555",
    fontWeight: "normal",
    marginBottom: "0.5rem",
  },
  slideTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
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
  progressContainer: {
    marginBottom: "2rem",
  },
  progressText: {
    marginBottom: "0.5rem",
    textAlign: "center",
  },
  progressBarBackground: {
    height: "20px",
    width: "100%",
    backgroundColor: "#eee",
    borderRadius: "10px",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4caf50",
    transition: "width 0.3s ease-in-out",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    margin: "0 0.5rem",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "5px",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default CursoIA;