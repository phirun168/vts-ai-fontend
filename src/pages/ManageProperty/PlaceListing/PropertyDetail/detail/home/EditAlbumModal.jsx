import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Upload, Row, Col, Button } from 'antd'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'

const EditAlbumModal = ({ visible, album, onClose, onSave }) => {
  const [form] = Form.useForm()
  // Local state for new files to be added.
  const [newFiles, setNewFiles] = useState([])
  // Local state to hold current media (existing media) for removal updates.
  const [currentMedia, setCurrentMedia] = useState([])

  useEffect(() => {
    if (album) {
      form.setFieldsValue({
        albumName: album.albumName,
      })
      // Initialize current media from album.
      setCurrentMedia(album.media || [])
      // Reset new files when modal opens for a new album.
      setNewFiles([])
    }
  }, [album, form])

  // Handle file changes in the new media upload component.
  const handleUploadChange = ({ fileList: newFileList }) => {
    setNewFiles(newFileList)
  }

  // Remove a new file from newFiles.
  const handleRemoveNewFile = (uid) => {
    setNewFiles((prev) => prev.filter((file) => file.uid !== uid))
  }

  // Remove an existing media item from currentMedia.
  const handleRemoveCurrentMedia = (id) => {
    setCurrentMedia((prev) => prev.filter((item) => item.id !== id))
  }

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // Create new media items from the new files.
        const addedMedia = newFiles.map((file) => {
          const fileType = file.type.startsWith('image') ? 'image' : 'video'
          return {
            type: fileType,
            url: URL.createObjectURL(file.originFileObj), // In production, use the uploaded URL.
            id: file.uid,
          }
        })
        // Merge updated current media with new media.
        const updatedMedia = [...currentMedia, ...addedMedia]
        const updatedAlbum = {
          ...album,
          albumName: values.albumName,
          media: updatedMedia,
        }
        onSave(updatedAlbum)
        onClose()
      })
      .catch((info) => {
        console.log('Validation Failed:', info)
      })
  }

  // Common style for media previews.
  const mediaStyle = {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  }

  // Render previews for new files to be added.
  const renderNewMedia = () => {
    if (newFiles.length === 0) return <p>No new media selected.</p>
    return (
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {newFiles.map((file) => {
          const fileType = file.type.startsWith('image') ? 'image' : 'video'
          const previewUrl = URL.createObjectURL(file.originFileObj)
          return (
            <Col
              key={file.uid}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              style={{ position: 'relative' }}
            >
              {fileType === 'image' ? (
                <img src={previewUrl} alt='new media' style={mediaStyle} />
              ) : (
                <video controls style={mediaStyle}>
                  <source src={previewUrl} type='video/mp4' />
                  Your browser does not support the video tag.
                </video>
              )}
              <Button
                type='primary'
                danger
                size='small'
                style={{ position: 'absolute', top: 8, right: 8 }}
                onClick={() => handleRemoveNewFile(file.uid)}
              >
                <DeleteOutlined />
              </Button>
            </Col>
          )
        })}
      </Row>
    )
  }

  // Render previews for existing album media.
  const renderCurrentMedia = () => {
    if (!currentMedia || currentMedia.length === 0)
      return <p>No current media.</p>
    return (
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {currentMedia.map((item) => (
          <Col
            key={item.id}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            style={{ position: 'relative' }}
          >
            {item.type === 'image' ? (
              <img src={item.url} alt='current media' style={mediaStyle} />
            ) : item.url.endsWith('.mp4') ? (
              <video controls style={mediaStyle}>
                <source src={item.url} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                src={item.url}
                title='Embedded Video'
                style={mediaStyle}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            )}
            <Button
              type='primary'
              danger
              size='small'
              style={{ position: 'absolute', top: 8, right: 8 }}
              onClick={() => handleRemoveCurrentMedia(item.id)}
            >
              <DeleteOutlined />
            </Button>
          </Col>
        ))}
      </Row>
    )
  }

  return (
    <Modal
      visible={visible}
      title='Edit Image '
      onCancel={onClose}
      //   width={800}
      onOk={handleOk}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          label='Upload Image'
          name='albumName'
          rules={[{ required: true, message: 'field required' }]}
        >
          <Input />
        </Form.Item>
        {/* New Media Upload Section placed above current media */}
        <Form.Item label='Add New Image'>
          <Upload.Dragger
            beforeUpload={() => false} // Prevent automatic upload.
            onChange={handleUploadChange}
            fileList={newFiles}
            multiple
            listType='picture-card'
          >
            <p className='ant-upload-drag-icon'>
              <UploadOutlined />
            </p>
            <p className='ant-upload-hint'>Click or drag files to upload</p>
          </Upload.Dragger>
          {renderNewMedia()}
        </Form.Item>
        {/* Current Media Preview Section */}
        <div style={{ marginBottom: 16 }}>
          <h4>Current Image</h4>
          {renderCurrentMedia()}
        </div>
      </Form>
    </Modal>
  )
}

export default EditAlbumModal
