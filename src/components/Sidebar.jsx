import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="profile">
        <img src="https://1.bp.blogspot.com/-vhmWFWO2r8U/YLjr2A57toI/AAAAAAAACO4/0GBonlEZPmAiQW4uvkCTm5LvlJVd_-l_wCNcBGAsYHQ/s16000/team-1-2.jpg" alt="Perfil" />
        <h3>María Pérez</h3>
      </div>
      <ul>
        <li><Link to="/"><i className="fas fa-home"></i> Inicio</Link></li>
        <Link to="/cursos"><i className="fas fa-book"></i> Mis Cursos</Link>
        <li><a href="#"><i className="fas fa-sign-out-alt"></i> Salir</a></li>
      </ul>
    </div>
  )
}
export default Sidebar