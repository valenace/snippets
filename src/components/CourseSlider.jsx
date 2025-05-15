// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Navigation, Pagination } from 'swiper/modules' // ✅ Cambio aquí
// import 'swiper/css'
// import 'swiper/css/navigation'
// import 'swiper/css/pagination'
// import CourseCard from './CourseCard'

// const CourseSlider = () => {
//   const courses = [
//     { title: "Avances en IA", progress: "13%" },
//     { title: "Fundamentos de IA", progress: "45%" },
//     { title: "IA Aplicada", progress: "78%" },
//     { title: "Tendencias en IA", progress: "22%" }
//   ]

//   return (
//     <>
//       <Swiper
//         modules={[Navigation, Pagination]}
//         spaceBetween={20}
//         slidesPerView={3}
//         navigation={{ 
//           nextEl: '.swiper-button-next',
//           prevEl: '.swiper-button-prev'
//         }}
//         pagination={{ el: '.swiper-pagination', clickable: true }}
//         className="mySwiper"
//       >
//         {courses.map((course, i) => (
//           <SwiperSlide key={i}>
//             <CourseCard {...course} />
//           </SwiperSlide>
//         ))}
//       </Swiper>
      
//       <div className="swiper-button-next"></div>
//       <div className="swiper-button-prev"></div>
//       <div className="swiper-pagination"></div>
//     </>
//   )
// }
// export default CourseSlider