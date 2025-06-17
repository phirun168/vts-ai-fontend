import React, { useEffect, useState } from 'react'
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
import TextArea from 'antd/es/input/TextArea'
import { CloseOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2'
import ActivityServices from '../../../../services/setup/Activity'
const EditActivity = (props) => {
  const { open, setOpen, access_token, propData } = props
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [activity, setActivity] = useState()
  const onFinish = async () => {
    setLoading(true)
    try {
      const value = form.getFieldValue()
      const doc = {
        _id: value._id,
        nameEn: value.nameEn,
        nameKh: value.nameKh,
        description: value.description,
      }
      const res = await ActivityServices.updateActivity({ access_token, doc })
      if (res) {
        setOpen(false)
        setLoading(false)
        form.resetFields()

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

  //
  const getActivityById = async (id) => {
    try {
      const doc = { _id: id }
      const res = await ActivityServices.fetchActivityById({
        access_token,
        doc,
      })
      if (res) {
        setActivity(res)
      }
    } catch {}
  }
  useEffect(() => {
    getActivityById(propData?._id)
  }, [propData])
  //
  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
  }
  useEffect(() => {
    form.setFieldsValue({
      _id: activity?._id,
      nameEn: activity?.nameEn,
      nameKh: activity?.nameKh,
      description: activity?.description,
    })
  }, [activity])
  return (
    <Modal
      title='Edit Activity'
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
            update
          </Button>
        </div>
      }
    >
      <Card>
        <Form form={form} layout='vertical' name='edit_activity'>
          <Form.Item hidden name='_id'>
            <Input />
          </Form.Item>
          <Row gutter={[8, 2]}>
            <Col xs={24}>
              <Form.Item
                label='Activity En'
                name='nameEn'
                style={{ marginBottom: '0px' }}
                rules={[
                  {
                    required: true,
                    message: 'field require!',
                  },
                ]}
              >
                <Input placeholder='Enter activity en' />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                label='Activity Kh'
                name='nameKh'
                style={{ marginBottom: '0px' }}
                rules={[
                  {
                    required: true,
                    message: 'field require!',
                  },
                ]}
              >
                <Input placeholder='Enter activity kh' />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label='Description' name='description'>
                <TextArea rows={4} placeholder='Enter description' />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default EditActivity
