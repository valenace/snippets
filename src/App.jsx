import React, { useState } from "react";
import "./App.css";
import ConnectTest from "./ConnectTest";
import SentenceTest from "./SentenceTest";
import "bootstrap/dist/css/bootstrap.min.css";
import GameCanvas from "./GameCanvas";
import PuzzleBoard from "./PuzzleBoard";
import Puzzle from "./Puzzle";
import TestOpciones from "./TestOpciones";
import TestValidacionIndv from "./TestOpcionesIndv";
import ModuloDetalle from "./ModuloDetalle";


const App = () => {
  return (
    <div className="app">
      <ModuloDetalle />
      {/* <ConnectTest />
      <hr/>
      <TestOpciones />
      <hr/>
      <TestValidacionIndv />
      <hr/>
      <SentenceTest />
      <hr/>
      <PuzzleBoard />
      <hr/>
      <Puzzle /> */}
      
    </div>
  );
};

export default App;