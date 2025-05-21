import React, { useState, useEffect } from "react";
import "../../assets/css/show_scrolling_text.css"; // Importamos el archivo CSS

const ShowScrollingText = () => {
  const contenido = [
    "”La IA es la capacidad de las máquinas para usar algoritmos, aprender de los datos y utilizar lo aprendido en la toma de decisiones tal y como lo haría un ser humano.” \n Lasse Rouhiainen.",
    "“La IA es una rama de las ciencias computacionales encargada de estudiar modelos de cómputo capaces de realizar actividades propias de los seres humanos en base a dos de sus características primordiales: el razonamiento y la conducta” \n Bruno López Takeyas.",
    "“El estudio y desarrollo de sistemas informáticos que pueden copiar el comportamiento humano inteligente” \nDiccionario de Oxford",
    "“Un sistema de IA es un sistema digital que procesa y analiza información en su entorno para actuar sobre él - con cierto grado de autonomía- con el fin de alcanzar objetivos específicos” \nUNESCO"
  ];

  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    let delay = 0;
    contenido.forEach((item, index) => {
      setTimeout(() => {
        setVisibleItems((prevVisibleItems) => {
          // Verificamos si el elemento ya existe en el estado para evitar duplicados
          if (prevVisibleItems.some((el) => el.text === item)) return prevVisibleItems;

          // Agregamos el nuevo elemento al estado
          return [...prevVisibleItems, { text: item, isVisible: true }];
        });
      }, delay);
      delay += 700; // Incrementamos el retraso en 0.5 segundos
    });
  }, []);

  return (
    <div className="container-scrolling-text">
      {visibleItems.map(({ text, isVisible }, index) => (
        <div
          key={index}
          className={`item-scrolling-text ${isVisible ? "fade-in" : ""}`}
        >
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
};

export default ShowScrollingText;