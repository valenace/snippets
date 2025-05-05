import React, { useState } from "react";

const Puzzle = () => {
  const [pieces, setPieces] = useState([
    { id: 1, visible: true, position: 0 },
    { id: 2, visible: false, position: 0 },
    { id: 3, visible: false, position: 0 },
    { id: 4, visible: false, position: 0 },
    { id: 5, visible: false, position: 0 },
    { id: 6, visible: false, position: 0 },
  ]);

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

  // Función para manejar el clic en una pieza
  const handlePieceClick = (id) => {
    const pieceIndex = pieces.findIndex((piece) => piece.id === id);
    const updatedPieces = [...pieces];

    // Si la pieza ya está colocada, no hacer nada
    if (updatedPieces[pieceIndex].position === 1) return;

    // Marcar la pieza como colocada
    updatedPieces[pieceIndex].position = 1;
    setPieces(updatedPieces);

    // Mostrar la siguiente pieza
    showNextPiece();
  };

  // Función para resetear el rompecabezas
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
                    onClick={() => handlePieceClick(piece.id)}
                />
                ))}
            </div>            
        </div>        
    </div>
    
  );
};

// Componente Piece
const Piece = ({ id, visible, position, onClick }) => {
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
        <h5>Título {id}</h5>
      </div>
    </div>
  );
};

export default Puzzle;