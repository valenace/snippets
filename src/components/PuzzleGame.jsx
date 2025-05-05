import React, { useState } from "react";
import PuzzleBoard from "./PuzzleBoard";

const PuzzleGame = () => {
  // Datos de las piezas del rompecabezas
  const initialPieces = [
    { id: 1, position: { x: 0, y: 0 }, color: "yellow", radius: Math.random() * 100 },
    { id: 2, position: { x: 1, y: 0 }, color: "orange", radius: Math.random() * 100 },
    { id: 3, position: { x: 2, y: 0 }, color: "red", radius: Math.random() * 100 },
    { id: 4, position: { x: 0, y: 1 }, color: "green", radius: Math.random() * 100 },
    { id: 5, position: { x: 1, y: 1 }, color: "blue", radius: Math.random() * 100 },
    { id: 6, position: { x: 2, y: 1 }, color: "purple", radius: Math.random() * 100 },
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
      console.log(`Colocada pieza ${currentPiece.id} correctamente`);
      // Agregar la pieza a las colocadas
      setPlacedPieces((prevPlacedPieces) => [
        ...prevPlacedPieces,
        { ...currentPiece, position },
      ]);
      // Incrementar el índice de la pieza actual
      setCurrentPieceIndex((prevIndex) => prevIndex + 1);
    } else {
      console.log(`Posición incorrecta para pieza ${currentPiece.id}`);
      alert("Pieza incorrecta. Intenta de nuevo.");
    }
  };

  return (
    <div className="puzzle-game">
      <h2>Rompecabezas Interactivo</h2>
      <PuzzleBoard
        pieces={initialPieces}
        placedPieces={placedPieces}
        currentPieceIndex={currentPieceIndex}
        onPlacePiece={handlePlacePiece}
      />
    </div>
  );
};

export default PuzzleGame;