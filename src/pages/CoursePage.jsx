import { useState } from 'react'
import ModuleSlider from '../components/ModuleSlider'
import SlideViewer from '../components/SlideViewer'
import Layout from '../components/Layout'
import CursoIA from '../components/CursoIA'

const CoursePage = () => {
  const [activeModule, setActiveModule] = useState(1)

  return (
    <Layout>
      <div className="curso-container">
        <div className="curso-contenido">
          <div className="curso-titulo">Contenido del curso</div>
        </div>
        {/* <SlideViewer activeModule={activeModule} />
        <ModuleSlider activeModule={activeModule} setActiveModule={setActiveModule} /> */}
        <CursoIA />
      </div>
    </Layout>
  )
}
export default CoursePage