import { Col, Form, Input, Modal, Row, Button, Card, Select } from 'antd'
import UploadMultiple from './UploadMultiple'
const Edit = (props) => {
  const { open, setOpen } = props
  const [form] = Form.useForm()

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Form Values:', values)
        setOpen(false)
        form.resetFields()
      })
      .catch((info) => {
        console.log('Validation Failed:', info)
      })
  }

  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
  }

  return (
    <Modal
      title='Edit Additional Service'
      open={open}
      width={800}
      centered
      closable={true}
      onCancel={handleCancel}
      footer={
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
        >
          <Button
            type='primary'
            onClick={handleOk}
            style={{ minWidth: '120px', borderRadius: '8px' }}
          >
            Update
          </Button>
        </div>
      }
    >
      <Card>
        <Form
          form={form}
          layout='vertical'
          name='edit_service'
          initialValues={{
            status: 'Active', // default status
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item name='image' style={{ marginBottom: '0px' }}>
                <UploadMultiple />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label='Service Name (EN)'
                name='service_name_en'
                style={{ marginBottom: '0px' }}
                rules={[
                  { required: true, message: 'Please enter service name (EN)' },
                ]}
              >
                <Input placeholder='Enter service name in English' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label='Service Name (KH)'
                name='service_name_kh'
                style={{ marginBottom: '0px' }}
                rules={[
                  { required: true, message: 'Please enter service name (KH)' },
                ]}
              >
                <Input placeholder='Enter service name in Khmer' />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label='Place'
                name='place'
                style={{ marginBottom: '0px' }}
                rules={[{ required: true, message: 'Please select a place' }]}
              >
                <Select placeholder='Select place'>
                  <Select.Option value='Place1'>Place1</Select.Option>
                  <Select.Option value='Place2'>Place2</Select.Option>
                  <Select.Option value='Place3'>Place3</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label='Place Owner'
                name='place'
                style={{ marginBottom: '0px' }}
                rules={[{ required: true, message: 'Please select a place' }]}
              >
                <Select placeholder='Select place' disabled>
                  <Select.Option value='Place1'>Place1</Select.Option>
                  <Select.Option value='Place2'>Place2</Select.Option>
                  <Select.Option value='Place3'>Place3</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label='Status'
                name='status'
                style={{ marginBottom: '0px' }}
                rules={[{ required: true, message: 'Please select a status' }]}
              >
                <Select placeholder='Select status'>
                  <Select.Option value='Active'>Active</Select.Option>
                  <Select.Option value='Inactive'>Inactive</Select.Option>
                  <Select.Option value='Expired'>Expired</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default Edit
