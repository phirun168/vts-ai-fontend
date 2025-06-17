import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Pagination, Navigation } from 'swiper/modules'

const CoverSlideshow = (props) => {
  const { galleries, getFileByName } = props
  const images = galleries
    ?.flatMap((gallery) => gallery.files || [])
    .map((file) => `${getFileByName('/' + file)}`)
    .filter(Boolean) // Ensures no undefined/null entries

  return (
    <div className='w-full relative'>
      {images.length === 0 ? (
        <div className='h-64 flex items-center justify-center text-gray-500 border rounded-lg'>
          No images available.
        </div>
      ) : (
        <>
          {/* Custom Navigation Buttons */}
          <div className='custom-swiper-button-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer'>
            <svg
              className='text-white border border-gray-300 rounded-full hover:bg-gray-700/50 transition-colors duration-300'
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
              className='text-white border border-gray-300 rounded-full hover:bg-gray-700/50 transition-colors duration-300'
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
            spaceBetween={10}
            navigation={{
              nextEl: '.custom-swiper-button-next',
              prevEl: '.custom-swiper-button-prev',
            }}
            pagination={{ clickable: true }}
            loop={images.length > 3}
            modules={[Pagination, Navigation]}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            style={{ width: '100%' }}
          >
            {images.map((src, index) => (
              <SwiperSlide key={index} className='h-64 w-full'>
                <img
                  src={src}
                  alt={`Cover Slide ${index + 1}`}
                  className='w-full h-full object-cover'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  )
}

export default CoverSlideshow
