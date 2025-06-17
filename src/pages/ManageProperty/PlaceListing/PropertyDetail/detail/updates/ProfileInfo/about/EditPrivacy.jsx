import React, { useState } from 'react'
import { Form, Select, Button, List, Row, Col } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

const predefinedPrivacyOptions = [
  'Public',
  'Private',
  'Friends Only',
  'Only Me',
  'Custom',
  'Restricted',
  'Hidden from Specific Users',
  'Visible to Followers',
]

const EditPrivacy = ({ onClose }) => {
  const [form] = Form.useForm()
  const [selectedPrivacyOptions, setSelectedPrivacyOptions] = useState([
    'Public',
    'Private',
  ])

  // Handle selection of a new privacy option
  const handleSelectPrivacy = (value) => {
    if (!selectedPrivacyOptions.includes(value)) {
      setSelectedPrivacyOptions([value, ...selectedPrivacyOptions]) // Add selected privacy setting at the top
    }
  }

  // Remove a privacy option
  const handleDeletePrivacy = (index) => {
    setSelectedPrivacyOptions(
      selectedPrivacyOptions.filter((_, i) => i !== index)
    )
  }

  return (
    <Form form={form} layout='vertical'>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item>
            <Select
              showSearch
              placeholder='Search & select Privacy'
              style={{ width: '100%' }}
              onSelect={handleSelectPrivacy} // Auto-add on selection
              options={predefinedPrivacyOptions.map((option) => ({
                value: option,
                label: option,
                disabled: selectedPrivacyOptions.includes(option), // Disable if already selected
              }))}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Col>
      </Row>

      {/* List of selected privacy options */}
      <List
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
        }}
        bordered
        dataSource={selectedPrivacyOptions}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type='text'
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeletePrivacy(index)}
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

export default EditPrivacy
