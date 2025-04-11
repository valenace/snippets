import React, { useState } from "react";
import "./App.css";
import ConnectTest from "./ConnectTest";
import SentenceTest from "./SentenceTest";
import "bootstrap/dist/css/bootstrap.min.css";
import GameCanvas from "./GameCanvas";
import PuzzleBoard from "./PuzzleBoard";
import Puzzle from "./Puzzle";


const App = () => {
  const [currentView, setCurrentView] = useState("flow");

  return (
    <div className="app">
      <ConnectTest />
      <hr/>
      <SentenceTest />
      <hr/>
      <PuzzleBoard />
      <hr/>
      <Puzzle />
    </div>
  );
};

export default App;