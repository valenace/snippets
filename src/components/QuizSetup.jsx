import React, { useState } from 'react';
import Question from './Question';

const QuizSetup = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateResults = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(null));
    setShowResults(false);
  };

  return (
    <div style={styles.container}>
      <h2>Cuestionario</h2>
      {!showResults ? (
        <>
          <Question
            question={questions[currentQuestion]}
            onAnswerSelect={handleAnswerSelect}
            selectedAnswer={answers[currentQuestion]}
          />
          <div style={styles.navigation}>
            {currentQuestion > 0 && (
              <button onClick={goToPreviousQuestion}>Anterior</button>
            )}
            {currentQuestion < questions.length - 1 ? (
              <button onClick={goToNextQuestion} disabled={!answers[currentQuestion]}>Siguiente</button>
            ) : (
              <button onClick={handleSubmit} disabled={!answers[currentQuestion]}>Finalizar</button>
            )}
          </div>
          <p>Pregunta {currentQuestion + 1} de {questions.length}</p>
        </>
      ) : (
        <div style={styles.results}>
          <h3>Resultados</h3>
          <p>Obtuviste {calculateResults()} de {questions.length} respuestas correctas.</p>
          <button onClick={handleRestart}>Volver a intentar</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  navigation: {
    marginTop: '20px',
  },
  results: {
    marginTop: '20px',
    padding: '15px',
    border: '1px solid #eee',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
};

export default QuizSetup;