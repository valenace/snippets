import React from "react";
import "../../../assets/css/styles.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../../../assets/css/header_course.css";
import Logo from "../../../assets/img/logo/mincyt-logo-white.png";
import BreadModules from "../BreadModules";

const HeaderCourse = ({ courseTitle, moduloTitulo, moduloId }) => {
  return (
    // <div className="HeaderCourse-container">
    //   <img src="/static/img/mincyt-logo-white.png" alt="mincyt-logo" className="logo-img" />
    //   <p className="logo-dg">Dirección General</p>
    //   <h4 className="course-title">{courseTitle}</h4>
    // </div>
    <div>
        <div className="d-flex flex-wrap m-auto align-content-center px-5" style={{backgroundColor: '#205781',height: '70px',     zIndex: '10',
      position: 'fixed',
      width: '100%'}}>
        
            <img src={Logo} alt="mincyt-logo" className="logo-img" style=
                {{borderRight: '#99c0dd7d solid',
                paddingRight: '1.25rem',
                width: 'auto',}}
            />
            <p className="logo-dg" style=
           {{ borderRight: '#99c0dd7d solid',
            paddingRight: '1.25rem',}}>Dirección General de Desarrollo de Aplicaciones de <b>Inteligencia Artificial</b></p>
            <h4 className="text-white my-auto" style={{ borderRight: '#99c0dd7d solid',
            paddingRight: '1.25rem',     margin: 'auto 1.1rem 0 0'}}>{courseTitle}</h4>
            <h6 className="text-white my-auto">Módulo <b>{moduloId}</b>: {moduloTitulo}</h6>
        </div>
    </div>
    
  );
};

export default HeaderCourse;
