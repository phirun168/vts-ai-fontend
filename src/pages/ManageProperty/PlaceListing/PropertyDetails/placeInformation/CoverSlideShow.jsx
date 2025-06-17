import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import {
  CaretRightOutlined,
  LeftOutlined,
  PictureOutlined,
  PlayCircleOutlined,
  RightOutlined,
} from '@ant-design/icons'

// Example icon; feel free to swap for your own SVG or Icon library
const VideoIcon = () => (
  <svg
    width='16'
    height='12'
    viewBox='0 0 16 12'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M14.4 0H1.6C0.716 0 0 0.716 0 1.6v8.8C0 11.284.716 12 1.6 12h12.8c.884 0 1.6-.716 1.6-1.6V1.6C16 .716 15.284 0 14.4 0zM5 3l5 3-5 3V3z' />
  </svg>
)
import PreviewImage from './PreviewImage'
export default function CoverSlideshow({
  galleries = [{ files: [] }],
  getFileByName = (s) => s,
  status = 'Pending',
  videoCount = 20,
}) {
  const carouselRef = useRef(null)

  const images = galleries
    ?.flatMap((gallery) => gallery.files || [])
    .map((file) => `${getFileByName('/' + file)}`)
    .filter(Boolean) // Ensures no undefined/null entries
  const [open, setOpen] = useState(false)

  const rawGalleries = [
    /* … */
  ]
  // const images2 = galleries
  //   .filter((g) => g.files.length)
  //   .flatMap((g) =>
  //     g.files.map((url, i) => ({
  //       id: `${g._id}-${i}`,
  //       url,
  //       album: g.category_gallery,
  //     }))
  //   )
  // console.log(images2, 'images')

  return (
    <>
      <PreviewImage
        open={open}
        setOpen={setOpen}
        galleries={galleries}
        getFileByName={getFileByName}
      />
      <div className='relative w-full rounded-lg mt-4  border-none overflow-hidden '>
        {/* Status badge */}

        {images.length === 0 ? (
          <div className='h-[400px] 2xl:h-[555px] flex items-center justify-center text-gray-500 border rounded-lg'>
            No images available.
          </div>
        ) : (
          <>
            {/* Swiper */}
            <div className='h-[400px] 2xl:h-[555px] '>
              <Swiper
                ref={carouselRef}
                modules={[Pagination, Navigation]}
                navigation={{
                  nextEl: '.custom-swiper-button-next',
                  prevEl: '.custom-swiper-button-prev',
                }}
                pagination={{ clickable: true }}
                loop={images.length > 1}
                className='h-full flex items-center justify-center items-center'
              >
                {images.map((src, idx) => (
                  <SwiperSlide key={idx}>
                    <div className='relative w-full h-full'>
                      {/* Base image */}
                      <img
                        src={src}
                        alt={`slide-${idx}`}
                        className='w-full h-full object-cover'
                      />

                      {/* Overlay (e.g. dark tint + optional centered icon/text) */}
                      <div
                        className='
        absolute inset-0                /* fill the parent */
        bg-black bg-opacity-40          /* 40% translucent black */
        flex items-center justify-center/* center any content */
        opacity-0 opacity-50     /* fade in on hover */
        transition-opacity duration-300 /* smooth transition */
      '
                      ></div>
                    </div>
                    <img
                      src={src}
                      alt={`slide-${idx}`}
                      className='w-full h-full object-cover'
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Custom arrows */}

              <div
                className='custom-swiper-button-prev
             absolute left-4 top-1/2 -translate-y-1/2
             z-20 w-10 h-10 flex items-center justify-center
             bg-black/40 text-white
             rounded-lg cursor-pointer
             hover:bg-black/60 transition'
                // onClick={() => carouselRef.current?.slidePrev()}
              >
                <LeftOutlined style={{ fontSize: 20 }} />
              </div>
              <div
                className='custom-swiper-button-next
             absolute right-4 top-1/2 -translate-y-1/2
             z-20 w-10 h-10 flex items-center justify-center
             bg-black/40 text-white
             rounded-lg cursor-pointer
             hover:bg-black/60 transition'
                // onClick={() => carouselRef.current?.slideNext()}
              >
                <RightOutlined style={{ fontSize: 20 }} />
              </div>
              <div
                onClick={() => setOpen(true)}
                className='absolute bottom-4 cursor-pointer left-4 flex items-center gap-1 bg-black/40 text-white text-sm px-2 py-1 rounded z-20'
              >
                {/* Count */}
                <span className='font-medium'>{videoCount}</span>

                {/* Gallery icon */}
                <PictureOutlined style={{ fontSize: 14 }} />

                {/* Play icon */}
                <CaretRightOutlined style={{ fontSize: 14 }} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
