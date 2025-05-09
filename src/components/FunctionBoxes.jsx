import React from "react";
import { useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faRocket } from "@fortawesome/free-solid-svg-icons";
import '../../assets/boxes.css'

export const FunctionBoxes = ({ id, children, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "WORD",
    drop: (item) => onDrop(id, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className="col-md-3 col-sm-6">
      <div
        ref={drop}
        className={`serviceBox ${id === "box2" ? "magenta" : ""}`}
        style={{
          position: "relative",
          opacity: isOver ? 0.9 : 1,
          transition: "opacity 0.2s",
        }}
      >
        {/* Icono */}
        <div className="service-icon">
          <span>
            {id === "box1" ? (
              <img src='../src/assets/ai-generative.png'
              alt='ai-generative'
              // style={{ width: '100%',
              //   height: '100%',
              //   objectFit: 'cover', // Asegura que la imagen llene completamente la celda
              //   }}
            />
            ) : (
              <FontAwesomeIcon icon={faRocket} />
            )}
          </span>
        </div>

        {/* Título */}
        <h3 className="title">
          {id === "box1" ? "IA Predictiva" : "IA Generativa"}
        </h3>

        {/* Área de palabras (centrada debajo del título) */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};