// src/components/Sidebar.jsx

import React, { useState, useEffect } from 'react';
import "../../../assets/css/sidebar_c.css";
import { Link } from 'react-router-dom';

const SidebarC2 = () => {
  const [show, setShow] = useState(false);

  return (
    <main className={show ? 'space-toggle' : null}>
      <header className={`header ${show ? 'space-toggle' : null}`}>
        <div className='header-toggle' onClick={() => setShow(!show)}>
          <i className={`fas fa-bars ${show ? 'fa-solid fa-xmark' : null}`}></i>
        </div>
      </header>

      <aside className={`sidebar ${show ? 'show' : null}`}>
        <nav className='nav'>
          <div>
            <a href='/' className='nav-logo'>
              <i className={`fas fa-home-alt nav-logo-icon`}></i>
              <span className='nav-logo-name'>Homepage</span>
            </a>

            <div className='nav-list'>
              <a href='/dashboard' className='nav-link active'>
                <i className='fas fa-tachometer-alt nav-link-icon'></i>
                <span className='nav-link-name'>Dashboard</span>
              </a>
              <a href='/hotel' className='nav-link'>
                <i className='fas fa-hotel nav-link-icon'></i>
                <span className='nav-link-name'>Hotel</span>
              </a>
              <a href='/gallery' className='nav-link'>
                <i className='fas fa-image nav-link-icon'></i>
                <span className='nav-link-name'>Gallery</span>
              </a>
              <a href='/gallery' className='nav-link'>
                <i className='fas fa-dollar-sign nav-link-icon'></i>
                <span className='nav-link-name'>Transaction</span>
              </a>
            </div>
          </div>

          <a href='/logout' className='nav-link'>
            <i className='fas fa-sign-out nav-link-icon'></i>
            <span className='nav-link-name'>Logout</span>
          </a>
        </nav>
      </aside>
<div className='container'>
    <h1>Content</h1>
</div>
      
    </main>
  );
};


export default SidebarC2;
