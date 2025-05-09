import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const TimelineFramerMotion = ({ items }) => {
    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);

    const slidesToShowDesktop = 4;
    const slidesToShowMobile = 1;

    const visibleItems = window.innerWidth >= 768 ? slidesToShowDesktop : slidesToShowMobile;
    const totalItems = items ? items.length : 0; // Verifica si items existe antes de acceder a length

    const containerVariants = {
        initial: { x: 0 },
        animate: {
            x: -currentIndex * itemWidth,
            transition: { duration: 0.5, ease: "easeInOut" }
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current && items?.length > 0) { // Verifica si items existe y tiene length
                setItemWidth(containerRef.current.offsetWidth / visibleItems);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [items, visibleItems]);

    useEffect(() => {
        if (itemWidth > 0 && items?.length > 0) { // Verifica si items existe y tiene length
            if (currentIndex === 3) {
                setTimeout(() => setCurrentIndex(4), 500);
            } else if (currentIndex === 4) {
                setTimeout(() => setCurrentIndex(Math.max(0, totalItems - visibleItems)), 500);
            }
        }
    }, [currentIndex, totalItems, visibleItems, itemWidth, items]);

    const next = () => {
        setCurrentIndex(Math.min(currentIndex + 1, Math.max(0, totalItems - visibleItems)));
    };

    const prev = () => {
        setCurrentIndex(Math.max(currentIndex - 1, 0));
    };

    return (
        <div style={{ overflowX: 'hidden', position: 'relative' }} ref={containerRef}>
            {items ? ( // Renderiza el contenido solo si items existe
                <motion.div
                    className="timeline-container"
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    style={{ display: 'flex', position: 'absolute' }}
                >
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            className="timeline-item"
                            style={{ width: `${itemWidth}px`, padding: '20px', border: '1px solid #ccc', cursor: 'pointer' }}
                            onClick={() => setSelectedItem(item)}
                        >
                            <h3>{item.titulo}</h3>
                            <p>{item.fecha}</p>
                            <p>{item.descripcionCorta}</p>
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <div>Cargando timeline...</div> // O algún otro indicador de carga
            )}
            <button onClick={prev}>Anterior</button>
            <button onClick={next}>Siguiente</button>

            {/* ... (tu lógica para mostrar la descripción larga) ... */}
        </div>
    );
};

export default TimelineFramerMotion;