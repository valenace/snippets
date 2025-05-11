import React, { useState } from "react";
import "./App.css";
import ConnectTest from "./ConnectTest";
import SentenceTest from "./SentenceTest";
import "bootstrap/dist/css/bootstrap.min.css";
import PuzzleGame from "./PuzzleGame";


const App = () => {
  const [currentView, setCurrentView] = useState("flow");

  return (
    <div className="app">
        <PuzzleGame />
        <hr/>
        <ConnectTest />
        <hr/>
        <SentenceTest />
    </div>
  );
};

export default App;