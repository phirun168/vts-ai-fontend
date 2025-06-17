import { Input, InputNumber, Form } from 'antd'
import React from 'react'

export default function FormData(props) {
  const { form } = props
  return (
    <div>
      {' '}
      <Form form={form} layout='vertical'>
        <Form.Item
          name='name'
          label='Name'
          rules={[{ required: true, message: 'Please input a name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='age'
          label='Age'
          rules={[{ required: true, type: 'number', min: 0 }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name='address' label='Address' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name='tags' label='Tags (comma‑separated)'>
          <Input placeholder='developer, nice' />
        </Form.Item>
      </Form>
    </div>
  )
}
