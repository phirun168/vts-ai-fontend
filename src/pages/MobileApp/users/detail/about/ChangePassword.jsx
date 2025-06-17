import React from 'react'
import { Form, Input, Button } from 'antd'

const ChangePassword = () => {
  const handlePasswordChange = (values) => {
    console.log('Password Change:', values)
  }

  return (
    <Form layout='vertical' onFinish={handlePasswordChange}>
      <Form.Item
        label='Current Password'
        name='currentPassword'
        rules={[
          { required: true, message: 'Please input your current password!' },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label='New Password'
        name='newPassword'
        rules={[{ required: true, message: 'Please input your new password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label='Confirm New Password'
        name='confirmPassword'
        dependencies={['newPassword']}
        rules={[
          { required: true, message: 'Please confirm your new password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error('The two passwords do not match!')
              )
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Change Password
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ChangePassword
