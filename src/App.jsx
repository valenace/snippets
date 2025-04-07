import React, { useState } from "react";
import "./App.css";
import ConnectTest from "./ConnectTest";
import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {
  const [currentView, setCurrentView] = useState("flow");

  return (
    <div className="app">
      <ConnectTest />
    </div>
  );
};

export default App;