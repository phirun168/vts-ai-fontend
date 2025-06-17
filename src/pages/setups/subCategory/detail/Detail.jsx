import React, { useContext, useEffect, useState } from 'react'
import { Col, Form, Row, Button, Card, Breadcrumb, Tabs, Tooltip } from 'antd'
import {
  HomeOutlined,
  AppstoreOutlined,
  EditOutlined,
  TagsOutlined,
  EnvironmentOutlined,
  DoubleLeftOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { AuthContext } from '../../../../contexts/AuthContext'
import helpFunctions from '../../../../utils/helpFunctions'

//
import Location from './Location'
import EditSubCategory from '../Edit'
import SubCategoryServices from '../../../../services/setup/SubCategory'
import CategoryServices from '../../../../services/setup/Category'
import { PERMS } from '../../../../constants/permission/perms'
const CategoryDetail = ({ open, setOpen }) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { setDisplayEmitContent } = useOutletContext()
  const { id } = useParams()
  const { access_token, checkPermission } = useContext(AuthContext)
  const { getFileImage } = helpFunctions
  //
  //
  const [clickedKey, setClickedKey] = useState('1')
  const [openEdit, setOpenEdit] = useState(false)
  const [subCategory, setSubCategory] = useState()
  const [category, setCategory] = useState()
  //
  //CHECK PERMISSION
  useEffect(() => {
    if (!checkPermission(PERMS.SUB_CATEGORY_MANAGEMENT)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.SUB_CATEGORY_MANAGEMENT)) {
    return null
  }
  //END CHECK PERMISSION
  const handleBack = () => {
    navigate('/sub-category')
  }
  useEffect(() => {
    setDisplayEmitContent(
      <div className='flex justify-between my-2'>
        <div className='font-semibold text-gray-700 flex items-center'>
          <div
            className='flex items-center space-x-1'
            style={{ color: '#495057' }}
          >
            <Button
              style={{ width: '40px', color: 'red' }}
              icon={<ArrowLeftOutlined />}
              onClick={() => handleBack()}
            />
            <p>Sub Category Detail</p>
          </div>
        </div>
        <Breadcrumb
          items={[
            {
              title: <HomeOutlined style={{ cursor: 'pointer' }} />,
            },
            {
              title: 'Sub Category',
            },
            {
              title: 'Detail',
            },
          ]}
        />
      </div>
    )
  }, [navigate])
  //
  const getSubCategoryById = async (_id) => {
    try {
      const doc = { _id: _id }
      const res = await SubCategoryServices.fetchSubCategoryById({
        access_token,
        doc,
      })
      if (res) {
        setSubCategory(res)
        getCategoryById(res?.categoryId)
      }
    } catch {}
  }
  const getCategoryById = async (_id) => {
    try {
      const doc = { _id: _id }
      const res = await CategoryServices.fetchCategoryById({
        access_token,
        doc,
      })
      if (res) {
        setCategory(res)
      }
    } catch {}
  }
  useEffect(() => {
    getSubCategoryById(id)
  }, [id])
  useEffect(() => {
    getSubCategoryById(id)
  }, [openEdit])
  //
  const onEdit = () => {
    setOpenEdit(true)
  }

  const tabItems = [
    {
      key: '1',
      label: (
        <span className='text-gray-500 font-medium'>
          <AppstoreOutlined style={{ marginRight: '8px' }} /> Description
        </span>
      ),
      children: (
        <Card className='p-4'>
          {/* <h3 className='font-bold text-lg'>About</h3> */}
          <p className='text-gray-600'>{subCategory?.description}</p>
        </Card>
      ),
    },
    {
      key: '2',
      label: (
        <span className='text-gray-500 font-medium'>
          <TagsOutlined />
          Category
        </span>
      ),
      children: (
        <Card>
          <Row gutter={[16, 16]} className='mt-4'>
            <Col span={8}>
              <div className='ml-2'>
                <h2 className='font-bold text-lg'>{category?.nameEn}</h2>
                <p className='text-xs font-bold text-gray-500'>
                  {category?.nameKh}
                </p>
              </div>
            </Col>
          </Row>
        </Card>
      ),
    },
    {
      key: '3',
      label: (
        <span className='text-gray-500 font-medium'>
          <EnvironmentOutlined style={{ marginRight: '8px' }} /> Location
        </span>
      ),
      children: <Location />,
    },
  ]

  return (
    <>
      {openEdit === true ? (
        <EditSubCategory
          open={openEdit}
          setOpen={setOpenEdit}
          access_token={access_token}
          category={category}
          propData={subCategory}
          getFileImage={getFileImage}
        />
      ) : (
        ''
      )}
      <Card className='my-2'>
        <div className='flex items-center'>
          <img
            alt='avatar'
            src={
              getFileImage(subCategory?.filePath) +
              '/large-' +
              subCategory?.image
            }
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '5px',
            }}
          />
          <div className='ml-2'>
            <h2 className='font-bold text-2xl'>{subCategory?.nameEn}</h2>
            <p className='text-sm text-gray-600'>{subCategory?.nameKh}</p>
          </div>
          {checkPermission(PERMS.ASSIGNED_USER) ? (
            <Button
              onClick={() => onEdit()}
              type='default'
              icon={<EditOutlined />}
              className='ml-auto'
            />
          ) : (
            ' '
          )}
        </div>
      </Card>

      <Card className='my-2'>
        <Tabs
          activeKey={clickedKey}
          items={tabItems}
          onChange={(key) => setClickedKey(key)}
        />
      </Card>
    </>
  )
}

export default CategoryDetail
