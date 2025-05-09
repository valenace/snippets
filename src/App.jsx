import React, { useState } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.min'; // Importa el JS de Bootstrap (depende de Popper)
import '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.min.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faCheckSquare } from '@fortawesome/free-solid-svg-icons'

library.add(faCoffee, faCheckSquare); // Agrega los iconos a la biblioteca de Font Awesome


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
import Boxes from "./components/Boxes";
const App = () => {
  return (
    <>
      <Boxes />
    </>   
    
      
  );
};

export default App;