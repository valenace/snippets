import { useState, useEffect, useRef } from "react";
import LeaderLine from "leader-line-new";

const items = [
  { id: "1", title: "Fotosíntesis", concept: "Proceso mediante el cual las plantas convierten..." },
  { id: "2", title: "Energía Cinética", concept: "Energía asociada al movimiento de un objeto." },
  { id: "3", title: "Teoría de la Relatividad", concept: "Propuesta por Albert Einstein, describe cómo..." },
  { id: "4", title: "Ciclo del Agua", concept: "Proceso que describe cómo el agua circula entre..." },
  { id: "5", title: "ADN", concept: "Molécula que contiene la información genética..." }
];

export default function ConnectTest() {
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [connections, setConnections] = useState([]);
  const [isValidated, setIsValidated] = useState(false);
  const [score, setScore] = useState(0);
  const linesRef = useRef([]);

  const handleTitleClick = (id) => {
    setSelectedTitle(id);
  };

  const handleConceptClick = (id) => {
    if (selectedTitle) {
      setConnections((prev) => {
        const filtered = prev.filter(conn => conn.title !== selectedTitle && conn.concept !== id);
        return [...filtered, { title: selectedTitle, concept: id }];
      });
      setSelectedTitle(null);
    }
  };

  useEffect(() => {
    linesRef.current.forEach((line) => line.remove());
    linesRef.current = connections.map(({ title, concept }) => {
      const titleEl = document.getElementById(`title-${title}`);
      const conceptEl = document.getElementById(`concept-${concept}`);
      if (titleEl && conceptEl) {
        return new LeaderLine(titleEl, conceptEl, { color: "white", path: "straight", size: 2 });
      }
      return null;
    }).filter(line => line !== null);
  }, [connections]);

  const validateAnswers = () => {
    let correct = 0;
    connections.forEach((conn) => {
      if (conn.title === conn.concept) correct++;
    });
    setScore(correct);
    setIsValidated(true);
  };

  const resetConnections = () => {
    setConnections([]);
    setIsValidated(false);
    setScore(0);
  };

  return (
    <div className="container mt-5 p-4 bg-dark  rounded shadow position-relative">
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-center text-white mb-4">Títulos</h2>
          <div className="d-grid gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                id={`title-${item.id}`}
                className={`p-2 border bg-light rounded text-center text-dark shadow-sm cursor-pointer ${selectedTitle === item.id ? "bg-primary text-white" : ""}`}
                onClick={() => handleTitleClick(item.id)}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="text-center text-white mb-4">Conceptos</h2>
          <div className="d-grid gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                id={`concept-${item.id}`}
                className="p-3 border bg-white rounded d-flex align-items-center justify-content-center shadow-sm cursor-pointer"
                onClick={() => handleConceptClick(item.id)}
              >
                {item.concept}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <button onClick={validateAnswers} className="btn btn-primary me-2">Validar Respuestas</button>
        <button onClick={resetConnections} className="btn btn-danger">Reset</button>
      </div>
      {isValidated && <p className="text-center text-white mt-3 fw-bold">Puntaje: {score} / {items.length}</p>}
    </div>
  );
}
