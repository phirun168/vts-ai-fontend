import React, { useState } from 'react'
import { Upload, Row, Col, Button } from 'antd'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2'
import styled from 'styled-components'
const StyledButton = styled(Button)`
  position: absolute;
  top: 5px;
  right: 5px;
  transition:
    background 0.3s ease,
    border-bottom-left-radius 0.3s ease;

  &:hover {
    background: white !important; /* !important might be needed if Ant Design has higher specificity */
    border-bottom-right-radius: 30px;
    transition: 0.4s;
  }
`
const UploadForm = () => {
  const [formData, setFormData] = useState({ files: [] })

  const props = {
    multiple: true,
    listType: 'picture-card',
    beforeUpload: (file) => {
      setFormData((prevData) => ({
        ...prevData,
        files: [...(prevData.files || []), file],
      }))
      return false
    },
    onRemove: (file) => {
      setFormData((prevData) => ({
        ...prevData,
        files: prevData.files.filter((f) => f.uid !== file.uid),
      }))
    },
    onPreview: (file) => {
      const isImage = file.type.startsWith('image')
      const isVideo = file.type.startsWith('video')

      if (isImage || isVideo) {
        const url = URL.createObjectURL(file)
        if (isImage) {
          Swal.fire({
            imageUrl: url,
            imageWidth: '50%',
            imageHeight: 'auto',
            imageAlt: 'Preview',
            showConfirmButton: false,
            width: '50%',
          })
        } else {
          Swal.fire({
            html: `<video controls style='width: 100%; height: auto; max-height: 80vh; object-fit: contain; display: block; margin: auto;'><source src='${url}' type='video/mp4'></video>`,
            showConfirmButton: false,
            width: '50%',
            height: '5%',
            heightAuto: true,
          })
        }
      }
    },
  }

  return (
    <>
      <div className='mb-3'>
        <div className='upload-dragger'>
          <Upload.Dragger
            className=''
            {...props}
            fileList={formData.files || []}
          >
            <p className='ant-upload-drag-icon'>
              <UploadOutlined />
            </p>
            <p className='ant-upload-hint'>
              Only image and Video files are allowed.
            </p>
          </Upload.Dragger>
        </div>
        <Row
          gutter={[16, 16]}
          className='ant-upload-list'
          style={{ marginTop: '10px' }}
        >
          {formData.files &&
            formData.files.map((file) => (
              <Col key={file.uid} xs={12} sm={8} md={6} lg={4} xl={4} xxl={4}>
                <div className='ant-upload-list-item-container upload-item'>
                  <div
                    className='ant-upload-list-item ant-upload-list-item-thumbnail'
                    style={{ width: '100%', height: '100%' }}
                  >
                    {file.type.startsWith('image') ? (
                      <img
                        className='ant-upload-list-item-thumbnail ant-upload-list-item-file'
                        alt='preview'
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'fill',
                          borderRadius: '8px',
                          cursor: 'pointer',
                        }}
                        src={URL.createObjectURL(file)}
                        onClick={() => props.onPreview(file)}
                      />
                    ) : file.type.startsWith('video') ? (
                      <video
                        className='ant-upload-list-item-thumbnail ant-upload-list-item-file'
                        autoPlay
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          cursor: 'pointer',
                        }}
                        onClick={() => props.onPreview(file)}
                      >
                        <source
                          src={URL.createObjectURL(file)}
                          type={file.type}
                        />
                        Your browser does not support the video tag.
                      </video>
                    ) : null}
                  </div>
                  <StyledButton
                    type='text'
                    danger
                    icon={<DeleteOutlined />}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      cursor: 'pointer',
                    }}
                    onClick={() => props.onRemove(file)}
                  />
                </div>
              </Col>
            ))}
        </Row>
      </div>
    </>
  )
}

export default UploadForm
