import React from "react";
import { useDrag } from "react-dnd";

const PuzzlePiece = ({ piece }) => {
  // Validación: Asegúrate de que `piece` esté definido
  if (!piece) {
    console.error("Error: La pieza no está definida");
    return null;
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PIECE", // Asegúrate de que este tipo coincida con el usado en `useDrop`
    item: { id: piece.id, position: piece.position },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="puzzle-piece"
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundImage: `url(${piece.image})`,
        backgroundSize: "cover",
        width: "100px",
        height: "100px",
      }}
    >
      {piece.id}
    </div>
  );
};

export default PuzzlePiece;