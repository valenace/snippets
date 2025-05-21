import React, { useState, useRef } from "react";
import "../../assets/css/swip_text.css";


const SwipText = () => {
  const [barPosition, setBarPosition] = useState(0);
  const textContentRef = useRef(null);
  const revealBarRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleDrag = (e) => {
    if (!textContentRef.current || !revealBarRef.current) return;

    const containerRect = textContentRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;

    // Calcula la posición relativa del mouse dentro del contenedor
    const maxPosition = 1 - 30 / containerRect.width; // Restringimos el rango
    const newPosition = Math.max(
      0,
      Math.min(mouseX / containerRect.width, maxPosition)
    );

    setBarPosition(newPosition);
  };

  return (
    <div className="slide-text-container">
      <div
        ref={textContentRef}
        className="text-box"
        style={{
          pointerEvents: isDragging ? "none" : "auto",
        }}
      >
        <div
          className="text-content"
          style={{
            userSelect: isDragging ? "none" : "text",
          }}
        >
                  A efectos de este curso, entenderemos como Inteligencia Artificial a la  disciplina científica y tecnológica que se encarga de crear y aplicar sistemas, máquinas, programas o dispositivos capaces de realizar tareas que comúnmente asociamos con la inteligencia humana. <br/>Ejemplos de este tipo de tareas está el traducir de un idioma a otro, reconocer personas en una imagen, detectar y clasificar objetos según alguna característica, comprender un texto, e incluso tomar decisiones a partir de datos diversos
        </div>
        <div
          ref={revealBarRef}
          className="reveal-bar"
          style={{ transform: `translateX(${barPosition * 100}%)` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        ></div>
      </div>
    </div>
  );
};

export default SwipText;