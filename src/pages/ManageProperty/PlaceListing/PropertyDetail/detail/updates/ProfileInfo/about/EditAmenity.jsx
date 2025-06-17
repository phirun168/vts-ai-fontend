import React, { useState } from 'react'
import { Form, Select, Button, List, Row, Col } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

const predefinedAmenities = [
  'Free Wi-Fi',
  '24/7 Support',
  'Air Conditioning',
  'Secure Rooms',
  'Swimming Pool',
  'Gym Access',
  'Breakfast Included',
  'Parking Available',
  'Laundry Service',
  'Pet-Friendly',
]

const EditAmenity = ({ onClose }) => {
  const [form] = Form.useForm()
  const [amenities, setAmenities] = useState([
    'Free Wi-Fi',
    '24/7 Support',
    'Air Conditioning',
    'Secure Rooms',
  ])

  // Handle selection of a new amenity
  const handleSelectAmenity = (value) => {
    if (!amenities.includes(value)) {
      setAmenities([value, ...amenities]) // Add selected amenity at the top
    }
  }

  // Remove an amenity
  const handleDeleteAmenity = (index) => {
    setAmenities(amenities.filter((_, i) => i !== index))
  }

  return (
    <Form form={form} layout='vertical'>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item>
            <Select
              showSearch
              placeholder='Search & select an amenity'
              style={{ width: '100%' }}
              onSelect={handleSelectAmenity} // Auto-add on selection
              options={predefinedAmenities.map((amenity) => ({
                value: amenity,
                label: amenity,
                disabled: amenities.includes(amenity), // Disable if already selected
              }))}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Col>
      </Row>

      {/* List of selected amenities */}
      <List
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
        }}
        bordered
        dataSource={amenities}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type='text'
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteAmenity(index)}
              />,
            ]}
          >
            {item}
          </List.Item>
        )}
      />

      {/* Save & Close Button */}
      <div className='flex justify-end mt-4'>
        <Button type='primary' onClick={onClose}>
          update
        </Button>
      </div>
    </Form>
  )
}

export default EditAmenity
