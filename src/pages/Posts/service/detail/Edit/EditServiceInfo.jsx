import React, { useEffect } from 'react'
import {
  Form,
  Input,
  DatePicker,
  Button,
  Select,
  Radio,
  message,
  Modal,
  Row,
  Col,
  Card,
} from 'antd'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker

export default function EditServiceInfo(props) {
  const { open, setOpen, initialData } = props
  const [form] = Form.useForm()

  // Set initial form values when the component is mounted or initialData changes.
  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        template: initialData.template,
        serviceType: initialData.serviceType,
        roomNameEn: initialData.roomNameEn,
        roomNameKh: initialData.roomNameKh,
        place: initialData.place,
        owner: initialData.owner,
        status: initialData.status,
        dateRangeOption:
          initialData.startDate && initialData.expiredDate ? 'date' : 'empty',
        dateRange:
          initialData.startDate && initialData.expiredDate
            ? [dayjs(initialData.startDate), dayjs(initialData.expiredDate)]
            : [],
      })
    }
  }, [initialData, form])

  const onCancel = () => {
    setOpen(false)
  }

  const onFinish = (values) => {
    // Transform the date range only if the option is 'date'
    if (
      values.dateRangeOption === 'date' &&
      values.dateRange &&
      values.dateRange.length === 2
    ) {
      values.startDate = values.dateRange[0].format('YYYY-MM-DD')
      values.expiredDate = values.dateRange[1].format('YYYY-MM-DD')
    } else {
      values.startDate = ''
      values.expiredDate = ''
    }
    // Remove the helper field before saving.
    delete values.dateRangeOption

    console.log('Updated values:', values)
    message.success('Service information updated successfully!')
    onCancel() // Close modal after saving.
  }

  return (
    <Modal
      open={open}
      title='Edit Service Information'
      onCancel={onCancel}
      footer={
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Update
          </Button>
        </Form.Item>
      }
      width={800}
    >
      <Card>
        <Form form={form} layout='vertical' onFinish={onFinish}>
          <Row gutter={[8, 16]}>
            {/* New Template and Service Type fields */}
            <Col xs={24} xl={12} sm={12} lg={12} xxl={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Template'
                name='template'
                rules={[
                  { required: true, message: 'Please select a template' },
                ]}
              >
                <Select placeholder='Select a template'>
                  <Select.Option value='template1'>Template 1</Select.Option>
                  <Select.Option value='template2'>Template 2</Select.Option>
                  <Select.Option value='template3'>Template 3</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} xl={12} sm={12} lg={12} xxl={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Service Type'
                name='serviceType'
                rules={[
                  { required: true, message: 'Please select a service type' },
                ]}
              >
                <Select placeholder='Select a service type'>
                  <Select.Option value='ticket'>Ticket</Select.Option>
                  <Select.Option value='room'>Room</Select.Option>
                  <Select.Option value='product'>Product</Select.Option>
                  <Select.Option value='menu'>Menu</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            {/* Existing fields */}
            <Col xs={24} xl={12} sm={12} lg={12} xxl={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Room Name (En)'
                name='roomNameEn'
                rules={[
                  {
                    required: true,
                    message: 'Please enter the room name in English',
                  },
                ]}
              >
                <Input placeholder='Enter room name in English' />
              </Form.Item>
            </Col>
            <Col xs={24} xl={12} sm={12} lg={12} xxl={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Room Name (Kh)'
                name='roomNameKh'
                rules={[
                  {
                    required: true,
                    message: 'Please enter the room name in Khmer',
                  },
                ]}
              >
                <Input placeholder='Enter room name in Khmer' />
              </Form.Item>
            </Col>
            <Col xs={24} xl={12} sm={12} lg={12} xxl={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Place'
                name='place'
                rules={[{ required: true, message: 'Please select a place' }]}
              >
                <Select placeholder='Select a place'>
                  <Select.Option value='Phnom Penh'>Phnom Penh</Select.Option>
                  <Select.Option value='Siem Reap'>Siem Reap</Select.Option>
                  <Select.Option value='Sihanoukville'>
                    Sihanoukville
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} xl={12} sm={12} lg={12} xxl={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Place Owner'
                name='owner'
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col xs={24} xl={12} sm={12} lg={12} xxl={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Status'
                name='status'
                rules={[
                  { required: true, message: 'Please select the status' },
                ]}
              >
                <Select placeholder='Select status'>
                  <Select.Option value='Active'>Active</Select.Option>
                  <Select.Option value='Inactive'>Inactive</Select.Option>
                  <Select.Option value='Expired'>Expired</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                label={
                  <Form.Item name='dateRangeOption' style={{ margin: 0 }}>
                    <Radio.Group>
                      <Radio value='date'>Select Date</Radio>
                      <Radio value='empty'>Empty</Radio>
                    </Radio.Group>
                  </Form.Item>
                }
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.dateRangeOption !== currentValues.dateRangeOption
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue('dateRangeOption') === 'date' ? (
                    <Form.Item
                      style={{ marginBottom: '0px' }}
                      name='dateRange'
                      rules={[
                        {
                          required: true,
                          message: 'Please select the date range',
                        },
                      ]}
                    >
                      <RangePicker style={{ width: '100%' }} />
                    </Form.Item>
                  ) : null
                }
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}
