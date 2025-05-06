import React, { useState, useEffect, useRef } from "react";
import { Timeline } from "react-responsive-timeline";
import "../../assets/css/timeline.css";

const HorizontalTimeline = ({ timelines }) => {
  const timelineRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Define el ancho para considerar como móvil
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = (scrollOffset) => {
    if (timelineRef.current) {
      timelineRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div className="horizontal-timeline-container">
      {isMobile && (
        <>
          <button onClick={() => handleScroll(-300)} className="scroll-button left-scroll">
            &lt;
          </button>
          <button onClick={() => handleScroll(300)} className="scroll-button right-scroll">
            &gt;
          </button>
        </>
      )}
      <Timeline
        ref={timelineRef} // Aquí estás pasando la ref al componente Timeline
        pivot="horizontal"
        className={isMobile ? "mobile-horizontal-timeline" : "default-horizontal-timeline"}
        timelines={timelines}
      />
    </div>
  );
};

export default HorizontalTimeline;