import React, { useState, useEffect } from 'react'
import {
  Modal,
  Steps,
  Button,
  Form,
  Input,
  Select,
  Radio,
  DatePicker,
  Card,
  Upload,
  Row,
  Col,
  Divider,
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const { Step } = Steps
const { Option } = Select
const { RangePicker } = DatePicker

// Privacy component from your snippet
const Privacy = () => {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [privacyOptions, setPrivacyOptions] = useState({})

  const handleSelectChange = (selected) => {
    setSelectedCategories(selected)
    setPrivacyOptions((prev) => {
      const newOptions = { ...prev }
      selected.forEach((cat) => {
        if (!newOptions[cat]) {
          newOptions[cat] = 'allow'
        }
      })
      return newOptions
    })
  }

  const handleRadioChange = (category, e) => {
    setPrivacyOptions((prev) => ({
      ...prev,
      [category]: e.target.value,
    }))
  }

  const categories = [
    'Public',
    'smoking',
    'pet',
    'Category4',
    'Category5',
    'Category6',
  ]

  return (
    <div>
      <h2>Privacy</h2>
      <Select
        mode='multiple'
        style={{ width: '100%' }}
        placeholder='Select privacy categories'
        value={selectedCategories}
        onChange={handleSelectChange}
      >
        {categories.map((category) => (
          <Option key={category} value={category}>
            {category}
          </Option>
        ))}
      </Select>
      <div
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
          marginTop: '1rem',
          paddingRight: '1rem',
        }}
      >
        {selectedCategories.map((category) => (
          <div key={category}>
            <h3>{category}</h3>
            <Radio.Group
              onChange={(e) => handleRadioChange(category, e)}
              value={privacyOptions[category]}
            >
              <Radio value='allow'>Allow</Radio>
              <Radio value='not allow'>Not Allow</Radio>
            </Radio.Group>
            <Divider />
          </div>
        ))}
      </div>
    </div>
  )
}

const AddService = ({ open, setOpen }) => {
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [selectedType, setSelectedType] = useState('percentage')
  const [dateOption, setDateOption] = useState('no_date')
  const [expiredOption, setExpiredOption] = useState('no_date')
  const [serviceNameEnLabel, setServiceNameEnLabel] =
    useState('Service Name (En)')
  const [serviceNameKhLabel, setServiceNameKhLabel] =
    useState('Service Name (Kh)')
  const [roomOption, setRoomOption] = useState('rename')

  useEffect(() => {
    form.setFieldValue('promotion_type', selectedType)
  }, [selectedType, form])

  const handleTemplateChange = (value) => {
    setSelectedTemplate(value)
    if (value === 'template1') {
      form.setFieldValue('type_of_service', ['rooms'])
      setServiceNameEnLabel('Room Name (En)')
      setServiceNameKhLabel('Room Name (Kh)')
    } else if (value === 'template2') {
      form.setFieldValue('type_of_service', ['tickets'])
      setServiceNameEnLabel('Ticket Name (En)')
      setServiceNameKhLabel('Ticket Name (Kh)')
    } else if (value === 'template3') {
      form.setFieldValue('type_of_service', ['products'])
      setServiceNameEnLabel('Product Name (En)')
      setServiceNameKhLabel('Product Name (Kh)')
    } else {
      form.setFieldValue('type_of_service', [])
      setServiceNameEnLabel('Service Name (En)')
      setServiceNameKhLabel('Service Name (Kh)')
    }
  }

  const typeOfService = Form.useWatch('type_of_service', form)

  const steps = [
    {
      title: 'Service Information',
      content: (
        <>
          <Row gutter={[8, 2]}>
            <Col xs={24} xl={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Thumbnail'
                name='thumbnail'
              >
                <Upload.Dragger
                  name='thumbnail'
                  beforeUpload={() => false}
                  accept='image/*'
                  maxCount={1}
                  showUploadList={true}
                >
                  <p className='ant-upload-drag-icon'>
                    <UploadOutlined />
                  </p>
                  <p className='ant-upload-hint'>
                    Click or drag thumbnail to upload
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Col>
            <Col xs={24} xl={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Gallery Images'
                name='gallery'
              >
                <Upload.Dragger
                  name='gallery'
                  beforeUpload={() => false}
                  accept='image/*'
                  multiple
                  showUploadList={true}
                >
                  <p className='ant-upload-drag-icon'>
                    <UploadOutlined />
                  </p>
                  <p className='ant-upload-hint'>
                    Click or drag gallery images to upload
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Col>
            <Col xs={24} xl={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Select Template'
                name='template'
                rules={[
                  { required: true, message: 'Please select a template!' },
                ]}
              >
                <Select
                  placeholder='Select Template'
                  onChange={handleTemplateChange}
                >
                  <Option value='template1'>Accommodation Business</Option>
                  <Option value='template2'>Template 2</Option>
                  <Option value='template3'>Template 3</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} xl={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Type of Service'
                name='type_of_service'
                rules={[
                  {
                    required: true,
                    message: 'Please select at least one type of service!',
                  },
                ]}
              >
                <Select mode='multiple' placeholder='Select type of service'>
                  <Option value='tickets'>Tickets</Option>
                  <Option value='rooms'>Rooms</Option>
                  <Option value='menu_food'>Menu & Food</Option>
                  <Option value='rental_services'>Rental services</Option>
                  <Option value='products'>Products</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} xl={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label={serviceNameEnLabel}
                name='service_name_en'
                rules={[
                  {
                    required: true,
                    message: `Please input ${serviceNameEnLabel.toLowerCase()}!`,
                  },
                ]}
              >
                <Input
                  placeholder={`Enter ${serviceNameEnLabel.toLowerCase()}`}
                />
              </Form.Item>
            </Col>
            <Col xs={24} xl={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label={serviceNameKhLabel}
                name='service_name_kh'
                rules={[
                  {
                    required: true,
                    message: `Please input ${serviceNameKhLabel.toLowerCase()}!`,
                  },
                ]}
              >
                <Input
                  placeholder={`Enter ${serviceNameKhLabel.toLowerCase()}`}
                />
              </Form.Item>
            </Col>
            <Col xs={24} xl={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Price'
                name='price'
                rules={[{ required: true, message: 'Please input the price!' }]}
              >
                <Input placeholder='Enter price' />
              </Form.Item>
            </Col>
            <Col xs={24} xl={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Place'
                name='place'
              >
                <Select placeholder='Select place'>
                  <Option value='location1'>Place 1</Option>
                  <Option value='location2'>Place 2</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} xl={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Place Owner'
                name='place_owner'
              >
                <Select placeholder='Select place owner'>
                  <Option value='owner1'>Owner 1</Option>
                  <Option value='owner2'>Owner 2</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} xl={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Status'
                name='status'
                rules={[{ required: true, message: 'Please select a status!' }]}
              >
                <Select placeholder='Select status'>
                  <Option value='Inactive'>Inactive</Option>
                  <Option value='Active'>Active</Option>
                  <Option value='Expired'>Expired</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} xl={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label={
                  <>
                    Expired Date (
                    <Radio.Group
                      onChange={(e) => setExpiredOption(e.target.value)}
                      value={expiredOption}
                      style={{ marginLeft: 4 }}
                    >
                      <Radio value='date_range'>Select Date</Radio>
                      <Radio value='no_date'>Empty</Radio>
                    </Radio.Group>
                    )
                  </>
                }
                name='expired_date'
                rules={[
                  {
                    required: expiredOption === 'date_range',
                    message: 'Please select an expired date range!',
                  },
                ]}
              >
                {expiredOption === 'date_range' ? (
                  <RangePicker style={{ width: '100%' }} format='YYYY-MM-DD' />
                ) : (
                  <RangePicker
                    placeholder={['', '']}
                    disabled
                    style={{ width: '100%' }}
                    format='YYYY-MM-DD'
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          {typeOfService && typeOfService.includes('rooms') && (
            <>
              <Row gutter={[8, 2]}>
                <Col xs={24} xl={12}>
                  <Form.Item
                    style={{ marginBottom: '0px' }}
                    label='Room Option'
                    name='room_option'
                  >
                    <Radio.Group
                      onChange={(e) => setRoomOption(e.target.value)}
                      value={roomOption}
                    >
                      <Radio value='rename'>Rename</Radio>
                      <Radio value='predefined'>Select Beds</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              {roomOption === 'rename' && (
                <Row gutter={[8, 2]}>
                  <Col xs={24} xl={12}>
                    <Form.Item
                      style={{ marginBottom: '0px' }}
                      label='Custom Room Name'
                      name='custom_room_name'
                      rules={[
                        {
                          required: true,
                          message: 'Please enter a custom room name!',
                        },
                      ]}
                    >
                      <Input placeholder='Enter custom room name' />
                    </Form.Item>
                  </Col>
                </Row>
              )}
              {roomOption === 'predefined' && (
                <Row gutter={[8, 2]}>
                  <Col xs={24} xl={12}>
                    <Form.Item
                      style={{ marginBottom: '0px' }}
                      label='Number of Beds'
                      name='number_of_beds'
                      rules={[
                        {
                          required: true,
                          message: 'Please select the number of beds!',
                        },
                      ]}
                    >
                      <Radio.Group>
                        <Radio value={1}>1 Bed</Radio>
                        <Radio value={2}>2 Beds</Radio>
                        <Radio value={3}>3 Beds</Radio>
                        <Radio value={4}>4 Beds</Radio>
                        <Radio value={5}>5 Beds</Radio>
                        <Radio value={6}>6 Beds</Radio>
                        <Radio value={7}>7 Beds</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              )}
            </>
          )}
        </>
      ),
    },

    {
      title: 'Discount',
      content: (
        <>
          <Form.Item
            style={{ marginBottom: '0px' }}
            label='Discount Type'
            name='discount_type'
          >
            <Radio.Group
              onChange={(e) => setSelectedType(e.target.value)}
              value={selectedType}
            >
              <Radio value='percentage'>Percentage</Radio>
              <Radio value='cash'>Cash</Radio>
              <Radio value='text'>Text</Radio>
            </Radio.Group>
          </Form.Item>
          {selectedType === 'percentage' && (
            <Form.Item
              style={{ marginBottom: '0px' }}
              label='Percentage Value (%)'
              name='percentage_value'
            >
              <Input placeholder='Enter percentage value (optional)' />
            </Form.Item>
          )}
          {selectedType === 'cash' && (
            <Form.Item
              style={{ marginBottom: '0px' }}
              label='Cash Value'
              name='cash_value'
            >
              <Input placeholder='Enter cash value (optional)' />
            </Form.Item>
          )}
          {selectedType === 'text' && (
            <Form.Item
              style={{ marginBottom: '0px' }}
              label='Text Description'
              name='text_description'
            >
              <Input.TextArea
                placeholder='Enter text description (optional)'
                rows={3}
              />
            </Form.Item>
          )}
          <Form.Item
            style={{ marginBottom: '0px' }}
            label='Schedule'
            name='date_option'
          >
            <Radio.Group
              onChange={(e) => setDateOption(e.target.value)}
              value={dateOption}
            >
              <Radio value='date_range'>Select Date</Radio>
              <Radio value='no_date'>Empty</Radio>
            </Radio.Group>
          </Form.Item>
          {dateOption === 'date_range' && (
            <Form.Item style={{ marginBottom: '0px' }} name='date_range'>
              <RangePicker style={{ width: '100%' }} format='YYYY-MM-DD' />
            </Form.Item>
          )}
          <Form.Item
            style={{ marginBottom: '0px' }}
            label='Status'
            name='status'
          >
            <Select placeholder='Select status'>
              <Option value='Active'>Active</Option>
              <Option value='Inactive'>Inactive</Option>
              <Option value='Expired'>Expired</Option>
            </Select>
          </Form.Item>
          <Form.Item label='Description' name='description'>
            <Input.TextArea
              placeholder='Enter description (optional)'
              rows={4}
            />
          </Form.Item>
        </>
      ),
    },
    // {
    //   title: 'Privacy',
    //   content: <Privacy />,
    // },
    {
      title: 'Other',
      content: (
        <>
          <Row gutter={[8, 2]}>
            <Col xs={24} xl={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Select Amenity'
                name='amenity'
                rules={[
                  {
                    required: true,
                    message: 'Please select at least one amenity!',
                  },
                ]}
              >
                <Select mode='multiple' placeholder='Select amenity'>
                  <Option value='amenity1'>Amenity 1</Option>
                  <Option value='amenity2'>Amenity 2</Option>
                  <Option value='amenity3'>Amenity 3</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} xl={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Features'
                name='features'
                rules={[
                  {
                    required: true,
                    message: 'Please select at least one feature!',
                  },
                ]}
              >
                <Select mode='multiple' placeholder='Select features'>
                  <Option value='free_cancellation'>Free Cancellation</Option>
                  <Option value='breakfast_included'>Breakfast Included</Option>
                  <Option value='city_view'>City View</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} xl={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Payment Method'
                name='payment_method'
                rules={[
                  {
                    required: true,
                    message: 'Please select a payment method!',
                  },
                ]}
              >
                <Select mode='multiple' placeholder='Select payment method'>
                  <Option value='credit_card'>Credit Card</Option>
                  <Option value='paypal'>PayPal</Option>
                  <Option value='cash'>Cash</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Privacy />
        </>
      ),
    },
  ]

  const next = async () => {
    try {
      if (currentStep === 0) {
        await form.validateFields([
          'template',
          'service_name_en',
          'service_name_kh',
          'price',
          'thumbnail',
          'type_of_service',
        ])
      }
      if (currentStep === 1) {
        await form.validateFields(['amenity', 'features', 'payment_method'])
      }
      // Discount step is optional – no validation required.
      if (currentStep === 4) {
        // Validate privacy step if necessary.
      }
      setCurrentStep(currentStep + 1)
    } catch (err) {
      console.log('Validation Error:', err)
    }
  }

  const prev = () => {
    setCurrentStep(currentStep - 1)
  }

  const onFinish = async () => {
    try {
      await form.validateFields()
      console.log('Form Data:', form.getFieldsValue())
      setOpen(false)
      form.resetFields()
    } catch (err) {
      console.log('Final Validation Error:', err)
    }
  }

  return (
    <Modal
      title='Add Service'
      open={open}
      width={900}
      centered
      onCancel={() => setOpen(false)}
      footer={
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
        >
          {currentStep > 0 && <Button onClick={prev}>Previous</Button>}
          {currentStep < steps.length - 1 && (
            <Button type='primary' onClick={next}>
              Next
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type='primary' onClick={onFinish}>
              Save
            </Button>
          )}
        </div>
      }
    >
      <Steps current={currentStep} style={{ marginBottom: 24 }}>
        {steps.map((item, index) => (
          <Step key={index} title={item.title} />
        ))}
      </Steps>
      <Card style={{ border: 'none', boxShadow: 'none' }}>
        <Form
          form={form}
          layout='vertical'
          initialValues={{ status: 'Active', expired_date: [] }}
        >
          {steps[currentStep].content}
        </Form>
      </Card>
    </Modal>
  )
}

export default AddService
