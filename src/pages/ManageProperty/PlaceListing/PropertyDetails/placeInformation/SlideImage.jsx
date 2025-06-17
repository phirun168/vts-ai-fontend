import React from 'react'
import CoverSlideshow from './CoverSlideShow'

export default function DemoCoverSlideshow(props) {
  const { getFileByName, slideShow } = props
  return (
    <div className='mx-2'>
      <CoverSlideshow
        galleries={slideShow}
        getFileByName={getFileByName}
        status='Pending'
        videoCount={3}
      />
    </div>
  )
}
