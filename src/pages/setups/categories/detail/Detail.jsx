import React, { useContext, useEffect, useState } from 'react'
import {
  Col,
  Form,
  Row,
  Button,
  Card,
  Breadcrumb,
  Tabs,
  Divider,
  Avatar,
  Tooltip,
} from 'antd'
import {
  HomeOutlined,
  AppstoreOutlined,
  EnvironmentOutlined,
  DoubleLeftOutlined,
  EditOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons'
import {
  useNavigate,
  useOutletContext,
  useLocation,
  useParams,
} from 'react-router-dom'
import SubCategory from './SubCategory'
import Locations from './Location'
import renderActions from 'components/Icon/MoreOption'
//
import EditCategory from '../Edit'
import CategoryServices from '../../../../services/setup/Category'
import { AuthContext } from '../../../../contexts/AuthContext'
import helpFunctions from '../../../../utils/helpFunctions'
import { PERMS } from '../../../../constants/permission/perms'
//
const CategoryDetail = ({ open, setOpen }) => {
  const { collapsed, setDisplayEmitContent } = useOutletContext()
  const { access_token, checkPermission } = useContext(AuthContext)
  const { getFileImage } = helpFunctions
  const navigate = useNavigate()

  const location = useLocation()
  const { id } = useParams()

  //

  const [form] = Form.useForm()
  const [clickedKey, setClickedKey] = useState('1')
  const [openEdit, setOpenEdit] = useState(false)
  //
  const [category, setCategory] = useState(false)

  //CHECK PERMISSION
  useEffect(() => {
    if (!checkPermission(PERMS.CATEGORY_MANAGEMENT)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.CATEGORY_MANAGEMENT)) {
    return null
  }
  //END CHECK PERMISSION
  const getCategoryById = async (id) => {
    const doc = { _id: id }
    const res = await CategoryServices.fetchCategoryById({ access_token, doc })
    if (res) {
      setCategory(res)
    }
  }
  useEffect(() => {
    getCategoryById(id)
  }, [id])
  //
  useEffect(() => {
    getCategoryById(id)
  }, [openEdit])
  //
  useEffect(() => {
    if (location.pathname === `/category/detail/${id}/subcategory`) {
      setClickedKey('1')
    } else if (location.pathname === `/category/detail/${id}/location`) {
      setClickedKey('2')
    }
  }, [location.pathname])

  // Navigate when tab selection changes
  useEffect(() => {
    if (clickedKey === '1') {
      navigate(`/category/detail/${id}/subcategory`)
    } else if (clickedKey === '2') {
      navigate(`/category/detail/${id}/location`)
    }
  }, [clickedKey])
  const handleBack = () => {
    navigate('/category')
  }
  // Set the header content with Breadcrumb
  useEffect(() => {
    setDisplayEmitContent(
      <div className='flex justify-between my-2'>
        <div className='font-semibold flex' style={{ color: '#495057' }}>
          <div
            className='flex items-center space-x-1'
            style={{ color: '#495057' }}
          >
            <Button
              style={{ width: '40px', color: 'red' }}
              icon={<ArrowLeftOutlined />}
              onClick={() => handleBack()}
            />
            <p> Category Detail</p>
          </div>
        </div>
        <Breadcrumb
          items={[
            {
              title: <HomeOutlined style={{ cursor: 'pointer' }} />,
              href: '/category',
            },
            {
              href: '/category',
              title: <span>Category</span>,
            },
            {
              href: '',
              title: <span className='text-blue-500'>Detail</span>,
            },
          ]}
        />
      </div>
    )
  }, [navigate, setDisplayEmitContent])

  const onEdit = () => {
    setOpenEdit(true)
  }
  const tabItems = [
    {
      key: '1',
      label: (
        <span className='text-gray-500 font-medium'>
          <AppstoreOutlined style={{ marginRight: '8px' }} />
          Sub Category
        </span>
      ),
      children: <SubCategory renderActions={renderActions} />,
    },
    {
      key: '2',
      label: (
        <span className='text-gray-500 font-medium'>
          <EnvironmentOutlined style={{ marginRight: '8px' }} />
          Location
        </span>
      ),
      children: <Locations renderActions={renderActions} />,
    },
  ]

  return (
    <>
      {/*  */}
      {openEdit === true ? (
        <EditCategory
          open={openEdit}
          setOpen={setOpenEdit}
          access_token={access_token}
          propData={category}
          getFileImage={getFileImage}
        />
      ) : (
        ''
      )}
      {/*  */}
      {/* Top Card with Category title and image */}
      <Card className='my-2'>
        <div className='flex  items-center w-full '>
          <div className='flex items-center'>
            <Avatar
              shape='square'
              size={40}
              src={
                getFileImage(category?.filePath) + '/large-' + category?.image
              }
              style={{ cursor: 'pointer', marginLeft: '10px' }} // Added margin for spacing
            />
            <div className='mx-2'>
              <h2 className='font-bold text-2xl'>{category?.nameEn}</h2>
              <p className='text-sm text-gray-600'>{category?.nameKh}</p>
            </div>
          </div>
          <div className='ml-auto'>
            {checkPermission(PERMS.ASSIGNED_USER) ? (
              <Button
                onClick={() => onEdit()}
                type='default'
                icon={<EditOutlined />}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </Card>

      {/* About Card */}
      <Card className='my-2'>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <div className='p-2'>
              <div className=''>
                <h2 className='text-lg font-bold flex items-center gap-2 text-gray-800 '>
                  Description
                </h2>
              </div>
              <Divider className='my-2' />
              <p className='text-gray-600'>{category?.description}</p>
            </div>
          </Col>
        </Row>
      </Card>
      {/* Main content: Tabs */}
      <Card className='my-2'>
        <Tabs
          activeKey={clickedKey}
          items={tabItems}
          onChange={(key) => setClickedKey(key)}
          tabBarGutter={16}
        />
      </Card>
    </>
  )
}

export default CategoryDetail
