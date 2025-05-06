import React, { useState, useEffect } from 'react';
const CitationSlider = ({ citations }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
  
    const next = () => setCurrentIndex((prev) => (prev + 1) % citations.length)
    const prev = () => setCurrentIndex((prev) => (prev - 1 + citations.length) % citations.length)
  
    return (
      <div className="citas-slider">
        <div className="slider-nav">
          <button className="prev-btn" onClick={prev}>{'<'}</button>
          <button className="next-btn" onClick={next}>{'>'}</button>
        </div>
        <div className="cita active">
          <blockquote>"{citations[currentIndex].text}"</blockquote>
          <p className="autor">- {citations[currentIndex].author}</p>
        </div>
      </div>
    )
  }
  export default CitationSlider