import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const MatchingTest = () => {
  const titles = ["Fotosíntesis", "Energía Cinética"];
  const concepts = ["Proceso de plantas", "Movimiento de objetos"];
  const [selected, setSelected] = useState(null);

  const styles = useSpring({
    opacity: selected ? 1 : 0.8,
    transform: selected
      ? 'scale(1.1)'
      : 'scale(1)',
    config: { tension: 300, friction: 20 },
  });

  const handleSelect = (title) => {
    setSelected(title);
  };

  return (
    <div>
      <h2>Conecta los Títulos con los Conceptos</h2>
      <div>
        <h3>Títulos</h3>
        {titles.map((title, index) => (
          <animated.div
            key={index}
            onClick={() => handleSelect(title)}
            style={styles}
          >
            {title}
          </animated.div>
        ))}
      </div>
      <div>
        <h3>Conceptos</h3>
        {concepts.map((concept, index) => (
          <div key={index}>
            {concept}
          </div>
        ))}
      </div>
      {selected && <p><strong>{selected}</strong> seleccionado.</p>}
    </div>
  );
};

export default MatchingTest;
