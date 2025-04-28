// src/components/GameCanvas.jsx
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import PuzzleScene from './PuzzleScene';

const GameCanvas = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameRef.current) return;

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: [PuzzleScene],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
        },
      },
      parent: 'game-container', // ID del div donde se renderizará el juego
    };

    gameRef.current = new Phaser.Game(config);

    // Limpiar el juego al desmontar el componente
    return () => {
      gameRef.current.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return <div id="game-container"></div>;
};

export default GameCanvas;