import React, { useState } from "react";
import '../../assets/css/puzzle.css';

const Puzzle = ({ datos }) => {
  // Validamos que lleguen datos y sean del formato esperado
  if (!datos || !Array.isArray(datos) || datos.length === 0 || !datos[0]?.pieces) {
    return <p>No hay datos disponibles para mostrar el rompecabezas.</p>;
  }

  const piecesData = datos[0].pieces;

  // Estado inicial de las piezas
  const [pieces, setPieces] = useState(
    piecesData.map((piece, index) => ({
      ...piece,
      visible: index === 0,
      position: 0,
    }))
  );

  const [currentPieceIndex, setCurrentPieceIndex] = useState(0);

  // Función para mostrar la siguiente pieza
  const showNextPiece = () => {
    if (currentPieceIndex < pieces.length - 1) {
      const updatedPieces = [...pieces];
      updatedPieces[currentPieceIndex + 1].visible = true;
      setPieces(updatedPieces);
      setCurrentPieceIndex(currentPieceIndex + 1);
    }
  };

  // Manejar clic en una pieza
  const handlePieceClick = (id) => {
    const pieceIndex = pieces.findIndex((piece) => piece.id === id);
    const updatedPieces = [...pieces];

    // Si ya está colocada, no hacer nada
    if (updatedPieces[pieceIndex].position === 1) return;

    // Marcar como colocada
    updatedPieces[pieceIndex].position = 1;
    setPieces(updatedPieces);

    // Mostrar siguiente pieza
    showNextPiece();
  };

  // Resetear puzzle
  const resetPuzzle = () => {
    setPieces((prevPieces) =>
      prevPieces.map((piece, index) => ({
        ...piece,
        visible: index === 0,
        position: 0,
      }))
    );
    setCurrentPieceIndex(0);
  };

  return (
    <div>
      {/* Botón de Reset */}
      <button id="reset-button" onClick={resetPuzzle}>
        Reset
      </button>

      <div id="main-wrapper">
        <div id="puzzle">
          {pieces.map((piece) => (
            <Piece
              key={piece.id}
              id={piece.id}
              visible={piece.visible}
              position={piece.position}
              titulo={piece.titulo}
              descripcion={piece.descripcion}
              onClick={() => handlePieceClick(piece.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente Piece
const Piece = ({ id, visible, position, titulo, descripcion, onClick }) => {
  const pieceStyles = {
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? "auto" : "none",
    transform:
      position === 1
        ? `translateX(var(--final-x)) translateY(var(--final-y)) rotate(0deg)`
        : `translateX(var(--initial-x)) translateY(var(--initial-y)) rotate(var(--initial-rotate))`,
  };

  return (
    <div
      className={`piece piece${id}`}
      data-position={position}
      data-visible={visible}
      style={pieceStyles}
      onClick={onClick}
    >
      <div className="content">
        <h5>{titulo}</h5>
        {/* <p>{descripcion}</p> */}
      </div>
    </div>
  );
};

export default Puzzle;