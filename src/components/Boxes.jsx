import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import '../../assets/css/boxes.css';

// Componente palabra arrastrable
function DraggableWord({ word }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "WORD",
    item: word,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <div
      ref={drag}
      className={`btn btn-${word.color} m-1`}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "grab", height: 'fit-content' }}
    >
      {word.text}
    </div>
  );
}

// Componente caja de destino
export function FunctionBoxes({ id, children, onDrop }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "WORD",
    drop: (item) => onDrop(id, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  return (
    <div className="col-md-4 col-sm-7 mt-5">
      <div
        ref={drop}
        className={`serviceBox ${id === "box2" ? "magenta" : ""}`}
        style={{
          position: "relative",
          opacity: isOver ? 0.9 : 1,
          transition: "opacity 0.2s"
        }}
      >
        {/* Icono */}
        <div className="service-icon">
          <span>
            {id === "box1" ? (
              <img src='../assets/img/icons/ai-predictive.png'
                alt='ai-predictive'
                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
              />
            ) : (
              <img src='../assets/img/icons/ai-generative.png'
                alt='ai-generative'
                style={{ width: '40px', height: '40px', objectFit: 'cover', verticalAlign: 'sub' }}
              />
            )}
          </span>
        </div>

        {/* Título */}
        <h3 className="title">
          {id === "box1" ? "IA Predictiva" : "IA Generativa"}
        </h3>

        {/* Área de palabras */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mt-4"
            style={{
              border: '1px dashed #00000033',
              borderRadius: '20px',
              minHeight: '125px'
            }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// Componente principal del juego
const Boxes = ({ datos }) => {
  // Si no hay datos o no están en el formato esperado
  if (!datos || !Array.isArray(datos) || datos.length < 2) {
    return <p>No hay datos válidos para mostrar.</p>;
  }

  const initialWords = datos[0]?.initialWords || [];
  const correctAnswers = datos[1]?.correctAnswers?.[0] || {};

  const [words, setWords] = useState(initialWords);
  const [message, setMessage] = useState("");

  const handleDrop = (containerId, word) => {
    setWords((prev) =>
      prev.map((w) =>
        w.id === word.id ? { ...w, container: containerId } : w
      )
    );
  };

  const handleReset = () => {
    setWords((prev) =>
      prev.map((word) => ({ ...word, container: "available" }))
    );
    setMessage("");
  };

  const validateAnswer = () => {
    const box1Words = words.filter((w) => w.container === "box1").map((w) => parseInt(w.id));
    const box2Words = words.filter((w) => w.container === "box2").map((w) => parseInt(w.id));

    const correctBox1 = [...(correctAnswers.box1 || [])].sort();
    const correctBox2 = [...(correctAnswers.box2 || [])].sort();

    const userBox1 = [...box1Words].sort();
    const userBox2 = [...box2Words].sort();

    if (
      JSON.stringify(userBox1) === JSON.stringify(correctBox1) &&
      JSON.stringify(userBox2) === JSON.stringify(correctBox2)
    ) {
      setMessage("¡Correcto! 🎉");
    } else {
      setMessage("Inténtalo de nuevo 😊");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mt-5 p-4 bg-light text-dark rounded shadow">
        {/* Palabras disponibles */}
        <div className="text-center mb-4">
          <h4 className="mb-3">Palabras Disponibles</h4>
          <div className="d-flex justify-content-center">
            <div className="">
              <h5 className="title">Palabras</h5>
              <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
                {words
                  .filter((w) => w.container === "available")
                  .map((word) => (
                    <DraggableWord key={word.id} word={word} />
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cajas de destino */}
        <div className="row justify-content-center mt-4 mb-5">
          <FunctionBoxes id="box1" onDrop={handleDrop}>
            {words
              .filter((w) => w.container === "box1")
              .map((word) => (
                <DraggableWord key={word.id} word={word} />
              ))}
          </FunctionBoxes>

          <FunctionBoxes id="box2" onDrop={handleDrop}>
            {words
              .filter((w) => w.container === "box2")
              .map((word) => (
                <DraggableWord key={word.id} word={word} />
              ))}
          </FunctionBoxes>
        </div>

        {/* Botones y mensaje */}
        <div className="text-center mt-4">
          <button className="btn btn-secondary me-2" onClick={validateAnswer}>
            Validar Respuesta
          </button>
          <button className="btn btn-secondary" onClick={handleReset}>
            Reiniciar
          </button>
        </div>
        {message && (
          <div className="text-center mt-3 fs-5 fw-bold">{message}</div>
        )}
      </div>
    </DndProvider>
  );
};

export default Boxes;