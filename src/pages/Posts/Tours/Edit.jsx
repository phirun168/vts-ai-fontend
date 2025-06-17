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
import {
  CloseCircleOutlined,
  CloseOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons'
const { RangePicker } = DatePicker
import TextEditor from '/src/components/config/TextEditor'
import Swal from 'sweetalert2' // Import SweetAlert2

const EditTours = ({ open, setOpen }) => {
  const [form] = Form.useForm()
  const [images, setImages] = useState([])
  const fileInputRef = useRef(null)
  const [dateOption, setDateOption] = useState('no_date')

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Form Values:', values)
        setOpen(false)
        form.resetFields()
        setImages([]) // Ensure images is set to an empty array
      })
      .catch((info) => {
        console.log('Validation Failed:', info)
      })
  }

  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
    setImages([]) // Ensure images is set to an empty array
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map((file) => {
      const reader = new FileReader()
      reader.onload = () =>
        setImages((prevImages) => [...prevImages, reader.result])
      reader.readAsDataURL(file)
      return reader.result
    })
  }

  const handleRemoveImage = (imageToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((image) => image !== imageToRemove)
    )
  }
  const handleImageChangeText = (imageUrl) => {
    Swal.fire({
      title: '',
      imageUrl,
      imageAlt: 'Uploaded Image',
      showCloseButton: true,
      confirmButtonText: 'Close',
      showConfirmButton: false, // Hide the "Close" button
    })
  }
  const handleDateOptionChange = (e) => {
    setDateOption(e.target.value)
  }
  return (
    <Modal
      open={open}
      width={800}
      centered
      closable={false}
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
        title='Add Tours'
        extra={
          <CloseOutlined
            style={{ fontSize: '18px', color: 'red', cursor: 'pointer' }}
            onClick={handleCancel}
          />
        }
      >
        <Form
          form={form}
          layout='vertical'
          name='add_tours'
          initialValues={{
            type: 'normal', // Default
            status: 'Active', // Default
          }}
        >
          <Row gutter={[8, 2]}>
            <Col span={24}>
              <Form.Item name='images' style={{ marginBottom: 0 }}>
                <div className='flex flex-col items-center w-full'>
                  <label
                    htmlFor='image-upload'
                    className='flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50'
                  >
                    <span className='text-gray-500'>
                      <CloudUploadOutlined
                        style={{ fontSize: '48px', color: '#1890ff' }}
                      />
                    </span>
                    {/* display preview here  */}
                  </label>
                  <input
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    id='image-upload'
                    type='file'
                    accept='image/*'
                    multiple
                    onChange={handleImageChange}
                  />
                </div>
                <div className='my-2'>
                  {images.length > 0 ? (
                    <div className='flex flex-wrap gap-2 '>
                      {images.map((image, index) => (
                        <div key={index} className='relative border rounded-lg'>
                          <img
                            src={image}
                            alt={`Preview ${index}`}
                            className='object-cover w-16 h-16 rounded-lg cursor-pointer'
                            onClick={() => handleImageChangeText(image)}
                          />
                          <button
                            className='absolute top-0   text-white rounded-full text-xs'
                            style={{ right: '-1px' }}
                            onClick={() => handleRemoveImage(image)}
                          >
                            {/* <CloseOutlined style={{ fontSize: '15px' }} /> */}
                            <CloseCircleOutlined
                              style={{
                                fontSize: '20px',
                                background: 'red',
                                borderRadius: '40px',
                              }}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} xl={8}>
              <Form.Item
                label='Tour Name (En)'
                name='tour_name_en'
                style={{ marginBottom: 0 }}
                // rules={[{ required: true, message: 'field Require' }]}
              >
                <Input placeholder='enter tour name en' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} xl={8}>
              <Form.Item
                label='Tour Name (Kh)'
                name='tour_name_kh'
                // rules={[{ required: true, message: 'field Require' }]}
                style={{ marginBottom: 0 }}
              >
                <Input placeholder='enter tour name kh' />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} xl={8}>
              <Form.Item
                label='Start Price'
                name='start_price'
                style={{ marginBottom: 0 }}
              >
                <Input placeholder='enter start price' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} xl={8}>
              <Form.Item
                label='End Price'
                name='end_price'
                style={{ marginBottom: 0 }}
              >
                <Input placeholder='enter end price' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} xl={8}>
              <Form.Item
                label='Location'
                name='location'
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: 'field Require' }]}
              >
                <Select
                  showSearch
                  placeholder='enter location'
                  options={[
                    { value: 'admin', label: 'Cafe ' },
                    { value: 'admin2', label: 'restaurant' },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} xl={8}>
              <Form.Item
                label='Location Owner'
                name='location_owner'
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: 'field Require' }]}
              >
                <Select
                  showSearch
                  placeholder='enter location '
                  options={[
                    { value: 'admin', label: 'admin1' },
                    { value: 'admin2', label: 'admin2' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} xl={8}>
              <Form.Item
                label='Type'
                name='type'
                style={{ marginBottom: '0px' }}
                rules={[{ required: true, message: 'Please select a type!' }]}
              >
                <Radio.Group>
                  <Radio value='new_feed'>New Feed</Radio>
                  <Radio value='normal'>Normal</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* Status */}
            <Col xs={24} sm={12} xl={8}>
              <Form.Item
                label='Status'
                name='status'
                style={{ marginBottom: '0px' }}
                rules={[{ required: true, message: 'Please select a status!' }]}
              >
                <Select placeholder='Select status'>
                  <Select.Option value='Active'>Active</Select.Option>
                  <Select.Option value='Inactive'>Inactive</Select.Option>
                  <Select.Option value='Expire'>Expired</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} xl={8}>
              <>
                {/* <Col xs={24} sm={12} xl={8}> */}
                <Form.Item
                  label={
                    <Radio.Group
                      onChange={handleDateOptionChange}
                      value={dateOption}
                    >
                      <Radio value='date_range'>Select Date</Radio>
                      <Radio value='no_date'>Empty </Radio>
                    </Radio.Group>
                  }
                  className='mx-0 py-0'
                  name='date_range'
                >
                  {dateOption === 'date_range' ? (
                    <RangePicker
                      style={{ width: '100%' }}
                      placeholder={['Start Date', 'Expired Date']}
                    />
                  ) : (
                    <Input disabled placeholder='empty' />
                  )}
                </Form.Item>
              </>
            </Col>

            <Col xs={24}>
              <Form.Item
                label='Description'
                name='description'
                style={{ marginBottom: 0 }}
              >
                <TextEditor form={form} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default EditTours
