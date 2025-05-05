import { useState, useEffect, useRef } from "react";
import LeaderLine from "leader-line-new";

function ConnectTest({ items }) { // Recibimos 'items' como prop
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [connections, setConnections] = useState([]);
  const [isValidated, setIsValidated] = useState(false);
  const [score, setScore] = useState(0);
  const titleRefs = useRef({});
  const conceptRefs = useRef({});
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
      const titleEl = titleRefs.current[title];
      const conceptEl = conceptRefs.current[concept];
      if (titleEl && conceptEl) {
        try {
          const line = new LeaderLine(titleEl, conceptEl, { color: "aliceblue", path: "straight", size: 2 });
          return line;
        } catch (error) {
          console.error("Error creating LeaderLine:", error);
          return null;
        }
      }
      return null;
    }).filter(line => line !== null);
  }, [connections]);

  const validateAnswers = () => {
    let correct = 0;
    connections.forEach((conn) => {
      // Asumimos que la conexión correcta es cuando el title.id === concept.id
      // Si tu lógica es diferente, ajústala aquí.
      const titleItem = items.find(item => item.id === conn.title);
      const conceptItem = items.find(item => item.id === conn.concept);
      if (titleItem && conceptItem && titleItem.id === conceptItem.id) {
        correct++;
      }
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
                ref={(el) => (titleRefs.current[item.id] = el)}
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
                ref={(el) => (conceptRefs.current[item.id] = el)}
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

export default ConnectTest;