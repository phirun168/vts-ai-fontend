import React, { useEffect, useState } from 'react'
import { Upload, Button, Modal, message, Row, Col, Card } from 'antd'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'

const { Dragger } = Upload

export default function EditImg({ open, setOpen, initialImages = [] }) {
  const [fileList, setFileList] = useState([])
  const [previewImage, setPreviewImage] = useState('')
  const [previewOpen, setPreviewOpen] = useState(false)

  // Initialize fileList with existing images when component mounts
  useEffect(() => {
    // initialImages should be an array of file-like objects
    if (initialImages.length) {
      setFileList(initialImages)
    }
  }, [initialImages])

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  // Generate a preview using FileReader if file.url, file.thumbUrl, or file.preview are not present.
  const handlePreview = async (file) => {
    if (!file.url && !file.thumbUrl && !file.preview) {
      file.preview = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    }
    setPreviewImage(file.url || file.thumbUrl || file.preview)
    setPreviewOpen(true)
  }

  const handleCancel = () => {
    setPreviewOpen(false)
  }

  const handleRemove = (file) => {
    const newList = fileList.filter((item) => item.uid !== file.uid)
    setFileList(newList)
  }

  const handleUpload = () => {
    // Place your upload logic here.
    message.success('Images uploaded successfully')
  }

  return (
    <div>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        title='Edit Cover'
      >
        <Card>
          <Dragger
            multiple
            fileList={fileList}
            onChange={handleChange}
            onPreview={handlePreview}
            showUploadList={false} // Hide default upload list
          >
            <p className='ant-upload-drag-icon'>
              <UploadOutlined />
            </p>
            <p className='ant-upload-text'></p>
            <p className='ant-upload-hint'>
              Support for multiple image uploads.
            </p>
          </Dragger>
          {/* Render each uploaded/existing image in its own Card */}
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            {fileList.map((file) => {
              const imageSrc = file.thumbUrl || file.url || file.preview
              return (
                <Col key={file.uid} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    cover={
                      <div style={{ position: 'relative' }}>
                        <img
                          src={imageSrc}
                          alt='uploaded'
                          style={{
                            width: '100%',
                            height: 100,
                            objectFit: 'contain',
                            cursor: 'pointer',
                            borderRadius: 4,
                          }}
                          onClick={() => handlePreview(file)}
                        />
                        <DeleteOutlined
                          onClick={() => handleRemove(file)}
                          style={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            fontSize: '18px',
                            color: '#fff',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            borderRadius: '50%',
                            padding: 4,
                            cursor: 'pointer',
                            zIndex: 2,
                          }}
                        />
                      </div>
                    }
                    bodyStyle={{ padding: 8, textAlign: 'center' }}
                  >
                    {/* Additional card content can be added here if needed */}
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Card>
      </Modal>

      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
        <img alt='preview' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}
