import React, { useState } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.min'; // Importa el JS de Bootstrap (depende de Popper)
import '@popperjs/core';

import ConnectTest from "./ConnectTest";
import SentenceTest from "./SentenceTest";
import GameCanvas from "./GameCanvas";
import PuzzleBoard from "./PuzzleBoard";
import Puzzle from "./Puzzle";
import TestOpciones from "./TestOpciones";
import TestValidacionIndv from "./TestOpcionesIndv";
import ModuloDetalle from "./ModuloDetalle";
import CourseSidebar from "./CourseSidebar";
import HorizontalTimeline from "./components/HorizontalTimeline";

const timelineEvents = [
  { title: "Evento 1", sub: "Fecha 1" },
  { title: "Evento 2", sub: "Fecha 2" },
  { title: "Evento 3", sub: "Fecha 3" },
  { title: "Evento 4", sub: "Fecha 4" },
  { title: "Evento 4", sub: "Fecha 4" },
  { title: "Evento 4", sub: "Fecha 4" },
  { title: "Evento 4", sub: "Fecha 4" },
  { title: "Evento 4", sub: "Fecha 4" },
  { title: "Evento 1", sub: "Fecha 1" },
  { title: "Evento 2", sub: "Fecha 2" },
  { title: "Evento 3", sub: "Fecha 3" },
  { title: "Evento 4", sub: "Fecha 4" },
  { title: "Evento 4", sub: "Fecha 4" },
  { title: "Evento 4", sub: "Fecha 4" },
  { title: "Evento 4", sub: "Fecha 4" },
  { title: "Evento 4", sub: "Fecha 4" },
  // ... más eventos
];
const App = () => {
  return (
    <div className="app container-fluid">
      <div className="row">
        <div className="col-md-3 bg-light p-3">
          <CourseSidebar />
        </div>
        <div className="col-md-9 p-4">
          {/* <ModuloDetalle /> */}
          <HorizontalTimeline timelines={timelineEvents}/>
          {/* Otros componentes que quieras mostrar en el contenido principal */}
        </div>
      </div>
      {/* Otros componentes que estaban en tu App */}
    </div>
  );
};

export default App;