import { useEffect, useState, lazy, Suspense } from "react";
import datosCurso from "../../api/curso.json";
import HeaderCourse from "./str/HeaderCourse";

// Objeto para mapear nombres de componentes a sus respectivas importaciones
const componentesDisponibles = {
  // ComponenteA: lazy(() => import("../componentes/ComponenteA")),
  // ComponenteB: lazy(() => import("../componentes/ComponenteB"))
  SwipText: lazy(() => import("../components/SwipText")),
  ShowScrollingText: lazy(() => import("../components/ShowScrollingText")),
  Puzzle: lazy(() => import("../components/Puzzle")),
  Boxes: lazy(() => import("../components/Boxes")),
  Timeline: lazy(() => import("../components/Timeline")),
  TestOpciones: lazy(() => import("../components/TestOpciones")),
};

const CursoIA = () => {
  const [todosLosSlides, setTodosLosSlides] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [porcentajeProgreso, setPorcentajeProgreso] = useState(0);

  useEffect(() => {
    const obtenerSlides = (modulos) => {
      let resultados = [];

      modulos.forEach((modulo) => {
        if (modulo.submodulos) {
          modulo.submodulos.forEach((submodulo) => {
            if (submodulo.puntos) {
              submodulo.puntos.forEach((punto) => {
                resultados.push({
                  moduloTitulo: modulo.titulo,
                  moduloId: modulo.id - 1,
                  submoduloTitulo: submodulo.titulo,
                  puntoTitulo: punto.titulo,
                  dinamicas: punto.dinamicas || [],
                });
              });
            }
          });
        }
      });

      return resultados;
    };

    const listaSlides = obtenerSlides(datosCurso.modulos);
    setTodosLosSlides(listaSlides);

    const avanceGuardado = localStorage.getItem("avanceCursoIA");
    if (avanceGuardado !== null) {
      const indice = parseInt(avanceGuardado);
      if (indice >= 0 && indice < listaSlides.length) {
        setIndiceActual(indice);
      }
    }
  }, []);

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

  const { moduloTitulo, moduloId, submoduloTitulo, puntoTitulo, dinamicas } = todosLosSlides[indiceActual];

  return (
    <>
    <HeaderCourse courseTitle={datosCurso.nombre_curso} moduloId={moduloId} moduloTitulo={moduloTitulo} submoduloTitulo={submoduloTitulo} />
    
    <div style={styles.container}>
    <h2 style={styles.slideTitle}>Submódulo: {submoduloTitulo}</h2>
      <div style={styles.contentContainer}>
        <Suspense fallback={<p>Cargando dinámicas...</p>}>
          {dinamicas.map((dinamica, idx) => {
            const ComponenteDinamico = componentesDisponibles[dinamica.componente];
            return ComponenteDinamico ? (
                <ComponenteDinamico key={idx} datos={dinamica.contenido || []} />
            ) : (
              // <p key={idx}>Componente "{dinamica.componente}" no encontrado.</p>
              <></>
            );
          })}
        </Suspense>
      </div>

      
    </div>
    
    <div style={{background:'white', padding:'0.5rem', position: 'fixed', bottom: '0', width: '100%', zIndex: '1'}}>
        <div style={styles.progressContainer}>
            <p style={styles.progressText}>
            Slide {indiceActual + 1} de {todosLosSlides.length}
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

        <div style={styles.buttonContainer}>
            <button onClick={anteriorSlide} disabled={indiceActual === 0} className="btn btn-color1 m-1" style={{ ...styles.button, backgroundColor: indiceActual === 0 ? "#ccc" : "var(--color1)" }}>
            Anterior
            </button>
            <button onClick={siguienteSlide} disabled={indiceActual === todosLosSlides.length - 1} className="btn btn-color2 m-1" style={{ ...styles.button, backgroundColor: indiceActual === todosLosSlides.length - 1 ? "#ccc" : "var(--color2)" }}>
            Siguiente
            </button>
        </div>
    </div>
      
    </>
  );
};

// Estilos simples
const styles = {
  container: {
    padding: "6rem 2rem 10rem 2rem",
    fontFamily: "Arial, sans-serif",
    width: "90vw",
    // height: "100vh",
    margin: "auto"
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
