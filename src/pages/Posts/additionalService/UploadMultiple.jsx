import React, { useRef, useState } from 'react'
import { Form } from 'antd'
import { CloseOutlined, CloudUploadOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2'

const Add = (props) => {
  const [form] = Form.useForm()
  const [images, setImages] = useState([]) // store multiple images
  const fileInputRef = useRef(null)

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        setImages((prevImages) => [...prevImages, reader.result])
      }
      reader.readAsDataURL(file)
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((img, i) => i !== index))
  }

  const handlePreview = (image) => {
    Swal.fire({
      imageUrl: image,
      imageAlt: 'Preview',
      showCloseButton: false,
      showConfirmButton: false,
      width: '30%',
      background: '#fff',
      padding: '10px',
    })
  }

  return (
    <div className='flex flex-col items-center w-full'>
      {/* Upload Area */}
      <label
        htmlFor='image-upload'
        className='flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50'
      >
        <span className='text-gray-500'>
          <CloudUploadOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
        </span>
      </label>
      <input
        ref={fileInputRef}
        style={{ display: 'none' }}
        id='image-upload'
        type='file'
        accept='image/*'
        multiple
        onChange={handleImageChange}
      />

      {/* Display Previews Below the Upload File */}
      {images.length > 0 && (
        <div className='mt-4 grid grid-cols-6 gap-4'>
          {images.map((image, index) => (
            <div key={index} className='relative'>
              <img
                src={image}
                alt={`Preview ${index}`}
                className='object-cover w-full h-24 rounded-lg cursor-pointer'
                onClick={() => handlePreview(image)}
              />
              <button
                onClick={() => handleRemoveImage(index)}
                type='button'
                className='absolute -top-2 -right-2'
              >
                <CloseOutlined
                  style={{
                    fontSize: '16px',
                    color: 'red',
                    background: 'white',
                    borderRadius: '50%',
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Add
