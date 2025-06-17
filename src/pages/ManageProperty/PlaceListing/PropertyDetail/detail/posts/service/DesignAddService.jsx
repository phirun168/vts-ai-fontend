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
  Radio,
  Steps,
} from 'antd'
import {
  CloseCircleOutlined,
  CloudUploadOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import TextEditor from '/src/components/config/TextEditor'
import Swal from 'sweetalert2'

const { Step } = Steps

const existingRooms = [
  {
    id: '101',
    roomNameEn: 'Room 101 - Deluxe',
    roomNameKh: 'បន្ទប់ 101 - ពិសេស',
    image: 'https://via.placeholder.com/150?text=Room+101',
  },
  {
    id: '102',
    roomNameEn: 'Room 102 - Standard',
    roomNameKh: 'បន្ទប់ 102 - ស្តង់ដារ',
    image: 'https://via.placeholder.com/150?text=Room+102',
  },
  {
    id: '103',
    roomNameEn: 'Room 103 - Suite',
    roomNameKh: 'បន្ទប់ 103 - ស៊ុយត',
    image: 'https://via.placeholder.com/150?text=Room+103',
  },
]

const AddService = ({ open, setOpen }) => {
  const [form] = Form.useForm()
  const [images, setImages] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [roomOption, setRoomOption] = useState('add') // "add" (new room) or "existing"
  // Change from single to multiple selection:
  const [selectedRooms, setSelectedRooms] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredRooms, setFilteredRooms] = useState(existingRooms)
  const fileInputRef = useRef(null)

  const handleNext = () => {
    form
      .validateFields()
      .then(() => {
        setCurrentStep(currentStep + 1)
      })
      .catch((error) => {
        console.log('Validation Error:', error)
      })
  }

  const handlePrev = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (roomOption === 'existing' && selectedRooms.length === 0) {
          Swal.fire('Please select at least one existing room.')
          return
        }
        const finalValues = { ...values }
        if (roomOption === 'existing') {
          finalValues.existingRooms = selectedRooms
        }
        console.log('Form Values:', finalValues)
        setOpen(false)
        form.resetFields()
        setImages([])
        setCurrentStep(0)
        setRoomOption('add')
        setSelectedRooms([])
        setSearchQuery('')
        setFilteredRooms(existingRooms)
      })
      .catch((info) => {
        console.log('Validation Failed:', info)
      })
  }

  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
    setImages([])
    setCurrentStep(0)
    setRoomOption('add')
    setSelectedRooms([])
    setSearchQuery('')
    setFilteredRooms(existingRooms)
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () =>
        setImages((prevImages) => [...prevImages, reader.result])
      reader.readAsDataURL(file)
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
      showConfirmButton: false,
    })
  }

  // Search function for existing rooms
  const handleSearch = () => {
    const filtered = existingRooms.filter((room) =>
      room.roomNameEn.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredRooms(filtered)
  }

  // Toggle selection of a room id
  const toggleRoomSelection = (roomId) => {
    setSelectedRooms((prevSelected) => {
      if (prevSelected.includes(roomId)) {
        return prevSelected.filter((id) => id !== roomId)
      } else {
        return [...prevSelected, roomId]
      }
    })
  }

  // Steps content based on roomOption
  const steps =
    roomOption === 'add'
      ? [
          {
            title: 'Add Room',
            content: (
              <>
                <Form form={form} layout='vertical' name='add_service'>
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
                          {images.length > 0 && (
                            <div className='flex flex-wrap gap-2'>
                              {images.map((image, index) => (
                                <div
                                  key={index}
                                  className='relative border rounded-lg'
                                >
                                  <img
                                    src={image}
                                    alt={`Preview ${index}`}
                                    className='object-cover w-16 h-16 rounded-lg cursor-pointer'
                                    onClick={() => handleImageChangeText(image)}
                                  />
                                  <button
                                    className='absolute top-0 text-white rounded-full text-xs'
                                    style={{ right: '-1px' }}
                                    onClick={() => handleRemoveImage(image)}
                                  >
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
                          )}
                        </div>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label='Service Name (En)'
                        name='service_name_en'
                        style={{ marginBottom: 0 }}
                      >
                        <Input placeholder='Enter service name in English' />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label='Service Name (Kh)'
                        name='service_name_kh'
                        style={{ marginBottom: 0 }}
                      >
                        <Input placeholder='Enter service name in Khmer' />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label='Price'
                        name='price'
                        style={{ marginBottom: 0 }}
                      >
                        <Input placeholder='Enter price' />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label='Location'
                        name='location'
                        style={{ marginBottom: 0 }}
                      >
                        <Select
                          showSearch
                          placeholder='Select location'
                          options={[
                            { value: 'bbq', label: 'BBQ Restaurant' },
                            { value: 'cafe', label: 'Cafe' },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label='Location Owner'
                        name='location_owner'
                        style={{ marginBottom: 0 }}
                      >
                        <Select
                          showSearch
                          placeholder='Select location owner'
                          options={[
                            { value: 'admin', label: 'admin' },
                            { value: 'admin2', label: 'admin2' },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        label='Status'
                        name='status'
                        style={{ marginBottom: '0px' }}
                        rules={[
                          {
                            required: true,
                            message: 'Please select a status!',
                          },
                        ]}
                      >
                        <Select placeholder='Select status'>
                          <Select.Option value='Active'>Active</Select.Option>
                          <Select.Option value='Inactive'>
                            Inactive
                          </Select.Option>
                          <Select.Option value='Expired'>Expired</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
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
              </>
            ),
          },
        ]
      : [
          {
            title: 'Existing Room',
            content: (
              <>
                <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
                  <Col span={18}>
                    <Input
                      placeholder='Search room by name'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </Col>
                  <Col span={6}>
                    <Button
                      type='primary'
                      icon={<SearchOutlined />}
                      onClick={handleSearch}
                      style={{ width: '100%' }}
                    >
                      Search
                    </Button>
                  </Col>
                </Row>
                {/* Render the room cards in a vertical column with scrolling */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    overflowY: 'auto',
                    maxHeight: '300px',
                    paddingBottom: '8px',
                  }}
                >
                  {filteredRooms.length > 0 ? (
                    <Row gutter={[8, 8]}>
                      {filteredRooms.map((room) => (
                        <Col key={room.id} xxl={8}>
                          <Card
                            hoverable
                            cover={
                              <img
                                src={room.image}
                                alt={room.roomNameEn}
                                style={{ height: '80px', objectFit: 'cover' }}
                              />
                            }
                            onClick={() => toggleRoomSelection(room.id)}
                            style={{
                              width: '150px',
                              border: selectedRooms.includes(room.id)
                                ? '2px solid #1890ff'
                                : '1px solid #f0f0f0',
                              cursor: 'pointer',
                            }}
                          >
                            <Card.Meta
                              title={room.roomNameEn}
                              description={room.roomNameKh}
                            />
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <p>No rooms found.</p>
                  )}
                </div>
              </>
            ),
          },
        ]

  return (
    <Modal
      title='Add Service'
      open={open}
      width={650}
      centered
      closable={true}
      onCancel={handleCancel}
      footer={
        <div
          style={{
            textAlign: 'right',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
          }}
        >
          {roomOption === 'add' && currentStep > 0 && (
            <Button
              onClick={handlePrev}
              style={{ minWidth: '120px', borderRadius: '8px' }}
            >
              Previous
            </Button>
          )}
          {roomOption === 'add' && currentStep < steps.length - 1 ? (
            <Button
              type='primary'
              onClick={handleNext}
              style={{ minWidth: '120px', borderRadius: '8px' }}
            >
              Next
            </Button>
          ) : (
            <Button
              type='primary'
              onClick={handleOk}
              style={{ minWidth: '120px', borderRadius: '8px' }}
            >
              Save
            </Button>
          )}
        </div>
      }
    >
      <Card>
        <Row style={{ marginBottom: '16px' }}>
          <Col span={24}>
            <Form.Item label='Room Option'>
              <Radio.Group
                value={roomOption}
                onChange={(e) => {
                  setRoomOption(e.target.value)
                  // Reset selection when switching options
                  setSelectedRooms([])
                }}
              >
                <Radio value='add'>Add New Room</Radio>
                <Radio value='existing'>Add Existing Room</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        {roomOption === 'add' ? steps[0].content : steps[0].content}
      </Card>
    </Modal>
  )
}

export default AddService
