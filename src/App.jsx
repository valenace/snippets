import React, { useState } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.min'; // Importa el JS de Bootstrap (depende de Popper)
import '@popperjs/core';

import ConnectTest from "./components/ConnectTest";
import SentenceTest from "./components/SentenceTest";
import GameCanvas from "./components/GameCanvas";
import PuzzleBoard from "./components/PuzzleBoard";
import Puzzle from "./components/Puzzle";
import TestOpciones from "./components/TestOpciones";
import TestValidacionIndv from "./components/TestOpcionesIndv";
import ModuloDetalle from "./components/ModuloDetalle";
import CourseSidebar from "./components/CourseSidebar";
import HorizontalTimeline from "./components/HorizontalTimeline";
import Timeline from "./components/Timeline";
const App = () => {
  return (
    
    <Timeline />
    
      
  );
};

export default App;