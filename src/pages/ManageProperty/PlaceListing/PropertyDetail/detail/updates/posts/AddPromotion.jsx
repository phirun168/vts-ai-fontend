import React, { useEffect, useRef, useState } from 'react'
import {
  Col,
  Form,
  Input,
  Modal,
  Row,
  Button,
  Card,
  Radio,
  DatePicker,
  Select,
} from 'antd'
import { CloseOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker

const Promotion = ({ open, setOpen }) => {
  const [form] = Form.useForm()
  const [images, setImages] = useState([])
  const [selectedType, setSelectedType] = useState('percentage')
  const [dateOption, setDateOption] = useState('no_date')

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Form Values:', values)
        setOpen(false)
        form.resetFields()
        setImages([])
      })
      .catch((info) => {
        console.log('Validation Failed:', info)
      })
  }

  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
    setImages([])
  }

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value)
  }

  const handleDateOptionChange = (e) => {
    setDateOption(e.target.value)
  }

  useEffect(() => {
    form.setFieldValue('promotion_type', selectedType)
  }, [selectedType])

  return (
    <Modal
      title='Add Promotion'
      open={open}
      width={650}
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
      <Card>
        <Form
          form={form}
          layout='vertical'
          name='promotion'
          initialValues={{
            status: 'Active', // Default
          }}
        >
          <Row gutter={[8, 2]}>
            <Col xs={24}>
              <Form.Item
                label='Promotion Type'
                name='promotion_type'
                style={{ marginBottom: 0 }}
              >
                <Radio.Group onChange={handleTypeChange} value={selectedType}>
                  <Radio value='percentage'>Percentage</Radio>
                  <Radio value='cash'>Cash</Radio>
                  <Radio value='text'>Text</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            {selectedType === 'percentage' && (
              <Col xs={24}>
                <Form.Item
                  label='If you want to use a percentage discount, the price of your product or service will be calculated as a percentage. (%)'
                  name='percentage_value'
                  rules={[{ required: true, message: 'field require!' }]}
                >
                  <Input placeholder='Enter percentage value' />
                </Form.Item>
              </Col>
            )}
            {selectedType === 'cash' && (
              <Col xs={24}>
                <Form.Item
                  label='If you want to use a cash discount, the price of your product or service will be calculated as a cash'
                  name='cash_value'
                  rules={[{ required: true, message: 'field require!' }]}
                >
                  <Input placeholder='Enter cash value' />
                </Form.Item>
              </Col>
            )}
            {selectedType === 'text' && (
              <Col xs={24}>
                <Form.Item
                  label='If you want to use text, it only shows the text on your product or service.'
                  name='text_description'
                  rules={[{ required: true, message: 'field require!' }]}
                >
                  <Input.TextArea
                    placeholder='Enter text description'
                    rows={3}
                  />
                </Form.Item>
              </Col>
            )}

            <Col xs={24}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                // label='Schedule'
                name='date_option'
                rules={[{ required: true, message: 'Field Require' }]}
              >
                <Radio.Group
                  onChange={handleDateOptionChange}
                  value={dateOption}
                >
                  <Radio value='date_range'>Select Date</Radio>
                  <Radio value='no_date'>Empty</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            {dateOption === 'date_range' && (
              <>
                <Col xs={24}>
                  <Form.Item
                    name='date_range'
                    rules={[{ required: true, message: 'field require!' }]}
                  >
                    <RangePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </>
            )}
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item
                label='Status'
                name='status'
                style={{ marginBottom: '0px' }}
                rules={[{ required: true, message: 'Please select a status!' }]}
              >
                <Select placeholder='Select status'>
                  <Select.Option value='Active'>Active</Select.Option>
                  <Select.Option value='Inactive'>Inactive</Select.Option>
                  <Select.Option value='Expired'>Expired</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default Promotion
