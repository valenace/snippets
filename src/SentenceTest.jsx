import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const words = [
  { id: 1, text: "Dulce", color: "primary" },
  { id: 2, text: "Horrible", color: "danger" },
  { id: 3, text: "Malvada", color: "warning" }
];

const blanks = [{ id: "b1" }, { id: "b2" }, { id: "b3" }];

function DraggableWord({ word }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "WORD",
    item: word,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <div
      ref={drag}
      className={`btn btn-${word.color} m-1`}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "grab" }}
    >
      {word.text}
    </div>
  );
}

function DropBlank({ blank, onDrop }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "WORD",
    drop: (item) => onDrop(blank.id, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  return (
    <div
      ref={drop}
      className="border border-dark rounded d-inline-block text-center align-middle"
      style={{ width: "100px", height: "40px", lineHeight: "40px", backgroundColor: isOver ? "lightgray" : "white" }}
    >
      {blank.word?.text || ""}
    </div>
  );
}

export default function ConnectTest() {
  const [assignedBlanks, setAssignedBlanks] = useState(
    blanks.map((b) => ({ ...b, word: null }))
  );
  const [availableWords, setAvailableWords] = useState(words);
  const [message, setMessage] = useState("");

  const handleDrop = (blankId, word) => {
    setAssignedBlanks((prev) =>
      prev.map((b) => (b.id === blankId ? { ...b, word } : b))
    );
    setAvailableWords((prev) => prev.filter((w) => w.id !== word.id));
  };

  const handleReset = () => {
    setAssignedBlanks(blanks.map((b) => ({ ...b, word: null })));
    setAvailableWords(words);
    setMessage("");
  };

  const validateAnswer = () => {
    const correctAnswer = ["Malvada", "Dulce", "Horrible"];
    const userAnswer = assignedBlanks.map((b) => (b.word ? b.word.text : ""));
    if (JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)) {
      setMessage("bien!");
    } else {
      setMessage("inténtalo de nuevo");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mt-5 p-4 bg-light text-dark rounded shadow">
        <div className="d-flex justify-content-center mb-3">
          {availableWords.map((word) => (
            <DraggableWord key={word.id} word={word} />
          ))}
        </div>
        <div className="text-center fs-4">
          La <DropBlank blank={assignedBlanks[0]} onDrop={handleDrop} /> bruja hechizó al
          <DropBlank blank={assignedBlanks[1]} onDrop={handleDrop} /> príncipe y lo convirtió
          en una <DropBlank blank={assignedBlanks[2]} onDrop={handleDrop} /> rana.
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-success" onClick={validateAnswer}>Validar </button>
          <button className="btn btn-secondary ms-2" onClick={handleReset}>Reset</button>
        </div>
        {message && <div className="text-center mt-2 fs-5">{message}</div>}
      </div>
    </DndProvider>
  );
}
