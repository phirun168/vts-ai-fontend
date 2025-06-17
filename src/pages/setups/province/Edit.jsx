import React, { useContext, useState } from 'react'
import { Col, Form, Modal, Row, Button, Card } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import UploadForm from './Upload' // Import your Upload component
import './Province.css'
import ProvinceServices from '../../../services/setup/Province'
import { AuthContext } from '../../../contexts/AuthContext'
import Swal from 'sweetalert2'

const EditProvince = ({ open, setOpen, id, getProvinceById }) => {
  const [form] = Form.useForm()
  const { access_token } = useContext(AuthContext)
  const [btnLoading, setBtnLoading] = useState(false)
  const [fileList, setFileList] = useState([])
  const onFinish = async () => {
    try {
      const values = await form.validateFields()
      const fileList = values.image || []
      const images = fileList
        .filter((file) => file.type?.startsWith('image'))
        .map((file) => file.originFileObj)

      const videos = fileList
        .filter((file) => file.type?.startsWith('video'))
        .map((file) => file.originFileObj)
      const formData = new FormData()
      formData.append('_id', id)
      images.forEach((image) => {
        formData.append('images', image)
      })

      videos.forEach((video) => {
        formData.append('videos', video)
      })

      //
      setBtnLoading(true)
      const res = await ProvinceServices.UpdateProvince({
        access_token,
        doc: formData,
      })
      if (res) {
        form.resetFields()
        setOpen(false)
        setBtnLoading(false)
        getProvinceById(id)
        setFileList([])
        Swal.fire({
          icon: 'success',
          title: 'Upload Successful!',
          text: 'The information has been updated successfully.',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed!',
        text: 'Something went wrong while updating .',
        timer: 1500,
      })
    }
  }

  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
  }

  return (
    <Modal
      title='Edit Province'
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
            loading={btnLoading}
            style={{
              minWidth: '120px',
              borderRadius: '8px',
            }}
          >
            Update
          </Button>
        </div>
      }
    >
      <Card>
        <Form form={form} layout='vertical' name='edit_province'>
          <Row gutter={[8, 2]}>
            <Col xs={24} className='text-center'>
              <UploadForm
                form={form}
                fileList={fileList}
                setFileList={setFileList}
              />
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}
export default EditProvince
