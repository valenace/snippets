// src/components/CursoIA.jsx
import { useEffect, useState } from "react";
import datosCurso from "../../api/curso.json";

const CursoIA = () => {
    const [todosLosSubmodulos, setTodosLosSubmodulos] = useState([]);
    const [indiceActual, setIndiceActual] = useState(0);
    const [porcentajeProgreso, setPorcentajeProgreso] = useState(0);
  
    // Extraer todos los submódulos más internos (leaf nodes)
    useEffect(() => {
      const obtenerSubmodulosProfundos = (modulo) => {
        let resultados = [];
  
        const buscar = (nodo) => {
          if (nodo.submodulos && nodo.submodulos.length > 0) {
            nodo.submodulos.forEach(buscar);
          } else {
            resultados.push(nodo);
          }
        };
  
        modulo.modulos.forEach((mod) => {
          if (mod.submodulos) {
            mod.submodulos.forEach(buscar);
          }
        });
  
        return resultados;
      };
  
      const listaSubmodulos = obtenerSubmodulosProfundos(datosCurso);
      setTodosLosSubmodulos(listaSubmodulos);
  
      // Cargar avance guardado
      const avanceGuardado = localStorage.getItem("avanceCursoIA");
      if (avanceGuardado !== null) {
        const indice = parseInt(avanceGuardado);
        if (indice >= 0 && indice < listaSubmodulos.length) {
          setIndiceActual(indice);
        }
      }
    }, []);
  
    // Actualizar progreso y guardar avance
    useEffect(() => {
      if (todosLosSubmodulos.length > 0) {
        const porcentaje = ((indiceActual + 1) / todosLosSubmodulos.length) * 100;
        setPorcentajeProgreso(porcentaje);
        localStorage.setItem("avanceCursoIA", indiceActual);
      }
    }, [indiceActual, todosLosSubmodulos]);
  
    const siguienteSubmodulo = () => {
      if (indiceActual < todosLosSubmodulos.length - 1) {
        setIndiceActual(indiceActual + 1);
      }
    };
  
    const anteriorSubmodulo = () => {
      if (indiceActual > 0) {
        setIndiceActual(indiceActual - 1);
      }
    };
  
    if (todosLosSubmodulos.length === 0) {
      return <div>Cargando contenido...</div>;
    }
  
    const actual = todosLosSubmodulos[indiceActual];
  
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>{datosCurso.nombre_curso}</h1>
  
        <div style={styles.card}>
          <h2 style={styles.subtitle}>Submódulo: {actual.titulo}</h2>
          <p>ID: {actual.id}</p>
        </div>
  
        <div style={styles.progressContainer}>
          <p style={styles.progressText}>
            Submódulo {indiceActual + 1} de {todosLosSubmodulos.length}
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
          <button
            onClick={anteriorSubmodulo}
            disabled={indiceActual === 0}
            style={{
              ...styles.button,
              backgroundColor: indiceActual === 0 ? "#ccc" : "#2196f3",
            }}
          >
            Anterior
          </button>
          <button
            onClick={siguienteSubmodulo}
            disabled={indiceActual === todosLosSubmodulos.length - 1}
            style={{
              ...styles.button,
              backgroundColor:
                indiceActual === todosLosSubmodulos.length - 1
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
    subtitle: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
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