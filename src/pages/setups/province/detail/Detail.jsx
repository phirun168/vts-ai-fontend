import React, { useState, useEffect, useContext } from 'react'
import {
  Avatar,
  Button,
  Card,
  Col,
  Row,
  Tabs,
  Breadcrumb,
  Divider,
  Skeleton,
  Tooltip,
} from 'antd'
import {
  HomeOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  GlobalOutlined,
  EditOutlined,
  FileTextOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { AuthContext } from '../../../../contexts/AuthContext'
import helpFunctions from '../../../../utils/helpFunctions'

// Components and services
import CoverSlideshow from './SlideShow' // Cover slideshow component
import PlaceList from './Place'
import PromotionAndEvent from './Promotion&Event'
import Tours from './Tours'
import Moment from './Moment'
import EditProvince from '../Edit'
import ProvinceServices from '../../../../services/setup/Province'
import CardDashboard from './CardDashboard'
import Search from './Search'
import { PERMS } from '../../../../constants/permission/perms'

const ProfileProvinceDetail = () => {
  const { id } = useParams()
  const { getFileImage } = helpFunctions
  const { access_token, checkPermission } = useContext(AuthContext)

  const navigate = useNavigate()
  const { setDisplayEmitContent } = useOutletContext() || {}
  const [openEdit, setOpenEdit] = useState(false)
  // Active tab key state (default is '1')
  const [activeTabKey, setActiveTabKey] = useState('1')
  const [loading, setLoading] = useState(true)
  const [province, setProvince] = useState({})
  //CHECK PERMISSION
  useEffect(() => {
    if (!checkPermission(PERMS.PROVINCE_MANAGEMENT)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.PROVINCE_MANAGEMENT)) {
    return null
  }
  //END CHECK PERMISSION
  // Fetch province data based on id
  const getProvinceById = async (proId) => {
    if (!proId) return
    setLoading(true)
    try {
      const doc = { _id: proId }
      const res = await ProvinceServices.fetchProvinceById({
        access_token,
        doc,
      })
      setProvince(res)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (id) {
      getProvinceById(id)
    }
  }, [id])

  // Edit handler
  const onEdit = () => {
    console.log('Edit triggered')
    setOpenEdit(true)
  }

  // Tab items for the information section
  const tabItems = [
    {
      label: (
        <span className='text-gray-500 font-medium'>
          <EnvironmentOutlined /> Place
        </span>
      ),
      key: '1',
      children: <PlaceList />,
    },
    {
      label: (
        <span className='text-gray-500 font-medium'>
          <CalendarOutlined /> Promotion & Event
        </span>
      ),
      key: '2',
      children: <PromotionAndEvent />,
    },
    {
      label: (
        <span className='text-gray-500 font-medium'>
          <GlobalOutlined /> Tour
        </span>
      ),
      key: '3',
      children: <Tours />,
    },
    {
      label: (
        <span className='text-gray-500 font-medium'>
          <FileTextOutlined /> Moments
        </span>
      ),
      key: '4',
      children: <Moment />,
    },
  ]

  const handleBack = () => {
    navigate('/province')
  }

  useEffect(() => {
    if (setDisplayEmitContent) {
      setDisplayEmitContent(
        <div className='flex justify-between my-2'>
          <div
            className='flex items-center space-x-1'
            style={{ color: '#495057' }}
          >
            <Button
              style={{ width: '40px', color: 'red' }}
              icon={<ArrowLeftOutlined />}
              onClick={() => handleBack()}
            />
            <p> Province Detail</p>
          </div>
          <Breadcrumb
            items={[
              {
                title: (
                  <HomeOutlined
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/province')}
                  />
                ),
              },
              {
                href: '/province',
                title: <span>Province</span>,
              },
              {
                href: '',
                title: <span> Detail</span>,
              },
            ]}
          />
        </div>
      )
    }
  }, [navigate, setDisplayEmitContent])

  return (
    <div className='bg-gray-100 min-h-screen max-w-8xl mx-auto'>
      {/* Edit Province Modal */}
      <EditProvince
        open={openEdit}
        setOpen={setOpenEdit}
        id={id}
        getProvinceById={getProvinceById}
      />

      {/* Cover and Profile Section */}
      <div className='relative'>
        {/* Cover Photo with Slideshow */}
        <div className='w-full 2xl:h-100 overflow-hidden'>
          {loading ? (
            <Skeleton active paragraph={{ rows: 6 }} />
          ) : (
            <CoverSlideshow
              images={province?.images}
              videos={province?.videos}
              getFileImage={getFileImage}
              filePath={province?.filePath}
            />
          )}
        </div>

        {/* Profile Avatar and Basic Info */}
        <div
          style={{ zIndex: 20 }}
          className='absolute bottom-[-150px] lg:bottom-[-90px] md:right-0 md:left-0 left-1/2 transform -translate-x-1/2 lg:flex items-end lg:left-14 md:transform-none'
        >
          <div className='flex justify-center'>
            <Avatar
              size={120}
              src={
                getFileImage(province?.filePath) +
                '/large-' +
                province?.images?.[0]
              }
              className='border-4 border-white bg-gray-200'
            />
          </div>
          <div className='lg:ml-4 mb-5'>
            <h2 className='text-2xl font-bold flex items-center justify-center lg:justify-start'>
              <span>{province?.provinceEn}</span>
            </h2>
            <p className='text-gray-600 flex items-center justify-center lg:justify-start space-x-2'>
              <EnvironmentOutlined />
              <span>{province?.provinceKh}</span>
              <span> - </span>
              <span>Cambodia</span>
            </p>
          </div>
        </div>

        {/* Edit Province Profile Button */}
        <div className='absolute bottom-[-40px] right-4 z-50'>
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
      </div>

      {/* Province Details Card */}
      <Card className='mb-4 mt-40 lg:mt-28'>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <div>
              <h2 className='text-lg font-bold flex items-center gap-2 text-gray-800'>
                Description
              </h2>
              <Divider className='my-2' />
              {loading ? (
                <Skeleton active paragraph={{ rows: 1 }} />
              ) : (
                <p className='text-gray-600'>{province?.description}</p>
              )}
            </div>
          </Col>
        </Row>
      </Card>

      {/* Dashboard Section */}
      <CardDashboard />

      {/* Search and Information Tabs */}
      <Card className='mt-5'>
        <Search />
        <Tabs
          activeKey={activeTabKey}
          onChange={(key) => setActiveTabKey(key)}
          items={tabItems}
          tabBarGutter={16}
        />
      </Card>
    </div>
  )
}

export default ProfileProvinceDetail
