import React from "react";
import "../../assets/css/breadcrumbs.css"; // Importar estilos

const BreadModules = ({ moduloTitulo, submoduloTitulo }) => {
  return (
    <nav className="breadcrumb-container" aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="#">Inicio</a></li>
        <li className="breadcrumb-item">{moduloTitulo}</li>
        <li className="breadcrumb-item active" aria-current="page">{submoduloTitulo}</li>
      </ol>
    </nav>
  );
};

export default BreadModules;
