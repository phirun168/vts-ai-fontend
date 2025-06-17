import { useEffect, useRef, useState } from 'react'
import helpFunctions from '../../../../../../../utils/helpFunctions'
import { Form } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'

export default function ImageUploader({ form, initialImage }) {
  const { getFileByName } = helpFunctions
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)
  useEffect(() => {
    if (initialImage) {
      setPreview(getFileByName(initialImage))
    }
  }, [initialImage])

  /* ——— handle file pick ——— */
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result)
      form.setFieldsValue({ image: file })
    }
    reader.readAsDataURL(file)

    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  /* ——— clear ——— */
  const handleRemoveImage = () => {
    setPreview(null)
    form.setFieldsValue({ image: null })
  }

  return (
    <Form.Item
      label='Upload Thumbnail (recommended size …)'
      name='image'
      valuePropName='file'
      getValueFromEvent={(e) => (e?.file ? e.file : null)}
      rules={[
        ({ getFieldValue }) => ({
          validator(_, value) {
            const alreadyHasOne = !!preview // existing image
            const pickedNew = !!value // File from <input>

            if (alreadyHasOne || pickedNew) {
              return Promise.resolve()
            }
            return Promise.reject(new Error('Image is required'))
          },
        }),
      ]}
    >
      <div style={{ width: 200 }} className='relative'>
        <label
          htmlFor='image-upload'
          className='flex items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer'
        >
          {preview ? (
            <img
              src={preview}
              alt='Preview'
              className='object-cover w-full h-full rounded-lg'
            />
          ) : (
            <CloudUploadOutlined style={{ fontSize: 48, color: '#1890ff' }} />
          )}
        </label>

        <input
          id='image-upload'
          ref={fileInputRef}
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />

        {preview && (
          <button
            type='button'
            onClick={handleRemoveImage}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <i
              className='fa-regular fa-circle-xmark'
              style={{ fontSize: 20, color: 'red' }}
            />
          </button>
        )}
      </div>
    </Form.Item>
  )
}
