import React, { useState } from 'react';

const TestOpciones = ({ datos }) => {
  // Verificar si llegan bien los datos
  if (!datos || !Array.isArray(datos) || datos.length === 0 || !datos[0]?.preguntasConRespuestas) {
    return <p>No hay datos disponibles para mostrar este test.</p>;
  }

  const preguntasConRespuestas = datos[0].preguntasConRespuestas;

  // Inicializamos las respuestas según la cantidad de preguntas
  const [respuestas, setRespuestas] = useState(
    Array(preguntasConRespuestas.length).fill('')
  );
  const [resultados, setResultados] = useState(null);

  const handleChange = (index, valor) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = valor;
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
    setRespuestas(Array(preguntasConRespuestas.length).fill(''));
    setResultados(null);
  };

  return (
    <div>
      <h2>Test</h2>
      <form onSubmit={handleSubmit}>
        {preguntasConRespuestas.map((item, index) => (
          <div key={index} className="mb-3">
            <p><strong>{item.pregunta}</strong></p>
            <div>
              <label>
                <input
                  type="radio"
                  name={`pregunta-${index}`}
                  value="1"
                  checked={respuestas[index] === "1"}
                  onChange={() => handleChange(index, "1")}
                />
                Sí
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name={`pregunta-${index}`}
                  value="2"
                  checked={respuestas[index] === "2"}
                  onChange={() => handleChange(index, "2")}
                />
                No
              </label>
            </div>
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Enviar respuestas</button>
      </form>

      {resultados && (
        <div className="mt-4">
          <h3>Resultados:</h3>
          <p>
            Obtuviste <strong>{resultados.correctas}</strong> de <strong>{resultados.total}</strong> respuestas correctas.
          </p>
          {resultados.detalles.map((detalle, index) => (
            <div key={index} className="mb-3 p-2 border rounded">
              <p><strong>Pregunta:</strong> {detalle.pregunta}</p>
              <p>Tu respuesta: <strong>{detalle.respuestaUsuario}</strong> -{' '}
                <span className={detalle.esCorrecta ? "text-success" : "text-danger"}>
                  {detalle.esCorrecta ? '✅ Correcta' : '❌ Incorrecta'}
                </span>
              </p>
              {!detalle.esCorrecta && (
                <p className="text-muted">
                  Respuesta correcta: <strong>{detalle.respuestaCorrecta}</strong>
                </p>
              )}
            </div>
          ))}
          <button onClick={reiniciarTest} className="btn btn-secondary">Reiniciar Test</button>
        </div>
      )}
    </div>
  );
};

export default TestOpciones;