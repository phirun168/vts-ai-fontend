import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  Modal,
  Radio,
  message,
  Row,
  Col,
  Card,
  Alert,
} from 'antd'
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'

// Changed to <span> with display:block so that if any parent uses <p>,
// we won't violate HTML nesting rules
const noneEditElement = (info) => {
  return (
    <span
      style={{
        display: 'block',
        borderBottom: '1px solid #d9d9d9',
      }}
      className='rounded py-1 font-medium text-gray-500'
    >
      {info}
    </span>
  )
}

const SecuritySettings = () => {
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [isEditingPhone, setIsEditingPhone] = useState(false)

  const [form] = Form.useForm()

  const handleSubmit = (values) => {
    console.log('Security Settings:', values)
    // You can do further processing here, e.g., API calls to update email/phone
  }

  const handlePasswordChange = (values) => {
    console.log('Password Changed:', values)
    setIsPasswordModalVisible(false)
  }

  const handleAccountDeletion = (values) => {
    console.log('Account Deletion Requested:', values)
    message.success(
      'Your account deletion request has been submitted. You can restore your account within 30 days.'
    )
    setIsDeleteModalVisible(false)
  }

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      initialValues={{
        email: 'kalansomnak12@gmail.com',
        phone: '*******',
      }}
    >
      <div className='p-4 bg-gray-50 rounded-lg shadow-md'>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card
              title='Email'
              extra={
                isEditingEmail ? (
                  <>
                    <Button onClick={() => setIsEditingEmail(false)}>
                      Cancel
                    </Button>
                    <Button
                      className='mx-1'
                      type='primary'
                      onClick={() => {
                        // Validate and then "save"
                        form.validateFields(['email']).then(() => {
                          setIsEditingEmail(false)
                        })
                      }}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditingEmail(true)}
                    icon={<EditOutlined />}
                  />
                )
              }
              bordered={false}
              className='shadow-sm'
            >
              <Form.Item
                name='email'
                rules={[
                  { type: 'email', message: 'Please enter a valid email!' },
                ]}
              >
                {isEditingEmail ? (
                  <Input placeholder='Enter your email' />
                ) : (
                  noneEditElement(form.getFieldValue('email'))
                )}
              </Form.Item>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card
              title='Phone Number'
              extra={
                isEditingPhone ? (
                  <>
                    <Button onClick={() => setIsEditingPhone(false)}>
                      Cancel
                    </Button>
                    <Button
                      className='mx-1'
                      type='primary'
                      onClick={() => {
                        // Validate and then "save"
                        form.validateFields(['phone']).then(() => {
                          setIsEditingPhone(false)
                        })
                      }}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditingPhone(true)}
                    icon={<EditOutlined />}
                  />
                )
              }
              bordered={false}
              className='shadow-sm'
            >
              <Form.Item
                name='phone'
                rules={[
                  {
                    pattern: /^\d{10,15}$/,
                    message: 'Enter a valid phone number!',
                  },
                ]}
              >
                {isEditingPhone ? (
                  <Input placeholder='Enter your phone number' />
                ) : (
                  noneEditElement(form.getFieldValue('phone'))
                )}
              </Form.Item>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card
              title='Change Password'
              extra={
                <Button
                  onClick={() => setIsPasswordModalVisible(true)}
                  icon={<EditOutlined />}
                />
              }
              bordered={false}
              className='shadow-sm'
            >
              {noneEditElement('********')}
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card
              title='Delete Account'
              extra={
                <Button
                  icon={<DeleteOutlined style={{ color: 'red' }} />}
                  onClick={() => setIsDeleteModalVisible(true)}
                />
              }
              bordered={false}
              className='shadow-sm'
            >
              {noneEditElement('available')}
            </Card>
          </Col>
        </Row>
      </div>

      {/* Change Password Modal */}
      <Modal open={isPasswordModalVisible} closable={false} footer={null}>
        <Card
          title='Change Password'
          extra={
            <CloseOutlined
              style={{ fontSize: '18px', color: 'red', cursor: 'pointer' }}
              onClick={() => setIsPasswordModalVisible(false)}
            />
          }
        >
          <Form layout='vertical' onFinish={handlePasswordChange}>
            <Form.Item
              label='Current Password'
              name='currentPassword'
              rules={[{ required: true, message: 'Field required!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label='New Password'
              name='newPassword'
              rules={[{ required: true, message: 'Field required!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label='Confirm New Password'
              name='confirmPassword'
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Field required!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('Passwords do not match!'))
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' block>
                Save Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        title='Delete Account'
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={null}
      >
        <Alert
          description='You will have 30 days to restore your account after deletion.'
          type='error'
          showIcon
          icon={<ExclamationCircleOutlined />}
        />
        <Form layout='vertical' onFinish={handleAccountDeletion}>
          <Form.Item
            label='Reason'
            name='deleteReason'
            rules={[{ required: true, message: 'Field required!' }]}
          >
            <Radio.Group>
              <Radio value='privacy'>Secure issue about privacy</Radio>
              <Radio value='usability'>There is Another Account</Radio>
              <Radio value='other'>Nothing</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' danger block>
              Confirm Deletion
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Form>
  )
}

export default SecuritySettings
