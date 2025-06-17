import React, { useState } from 'react'
import { Modal, Upload, Button } from 'antd'
import { CloseCircleOutlined, InboxOutlined } from '@ant-design/icons'

const { Dragger } = Upload

const App = () => {
  const [fileList, setFileList] = useState([])
  const [previewImage, setPreviewImage] = useState('')
  const [previewVisible, setPreviewVisible] = useState(false)

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      const reader = new FileReader()
      reader.onload = () => {
        file.preview = reader.result
        setPreviewImage(file.preview)
        setPreviewVisible(true)
      }
      reader.readAsDataURL(file.originFileObj)
    } else {
      setPreviewImage(file.url || file.preview)
      setPreviewVisible(true)
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div className='upload-image-moment mb-5'>
        <Dragger
          multiple
          fileList={fileList}
          onChange={handleChange}
          onPreview={handlePreview}
          beforeUpload={() => false} // Prevent auto upload
          listType='picture-card'
          className='video-card'
          itemRender={(originNode, file, currFileList, actions) => (
            <div
              style={{
                position: 'relative',
                display: 'inline-block',
                width: '60px',
              }}
              className='my-2'
            >
              {/* Custom delete icon */}
              <Button
                type='text'
                icon={<CloseCircleOutlined />}
                onClick={() => actions.remove(file)}
                style={{
                  position: 'absolute',
                  width: '20px',
                  right: '0px',
                  top: '-10px',
                  borderRadius: '50%',
                  color: 'red',
                  zIndex: 1,
                  cursor: 'pointer',
                }}
                className='custom-delete-button'
              />
              {originNode} {/* Original thumbnail */}
            </div>
          )}
        >
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
        </Dragger>
      </div>

      {/* Preview Modal */}
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt='Preview' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}

export default App
