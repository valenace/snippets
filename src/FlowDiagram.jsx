import React, { useState } from "react";
import ReactFlow, { addEdge, ConnectionLineType } from "reactflow";
import "reactflow/dist/style.css"; // Importa los estilos predeterminados

const initialTitles = [
  { id: "1", data: { label: "Fotosíntesis" }, position: { x: 50, y: 50 } },
  { id: "2", data: { label: "Energía Cinética" }, position: { x: 50, y: 150 } },
];

const initialConcepts = [
  { id: "A", data: { label: "Proceso mediante el cual..." }, position: { x: 400, y: 50 } },
  { id: "B", data: { label: "Molécula que contiene..." }, position: { x: 400, y: 150 } },
];

const FlowDiagram = () => {
  const [elements, setElements] = useState([...initialTitles, ...initialConcepts]);
  const [edges, setEdges] = useState([]);

  const onConnect = (params) => {
    setEdges((eds) => addEdge(params, eds));
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        elements={elements}
        edges={edges}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
      />
    </div>
  );
};

export default FlowDiagram;