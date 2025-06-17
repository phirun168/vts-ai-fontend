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
import SubCategoryServices from '../../../services/setup/SubCategory'
import CategoryServices from '../../../services/setup/Category'

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
const EditSubCategory = (props) => {
  const { open, setOpen, access_token, propData, getFileImage } = props

  const [form] = Form.useForm()
  const [imageUrl, setImageUrl] = useState()
  const [loading, setLoading] = useState(false)
  //
  const [subCategory, setSubCategory] = useState()
  const [category, setCategory] = useState([])
  //
  const onFinish = async () => {
    setLoading(true)
    try {
      const values = await form.validateFields() // Use await instead of .then()
      console.log(values?.file?.[0])
      const formData = new FormData()
      formData.append('_id', values._id)
      formData.append('nameEn', values.nameEn)
      formData.append('nameKh', values.nameKh)
      formData.append('categoryId', values.categoryId)
      formData.append('description', values.description)
      formData.append('file', values.file?.[0]?.originFileObj)
      const doc = formData
      const res = await SubCategoryServices.updateSubCategory({
        access_token,
        doc,
      })
      if (res) {
        setOpen(false)
        form.resetFields()
        setLoading(false)
        setImageUrl(null)
        Swal.fire({
          icon: 'success',
          title: 'Upload Successful!',
          text: 'The information has been updated successfully.',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed!',
        text: 'Something went wrong while updating.',
        timer: 1500,
      })
      setLoading(false)
    }
  }
  //
  const getCategory = async () => {
    try {
      const doc = { search: '' }
      const res = await CategoryServices.fetchCategory({ access_token, doc })
      if (res) {
        setCategory(res)
      }
    } catch {}
  }
  useEffect(() => {
    getCategory()
  }, [])
  const getSubCategoryById = async (_id) => {
    try {
      const doc = { _id: _id }
      const res = await SubCategoryServices.fetchSubCategoryById({
        access_token,
        doc,
      })
      if (res) {
        setSubCategory(res)
      }
    } catch {}
  }
  useEffect(() => {
    getSubCategoryById(propData?._id)
  }, [propData])
  //
  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
    setImageUrl(null)
  }

  const handleChange = (info) => {
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false)
      setImageUrl(url)
    })
    // }
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  //

  // Find the category where catEn = "wqer" and catKh = "ewqr"
  useEffect(() => {
    form.setFieldsValue({
      _id: subCategory?._id,
      nameEn: subCategory?.nameEn,
      nameKh: subCategory?.nameKh,
      categoryId: subCategory?.categoryId,
      description: subCategory?.description,
    })
    if (subCategory?.filePath) {
      setImageUrl(
        getFileImage(subCategory?.filePath) + '/large-' + subCategory?.image
      )
    }
  }, [subCategory])
  //
  return (
    <Modal
      title='Edit Sub Category'
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
        <Form form={form} layout='vertical' name='edit_sub_category_form'>
          <Form.Item hidden name='_id'>
            <Input />
          </Form.Item>
          <Row gutter={[8, 2]}>
            <Col xs={24} sm={5} className=' flex justify-center my-2'>
              <Form.Item
                name='file'
                valuePropName='fileList'
                getValueFromEvent={(e) =>
                  Array.isArray(e) ? e : e && e.fileList
                }
              >
                <Upload
                  name='avatar'
                  listType='picture-card'
                  style={{ marginBottom: '0px' }}
                  className='sm:mt-[16px] avatar-uploader'
                  showUploadList={false}
                  action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
                  beforeUpload={false}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt='avatar'
                      style={{
                        width: '150%', // Increased width
                        maxWidth: '100px', // Optional: Limit the maximum width
                        height: 'auto', // Maintain aspect ratio
                        display: 'block', // Center if necessary
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
                label='Sub Category Name (En)'
                name='nameEn'
                style={{ marginBottom: '0px' }}
                rules={[{ required: true, message: 'file require!' }]}
              >
                <Input placeholder=' sub category name (en)' />
              </Form.Item>
              <Form.Item
                label='Sub Category Name (Kh)'
                name='nameKh'
                style={{ marginBottom: '0px' }}
                rules={[{ required: true, message: 'file require!' }]}
              >
                <Input placeholder=' sub category name (kh)' />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                label='Category'
                name='categoryId'
                className='m-0 p-0'
                rules={[{ required: true, message: 'file require!' }]}
              >
                <Select
                  showSearch
                  placeholder='Select a category'
                  allowClear
                  options={category?.map((item) => ({
                    value: item._id,
                    label: item.nameEn + ' - ' + item.nameKh,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label='Description' name='description'>
                <TextArea rows={4} placeholder='enter description' />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}
export default EditSubCategory
