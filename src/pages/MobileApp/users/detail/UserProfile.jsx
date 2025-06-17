import React, { useState, useEffect, useContext, Suspense, lazy } from 'react'
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
  Layout,
} from 'antd'
import {
  ArrowLeftOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  GlobalOutlined,
  EditOutlined,
  FileTextOutlined,
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { AuthContext } from '../../../../contexts/AuthContext'
import helpFunctions from '../../../../utils/helpFunctions'

// Lazy loaded components
const AboutUser = lazy(() => import('./about/UserInfor'))
const Location = lazy(() => import('./place/Place'))
const User = lazy(() => import('./user/User'))
import RequestLocation from './RequestLocation/LocationTabs'
import UserDashboard from './Dashboard'
// import Search from './Search'
import './UserProfileStyle.scss'
import { Content } from 'antd/es/layout/layout'

const UserProfile = ({ user = {} }) => {
  const { profileImage, name, email } = user
  const [selectedTab, setSelectedTab] = useState('1')
  const { collapsed, setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()

  const renderContent = () => {
    switch (selectedTab) {
      case '1':
        return <UserDashboard />
      case '2':
        return <AboutUser />
      case '3':
        return <Location />
      case '4':
        return <User />
      case '5':
        return <RequestLocation />
      default:
        return <UserDashboard />
    }
  }

  const items = [
    {
      key: '1',
      label: (
        <>
          <UserOutlined /> Dashboard
        </>
      ),
    },
    {
      key: '2',
      label: (
        <>
          <EditOutlined /> About
        </>
      ),
    },
    {
      key: '3',
      label: (
        <>
          <EnvironmentOutlined /> Place
        </>
      ),
    },
    {
      key: '4',
      label: (
        <>
          <FileTextOutlined /> User
        </>
      ),
    },
    {
      key: '5',
      label: (
        <>
          <ArrowLeftOutlined /> Request a New Location
        </>
      ),
    },
  ]

  const handleTabChange = (key) => {
    console.log('Active Tab Key:', key)
    setSelectedTab(key)
  }

  const handleBack = () => {
    navigate('/user')
  }

  useEffect(() => {
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
          <p>User Detail</p>
        </div>
        <Breadcrumb
          items={[
            {
              title: <HomeOutlined style={{ cursor: 'pointer' }} />,
              href: '/user',
            },
            { href: '/user', title: <span>User</span> },
            { href: '', title: <span className='text-blue-500'>Detail</span> },
          ]}
        />
      </div>
    )
  }, [navigate, setDisplayEmitContent])

  return (
    <div className='w-full overflow-x-hidden'>
      {/* User Info */}
      <Card className='mb-6 mx-0 p-0'>
        <Row gutter={[16, 16]} align='middle'>
          <Col
            xs={24}
            sm={6}
            md={3}
            xxl={2}
            className='flex justify-center sm:justify-start'
          >
            <img
              src={
                profileImage ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRax8pVox5neKv5zPLnRd9b9UWEhBYzaDR9-w&s'
              }
              alt='Profile'
              className='w-24 h-24 rounded-full border'
            />
          </Col>
          <Col xs={24} sm={18} md={20}>
            <div className='text-center sm:text-left'>
              <h2 className='text-2xl font-semibold'>
                {name || 'Somnak Kalan'}
              </h2>
              <p className='text-gray-600'>{email || 'Business Owner'}</p>
            </div>
          </Col>
        </Row>

        {/* Tabs Navigation */}
        <div className='userProfileMobile mt-6 p-0'>
          <Tabs onChange={handleTabChange} defaultActiveKey='1' items={items} />
        </div>
      </Card>
      <div className='userProfileContent w-full'>
        <Layout>
          <Content style={{ background: '#fff', borderRadius: '4px' }}>
            <Suspense fallback={<div>Loading...</div>}>
              {renderContent()}
            </Suspense>
          </Content>
        </Layout>
      </div>
    </div>
  )
}

export default UserProfile
