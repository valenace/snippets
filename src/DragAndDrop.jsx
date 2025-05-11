import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const initialTitles = [
  { id: 1, text: "Fotosíntesis" },
  { id: 2, text: "Energía Cinética" },
];

const initialConcepts = [
  { id: "A", text: "Proceso mediante el cual..." },
  { id: "B", text: "Molécula que contiene..." },
];

const Title = ({ title, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TITLE",
    item: { id: title.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="block" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {title.text}
    </div>
  );
};

const Concept = ({ concept, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TITLE",
    drop: (item) => onDrop(item.id, concept.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="block"
      style={{ backgroundColor: isOver ? "#e0f7fa" : "white" }}
    >
      {concept.text}
    </div>
  );
};

const DragAndDrop = () => {
  const [connections, setConnections] = useState([]);

  const handleDrop = (titleId, conceptId) => {
    const existingConnection = connections.find(
      (conn) => conn.titleId === titleId || conn.conceptId === conceptId
    );

    if (existingConnection) return;

    setConnections([...connections, { titleId, conceptId }]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="columns-container">
        {/* Columna Izquierda (Títulos) */}
        <div className="column titles">
          {initialTitles.map((title) => (
            <Title key={title.id} title={title} onDrop={handleDrop} />
          ))}
        </div>
        {/* Columna Derecha (Conceptos) */}
        <div className="column concepts">
          {initialConcepts.map((concept) => (
            <Concept key={concept.id} concept={concept} onDrop={handleDrop} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default DragAndDrop;