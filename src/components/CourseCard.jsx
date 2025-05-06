const CourseCard = ({ title, progress }) => {
    return (
      <div className="card-content">
        <img src="/curso.jpg" alt={title} />
        <div className="name-profession">
          <p className="name">{title}</p>
        </div>
        <div className="button">
          <a href="/curso.html" className="aboutMe">Continuar</a>
        </div>
        <div className="barra-progreso">
          <div className="progreso" style={{ width: progress }}></div>
        </div>
        <p className="porcentaje">{progress} completado</p>
      </div>
    )
  }
  export default CourseCard