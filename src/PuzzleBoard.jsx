// src/components/PuzzleBoard.jsx
import React, { useState } from 'react';

const PuzzleBoard = () => {
  // Lista de piezas originales
  const originalPieces = ['piece1', 'piece2', 'piece3', 'piece4', 'piece5', 'piece6']; // Nombres de las imágenes

  // Estado para las piezas desordenadas
  const [pieces, setPieces] = useState(shuffleArray([...originalPieces]));

  // Estado para el tablero donde se colocan las piezas
  const [board, setBoard] = useState(Array(6).fill(null));

  // Función para mezclar un array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Manejar el arrastre de una pieza
  const handleDragStart = (e, piece) => {
    e.dataTransfer.setData('text/plain', piece);
  };

  // Manejar la llegada de una pieza al tablero
  const handleDrop = (e, index) => {
    e.preventDefault();
    const piece = e.dataTransfer.getData('text/plain');

    // Actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = piece;

    // Eliminar la pieza de las disponibles
    const newPieces = [...pieces];
    const pieceIndex = newPieces.indexOf(piece);
    if (pieceIndex !== -1) {
      newPieces[pieceIndex] = null;
    }

    setBoard(newBoard);
    setPieces(newPieces);

    // Verificar si el rompecabezas está completo
    checkCompletion(newBoard);
  };

  // Verificar si el rompecabezas está completo
  const checkCompletion = (currentBoard) => {
    if (currentBoard.join(',') === originalPieces.join(',')) {
      alert('¡Felicidades! Has completado el rompecabezas.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>

      {/* Tablero */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', // 3 columnas
          width: '300px', // Ancho total del tablero
          height: '200px', // Altura total del tablero
          margin: '0 auto', // Centrar el tablero
          border: '2px solid black', // Borde opcional para el tablero
        }}
      >
        {board.map((piece, index) => (
          <div
            key={index}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={(e) => e.preventDefault()}
            style={{
              width: '100px', // Ancho de cada celda
              height: '100px', // Altura de cada celda
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none', // Sin bordes entre las celdas
              padding: 0, // Sin relleno
              margin: 0, // Sin márgenes
            }}
          >
            {piece && (
              <img
                src={`../src/assets/${piece}.png`}
                alt={piece}
                style={{ width: '100%',
                  height: '100%',
                  objectFit: 'cover', // Asegura que la imagen llene completamente la celda
                  }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Piezas disponibles */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {pieces.map((piece, index) =>
          piece && (
            <img
              key={index}
              src={`../src/assets/${piece}.png`}
              alt={piece}
              draggable
              onDragStart={(e) => handleDragStart(e, piece)}
              style={{
                width: '100px',
                height: '100px',
                cursor: 'grab',
                border: '2px solid black',
              }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default PuzzleBoard;