import React, { useRef, useState } from 'react'
import {
  Col,
  Form,
  Input,
  Modal,
  Row,
  Button,
  Card,
  Select,
  DatePicker,
  Radio,
} from 'antd'
import { CloseOutlined, CloudUploadOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import TextEditor from '/src/components/config/TextEditor'

// ✅ Destructure Option from Select
const { Option } = Select

const AddPromotionAndEvents = ({ open, setOpen }) => {
  const [form] = Form.useForm()
  const [image, setImage] = useState(null)
  const fileInputRef = useRef(null)

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Form Values:', values)
        setOpen(false)
        form.resetFields()
        setImage(null) // Reset image state
      })
      .catch((info) => {
        console.log('Validation Failed:', info)
      })
  }

  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
    setImage(null) // Reset image state
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setImage(reader.result)
      reader.readAsDataURL(file)
    }
    // Reset file input value to enable re-selecting the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
  }

  return (
    <Modal
      title='Add Promotion & Events'
      open={open}
      width={800}
      centered
      closable={true}
      onCancel={handleCancel}
      footer={
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
        >
          <Button
            type='primary'
            onClick={handleOk}
            style={{ minWidth: '120px', borderRadius: '8px' }}
          >
            Save
          </Button>
        </div>
      }
    >
      <Card
      // title='Add Promotion & Events'
      // extra={
      //   <CloseOutlined
      //     style={{ fontSize: '18px', color: 'red', cursor: 'pointer' }}
      //     onClick={handleCancel}
      //   />
      // }
      >
        <Form
          form={form}
          layout='vertical'
          name='add_promotion_event'
          initialValues={{
            type: 'normal', // Default
            status: 'Active', // Default
          }}
        >
          <Row gutter={[8, 2]}>
            <Col span={24}>
              <Form.Item name='image' style={{ marginBottom: 0 }}>
                <div className='flex flex-col items-center  w-full'>
                  <label
                    htmlFor='image-upload'
                    className='flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50'
                  >
                    {image ? (
                      <img
                        src={image}
                        alt='Preview'
                        className='object-cover w-full h-full rounded-lg'
                      />
                    ) : (
                      <span className='text-gray-500'>
                        <CloudUploadOutlined
                          style={{ fontSize: '48px', color: '#1890ff' }}
                        />
                      </span>
                    )}
                  </label>
                  <input
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    id='image-upload'
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                  />
                  {image && (
                    <button
                      style={{
                        position: 'absolute',
                        top: '-25px',
                        right: '-15px',
                      }}
                      className='mt-4 px-4 py-2 '
                      onClick={handleRemoveImage}
                      type='button'
                    >
                      <i
                        className='fa-regular fa-circle-xmark'
                        style={{
                          fontSize: '20px',
                          color: 'white',
                          background: 'red',
                          borderRadius: '10px',
                        }}
                      ></i>
                    </button>
                  )}
                </div>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label='Promotion Name (en)'
                name='promotion_name'
                style={{ marginBottom: 0 }}
              >
                <Input type='text' placeholder='Enter promotion name' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label='Promotion Name (kh)'
                name='promotion_name'
                style={{ marginBottom: 0 }}
              >
                <Input type='text' placeholder='Enter promotion name' />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label='Start Date'
                name='start_date'
                rules={[{ required: true, message: 'field required' }]}
                style={{ marginBottom: 0 }}
              >
                <DatePicker
                  placeholder='YYYY-MM-DD'
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label='Expired Date'
                name='expired_date'
                style={{ marginBottom: 0 }}
              >
                <DatePicker
                  placeholder='YYYY-MM-DD'
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label='Location'
                name='location'
                style={{ marginBottom: 0 }}
              >
                <Select showSearch placeholder='Select location' allowClear>
                  <Option value='Account1'>Cafe Shop</Option>
                  <Option value='Account2'>BBQ</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label='Location '
                name='location'
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: 'field required' }]}
              >
                <Select
                  showSearch
                  placeholder='Select location owner'
                  allowClear
                >
                  <Option value='admin'>admin</Option>
                  <Option value='admin2'>admin2</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label='Discount (%)'
                name='discount'
                style={{ marginBottom: 0 }}
              >
                <Input type='number' placeholder='Enter discount percentage' />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label='Service/Product'
                name='service'
                style={{ marginBottom: 0 }}
              >
                <Select placeholder='Select a service or product' allowClear>
                  <Option value='service1'>Service 1</Option>
                  <Option value='service2'>Service 2</Option>
                  <Option value='product1'>Product 1</Option>
                  <Option value='product2'>Product 2</Option>
                  <Option value='other'>Other</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label='Other'
                name='otherProduct'
                style={{ marginBottom: 0 }}
              >
                <Input placeholder='Enter additional details' />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label='Type'
                name='type'
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: 'Please select a type!' }]}
              >
                <Radio.Group>
                  <Radio value='new_feed'>New Feed</Radio>
                  <Radio value='normal'>Normal</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* Status */}
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label='Status'
                name='status'
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: 'Please select a status!' }]}
              >
                <Select placeholder='Select status' allowClear>
                  <Option value='active'>Active</Option>
                  <Option value='inactive'>Inactive</Option>
                  <Option value='expired'>Expired</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24}>
              <Form.Item
                label='Description'
                name='description'
                style={{ marginBottom: 0 }}
              >
                <TextEditor />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default AddPromotionAndEvents
