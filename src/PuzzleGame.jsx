import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PuzzleBoard from "./PuzzleBoard";

const PuzzleGame = () => {
  // Datos de las piezas del rompecabezas
  const initialPieces = [
    { id: 1, position: { x: 0, y: 0 }, image: "piece1.png" },
    { id: 2, position: { x: 1, y: 0 }, image: "piece2.png" },
    { id: 3, position: { x: 2, y: 0 }, image: "piece3.png" },
    { id: 4, position: { x: 0, y: 1 }, image: "piece4.png" },
    { id: 5, position: { x: 1, y: 1 }, image: "piece5.png" },
    { id: 6, position: { x: 2, y: 1 }, image: "piece6.png" },
  ];

  // Estado para las piezas colocadas y la pieza actual
  const [placedPieces, setPlacedPieces] = useState([]);
  const [currentPieceIndex, setCurrentPieceIndex] = useState(0);

  // Manejar la colocación de una pieza
  const handlePlacePiece = (pieceId, position) => {
    const currentPiece = initialPieces[currentPieceIndex];

    // Verificar si la posición es correcta
    if (
      currentPiece.position.x === position.x &&
      currentPiece.position.y === position.y
    ) {
      // Agregar la pieza a las colocadas
      setPlacedPieces([...placedPieces, { ...currentPiece, position }]);
      setCurrentPieceIndex(currentPieceIndex + 1); // Mostrar la siguiente pieza
    } else {
      alert("Pieza incorrecta. Intenta de nuevo.");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="puzzle-game">
        <h2>Rompecabezas Interactivo</h2>
        <PuzzleBoard
          pieces={initialPieces}
          placedPieces={placedPieces}
          currentPieceIndex={currentPieceIndex}
          onPlacePiece={handlePlacePiece}
        />
      </div>
    </DndProvider>
  );
};

export default PuzzleGame;