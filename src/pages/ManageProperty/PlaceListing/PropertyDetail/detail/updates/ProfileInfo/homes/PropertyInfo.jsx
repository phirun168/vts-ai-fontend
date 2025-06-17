import React, { useState } from 'react'
import { Form, Input, Radio, Row, Col, Card } from 'antd'

const { TextArea } = Input
import AddPhone from '../../../../../other/AddPhone'
export default function EditPropertyInfo({ onClose, onSave, initialData }) {
  const [form] = Form.useForm()

  // Example: Default property data
  const [propertyData, setPropertyData] = useState({
    place_id: '',
    place_name_kh: '',
    place_name_en: '',
    ownership: 'Private', // This will be handled by Radio.Group now.
    phone_number: '',
    created_by: '',
    created_at: '',
    star: '',
    // Additional fields if needed:
    description_kh: '',
    description_en: '',
  })

  // Merge with any initialData you pass in
  const mergedData = { ...propertyData, ...(initialData || {}) }

  // Handle form submission
  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values)
        onClose()
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo)
      })
  }

  return (
    <Card>
      <Form
        form={form}
        layout='vertical'
        initialValues={mergedData}
        style={{ maxHeight: '65vh', overflowY: 'auto' }}
      >
        <Row gutter={[16, 16]}>
          {/* Place ID */}
          <Col xs={24} md={12} xl={8}>
            <Form.Item
              style={{ marginBottom: '0px' }}
              label='Place ID'
              name='place_id'
              rules={[{ required: true, message: 'Place ID is required' }]}
            >
              <Input disabled placeholder='place Id' />
            </Form.Item>
          </Col>

          {/* Place Name Khmer */}
          <Col xs={24} md={12} xl={8}>
            <Form.Item
              style={{ marginBottom: '0px' }}
              label='Place Name (KH)'
              name='place_name_kh'
              rules={[
                { required: true, message: 'Khmer place name is required' },
              ]}
            >
              <Input placeholder='Enter place name (Khmer)' />
            </Form.Item>
          </Col>

          {/* Place Name English */}
          <Col xs={24} md={12} xl={8}>
            <Form.Item
              style={{ marginBottom: '0px' }}
              label='Place Name (EN)'
              name='place_name_en'
              rules={[
                { required: true, message: 'English place name is required' },
              ]}
            >
              <Input placeholder='Enter place name (English)' />
            </Form.Item>
          </Col>

          {/* Ownership (Using Radio Group) */}
          <Col xs={24} md={12} xl={8}>
            <Form.Item
              style={{ marginBottom: '0px' }}
              label='Ownership'
              name='ownership'
              rules={[{ required: true, message: 'Ownership is required' }]}
            >
              <Radio.Group>
                <Radio value='Private'>Private</Radio>
                <Radio value='Public'>Public</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          {/* 
          {/* Phone Number */}

          {/* Star (Rating) */}
          <Col xs={24} md={12} xl={8}>
            <Form.Item
              style={{ marginBottom: '0px' }}
              label='Star'
              name='star'
              rules={[{ required: false }]}
            >
              <Input placeholder='enter star' />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <AddPhone />
          </Col>
          {/* Description Khmer */}
          <Col span={24}>
            <Form.Item
              style={{ marginBottom: '0px' }}
              label='Description Khmer'
              name='description_kh'
              rules={[{ required: false }]}
            >
              <TextArea rows={3} placeholder='Enter Khmer description' />
            </Form.Item>
          </Col>

          {/* Description English */}
          <Col span={24}>
            <Form.Item
              style={{ marginBottom: '0px' }}
              label='Description English'
              name='description_en'
              rules={[{ required: false }]}
            >
              <TextArea rows={3} placeholder='Enter English description' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}
