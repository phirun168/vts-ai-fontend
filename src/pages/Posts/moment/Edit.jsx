import React from 'react'
import { Col, Form, Input, Modal, Row, Button, Card, Select, Radio } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import TextEditor from '/src/components/config/TextEditor'
import UploadForm from './Upload'

const EditMoment = ({ open, setOpen }) => {
  const [form] = Form.useForm()

  // Called when user clicks "Save"
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

  // Called when user closes/cancels the Modal
  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
  }

  // Watch the "choose_option" field to know which option is selected
  const currentOption = Form.useWatch('choose_option', form)

  return (
    <Modal
      open={open}
      width={650}
      centered
      closable={false}
      onCancel={handleCancel}
      footer={
        <div
          style={{
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
          }}
        >
          <Button
            type='primary'
            onClick={handleOk}
            style={{
              minWidth: '120px',
              borderRadius: '8px',
            }}
          >
            update
          </Button>
        </div>
      }
    >
      <Card
        title='Edit Moment'
        extra={
          <CloseOutlined
            style={{
              fontSize: '18px',
              color: 'red',
              cursor: 'pointer',
            }}
            onClick={handleCancel}
          />
        }
      >
        <Form
          form={form}
          layout='vertical'
          name='edit_moment'
          initialValues={{
            choose_option: 'Location', // Default
            type: 'normal', // Default
            status: 'Active', // Default
          }}
        >
          <Row gutter={[8, 2]}>
            {/* Upload */}
            <Col xs={24} sm={24}>
              <Form.Item
                label='Upload'
                name='upload'
                style={{ marginBottom: '0px' }}
              >
                <UploadForm />
              </Form.Item>
            </Col>

            {/* Moment Name */}
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item
                label='Moment Name'
                name='moment_name'
                style={{ marginBottom: '0px' }}
                rules={[
                  { required: true, message: 'Please input a moment name!' },
                ]}
              >
                <Input placeholder='Enter moment name' />
              </Form.Item>
            </Col>

            {/* Choose Option */}
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item
                label='Choose Option'
                name='choose_option'
                style={{ marginBottom: '0px' }}
                rules={[
                  { required: true, message: 'Please select an option!' },
                ]}
              >
                <Radio.Group className='xs:block sm:flex'>
                  <Radio value='Location'>Location</Radio>
                  <Radio value='Province'>Province</Radio>
                  <Radio value='Category'>Category</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* Province (conditional) */}
            {currentOption === 'Province' && (
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item
                  label='Province'
                  name='province'
                  style={{ marginBottom: '0px' }}
                  rules={[
                    { required: true, message: 'Please select a province!' },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder='Select a province'
                    options={[
                      { value: 'Phnom Penh', label: 'Phnom Penh' },
                      { value: 'Siem Reap', label: 'Siem Reap' },
                      { value: 'Battambang', label: 'Battambang' },
                    ]}
                  />
                </Form.Item>
              </Col>
            )}

            {/* Category (conditional) */}
            {currentOption === 'Category' && (
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item
                  label='Category'
                  name='category'
                  style={{ marginBottom: '0px' }}
                  rules={[
                    { required: true, message: 'Please select a category!' },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder='Select a category'
                    options={[
                      { value: 'Food', label: 'Food' },
                      { value: 'Travel', label: 'Travel' },
                      { value: 'Fashion', label: 'Fashion' },
                    ]}
                  />
                </Form.Item>
              </Col>
            )}

            {/* Location (conditional) */}
            {currentOption === 'Location' && (
              <>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item
                    label='Location'
                    name='location'
                    style={{ marginBottom: '0px' }}
                    rules={[
                      { required: true, message: 'Please select a location!' },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder='Select a location'
                      options={[
                        { value: 'Angkor Wat', label: 'Angkor Wat' },
                        { value: 'Royal Palace', label: 'Royal Palace' },
                        { value: 'Central Market', label: 'Central Market' },
                      ]}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item
                    label='Location Owner'
                    name='location_owner'
                    style={{ marginBottom: '0px' }}
                  >
                    <Select
                      showSearch
                      placeholder='Select an owner'
                      options={[
                        { value: 'Admin', label: 'Admin' },
                        { value: 'Owner1', label: 'Owner1' },
                        { value: 'Owner2', label: 'Owner2' },
                      ]}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item
                    label='Map'
                    name='map'
                    style={{ marginBottom: '0px' }}
                  >
                    <Input placeholder='Enter map URL or details' />
                  </Form.Item>
                </Col>
              </>
            )}

            {/* Hashtags */}
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item
                label='Hashtags'
                name='hashtags'
                style={{ marginBottom: '0px' }}
              >
                <Select
                  showSearch
                  placeholder='Select hashtags'
                  optionFilterProp='label'
                  mode='multiple'
                  allowClear
                  options={[
                    { value: 'Angkor Wat', label: 'Angkor Wat' },
                    { value: 'Phnom Penh', label: 'Phnom Penh' },
                    { value: 'Phnom Penh1', label: 'Phnom Penh1' },
                    { value: 'Phnom Penh2', label: 'Phnom Penh2' },
                    { value: 'Phnom Penh3', label: 'Phnom Penh3' },
                  ]}
                />
              </Form.Item>
            </Col>

            {/* Type */}
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item
                label='Type'
                name='type'
                style={{ marginBottom: '0px' }}
                rules={[{ required: true, message: 'Please select a type!' }]}
              >
                <Radio.Group>
                  <Radio value='new_feed'>New Feed</Radio>
                  <Radio value='normal'>Normal</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* Status */}
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item
                label='Status'
                name='status'
                style={{ marginBottom: '0px' }}
                rules={[{ required: true, message: 'Please select a status!' }]}
              >
                <Select placeholder='Select status'>
                  <Select.Option value='Active'>Active</Select.Option>
                  <Select.Option value='Inactive'>Inactive</Select.Option>
                  <Select.Option value='Expire'>Expire</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            {/* Description */}
            <Col xs={24} sm={24}>
              <Form.Item
                label='Description'
                name='description'
                style={{ marginBottom: '0px' }}
              >
                <TextEditor />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default EditMoment
