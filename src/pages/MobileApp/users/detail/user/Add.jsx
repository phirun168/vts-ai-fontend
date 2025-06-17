import React from 'react'
import { Modal, Form, Select, Card } from 'antd'
import Swal from 'sweetalert2'

const { Option } = Select

export default function Add(props) {
  const { open, setOpen, confirmSwal } = props
  const [form] = Form.useForm()

  // Sample options – replace these with real data as needed
  const storeOptions = [
    { value: 'store1', label: 'Store 1' },
    { value: 'store2', label: 'Store 2' },
    { value: 'store3', label: 'Store 3' },
  ]

  const userOptions = [
    { value: 'user1', label: 'User 1' },
    { value: 'user2', label: 'User 2' },
    { value: 'user3', label: 'User 3' },
  ]

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields()
        confirmSwal({
          title: 'Success!',
          text: 'User has been created successfully.',
          icon: 'success',
        })
        setOpen(false)
      })
      .catch((info) => {
        confirmSwal({
          title: 'Error!',
          text: 'User has been created unsuccess.',
          icon: 'error',
        })
      })
  }

  const onCancel = () => {
    setOpen(false)
  }

  return (
    <Modal
      title='Add User'
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText='Save'
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <Card>
        <Form form={form} layout='vertical'>
          <Form.Item
            name='store'
            label='Store'
            rules={[
              { required: true, message: 'Please select at least one store!' },
            ]}
          >
            <Select placeholder='Select one or more stores' mode='multiple'>
              {storeOptions.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name='user'
            label='User'
            rules={[
              { required: true, message: 'Please select at least one user!' },
            ]}
          >
            <Select placeholder='Select one or more users' mode='multiple'>
              {userOptions.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  )
}
