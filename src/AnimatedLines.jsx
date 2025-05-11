import React from "react";
import { useSpring, animated } from "@react-spring/web";

const AnimatedLines = () => {
  const props = useSpring({
    from: { stroke: "red" },
    to: { stroke: "green" },
    config: { duration: 1000 },
  });

  return (
    <svg className="connections">
      <animated.line
        x1={150}
        y1={50}
        x2={450}
        y2={50}
        strokeWidth="2"
        style={props}
      />
    </svg>
  );
};

export default AnimatedLines;