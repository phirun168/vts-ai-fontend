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

import Locations from './Location'
import renderActions from 'components/Icon/MoreOption'
//
import EditCategory from '../Edit'
import { AuthContext } from '../../../../contexts/AuthContext'
import TypeServices from '../../../../services/setup/Type'
import helpFunctions from '../../../../utils/helpFunctions'
import { PERMS } from '../../../../constants/permission/perms'
//
const TypeDetail = () => {
  //
  const { access_token, checkPermission } = useContext(AuthContext)
  const { getFileImage } = helpFunctions
  const { id } = useParams()
  //
  const { collapsed, setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()
  //
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState()
  const [openEdit, setOpenEdit] = useState(false)
  //CHECK PERMISSION
  useEffect(() => {
    if (!checkPermission(PERMS.TYPE_MANAGEMENT)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.TYPE_MANAGEMENT)) {
    return null
  }
  //END CHECK PERMISSION
  // Update clickedKey based on current route
  const getTypeById = async (_id) => {
    try {
      const doc = { _id }
      const res = await TypeServices.fetchTypeById({
        access_token,
        doc,
      })
      if (res) {
        setType(res)
      }
    } catch {}
  }
  useEffect(() => {
    getTypeById(id)
  }, [id])
  useEffect(() => {
    if (openEdit === false) {
      getTypeById(id)
    }
  }, [openEdit])
  const handleBack = () => {
    navigate('/type')
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
            <p>Type Detail</p>
          </div>
        </div>
        <Breadcrumb
          items={[
            {
              title: <HomeOutlined style={{ cursor: 'pointer' }} />,
              href: '/type',
            },
            {
              href: '/type',
              title: <span>Type</span>,
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

  //
  const onEdit = () => {
    setOpenEdit(true)
  }
  const tabItems = [
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
          propData={type}
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
              size={40} // Adjust size as needed
              src={getFileImage(type?.filePath) + '/large-' + type?.image}
              style={{ cursor: 'pointer' }}
            />
            <div className='mx-2'>
              <h2 className='font-bold text-2xl'>{type?.nameEn}</h2>
              <p className='text-sm text-gray-600'>{type?.nameKh}</p>
            </div>
          </div>
          <div className='ml-auto'>
            {checkPermission(PERMS.ASSIGNED_USER) ? (
              <Button
                icon={<EditOutlined />}
                size='small'
                onClick={() => onEdit(rec)}
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
              <p className='text-gray-600'>{type?.description}</p>
            </div>
          </Col>
        </Row>
      </Card>
      {/* Main content: Tabs */}
      <Card>
        <Locations />
      </Card>
    </>
  )
}

export default TypeDetail
