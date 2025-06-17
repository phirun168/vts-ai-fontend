import React, { useState, useRef } from 'react'
import { Modal, Button, Upload, message, Card } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {
  UploadOutlined,
  DeleteOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons'

export default function EditCover({ isOpen, onClose, images, onSave }) {
  const [editedImages, setEditedImages] = useState([...images])
  const swiperRef = useRef(null)

  // Handle deleting an image
  const handleDelete = (index) => {
    setEditedImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Handle new file upload
  const handleUpload = (file) => {
    const url = URL.createObjectURL(file)
    setEditedImages((prev) => [...prev, url])
    message.success('Media uploaded successfully!')
  }

  // Move to the next slide
  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext()
    }
  }

  // Move to the previous slide
  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev()
    }
  }

  return (
    <Modal
      title='Edit Cover Slides'
      open={isOpen}
      onCancel={onClose}
      width={600}
      footer={[
        <Button key='save' type='primary' onClick={() => onSave(editedImages)}>
          update
        </Button>,
      ]}
    >
      <Card className='relative'>
        {/* Custom Navigation Buttons */}
        <Button
          shape='circle'
          className='absolute left-2 top-1/3 z-10 bg-white shadow-lg'
          icon={<LeftOutlined />}
          onClick={handlePrev}
        />
        <Button
          shape='circle'
          className='absolute right-2 top-1/3 z-10 bg-white shadow-lg'
          icon={<RightOutlined />}
          onClick={handleNext}
        />

        {/* Swiper Slideshow */}
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          loop={true} // **Enable loop mode**
          navigation={false} // Disable default navigation, use custom buttons
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className='mb-4'
        >
          {editedImages.map((image, index) => (
            <SwiperSlide key={index} className='relative'>
              {/* Delete Button */}
              <Button
                shape='circle'
                danger
                icon={<DeleteOutlined />}
                className='absolute top-2 right-2 z-10 bg-white shadow-md'
                onClick={() => handleDelete(index)}
              />

              {/* Image or Video Preview */}
              {image.match(/\.(jpeg|jpg|gif|png|webp)$/) ? (
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className='w-full h-64 object-cover rounded-md'
                />
              ) : (
                <video controls className='w-full h-64 object-cover rounded-md'>
                  <source src={image} type='video/mp4' />
                  Your browser does not support the video tag.
                </video>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Upload Button */}
        <Upload
          accept='image/*,video/*'
          showUploadList={false}
          beforeUpload={(file) => {
            handleUpload(file)
            return false // Prevent auto-upload
          }}
        >
          <Button icon={<UploadOutlined />} block type='dashed'>
            Upload
          </Button>
        </Upload>
      </Card>
    </Modal>
  )
}
