import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import '../../assets/boxes.css';

// Palabras iniciales
const initialWords = [
  { id: 1, text: "Finanzas", color: "color1", container: "available" },
  { id: 2, text: "Entretenimiento", color: "color2", container: "available" },
  { id: 3, text: "Salud", color: "color3", container: "available" },
  { id: 4, text: "Desarrollo de productos", color: "color4", container: "available" },
  { id: 5, text: "Arquitectura", color: "color1", container: "available" },
  { id: 6, text: "Música", color: "color2", container: "available" },
  { id: 7, text: "Escritura", color: "color3", container: "available" },
  { id: 8, text: "Arte", color: "color4", container: "available" },
];

// Definición de respuestas correctas por ID
const correctAnswers = {
  box1: [1, 2, 3],     // IA Predictiva
  box2: [4, 5, 6, 7, 8] // IA Generativa
};

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
            style={{border: '1px dashed #00000033',
                    borderRadius: '20px',
                    height: '125px',
                    minHeight: 'fit-content'}}>
          {children}
        </div>
      </div>
    </div>
  );
}

// Componente principal del juego
export default function DragAndDropGame() {
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
    const box1Words = words.filter((w) => w.container === "box1").map((w) => w.id);
    const box2Words = words.filter((w) => w.container === "box2").map((w) => w.id);

    const correctBox1 = [...correctAnswers.box1].sort();
    const correctBox2 = [...correctAnswers.box2].sort();

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
}