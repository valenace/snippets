import React from "react";
import { useDrop } from "react-dnd";
import PuzzlePiece from "./PuzzlePiece";

const PuzzleBoard = ({ pieces, placedPieces, currentPieceIndex, onPlacePiece }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PIECE",
    drop: (item) => {
      const { id, position } = item;
      onPlacePiece(id, position);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="puzzle-board" ref={drop}>
      <div className="grid">
        {pieces.map((piece) => (
          <div
            key={`${piece.position.x}-${piece.position.y}`}
            className={`cell ${
              placedPieces.some(
                (p) =>
                  p.position.x === piece.position.x &&
                  p.position.y === piece.position.y
              )
                ? "filled"
                : ""
            }`}
          >
            {/* Mostrar la pieza colocada */}
            {placedPieces.some(
              (p) =>
                p.position.x === piece.position.x &&
                p.position.y === piece.position.y
            ) && <img src={piece.image} alt="pieza colocada" />}
          </div>
        ))}
      </div>

      {/* Mostrar la pieza actual */}
      {currentPieceIndex < pieces.length && (
        <PuzzlePiece piece={pieces[currentPieceIndex]} />
      )}
    </div>
  );
};

export default PuzzleBoard;