// src/scenes/PuzzleScene.js
import Phaser from 'phaser';

class PuzzleScene extends Phaser.Scene {
  constructor() {
    super('PuzzleScene');
  }

  preload() {
    // Cargar la imagen del rompecabezas
    this.load.image('puzzle', '/assets/puzzle-image.jpg');
  }

  create() {
    const imageWidth = 800;
    const imageHeight = 600;

    // Dividir la imagen en piezas (por ejemplo, 3x3)
    const rows = 3;
    const cols = 3;
    const pieceWidth = imageWidth / cols;
    const pieceHeight = imageHeight / rows;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * pieceWidth;
        const y = row * pieceHeight;

        // Crear cada pieza como un sprite
        const piece = this.add.sprite(x, y, 'puzzle').setOrigin(0, 0);
        piece.setInteractive();

        // Recortar la pieza usando crop
        piece.setCrop(x, y, pieceWidth, pieceHeight);

        // Hacer que las piezas sean arrastrables
        this.input.setDraggable(piece);

        // Agregar eventos de arrastre
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
          gameObject.x = dragX;
          gameObject.y = dragY;
        });
      }
    }
  }
}

export default PuzzleScene;