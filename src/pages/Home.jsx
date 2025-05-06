import CourseSlider from '../components/CourseSlider'

const Home = () => {
  return (
    <section>
      <div className="tabular--wrapper">
        <div className="table-container">
          <h3 className="main--title">
            ¡Bienvenido/a! <span>María Pérez</span>
          </h3>
        </div>
      </div>
      <CourseSlider />
    </section>
  )
}
export default Home