import { useState } from 'react';

function TestValidacionIndv() {
  const [respuestas, setRespuestas] = useState(Array(5).fill(''));
  const [validacion, setValidacion] = useState(Array(5).fill(null)); // null: sin validar, true: correcta, false: incorrecta
  const preguntasConRespuestas = [
    {
      pregunta: '¿Es cierto que el agua hierve a 100°C al nivel del mar?',
      respuestaCorrecta: 'Sí',
    },
    {
      pregunta: '¿Es verdad que la Tierra es plana?',
      respuestaCorrecta: 'No',
    },
    {
      pregunta: '¿A veces te sientes confundido/a por la tecnología?',
      respuestaCorrecta: 'De cierta manera',
    },
    {
      pregunta: '¿Es un hecho que todos los cisnes son blancos?',
      respuestaCorrecta: 'No',
    },
    {
      pregunta: '¿Estás absolutamente seguro/a de que siempre tienes la razón?',
      respuestaCorrecta: 'No',
    },
  ];

  const handleChange = (index, event) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = event.target.value;
    setRespuestas(nuevasRespuestas);
    // Reiniciar la validación al cambiar la respuesta
    const nuevaValidacion = [...validacion];
    nuevaValidacion[index] = null;
    setValidacion(nuevaValidacion);
  };

  const validarRespuesta = (index) => {
    if (respuestas[index] !== '') {
      const esCorrecta = respuestas[index] === preguntasConRespuestas[index].respuestaCorrecta;
      const nuevaValidacion = [...validacion];
      nuevaValidacion[index] = esCorrecta;
      setValidacion(nuevaValidacion);
    } else {
      alert('Por favor, selecciona una opción antes de validar.');
    }
  };

  const mostrarResultadosFinales = () => {
    if (validacion.every(v => v !== null)) {
      const correctas = validacion.filter(v => v === true).length;
      alert(`Obtuviste ${correctas} respuestas correctas de ${preguntasConRespuestas.length}`);
    } else {
      alert('Por favor, valida todas las preguntas antes de ver los resultados finales.');
    }
  };

  return (
    <div>
      <h2>Test con Validación individual</h2>
      {preguntasConRespuestas.map((item, index) => (
        <div key={index}>
          <p>{item.pregunta}</p>
          <label>
            <input
              type="radio"
              name={`pregunta-${index}`}
              value="Sí"
              checked={respuestas[index] === 'Sí'}
              onChange={(event) => handleChange(index, event)}
            />
            Sí
          </label>
          <label>
            <input
              type="radio"
              name={`pregunta-${index}`}
              value="No"
              checked={respuestas[index] === 'No'}
              onChange={(event) => handleChange(index, event)}
            />
            No
          </label>
          <label>
            <input
              type="radio"
              name={`pregunta-${index}`}
              value="De cierta manera"
              checked={respuestas[index] === 'De cierta manera'}
              onChange={(event) => handleChange(index, event)}
            />
            De cierta manera
          </label>
          <button type="button" onClick={() => validarRespuesta(index)}>
            Validar
          </button>
          {validacion[index] === true && <span style={{ color: 'green' }}> ¡Correcto!</span>}
          {validacion[index] === false && <span style={{ color: 'red' }}> Incorrecto. La respuesta correcta es: {item.respuestaCorrecta}</span>}
          <hr/>
        </div>
      ))}
      
      <button type="button" onClick={mostrarResultadosFinales}>
        Mostrar Resultados Finales
      </button>
    </div>
  );
}

export default TestValidacionIndv;