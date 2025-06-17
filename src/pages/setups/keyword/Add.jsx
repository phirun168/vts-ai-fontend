import React, { useState } from 'react'
import {
  Col,
  Form,
  Input,
  Modal,
  Row,
  Button,
  Card,
  Upload,
  Select,
} from 'antd'
import { CloseOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import ActivityServices from '../../../services/setup/Activity'
import Swal from 'sweetalert2'
const Add = (props) => {
  const { open, setOpen, access_token, getActivity } = props
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const onFinish = async () => {
    setLoading(true)
    try {
      const value = form.getFieldValue()
      const doc = {
        nameEn: value.nameEn,
        nameKh: value.nameKh,
        description: value.description,
      }
      const res = await ActivityServices.createActivity({ access_token, doc })
      if (res) {
        setOpen(false)
        setLoading(false)
        form.resetFields()
        getActivity()
        Swal.fire({
          icon: 'success',
          title: 'Upload Successful!',
          text: 'The information has been add successfully.',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    } catch {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
  }

  return (
    <Modal
      title='Add Keyword'
      open={open}
      width={650}
      centered
      closable={true}
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
            onClick={onFinish}
            loading={loading}
            style={{
              minWidth: '120px',
              borderRadius: '8px',
            }}
          >
            save
          </Button>
        </div>
      }
    >
      <Card>
        <Form form={form} layout='vertical' name='add_keyword'>
          <Row gutter={[8, 2]}>
            <Col xs={24}>
              <Form.Item
                label='Keyword En'
                name='nameEn'
                style={{ marginBottom: '0px' }}
                rules={[
                  {
                    required: true,
                    message: 'field require!',
                  },
                ]}
              >
                <Input placeholder='Enter Keyword En' />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                label='Keyword Kh'
                name='nameKh'
                style={{ marginBottom: '0px' }}
                rules={[
                  {
                    required: true,
                    message: 'field require!',
                  },
                ]}
              >
                <Input placeholder='Enter Keyword Kh' />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default Add
