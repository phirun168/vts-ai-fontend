import React, { useContext, useEffect, useState } from 'react'
import { Tabs, Breadcrumb, Card } from 'antd'
import {
  AppstoreOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  ProfileOutlined,
} from '@ant-design/icons'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { AuthContext } from '../../../../../contexts/AuthContext'
import AdminProfileInfoService from '../../../../../services/admin/profile/ProfileInfo'
//
import Dashboard from './dashboard/Dashboard'
import AboutLocation from './about/AboutLocation'
import Posts from './posts/Post'
import Home from './home/HomeTabs'
import Review from './Review/Review'
//

const ProfileTabs = (props) => {
  const { businessProperty } = props
  const navigate = useNavigate()
  const { setDisplayEmitContent } = useOutletContext()
  const { access_token } = useContext(AuthContext)
  const [profileInfo, setProfileInfo] = useState()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('home')

  const getProfileInfo = async () => {
    try {
      const profileInfo = await AdminProfileInfoService.fetchProfileInfo({
        access_token,
      })
      if (profileInfo) {
        setProfileInfo(profileInfo)
      }
    } catch (error) {
      console.error('Error fetching profile info:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProfileInfo()
  }, [])

  useEffect(() => {
    setDisplayEmitContent(
      <div className='flex justify-between my-2'>
        <div></div>
        <Breadcrumb
          items={[
            {
              title: (
                <HomeOutlined
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/')}
                />
              ),
            },
            {
              title: <span className='text-gray-600 font-medium'>Profile</span>,
            },
          ]}
        />
      </div>
    )
  }, [navigate])

  return (
    <>
      <div className='property-detail'>
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          centered
          tabBarGutter={10}
          tabBarStyle={{ marginBottom: '20px' }}
        >
          <Tabs.TabPane
            tab={
              <Card hoverable className='text-center px-5 '>
                <HomeOutlined className='mr-2' />
                Home
              </Card>
            }
            key='home'
          ></Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <Card hoverable className='text-center px-5'>
                <AppstoreOutlined className='mr-2' />
                Dashboard
              </Card>
            }
            key='dashboard'
          >
            <Dashboard />
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <Card hoverable className='text-center px-5 '>
                <InfoCircleOutlined className='mr-2' />
                About
              </Card>
            }
            key='about'
          >
            <AboutLocation />
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <Card hoverable className='text-center px-5'>
                <ProfileOutlined className='mr-2' />
                Posts
              </Card>
            }
            key='posts'
          >
            <Posts />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <Card hoverable className='text-center px-5 '>
                <div className='flex items-center'>
                  <p>
                    <svg
                      style={{ width: '15px' }}
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M3 3h18v18H7l-4 12V3z' />
                      <polygon
                        points='12,8.5 13.09,11.26 16,11.63 14,14.22 14.82,17.09 
              12,15.27 9.18,17.09 10,14.22 8,11.63 10.91,11.26'
                        fill='currentColor'
                        stroke='none'
                      />
                    </svg>
                  </p>
                  <p> Review</p>
                </div>
              </Card>
            }
            key='review'
          >
            <Review />
          </Tabs.TabPane>
        </Tabs>
      </div>
      {activeTab === 'home' ? <Home businessProperty={businessProperty} /> : ''}
    </>
  )
}

export default ProfileTabs
