import React from 'react';
import QuizSetup from './QuizSetup';

const Quiz = () => {
  const quizQuestions = [
    {
      text: '¿Disfrutas aprendiendo cosas nuevas?',
      correctAnswer: 'Sí',
    },
    {
      text: '¿Te consideras una persona organizada?',
      correctAnswer: 'De cierta manera',
    },
    {
      text: '¿Te sientes cómodo trabajando en equipo?',
      correctAnswer: 'Sí',
    },
    {
      text: '¿Te frustras fácilmente ante los desafíos?',
      correctAnswer: 'No',
    },
    {
      text: '¿Eres bueno para resolver problemas?',
      correctAnswer: 'Sí',
    },
    {
      text: '¿Prefieres seguir instrucciones detalladas en lugar de improvisar?',
      correctAnswer: 'De cierta manera',
    },
    {
      text: '¿Te consideras una persona creativa?',
      correctAnswer: 'Sí',
    },
    {
      text: '¿Te gusta tomar la iniciativa?',
      correctAnswer: 'De cierta manera',
    },
  ];

  return (
    <div style={styles.QuizContainer}>
      <h1>Mi Aplicación con Cuestionario</h1>
      <Quiz questions={quizQuestions} />
    </div>
  );
};

const styles = {
  QuizContainer: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
  },
};

export default Quiz;