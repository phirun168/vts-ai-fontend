import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Pagination, Navigation } from 'swiper/modules'

const CoverSlideshow = ({
  images = [],
  videos = [],
  getFileImage,
  filePath,
}) => {
  const slides = [
    ...images.map((src) => ({ type: 'image', src })),
    ...videos.map((src) => ({ type: 'video', src })),
  ]

  return (
    <div className='w-full relative'>
      {/* Custom Navigation Buttons */}
      <div className='custom-swiper-button-prev absolute left-4   top-1/2 z-10 -translate-y-1/2 cursor-pointer'>
        <svg
          className='text-white border border-gray-300 rounded-full transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg'
          width='40'
          height='40'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' />
        </svg>
      </div>
      <div className='custom-swiper-button-next absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer'>
        <svg
          className='text-white border border-gray-300 rounded-full transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg'
          width='40'
          height='40'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z' />
        </svg>
      </div>

      <Swiper
        initialSlide={0}
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides={true}
        loop={false} // Adjust based on your preference
        navigation={{
          nextEl: '.custom-swiper-button-next',
          prevEl: '.custom-swiper-button-prev',
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        style={{ width: '100%' }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className='h-64 2xl:h-80  w-full'>
            {slide.type === 'image' ? (
              <img
                src={getFileImage(filePath) + '/large-' + slide.src}
                alt={`Cover Slide ${index + 1}`}
                loading='lazy'
                className='w-full h-full object-cover'
              />
            ) : (
              <video
                src={getFileImage(filePath) + '/' + slide.src}
                controls
                autoPlay
                muted
                className='w-full h-full object-cover'
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CoverSlideshow

// import React from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import 'swiper/css'
// import { Pagination, Navigation } from 'swiper/modules'

// const CoverSlideshow = ({ images = [], videos = [], getFileImage, filePath }) => {
//   const slides = [
//     ...images.map((src) => ({ type: 'image', src })),
//     ...videos.map((src) => ({ type: 'video', src })),
//   ]

//   return (
//     <div className="w-full relative">
//       {/* Custom Navigation Buttons */}
//       <div className="custom-swiper-button-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer">
//         <svg
//           className="text-white border border-gray-300 rounded-full transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg"
//           width="40"
//           height="40"
//           viewBox="0 0 24 24"
//           fill="currentColor"
//         >
//           <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
//         </svg>
//       </div>
//       <div className="custom-swiper-button-next absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer">
//         <svg
//           className="text-white border border-gray-300 rounded-full transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg"
//           width="40"
//           height="40"
//           viewBox="0 0 24 24"
//           fill="currentColor"
//         >
//           <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
//         </svg>
//       </div>

//       <Swiper
//         initialSlide={0}
//         spaceBetween={0}
//         slidesPerView={1}
//         centeredSlides={true}
//         loop={false}
//         navigation={{
//           nextEl: '.custom-swiper-button-next',
//           prevEl: '.custom-swiper-button-prev',
//         }}
//         pagination={{ clickable: true }}
//         modules={[Pagination, Navigation]}
//         style={{ width: '100%' }}
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={index} className="h-64 2xl:h-80 w-full">
//             {slide.type === 'image' ? (
//               <img
//                 src={getFileImage(filePath) + '/large-' + slide.src}
//                 alt={`Cover Slide ${index + 1}`}
//                 loading="lazy"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <video
//                 src={getFileImage(filePath) + '/' + slide.src}
//                 controls
//                 autoPlay
//                 muted
//                 className="w-full h-full object-cover"
//               />
//             )}
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   )
// }

// export default CoverSlideshow
