
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import '../assets/css/curso.css'
// import '../assets/css/inicio.css'
// import '../assets/css/login.css'
// import '../assets/css/plataforma.css'
// import '../assets/css/register.css'
import '../assets/css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.min'; // Importa el JS de Bootstrap (depende de Popper)
import '@popperjs/core';
import Layout from './components/Layout'
import Home from './pages/Home'


import CoursePage from './pages/CoursePage'
import CursoIA from './components/CursoIA'
import Timeline from './components/Timeline';
import CourseLayout from './components/layouts/CourseLayout';
import CourseContentPage from './components/pages/CourseContentPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<CourseLayout><CourseContentPage /></CourseLayout>} />
        <Route path="/cursos" element={<CursoIA />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App