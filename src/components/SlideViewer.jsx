import React, { useState, useEffect } from 'react';
import CitationSlider from './CitationSlider'

const SlideViewer = ({ activeModule }) => {
  // Datos dinámicos por módulo
  const modulesData = {
    1: [
      {
        title: "Introducción a la Inteligencia Artificial",
        content: "Este primer módulo te proporcionará una visión general y fundamental...",
        image: "imagen"
      },
      {
        title: "Definición de Inteligencia Artificial",
        content: "Dar una definición exacta de Inteligencia artificial es sumamente difícil...",
        citations: [
          { text: "La IA es la capacidad de las máquinas para usar algoritmos...", author: "Lasse Rouhiainen" },
          { text: "La IA es una rama de las ciencias computacionales...", author: "Bruno López Takeyas" },
          { text: "El estudio y desarrollo de sistemas informáticos que pueden copiar el comportamiento humano inteligente", author: "Diccionario de Oxford" },
          { text: "Un sistema de IA es un sistema digital que procesa y analiza información...", author: "UNESCO" }
        ]
      }
    ],
    2: [
      {
        title: "Conceptos Fundamentales de la IA",
        content: "En este módulo exploraremos los conceptos fundamentales que impulsan el campo...",
        image: "imagen"
      },
      {
        title: "Machine Learning",
        content: "El Machine Learning (Aprendizaje Automático) es un subconjunto de la Inteligencia Artificial...",
        image: "imagen"
      }
    ]
  }

  const [currentSlide, setCurrentSlide] = React.useState(1)
  const slides = modulesData[activeModule] || []

  const goToNextSlide = () => {
    if (currentSlide < slides.length) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const goToPrevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const progress = `${(currentSlide / slides.length * 100).toFixed(0)}%`

  return (
    <div className="modulos-slider">
      <div className="slider-controls">
        <button className="slider-btn prev-slide" disabled={currentSlide === 1} onClick={goToPrevSlide}>
          <i className="fas fa-chevron-left"></i> Anterior
        </button>
        <div className="slider-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: progress }}></div>
          </div>
          <div className="slide-counter">Slide <span id="current-slide">{currentSlide}</span> de <span id="total-slides">{slides.length}</span></div>
        </div>
        <button className="slider-btn next-slide" disabled={currentSlide === slides.length} onClick={goToNextSlide}>
          Siguiente <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <div className="modulo-slides" data-modulo={activeModule}>
        {slides.map((slide, i) => (
          <div key={i} className={`slide ${currentSlide === i + 1 ? 'active' : ''}`} data-slide={i + 1}>
            <div className="slide-header">
              <h2>{slide.title}</h2>
            </div>
            <div className="slide-content">
              <p>{slide.content}</p>
              {slide.image && <div className="slide-image"><img src={slide.image} alt={slide.title} /></div>}
              {slide.citations && <CitationSlider citations={slide.citations} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default SlideViewer