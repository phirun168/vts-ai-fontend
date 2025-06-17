import React, { useEffect, useRef, useState } from 'react'
import { Carousel } from 'antd'
const SlideShow = () => {
  const carouselRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const onChange = (currentSlide) => {
    console.log(currentSlide)
  }
  const totalSlides = 5 // Change this to the total number of slides

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides)
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(interval) // Clean up the interval on component unmount
  }, [])

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.goTo(currentSlide)
    }
  }, [currentSlide])

  return (
    <>
      <Carousel ref={carouselRef} afterChange={onChange} dots={true} arrows>
        <div className='rounded-lg'>
          <img
            className='rounded-lg'
            src='https://timbuktutravel.imgix.net/2021/04/cambodia-country-guide-kodak-2.jpg?auto=compress%2Cformat&fit=scale&h=960&ixlib=php-1.1.0&q=50&w=1439&wpsize=large'
            alt='Image 1'
            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
          />
        </div>
        <div className='rounded-lg'>
          <img
            className='rounded-lg'
            src='https://www.intrepidtravel.com/v3/assets/blt0de87ff52d9c34a8/blt001cabd1a36f84b4/66b9dc4ffcf3e1169feffd86/Intrepid-Travel-Cambodia-Siem-Reap-Angkor-Wat-Complex-Sunrise-Group-1100x735.jpg?branch=prd'
            alt='Image 2'
            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
          />
        </div>
        <div className='rounded-lg'>
          <img
            className='rounded-lg'
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMEzDXzXOA5o_Yj4sIbTvptDHCgbUYdiQ0fQ&s'
            alt='Image 3'
            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
          />
        </div>
        <div className='rounded-lg'>
          <img
            className='rounded-lg'
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVFq_decmXDYPfbpyQ4MgoA5P0SedbL-dwlQ&s'
            alt='Image 4'
            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
          />
        </div>
      </Carousel>
    </>
  )
}

export default SlideShow
