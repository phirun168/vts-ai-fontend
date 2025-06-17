import React, { useState, useEffect } from 'react'
import { Avatar, Modal, Button, Upload } from 'antd'
import { EditOutlined, UploadOutlined } from '@ant-design/icons'

// Helper function to convert file to base64 string
const getBase64 = (file, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(file)
}

const ProfileThumbnailEditor = (props) => {
  const { avatar, setAvatar, getFileByName } = props
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [filePreview, setFilePreview] = useState(null)

  // When modal opens, if no new file has been selected yet, show the current avatar
  useEffect(() => {
    if (isModalVisible && !filePreview) {
      setFilePreview(getFileByName('/' + avatar))
    }
  }, [isModalVisible, avatar, filePreview])

  const beforeUpload = (file) => {
    // Convert file to base64 and store in state
    getBase64(file, (imageUrl) => {
      setFilePreview(imageUrl)
    })
    return false // Prevent automatic upload
  }

  const handleUploadChange = (info) => {
    if (info.file && info.file.originFileObj) {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setFilePreview(imageUrl)
      })
    }
  }

  const handleSave = () => {
    if (filePreview) {
      setAvatar(filePreview)
    }
    setIsModalVisible(false)
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Avatar
        style={{ background: '#C0C0C0' }}
        size={120}
        src={avatar ? getFileByName('/' + avatar) : null}
        icon={!avatar ? <UserOutlined /> : null}
        className='border-4 border-white'
      >
        {!avatar && 'SK'}
      </Avatar>
      <Button
        type='primary'
        shape='circle'
        icon={<EditOutlined />}
        size='small'
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          transform: 'translate(25%, 25%)',
        }}
        onClick={() => {
          setFilePreview(null) // Reset preview so current avatar is loaded in useEffect
          setIsModalVisible(true)
        }}
      />
      <Modal
        visible={isModalVisible}
        title='Edit Thumbnail'
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSave}
        width={600}
        okText='Save'
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Upload.Dragger
          name='avatar'
          multiple={false}
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleUploadChange}
        >
          {filePreview ? (
            <img
              src={filePreview}
              alt='New Avatar Preview'
              style={{
                width: '100%',
                maxHeight: 200,
                objectFit: 'cover',
                borderRadius: 8,
              }}
            />
          ) : (
            <>
              <p className='ant-upload-drag-icon'>
                <UploadOutlined />
              </p>
              <p className='ant-upload-text'>
                Click or drag file to this area to upload
              </p>
            </>
          )}
        </Upload.Dragger>
      </Modal>
    </div>
  )
}

export default ProfileThumbnailEditor
