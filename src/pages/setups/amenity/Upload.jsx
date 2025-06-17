import React, { useState } from 'react'
import { Upload, Row, Col, Card, Button } from 'antd'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2'

export default function UploadForm({ formData, setFormData }) {
  const [fileList, setFileList] = useState([])

  // Prevent automatic upload; we handle files manually.
  const handleBeforeUpload = (file) => {
    return false
  }

  // Helper: convert file to base64 (for preview)
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  // Update fileList and also update formData. Compute preview if needed.
  const handleChange = async ({ fileList: newFileList }) => {
    const updatedFileList = await Promise.all(
      newFileList.map(async (file) => {
        if (!file.url && !file.preview && file.originFileObj) {
          file.preview = await getBase64(file.originFileObj)
        }
        return file
      })
    )
    setFileList(updatedFileList)
    setFormData((prevData) => ({
      ...prevData,
      images: updatedFileList,
    }))
  }

  // When a file is previewed, use SweetAlert2 to show it.
  const handlePreview = async (file) => {
    let src = file.url || file.preview
    if (!src) {
      src = await getBase64(file.originFileObj)
    }
    Swal.fire({
      title: file.name || 'Image Preview',
      html: `<img src="${src}" style="width:100%; height:auto; object-fit: contain;"/>`,
      showConfirmButton: false,
      width: '80%',
    })
  }

  // Remove a file from the list.
  const handleRemove = (file) => {
    const newFileList = fileList.filter((f) => f.uid !== file.uid)
    setFileList(newFileList)
    setFormData((prevData) => ({
      ...prevData,
      images: newFileList,
    }))
  }

  const uploadProps = {
    name: 'file',
    multiple: true,
    accept: 'image/*',
    fileList,
    beforeUpload: handleBeforeUpload,
    onChange: handleChange,
    onPreview: handlePreview,
    onRemove: handleRemove,
    listType: 'picture-card',
  }

  return (
    <div>
      <Upload.Dragger {...uploadProps} style={{ marginBottom: 16 }}>
        <p className='ant-upload-drag-icon'>
          <UploadOutlined />
        </p>

        <p className='ant-upload-hint'>Only images are allowed.</p>
      </Upload.Dragger>

      {fileList.length > 0 && (
        <Row gutter={[16, 16]}>
          {fileList.map((file) => (
            <Col key={file.uid} xs={24} sm={6}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  background: '#f2f2f2',
                  //   border: 'solid 1px gray',
                  borderRadius: '5px',
                }}
              >
                <img
                  alt={file.name}
                  src={file.url || file.preview || ''}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '5px',
                  }}
                  onClick={() => handlePreview(file)}
                />
                <Button
                  type='text'
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemove(file)}
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    background: 'rgba(255,255,255,0.8)',
                    borderRadius: '50%',
                  }}
                />
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}
