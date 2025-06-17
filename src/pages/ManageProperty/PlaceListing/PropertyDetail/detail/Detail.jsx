// src/components/ProfileDetail.js
import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Breadcrumb, Button, Card, Col, Divider, Row, Tag } from 'antd'
import {
  ClockCircleOutlined,
  HomeOutlined,
  ShopOutlined,
  StarFilled,
  EditOutlined,
  ArrowLeftOutlined,
  FileProtectOutlined,
} from '@ant-design/icons'

const formatReviews = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M Reviews'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k Reviews'
  return num + ' Reviews'
}

import LocationSideBar from './LocationSideBar'
import CoverSlideshow from './Cover'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
//
// import EditInfo from './updates/ProfileInfo/EditInfo'
import EditSchedule from './updates/ProfileInfo/EditSchedule'
import ProfileThumbnailEditor from './updates/ProfileInfo/ProfileThumbnailEditor'
import CommentRemark from '../../other/CommentRemark'
import AllPropertyServices from '../../../../../services/ManageProperty/PlaceListing/AllProperty'
import { AuthContext } from '../../../../../contexts/AuthContext'
//
import ScheduleList from './home/ScheduleList'
import helpFunctions from '../../../../../utils/helpFunctions'
import { PERMS } from '../../../../../constants/permission/perms'
//
const ProfileDetail = () => {
  const { setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()
  const { id } = useParams() // id will be a string
  const { username, access_token, checkPermission } = useContext(AuthContext)
  const { getFileByName } = helpFunctions
  //CHECK PERMISSION
  useEffect(() => {
    if (!checkPermission(PERMS.ALL_PROPERTY_MANAGEMENT)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.ALL_PROPERTY_MANAGEMENT)) {
    return null
  }
  //END CHECK PERMISSION
  // const [isModalOpen, setIsModalOpen] = useState(false)
  const ratingGood = 2.5
  const reviewsCount = 2800 // example count
  const googleRating = 4.9
  const [types, setTypes] = useState()

  const [avatar, setAvatar] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlcbYh3uRkW6dTL13Aek8mlF4P2rJoCvKgF7IBQFYsPPz6dT-Ijt-KE0uRrsMR9LFj3eM&usqp=CAU'
  )
  //variable
  const [galleries, setGalleries] = useState([])
  //end variable
  const initialSchedule = {
    scheduleType: 3, // Custom Schedule
    monday_timeRange: ['08:00', '17:00'],
    tuesday_timeRange: ['09:00', '18:00'],
    wednesday_timeRange: null,
    thursday_timeRange: ['07:00', '16:00'],
    friday_timeRange: ['10:00', '20:00'],
    saturday_timeRange: null,
    sunday_timeRange: ['08:00', '14:00'],
  }
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)

  const handleBack = () => {
    navigate('/property')
  }

  const [businessProperty, setBusinessProperty] = useState()
  const getBusinessProperty = async (id) => {
    try {
      const doc = { id: id }
      const data = await AllPropertyServices.fetchNonBusinessPropertyById({
        doc,
        access_token,
      })
      if (data) {
        console.log(data?.data?.locations?.[0], 'data test')
        setBusinessProperty(data?.data?.locations?.[0])
      }
    } catch {}
  }
  useEffect(() => {
    if (id !== null && id !== undefined && id !== '') {
      getBusinessProperty(id)
    }
  }, [id])
  useEffect(() => {
    if (businessProperty?.media?.image?.[0]) {
      setAvatar(businessProperty?.media?.image?.[0])
    }
    if (businessProperty?.media?.gallery) {
      setGalleries(businessProperty?.media?.gallery)
    }
  }, [businessProperty])
  //
  useEffect(() => {
    if (!businessProperty?.mainCategory?.nameEn) return

    const category = businessProperty.mainCategory.nameEn.trim().toLowerCase()
    if (category === 'attraction' || category === 'activities') {
      setTypes(businessProperty?.typeOfPlace)
    } else if (category === 'eatery') {
      setTypes(businessProperty?.typeOfFood)
    }
  }, [businessProperty])

  //
  const handleSuccess = (value) => {
    // if (value === false) {
    console.log('success')

    getBusinessProperty(id)

    // }
  }
  //
  useEffect(() => {
    setDisplayEmitContent(
      <div className='flex justify-between my-3'>
        <div className='font-semibold flex' style={{ color: '#495057' }}>
          <div className='flex space-x-1  items-center'>
            <Button
              style={{ width: '40px', color: 'red' }}
              icon={<ArrowLeftOutlined />}
              onClick={() => handleBack()}
            ></Button>
            <p> Place Detail</p>
          </div>
        </div>
        <Breadcrumb
          items={[
            {
              title: <HomeOutlined style={{ cursor: 'pointer' }} />,
            },
            {
              href: '/list-place',
              title: <span>List Places</span>,
            },
            {
              href: '',
              title: <span>Detail</span>,
            },
          ]}
        />
      </div>
    )
  }, [navigate, setDisplayEmitContent])
  //

  return (
    <div className='bg-gray-100 min-h-screen'>
      <EditSchedule
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        initialValues={initialSchedule}
      />
      {/*  */}
      {/* Cover and Profile Section */}
      <div className='relative'>
        {/* Cover Photo */}
        <div className='w-full h-64 overflow-hidden'>
          <CoverSlideshow galleries={galleries} getFileByName={getFileByName} />
        </div>
        <div
          className=' relative md:absolute bottom-[50px] md:bottom-[-95px] left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0   md:flex   items-end'
          style={{ zIndex: 20 }}
        >
          <div className=' flex justify-center '>
            <ProfileThumbnailEditor
              avatar={avatar}
              setAvatar={setAvatar}
              getFileByName={getFileByName}
            />
          </div>
          <div className='flex justify-center items-center '>
            <div className='ml-4 mb-5  '>
              <div className='text-2xl  font-bold flex sm:justify-center md:justify-start items-center '>
                <p className=''>{businessProperty?.nameKh}</p>
                <p className='mx-1'>
                  <svg
                    viewBox='0 0 12 13'
                    width='18'
                    height='18'
                    fill='currentColor'
                    title='Verified account'
                    color='blue'
                    className='xfx01vb x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq'
                    style={{ '--color': 'var(--accent)' }}
                  >
                    <g fillRule='evenodd' transform='translate(-98 -917)'>
                      <path d='m106.853 922.354-3.5 3.5a.499.499 0 0 1-.706 0l-1.5-1.5a.5.5 0 1 1 .706-.708l1.147 1.147 3.147-3.147a.5.5 0 1 1 .706.708m3.078 2.295-.589-1.149.588-1.15a.633.633 0 0 0-.219-.82l-1.085-.7-.065-1.287a.627.627 0 0 0-.6-.603l-1.29-.066-.703-1.087a.636.636 0 0 0-.82-.217l-1.148.588-1.15-.588a.631.631 0 0 0-.82.22l-.701 1.085-1.289.065a.626.626 0 0 0-.6.6l-.066 1.29-1.088.702a.634.634 0 0 0-.216.82l.588 1.149-.588 1.15a.632.632 0 0 0 .219.819l1.085.701.065 1.286c.014.33.274.59.6.604l1.29.065.703 1.088c.177.27.53.362.82.216l1.148-.588 1.15.589a.629.629 0 0 0 .82-.22l.701-1.085 1.286-.064a.627.627 0 0 0 .604-.601l.065-1.29 1.088-.703a.633.633 0 0 0 .216-.819'></path>
                    </g>
                  </svg>
                </p>
                {/* <span className='hidden md:block mb-2' >
                  <StarFilled
                    style={{ fontSize: '15px' }}
                    className='ml-1 text-yellow-500'
                  />
                  <StarFilled
                    style={{ fontSize: '15px' }}
                    className='ml-1 text-yellow-500'
                  />
                  <StarFilled
                    style={{ fontSize: '15px' }}
                    className='ml-1 text-yellow-500'
                  />
                  <StarFilled
                    style={{ fontSize: '15px' }}
                    className='ml-1 text-yellow-500'
                  />
                </span> */}
              </div>

              <p className='text-gray-600 md:flex sm:justify-center md:justify-start   md:space-x-2'>
                <p className='text-center'>{businessProperty?.nameEn}</p>
                <span className='block md:hidden'>
                  <StarFilled
                    style={{ fontSize: '15px' }}
                    className='ml-1 text-yellow-500'
                  />
                  <StarFilled
                    style={{ fontSize: '15px' }}
                    className='ml-1 text-yellow-500'
                  />
                  <StarFilled
                    style={{ fontSize: '15px' }}
                    className='ml-1 text-yellow-500'
                  />
                  <StarFilled
                    style={{ fontSize: '15px' }}
                    className='ml-1 text-yellow-500'
                  />
                </span>
                {/* Good Rating with Star */}
                <div className='flex'>
                  <span className='text-yellow-500 font-bold flex  items-center'>
                    <StarFilled
                      style={{ fontSize: '15px' }}
                      className='md:ml-1 text-yellow-500'
                    />
                    {ratingGood}
                  </span>

                  <span
                    className='text-blue-500 font-semibold mx-2'
                    style={{ color: '#7E0DE9' }}
                  >
                    {formatReviews(reviewsCount)}
                  </span>

                  <span className='text-gray-400'>|</span>

                  {/* Google Maps Icon (using an inline SVG for example) */}
                  <span className='flex items-center mx-2'>
                    <svg
                      viewBox='0 0 48 48'
                      width='15'
                      height='15'
                      className='fill-current text-blue-500'
                      role='img'
                      aria-label='Google Icon'
                    >
                      <path
                        fill='#4285F4'
                        d='M45.12 24.52c0-1.46-.13-2.87-.36-4.24H24v8.02h11.95c-.54 2.88-2.16 5.32-4.6 6.98v5.78h7.42c4.36-4.02 6.85-9.94 6.85-16.54z'
                      />
                      <path
                        fill='#34A853'
                        d='M24 46c6.22 0 11.42-2.06 15.22-5.58l-7.42-5.78c-2.06 1.38-4.72 2.2-7.8 2.2-6.02 0-11.12-4.04-12.94-9.48H3.4v5.92C7.2 39.38 14.04 46 24 46z'
                      />
                      <path
                        fill='#FBBC05'
                        d='M11.06 27.36c-.5-1.38-.78-2.86-.78-4.36s.28-2.98.78-4.36V12h-7.6C2.04 15.84 0 19.78 0 24s2.04 8.16 5.46 11.02l7.6-5.92z'
                      />
                      <path
                        fill='#EA4335'
                        d='M24 9.56c3.38 0 6.4 1.16 8.78 3.42l6.46-6.46C34.88 2.18 30.22 0 24 0 14.04 0 7.2 6.62 3.46 12.98l7.6 5.92c1.82-5.44 6.92-9.34 12.94-9.34z'
                      />
                    </svg>
                  </span>

                  {/* Google Maps Rating with Star */}
                  <span className='text-blue-500 font-bold flex items-center'>
                    <StarFilled className='text-blue-500' />
                    {googleRating}
                  </span>
                </div>
              </p>
              <p
                style={{ color: '#7E0DE9' }}
                className='flex items-center text-gray-800 text-xs font-medium '
              >
                <span
                  style={{ background: '#ecd8ff' }}
                  className=' px-1 rounded-sm md:flex'
                >
                  <div>
                    <ShopOutlined />
                    <span className='text-xs mx-1'>
                      {businessProperty?.mainCategory?.nameEn}
                    </span>
                    <span className='mx-1 text-gray-400'>|</span>
                    <span className='text-xs mx-1'>
                      {businessProperty?.subCategory?.nameEn}
                    </span>
                    <span className='mx-1 text-gray-400'>|</span>
                  </div>

                  <div className='text-xs font-bold flex sm:justify-center lg:justify-start items-center'>
                    {/* type */}
                    <span>
                      {types?.map((item, index) => (
                        <span key={index}>
                          {item.nameEn}
                          {index < types?.length - 1 && ', '}
                        </span>
                      ))}
                    </span>
                  </div>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='  md:mt-28'>
        <div className='flex justify-end'>
          {businessProperty?.status.trim().toLowerCase() === 'active' ? (
            <Button
              type='default'
              style={{
                background: '#354AD3',
                color: 'white',
                borderRadius: '10px',
              }}
              icon={<FileProtectOutlined />}
              // onClick={() => setIsScheduleModalOpen(true)}
            >
              Add to Business Place
            </Button>
          ) : (
            ''
          )}
        </div>
        <ScheduleList
          schedule={businessProperty?.schedule}
          category={businessProperty?.mainCategory?.nameEn}
        />
        <CommentRemark
          handleSuccess={handleSuccess}
          businessProperty={businessProperty}
        />
        <LocationSideBar businessProperty={businessProperty} id='promotion' />
      </div>
    </div>
  )
}
export default ProfileDetail
