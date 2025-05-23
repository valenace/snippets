// src/components/Layout.jsx (o donde tengas tu layout principal)

import React, { useState, useEffect } from 'react';

import SidebarC2 from '../str/SidebarC2';
import "../../../assets/css/layout.css"
import { Link } from 'react-router-dom'

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
  }, [isSidebarOpen]);

  return (
    <div className="layout-container">
      <SidebarC2 isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        {/* Contenido del Sidebar con Links */}
        <ul>
          <li>
            <Link to="/" onClick={toggleSidebar}>
              Inicio
            </Link>
          </li>
          {/* <li>
            <Link to="/about" onClick={toggleSidebar}>
              Acerca de
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleSidebar}>
              Contacto
            </Link>
          </li> */}
        </ul>
      </SidebarC2>

      <main className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        {/* Aquí se renderizará el contenido de la ruta actual */}
        {children}
      </main>
    </div>
  );
};

export default Layout;