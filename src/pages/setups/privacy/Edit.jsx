import { CloseOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Upload,
} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import PrivacyServices from '../../../services/setup/Privacy'
const EditPrivacy = (props) => {
  const { open, setOpen, groupType, access_token, propData, getFileImage } =
    props
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const [fileList, setFileList] = useState([])
  //
  const [privacy, setPrivacy] = useState()

  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
    setImageUrl(null)
    setFileList([])
  }

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)

    const latestFile = newFileList[newFileList.length - 1]
    if (latestFile?.originFileObj) {
      getBase64(latestFile.originFileObj, (url) => setImageUrl(url))
    } else {
      setImageUrl(null)
    }
  }
  const getPrivacyById = async (id) => {
    try {
      const doc = { _id: id }
      const res = await PrivacyServices.fetchPrivacyById({ access_token, doc })
      if (res) {
        setPrivacy(res)
      }
    } catch {}
  }
  const onFinish = async () => {
    setLoading(true)
    try {
      const values = await form.validateFields()
      const formData = new FormData()
      formData.append('_id', values._id)
      formData.append('nameEn', values.nameEn)
      formData.append('nameKh', values.nameKh)
      formData.append('groupId', values.groupId)
      formData.append('description', values.description)
      if (fileList.length > 0) {
        formData.append('file', fileList[0].originFileObj)
      }
      const res = await PrivacyServices.updatePrivacy({
        access_token,
        doc: formData,
      })
      if (res) {
        setOpen(false)
        form.resetFields()
        setFileList([])
        setImageUrl(null)
        Swal.fire({
          icon: 'success',
          title: 'Upload Successful!',
          text: 'The information has been update successfully.',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    } catch (error) {
      console.log(error, 'errro')

      Swal.fire({
        icon: 'error',
        title: 'Update Failed!',
        text: 'Something went wrong while update.',
        timer: 1500,
      })
    } finally {
      setLoading(false)
    }
  }
  //
  useEffect(() => {
    getPrivacyById(propData?._id)
  }, [propData])

  useEffect(() => {
    form.setFieldsValue({
      _id: privacy?._id,
      nameEn: privacy?.nameEn,
      nameKh: privacy?.nameKh,
      groupId: privacy?.groupId,
      description: privacy?.description,
    })
    if (privacy?.filePath) {
      setImageUrl(getFileImage(privacy?.filePath) + '/large-' + privacy?.image)
    }
  }, [privacy])
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <Modal
      title='Edit Privacy'
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
            style={{ minWidth: '120px', borderRadius: '8px' }}
          >
            Save
          </Button>
        </div>
      }
    >
      <Card>
        <Form form={form} layout='vertical' name='edit_privacy'>
          <Form.Item hidden name='_id'>
            <Input />
          </Form.Item>
          <Row gutter={[8, 2]}>
            <Col
              xs={24}
              sm={5}
              style={{ marginTop: '20px' }}
              className='flex justify-center my-2'
            >
              <Form.Item name='file'>
                <Upload
                  name='avatar'
                  listType='picture-card'
                  className='avatar-uploader'
                  showUploadList={false}
                  fileList={fileList}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt='avatar'
                      className='object-cover'
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} sm={19}>
              <Form.Item
                label='Privacy Name (En)'
                name='nameEn'
                style={{ marginBottom: '0px' }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter the privacy name (En)!',
                  },
                ]}
              >
                <Input placeholder='Enter privacy name (En)' />
              </Form.Item>
              <Form.Item
                label='Privacy Name (Kh)'
                name='nameKh'
                style={{ marginBottom: '0px' }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter the privacy name (Kh)!',
                  },
                ]}
              >
                <Input placeholder='Enter privacy name (Kh)' />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                label='Group Type'
                name='groupId'
                style={{ marginBottom: '0px' }}
                rules={[{ required: true, message: 'Group type is required!' }]}
              >
                <Select
                  showSearch
                  placeholder='Select a group type'
                  allowClear
                  options={groupType?.map((type) => ({
                    label: `${type?.nameEn} ${type?.nameKh}`,
                    value: type?._id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Description'
                name='description'
              >
                <TextArea rows={4} placeholder='Enter description' />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default EditPrivacy
