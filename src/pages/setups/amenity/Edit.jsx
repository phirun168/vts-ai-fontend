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
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import AmenityServices from '../../../services/setup/Amenity'

const EditAmenity = (props) => {
  const { open, setOpen, groupType, access_token, propData, getFileImage } =
    props

  // Use two separate form instances for each step.
  const [formStep1] = Form.useForm()
  const [formStep2] = Form.useForm()

  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)

  // Thumbnail state (Step 1)
  const [thumbFileList, setThumbFileList] = useState([])
  const [thumbImageUrl, setThumbImageUrl] = useState(null)

  // Additional images state (Step 2)
  const [imagesFileList, setImagesFileList] = useState([])

  // Local state to hold fetched amenity data
  const [amenity, setAmenity] = useState(null)

  // Helper: convert file to base64
  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  // Fetch amenity details by id if provided
  const getAmenityById = async (id) => {
    try {
      const doc = { _id: id }
      const res = await AmenityServices.fetchAmenityById({ access_token, doc })
      if (res) {
        setAmenity(res)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (propData?._id) {
      getAmenityById(propData._id)
    }
  }, [propData])

  useEffect(() => {
    if (amenity) {
      formStep1.setFieldsValue({
        _id: amenity._id,
        nameEn: amenity.nameEn,
        nameKh: amenity.nameKh,
        groupId: amenity.groupId,
        description: amenity.description,
      })
      if (amenity.filePath) {
        const url = getFileImage(amenity.filePath) + '/large-' + amenity.image
        setThumbImageUrl(url)
      }
    }
  }, [amenity, formStep1, getFileImage])

  // Handler for thumbnail upload (Step 1)
  const handleThumbChange = ({ fileList: newFileList }) => {
    setThumbFileList(newFileList)
    const latestFile = newFileList[newFileList.length - 1]
    if (latestFile?.originFileObj) {
      getBase64(latestFile.originFileObj, (url) => setThumbImageUrl(url))
    } else {
      setThumbImageUrl(null)
    }
  }

  const uploadThumbButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload Thumbnail</div>
    </div>
  )

  // Handler for additional images upload (Step 2)
  const handleImagesChange = ({ fileList: newFileList }) => {
    setImagesFileList(newFileList)
  }

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
    setCurrentStep(0)
  }

  // onFinish: Merge data from both forms and send via FormData.
  const onFinish = async () => {
    try {
      setLoading(true)
      // Retrieve values from step 1 (Step 2 is optional)
      const values1 = formStep1.getFieldsValue(true)
      const values2 = await formStep2.validateFields().catch(() => ({}))
      console.log('Step 1 values:', values1)
      console.log('Step 2 values:', values2)
      const formData = new FormData()
      formData.append('_id', values1._id || amenity?._id) // Use existing id from amenity.
      formData.append('nameEn', values1.nameEn)
      formData.append('nameKh', values1.nameKh)
      formData.append('groupId', values1.groupId)
      formData.append('description', values1.description)
      if (thumbFileList.length > 0) {
        formData.append('file', thumbFileList[0].originFileObj)
      }
      imagesFileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append('files', file.originFileObj)
        }
      })
      const res = await AmenityServices.updateAmenity({
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
          title: 'Update Successful!',
          text: 'The information has been updated successfully.',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    } catch (error) {
      console.log(error, 'error 23456789')
      Swal.fire({
        icon: 'error',
        title: 'Update Failed!',
        text: 'Something went wrong while updating.',
        timer: 1500,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title='Edit Amenity'
      open={open}
      width={650}
      centered
      closable={true}
      onCancel={handleCancel}
      footer={
        <Button
          type='primary'
          onClick={onFinish}
          loading={loading}
          style={{ minWidth: '120px', borderRadius: '8px' }}
        >
          Save
        </Button>
      }
    >
      <Card>
        <Form
          form={formStep1}
          preserve
          layout='vertical'
          name='edit_amenity_step1'
        >
          <Row gutter={[8, 2]}>
            <Col
              xs={24}
              sm={5}
              className='flex justify-center items-center  mt-4'
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
                preserve
                style={{ marginBottom: '0px' }}
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

export default EditAmenity
