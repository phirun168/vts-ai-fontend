import React, { useState } from 'react'
import { Card, Button, Row, Col, Modal, Form, Input, Select } from 'antd'
import {
  EyeOutlined,
  DeleteOutlined,
  CrownOutlined,
  UserAddOutlined,
} from '@ant-design/icons'

const availableNames = [
  { value: 'Jane Smith', label: 'Jane Smith' },
  { value: 'John Doe', label: 'John Doe' },
  { value: 'Alice Brown', label: 'Alice Brown' },
  { value: 'Sam Johnson', label: 'Sam Johnson' },
]

const initialUsers = [
  {
    id: 1,
    name: 'Jane Smith',
    role: 'Owner', // Owner of this place with extra privileges
    createdAt: '2023-09-15',
    addedBy: 'System',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 2,
    name: 'John Doe',
    role: 'Admin', // A user added by the owner to manage the place
    createdAt: '2023-10-01',
    addedBy: 'Jane Smith',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
]

export default function User() {
  // Use state so that added users can be tracked.
  const [userList, setUserList] = useState(initialUsers)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      // values.name is now an array of selected names.
      const newUsers = values.name.map((selectedName) => ({
        id: userList.length + Math.floor(Math.random() * 1000), // simple unique id generator
        name: selectedName,
        role: values.role,
        createdAt: new Date().toISOString().split('T')[0],
        addedBy: 'Owner', // Assume current user is the owner
        // Default image for new users
        image: 'https://randomuser.me/api/portraits/lego/1.jpg',
      }))
      setUserList([...userList, ...newUsers])
      setIsModalVisible(false)
      form.resetFields()
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleRemove = (id) => {
    setUserList(userList.filter((user) => user.id !== id))
  }

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button type='primary' icon={<UserAddOutlined />} onClick={showModal}>
          Add User
        </Button>
      </div>
      <Modal
        title='Add User'
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText=''
        okText='Add'
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Card>
          <Form form={form} layout='vertical'>
            <Form.Item
              name='name'
              label='Name'
              rules={[
                { required: true, message: 'Please select at least one name' },
              ]}
            >
              <Select
                mode='multiple'
                options={availableNames}
                placeholder='Select user(s)'
              />
            </Form.Item>
            <Form.Item
              name='role'
              label='Role'
              rules={[{ required: true, message: 'Please select role' }]}
            >
              <Select placeholder='Select role'>
                <Select.Option value='Admin'>Admin</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Card>
      </Modal>

      <Row gutter={[16, 16]}>
        {userList.map((user) => (
          <Col key={user.id} xs={24} sm={12} lg={12} xl={6} xxl={5}>
            <Card
              hoverable
              cover={
                <div style={{ position: 'relative' }}>
                  <img
                    alt={user.name}
                    src={user.image}
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      width: '100%',
                    }}
                  />
                  {user.role === 'Owner' && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        backgroundColor: '#fadb14',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        color: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 'bold',
                      }}
                    >
                      <CrownOutlined
                        style={{ color: '#faad14', marginRight: 5 }}
                      />
                      Owner
                    </div>
                  )}
                  {user.role === 'Admin' && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        backgroundColor: '#1890ff',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        color: '#fff',
                        fontWeight: 'bold',
                      }}
                    >
                      Admin
                    </div>
                  )}
                </div>
              }
              actions={[
                <Button type='link' icon={<EyeOutlined />} key='view'>
                  View
                </Button>,
                <Button
                  type='link'
                  danger
                  icon={<DeleteOutlined />}
                  key='remove'
                  onClick={() => handleRemove(user.id)}
                >
                  Remove
                </Button>,
              ]}
            >
              <Card.Meta
                title={user.name}
                description={
                  <>
                    <p>Role: {user.role}</p>
                    <p>Created At: {user.createdAt}</p>
                    <p>Added By: {user.addedBy}</p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}
