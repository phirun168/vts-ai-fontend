import React, { useEffect, useState } from 'react'
import { Col, Form, Input, Modal, Row, Button, Card, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { CloseOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import CategoryServices from '../../../services/setup/Category'
import Swal from 'sweetalert2'
import TypeServices from '../../../services/setup/Type'

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
const EditType = (props) => {
  const { open, setOpen, access_token, propData, getFileImage } = props
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  //
  const [type, setType] = useState()
  //
  const onFinish = async () => {
    setLoading(true)
    try {
      const values = await form.validateFields() // Use await instead of .then()
      const formData = new FormData()
      formData.append('_id', values._id)
      formData.append('nameEn', values.nameEn)
      formData.append('nameKh', values.nameKh)
      formData.append('description', values.description)
      formData.append('file', values.file?.[0]?.originFileObj)
      const doc = formData
      const res = await TypeServices.updateType({ access_token, doc }) // Await the API call
      if (res) {
        setOpen(false)
        setLoading(false)
        form.resetFields()
        setImageUrl(null)
        Swal.fire({
          icon: 'success',
          title: 'Upload Successful!',
          text: 'The information has been updated successfully.',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed!',
        text: 'Something went wrong while updating.',
        timer: 1500,
      })
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const getTypeById = async (_id) => {
    try {
      const doc = { _id }
      const res = await TypeServices.fetchTypeById({
        access_token,
        doc,
      })
      if (res) {
        setType(res)
      }
    } catch {}
  }
  useEffect(() => {
    getTypeById(propData?._id)
  }, [propData])
  //
  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
    setImageUrl(null)
  }
  const handleChange = (info) => {
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false)
      setImageUrl(url)
    })
    // }
  }
  //
  useEffect(() => {
    form.setFieldsValue({
      _id: type?._id,
      nameEn: type?.nameEn,
      nameKh: type?.nameKh,
      description: type?.description,
    })
    if (type?.filePath) {
      setImageUrl(getFileImage(type?.filePath) + '/large-' + type?.image)
    }
  }, [type])
  //

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <Modal
      open={open}
      width={650}
      centered
      closable={false}
      onCancel={handleCancel}
      footer={
        <div
          style={{
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
          }}
        >
          <Button
            type='primary'
            onClick={onFinish}
            loading={loading}
            style={{
              minWidth: '120px',
              borderRadius: '8px',
            }}
          >
            update
          </Button>
        </div>
      }
    >
      <Card
        title='Edit Type'
        extra={
          <CloseOutlined
            style={{
              fontSize: '18px',
              color: 'red',
              cursor: 'pointer',
            }}
            onClick={handleCancel}
          />
        }
      >
        <Form form={form} layout='vertical' name='edit_form'>
          <Row gutter={[8, 2]}>
            <Form.Item hidden name='_id'>
              <Input />
            </Form.Item>
            <Col xs={24} sm={5} className=' flex justify-center my-2'>
              <Form.Item
                name='file'
                valuePropName='fileList'
                getValueFromEvent={(e) =>
                  Array.isArray(e) ? e : e && e.fileList
                }
              >
                <Upload
                  name='avatar'
                  listType='picture-card'
                  style={{ marginBottom: '0px' }}
                  className='sm:mt-[16px] avatar-uploader'
                  showUploadList={false}
                  action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
                  beforeUpload={false}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt='avatar'
                      style={{
                        width: '150%', // Increased width
                        maxWidth: '100px', // Optional: Limit the maximum width
                        height: 'auto', // Maintain aspect ratio
                        display: 'block', // Center if necessary
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} sm={19}>
              <Form.Item
                label='Type Name (En)'
                name='nameEn'
                style={{ marginBottom: '0px' }}
                rules={[{ required: true, message: 'file require!' }]}
              >
                <Input placeholder=' enter type name (en)' />
              </Form.Item>
              <Form.Item
                label='Type Name (Kh)'
                name='nameKh'
                style={{ marginBottom: '0px' }}
                rules={[{ required: true, message: 'file require!' }]}
              >
                <Input placeholder=' enter type name (kh)' />
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label='Description' name='description'>
                <TextArea rows={4} placeholder='enter description' />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default EditType
