import { useState } from 'react';

function TestOpciones() {
  const [respuestas, setRespuestas] = useState(Array(5).fill(''));
  const [resultados, setResultados] = useState(null);
  const preguntasConRespuestas = [
    {
      pregunta: '¿Es cierto que el cielo es azul?',
      respuestaCorrecta: 'Sí',
    },
    {
      pregunta: '¿Es verdad que 2 + 2 = 5?',
      respuestaCorrecta: 'No',
    },
    {
      pregunta: '¿A veces te sientes indeciso/a?',
      respuestaCorrecta: 'De cierta manera',
    },
    {
      pregunta: '¿Es un hecho que los gatos siempre caen de pie?',
    },
    {
      pregunta: '¿Estás completamente seguro/a de todo lo que crees?',
    },
  ];

  const handleChange = (index, event) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = event.target.value;
    setRespuestas(nuevasRespuestas);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (respuestas.every(respuesta => respuesta !== '')) {
      let correctas = 0;
      const detalles = respuestas.map((respuesta, index) => {
        const esCorrecta = respuesta === preguntasConRespuestas[index].respuestaCorrecta;
        if (esCorrecta) {
          correctas++;
        }
        return {
          pregunta: preguntasConRespuestas[index].pregunta,
          respuestaUsuario: respuesta,
          respuestaCorrecta: preguntasConRespuestas[index].respuestaCorrecta,
          esCorrecta,
        };
      });

      setResultados({ correctas, total: preguntasConRespuestas.length, detalles });
    } else {
      alert('Por favor, responde todas las preguntas.');
      setResultados(null);
    }
  };

  const reiniciarTest = () => {
    setRespuestas(Array(5).fill(''));
    setResultados(null);
  };

  return (
    <div>
      <h2>Test</h2>
      <form onSubmit={handleSubmit}>
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
          </div>
        ))}
        <button type="submit">Enviar respuestas</button>
      </form>

      {resultados && (
        <div>
          <h3>Resultados:</h3>
          <p>Obtuviste {resultados.correctas} de {resultados.total} respuestas correctas.</p>
          {resultados.detalles.map((detalle, index) => (
            <div key={index}>
              <p>
                <strong>Pregunta:</strong> {detalle.pregunta}
              </p>
              <p>
                Tu respuesta: {detalle.respuestaUsuario} -{' '}
                <strong>{detalle.esCorrecta ? 'Correcta' : 'Incorrecta'}</strong>
              </p>
              {!detalle.esCorrecta && (
                <p>
                  Respuesta correcta: {detalle.respuestaCorrecta}
                </p>
              )}
            </div>
          ))}
          <button onClick={reiniciarTest}>Reiniciar Test</button>
        </div>
      )}
    </div>
  );
}

export default TestOpciones;