import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Button, Space } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

const EditLinkNameModal = ({ visible, setIsModalVisible, links, onSave }) => {
  const [form] = Form.useForm()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (visible) {
      // Set the form fields with the provided links and reset the search.
      form.setFieldsValue({
        links: links && links.length ? links : [],
      })
      setSearchTerm('')
    }
  }, [visible, links, form])

  const onClose = () => {
    setIsModalVisible(false)
  }

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values.links)
        onClose()
      })
      .catch((info) => {
        console.log('Validation Failed:', info)
      })
  }

  return (
    <Modal
      visible={visible}
      title='Edit All Links'
      onCancel={onClose}
      onOk={handleOk}
    >
      <Input.Search
        placeholder='Search links by name'
        allowClear
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Form form={form} layout='vertical'>
        <Form.List name='links'>
          {(fields, { remove }) => (
            <>
              {fields.map((field, index) => {
                // Get the current value of the link name for filtering.
                const currentLinks = form.getFieldValue('links') || []
                const linkName = currentLinks[field.name]?.name || ''
                if (
                  searchTerm &&
                  !linkName.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return null
                }
                return (
                  <Space
                    key={field.key}
                    align='baseline'
                    style={{ display: 'flex', marginBottom: 8 }}
                  >
                    <Form.Item
                      {...field}
                      label={`Link ${index + 1} Name`}
                      name={[field.name, 'name']}
                      fieldKey={[field.fieldKey, 'name']}
                      rules={[
                        { required: true, message: 'Please enter a name' },
                      ]}
                    >
                      <Input placeholder='Website Name' />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label={`Link ${index + 1} URL`}
                      name={[field.name, 'url']}
                      fieldKey={[field.fieldKey, 'url']}
                      rules={[
                        { required: true, message: 'Please enter a URL' },
                      ]}
                    >
                      <Input placeholder='Website URL' />
                    </Form.Item>
                    {fields.length > 1 && (
                      <Button
                        type='primary'
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => remove(field.name)}
                      />
                    )}
                  </Space>
                )
              })}
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  )
}

export default EditLinkNameModal
