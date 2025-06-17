import React, { useState } from 'react'
import { Modal, Upload, Button, Card, Row, Col } from 'antd'
import { CloseCircleOutlined, InboxOutlined } from '@ant-design/icons'

const { Dragger } = Upload

const App = () => {
  const [fileList, setFileList] = useState([])
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewFile, setPreviewFile] = useState('')
  const [isVideo, setIsVideo] = useState(false)

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      const reader = new FileReader()
      reader.onload = () => {
        file.preview = reader.result
        setPreviewFile(file.preview)
        setIsVideo(file.type.startsWith('video/'))
        setPreviewVisible(true)
      }
      reader.readAsDataURL(file.originFileObj)
    } else {
      setPreviewFile(file.url || file.preview)
      setIsVideo(file.type.startsWith('video/'))
      setPreviewVisible(true)
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div className='upload-video-moment'>
        <Dragger
          multiple
          fileList={fileList}
          onChange={handleChange}
          onPreview={handlePreview}
          beforeUpload={() => false}
          listType='picture-card'
          className='tag-video-moment'
          itemRender={(originNode, file, currFileList, actions) => (
            <div
              style={{
                position: 'relative',
                display: 'inline-block',
                width: '150%',
              }}
            >
              <Card style={{ width: '70px', marginTop: '10px' }}>
                <Button
                  type='text'
                  icon={<CloseCircleOutlined />}
                  onClick={() => actions.remove(file)}
                  style={{
                    position: 'absolute',

                    top: '-12px',
                    borderRadius: '50%',
                    left: '38px',
                    color: 'red',
                    zIndex: 1,
                    cursor: 'pointer',
                  }}
                  className='custom-delete-button'
                />
                {file.type.startsWith('video/') && (
                  <video
                    autoPlay
                    muted
                    loop
                    onClick={() => handlePreview(file)} // Trigger preview on click
                    style={{
                      width: '100%',
                      height: '5vh',
                      margin: '0px !important',
                      objectFit: 'cover',
                      cursor: 'pointer',
                    }}
                    src={
                      file.preview || URL.createObjectURL(file.originFileObj)
                    }
                  />
                )}
              </Card>
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
        {isVideo ? (
          <video controls style={{ width: '100%' }} src={previewFile}></video>
        ) : (
          <p>Preview not available</p>
        )}
      </Modal>
    </div>
  )
}

export default App
