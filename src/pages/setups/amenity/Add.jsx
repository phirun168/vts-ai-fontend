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
  Steps,
} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'
import Swal from 'sweetalert2'
import AmenityServices from '../../../services/setup/Amenity'
const { Step } = Steps

const AddAmenity = (props) => {
  const { open, setOpen, getAmenity, groupType, access_token } = props

  // Create two separate form instances for each step.
  const [formStep1] = Form.useForm()
  const [formStep2] = Form.useForm()

  const [loading, setLoading] = useState(false)

  // Thumbnail state (Step 1)
  const [thumbFileList, setThumbFileList] = useState([])
  const [thumbImageUrl, setThumbImageUrl] = useState(null)

  // Additional images state (Step 2)
  const [imagesFileList, setImagesFileList] = useState([])

  // Helper: convert file to base64
  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  // Handler for thumbnail upload in Step 1
  const handleThumbChange = ({ fileList: newFileList }) => {
    setThumbFileList(newFileList)
    const latestFile = newFileList[newFileList.length - 1]
    if (latestFile?.originFileObj) {
      getBase64(latestFile.originFileObj, (url) => setThumbImageUrl(url))
    } else {
      setThumbImageUrl(null)
    }
  }

  // Define upload button for thumbnail
  const uploadThumbButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload Thumbnail</div>
    </div>
  )

  const handleImagePreview = (imageUrl) => {
    Swal.fire({
      title: '',
      imageUrl,
      imageAlt: 'Uploaded Image',
      showCloseButton: true,
      confirmButtonText: 'Close',
      showConfirmButton: false,
    })
  }

  const handleCancel = () => {
    setOpen(false)
    formStep1.resetFields()
    formStep2.resetFields()
    setThumbFileList([])
    setThumbImageUrl(null)
    setImagesFileList([])
  }

  // onFinish: merge data from both forms and send via FormData
  const onFinish = async () => {
    try {
      setLoading(true)
      const values2 = formStep1.getFieldsValue(true)
      // For Step 2, images are optional.
      console.log('Step 2 values:', values2, 'somnak')
      const formData = new FormData()
      formData.append('nameEn', values2.nameEn)
      formData.append('nameKh', values2.nameKh)
      formData.append('groupId', values2.groupId)
      formData.append('description', values2.description)
      if (thumbFileList.length > 0) {
        formData.append('file', thumbFileList[0].originFileObj)
      }
      imagesFileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append('files', file.originFileObj)
        }
      })
      const res = await AmenityServices.createAmenity({
        access_token,
        doc: formData,
      })
      if (res) {
        setOpen(false)
        formStep1.resetFields()
        formStep2.resetFields()
        setThumbFileList([])
        setThumbImageUrl(null)
        setImagesFileList([])
        Swal.fire({
          icon: 'success',
          title: 'Upload Successful!',
          text: 'The information has been added successfully.',
          showConfirmButton: false,
          timer: 1500,
        })
        getAmenity()
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed!',
        text: 'Something went wrong while adding.',
        timer: 1500,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title='Add Amenity'
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
        <Form
          form={formStep1}
          preserve
          layout='vertical'
          name='add_amenity_step1'
        >
          <Row gutter={[8, 2]}>
            <Col
              xs={24}
              sm={5}
              className='flex justify-center items-center mt-4'
            >
              <Form.Item name='thumbnail' preserve>
                <Upload
                  name='thumbnail'
                  listType='picture-card'
                  showUploadList={false}
                  fileList={thumbFileList}
                  onChange={handleThumbChange}
                >
                  {thumbImageUrl ? (
                    <img
                      src={thumbImageUrl}
                      alt='thumbnail'
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                      }}
                      onClick={() => handleImagePreview(thumbImageUrl)}
                    />
                  ) : (
                    uploadThumbButton
                  )}
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} sm={19}>
              <Form.Item
                label='Amenity Name (En)'
                name='nameEn'
                style={{ marginBottom: '0px' }}
                preserve
                rules={[
                  {
                    required: true,
                    message: 'Please enter the amenity name (En)!',
                  },
                ]}
              >
                <Input placeholder='Enter amenity name (En)' />
              </Form.Item>
              <Form.Item
                label='Amenity Name (Kh)'
                name='nameKh'
                preserve
                rules={[
                  {
                    required: true,
                    message: 'Please enter the amenity name (Kh)!',
                  },
                ]}
              >
                <Input placeholder='Enter amenity name (Kh)' />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                label='Group Type'
                name='groupId'
                preserve
                rules={[{ required: true, message: 'Group type is required!' }]}
              >
                <Select
                  showSearch
                  placeholder='Select a group type'
                  allowClear
                  options={groupType.map((type) => ({
                    label: `${type?.nameEn} ${type?.nameKh}`,
                    value: type?._id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label='Description' name='description' preserve>
                <TextArea rows={4} placeholder='Enter description' />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default AddAmenity
