import { EditOutlined } from '@ant-design/icons'
import { Col, Row, Statistic, Button, Input, Modal, Form } from 'antd'
import React, { useState } from 'react'

const Information = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [data, setData] = useState([
    { id: 1, title: 'Username', value: 'Somnak' },
    { id: 2, title: 'First Name', value: 'Somnak' },
    { id: 3, title: 'Last Name', value: 'Kalan' },
    { id: 4, title: 'Gender', value: 'Male' },
    { id: 5, title: 'Date of Birth', value: '2003-07-09' },
    { id: 6, title: 'Province', value: 'Ratanakiri' },
    { id: 7, title: 'Created By', value: 'Admin' },
    { id: 8, title: 'Created At', value: '2025-01-17' },
  ])

  const [form] = Form.useForm()
  const handleEdit = () => {
    form.setFieldsValue(
      data.reduce((acc, item) => {
        acc[item.title] = item.value
        return acc
      }, {})
    )
    setIsEditing(true)
  }

  const handleSave = () => {
    form.validateFields().then((values) => {
      const updatedData = data.map((item) => ({
        ...item,
        value: values[item.title],
      }))
      setData(updatedData)
      setIsEditing(false)
    })
  }

  return (
    <div>
      <Button
        className='mx-1 mb-2'
        icon={<EditOutlined style={{ color: 'blue' }} />}
        onClick={handleEdit}
      ></Button>

      <Row gutter={[8, 2]}>
        {data.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <div className='bg-gray-100 rounded-lg mx-1 my-1 px-2 py-2 shadow-sm transition-transform transform duration-300 ease-in-out hover:scale-105'>
              <Statistic
                title={
                  <span className='font-bold text-gray-500'>{item.title}</span>
                }
                value={item.value}
                valueStyle={{ fontSize: '14px' }}
                className='font-medium'
              />
            </div>
          </Col>
        ))}
      </Row>

      <Modal
        title='Edit Information'
        open={isEditing}
        width={660}
        onOk={handleSave}
        onCancel={() => setIsEditing(false)}
        okText='Save'
        cancelText='Cancel'
      >
        <Form form={form} layout='vertical'>
          <Row gutter={[8, 2]}>
            {data.map((item, index) => (
              <Col key={index} xs={12}>
                <Form.Item
                  key={index}
                  label={item.title}
                  name={item.title}
                  initialValue={item.value}
                >
                  <Input />
                </Form.Item>
              </Col>
            ))}
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default Information
