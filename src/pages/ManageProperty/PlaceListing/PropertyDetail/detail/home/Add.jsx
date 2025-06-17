import React, { useState } from 'react'
import { Modal, Upload, Row, Col, Button, Input } from 'antd'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2'
import '../Location.scss'

const UploadForm = ({ formData, setFormData, isVisible, setIsVisible }) => {
  const safeFormData = {
    albums: [],
    ...formData,
  }

  const handleAddAlbum = () => {
    const newAlbum = {
      id: Date.now(),
      title: '',
      files: [],
    }
    setFormData((prevData) => ({
      ...prevData,
      albums: [...(prevData.albums || []), newAlbum],
    }))
  }

  const handleRemoveAlbum = (albumIndex) => {
    setFormData((prevData) => {
      const updatedAlbums = (prevData.albums || []).filter(
        (_, idx) => idx !== albumIndex
      )
      return { ...prevData, albums: updatedAlbums }
    })
  }

  const handleAlbumTitleChange = (albumIndex, title) => {
    setFormData((prevData) => {
      const updatedAlbums = (prevData.albums || []).map((album, idx) => {
        if (idx === albumIndex) {
          return { ...album, title }
        }
        return album
      })
      return { ...prevData, albums: updatedAlbums }
    })
  }

  const handleAlbumFileBeforeUpload = (albumIndex, file) => {
    setFormData((prevData) => {
      const updatedAlbums = (prevData.albums || []).map((album, idx) => {
        if (idx === albumIndex) {
          return { ...album, files: [...(album.files || []), file] }
        }
        return album
      })
      return { ...prevData, albums: updatedAlbums }
    })
    return false
  }

  const handleAlbumFileRemove = (albumIndex, file) => {
    setFormData((prevData) => {
      const updatedAlbums = (prevData.albums || []).map((album, idx) => {
        if (idx === albumIndex) {
          return {
            ...album,
            files: album.files.filter((f) => f.uid !== file.uid),
          }
        }
        return album
      })
      return { ...prevData, albums: updatedAlbums }
    })
  }

  const handleAlbumFilePreview = (file) => {
    const url = URL.createObjectURL(file)
    Swal.fire({
      html: file.type.startsWith('image')
        ? `<img src='${url}' style='width:100%; height:300px; object-fit: contain;'/>`
        : `<video controls style='width:100%; height:300px; object-fit: contain;'><source src='${url}' type='video/mp4'></video>`,
      showConfirmButton: true,
      confirmButtonText: 'Remove',
    }).then((result) => {
      if (result.isConfirmed) {
        handleAlbumFileRemove(0, file)
      }
    })
  }

  const albumUploadProps = (albumIndex) => ({
    multiple: true,
    listType: 'picture-card',
    beforeUpload: (file) => handleAlbumFileBeforeUpload(albumIndex, file),
    onRemove: (file) => handleAlbumFileRemove(albumIndex, file),
    onPreview: (file) => handleAlbumFilePreview(file),
    fileList:
      (safeFormData.albums && safeFormData.albums[albumIndex]?.files) || [],
  })

  return (
    <Modal
      title='Upload Albums'
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={null}
      width={800}
    >
      <div className='mb-3'>
        <div className='bg-gray-300 mb-2 rounded flex justify-between items-center px-2 '>
          <span className='font-medium text-xs'>Albums</span>
          <Button className='my-2' type='primary' onClick={handleAddAlbum}>
            Add Album
          </Button>
        </div>
        {safeFormData.albums &&
          safeFormData.albums.map((album, index) => (
            <div key={album.id} className='mb-4 p-2 border rounded'>
              <div className='flex justify-between items-center mb-2'>
                <Input
                  placeholder='Album Title'
                  value={album.title}
                  onChange={(e) =>
                    handleAlbumTitleChange(index, e.target.value)
                  }
                  style={{ marginRight: '8px' }}
                />
                <Button
                  type='text'
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveAlbum(index)}
                >
                  Remove Album
                </Button>
              </div>
              <Upload.Dragger {...albumUploadProps(index)}>
                <p className='ant-upload-drag-icon'>
                  <UploadOutlined />
                </p>
                <p className='ant-upload-hint'>
                  Upload Videos and Images for this album.
                </p>
              </Upload.Dragger>
              <Row gutter={16} style={{ marginTop: '10px' }}>
                {album.files.map((file) => (
                  <Col key={file.uid} xs={24} sm={4}>
                    <div style={{ position: 'relative', marginTop: '10px' }}>
                      {file.type.startsWith('image') ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt='preview'
                          style={{
                            width: '100%',
                            height: '150px',
                            objectFit: 'cover',
                            borderRadius: '5px',
                          }}
                        />
                      ) : (
                        <video
                          src={URL.createObjectURL(file)}
                          controls
                          style={{
                            width: '100%',
                            height: '150px',
                            objectFit: 'cover',
                            borderRadius: '5px',
                          }}
                        />
                      )}
                      <Button
                        type='text'
                        danger
                        icon={<DeleteOutlined />}
                        style={{
                          position: 'absolute',
                          top: '5px',
                          right: '5px',
                        }}
                        onClick={() => handleAlbumFileRemove(index, file)}
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
      </div>
    </Modal>
  )
}

export default UploadForm
