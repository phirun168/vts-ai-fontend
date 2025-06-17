// EditCategoryAndLinks.jsx
import React from 'react'
import { Form, Input, Select, Card, Row, Col } from 'antd'

const { TextArea } = Input
const { Option } = Select
import AddWebsiteSocial from '../../../../../other/AddWebsiteSocial'
import AddReference from '../../../../../other/AddReference'
export default function EditCategoryAndLinks({ form, initialData }) {
  // A default object if you have nothing from parent
  const defaultData = {
    website_links: '',
    main_category: [],
    sub_category: [],
    keyword: [],
    activity: [],
  }

  // Merge with any passed initialData
  const mergedData = { ...defaultData, ...(initialData || {}) }

  return (
    <Card>
      <Form
        form={form}
        layout='vertical'
        initialValues={mergedData}
        style={{ maxHeight: '65vh', overflowY: 'auto' }}
      >
        <Row gutter={[16, 16]}>
          {/* Website / Social Media link */}

          {/* Main Category */}
          <Col xs={24} md={12}>
            <Form.Item
              label='Main Category'
              name='main_category'
              rules={[{ required: false }]}
              style={{ marginBottom: '0px' }}
            >
              <Select
                mode='multiple'
                placeholder='Select main categories'
                allowClear
              >
                <Option value='Accommodation'>Accommodation</Option>
                <Option value='Eatery'>Eatery</Option>
                <Option value='Restaurants'>Restaurants</Option>
                <Option value='Other'>Other</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Sub Category */}
          <Col xs={24} md={12}>
            <Form.Item
              label='Sub Category'
              name='sub_category'
              rules={[{ required: false }]}
              style={{ marginBottom: '0px' }}
            >
              <Select
                mode='multiple'
                placeholder='Select sub categories'
                allowClear
              >
                <Option value='Hotel'>Hotel</Option>
                <Option value='Resort'>Resort</Option>
                <Option value='Villa'>Villa</Option>
                <Option value='Guesthouse'>Guesthouse</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Keyword */}
          <Col xs={24} md={12}>
            <Form.Item
              label='Keyword'
              name='keyword'
              rules={[{ required: false }]}
              style={{ marginBottom: '0px' }}
            >
              <Select mode='multiple' placeholder='Select keywords' allowClear>
                <Option value='Swimming'>Swimming</Option>
                <Option value='Hiking'>Hiking</Option>
                <Option value='Cycling'>Cycling</Option>
                <Option value='Kayaking'>Kayaking</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Activity */}
          <Col xs={24} md={12}>
            <Form.Item
              label='Activity'
              name='activity'
              rules={[{ required: false }]}
              style={{ marginBottom: '0px' }}
            >
              <Select
                mode='multiple'
                placeholder='Select activities'
                allowClear
              >
                <Option value='Swimming'>Swimming</Option>
                <Option value='Hiking'>Hiking</Option>
                <Option value='Cycling'>Cycling</Option>
                <Option value='Kayaking'>Kayaking</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <AddWebsiteSocial />
          </Col>
          <Col span={24}>
            <AddReference />
          </Col>
        </Row>
      </Form>
    </Card>
  )
}
