
import '../assets/css/curso.css'
import '../assets/css/inicio.css'
import '../assets/css/login.css'
import '../assets/css/plataforma.css'
import '../assets/css/register.css'
import '../assets/css/styles.css'
import Layout from './components/Layout'
import Home from './pages/Home'


import CoursePage from './pages/CoursePage'
import CursoIA from './components/CursoIA'

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/cursos" element={<CoursePage />} />
    //   </Routes>
    // </BrowserRouter>
    <div>
      <CursoIA />
    </div>
  )
}
export default App