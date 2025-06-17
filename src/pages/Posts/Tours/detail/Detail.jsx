import {
  Breadcrumb,
  Card,
  Col,
  Form,
  Row,
  Tabs,
  Typography,
  Divider,
  Tag,
  Statistic,
  Button,
} from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import {
  ArrowLeftOutlined,
  DollarOutlined,
  FileImageOutlined,
  HomeOutlined,
  ToolOutlined,
} from '@ant-design/icons'

import SlideShow from './SlideShow'
import dayjs from 'dayjs'
const { Title, Text } = Typography

const ToursDetail = () => {
  const { setDisplayEmitContent } = useOutletContext()
  const postOption = 'location'
  const navigate = useNavigate()
  const [clickedKey, setClickedKey] = useState('1')
  const postType = 'new_feed'
  const postStatus = 'active'

  const locationData = [
    {
      key: 1,
      pp_code: 'PP001',
      location_name_en: 'Siem Reap',
      location_name_kh: 'សៀមរាប',
      location_owner: 'ម៉ាលីស',
      created_by: 'Admin',
      created_at: dayjs().format('YYYY-MM-DD'),
      province: 'Phnom Penh',
    },
  ]
  const locationFields = [
    { label: 'PP Code', key: 'pp_code' },
    { label: 'Location Name (En)', key: 'location_name_en' },
    { label: 'Location Name (Kh)', key: 'location_name_kh' },
    { label: 'Location Owner', key: 'location_owner' },
    { label: 'Created By', key: 'created_by' },
    { label: 'Created At', key: 'created_at' },
    { label: 'Province', key: 'province' },
  ]
  function getDataByPostOption(postOption) {
    switch (postOption) {
      case 'location':
        return { data: locationData, fields: locationFields }
      default:
        return { data: [], fields: [] }
    }
  }
  const getStatusTag = (status) => {
    switch (status) {
      case 'active':
        return (
          <Tag color='green' className='px-3 py-1'>
            ✅ Active
          </Tag>
        )
      case 'inactive':
        return (
          <Tag color='gray' className='px-3 py-1'>
            ⚪ Inactive
          </Tag>
        )
      case 'expired':
        return (
          <Tag color='red' className='px-3 py-1'>
            ❌ Expired
          </Tag>
        )
      default:
        return (
          <Tag color='blue' className='px-3 py-1'>
            🆕 Unknown
          </Tag>
        )
    }
  }
  useEffect(() => {
    setDisplayEmitContent(
      <div className='flex justify-between my-2'>
        <div className='font-semibold flex' style={{ color: '#495057' }}>
          <div className='flex space-x-1 items-center'>
            <Button
              style={{ width: '40px', color: 'red' }}
              icon={<ArrowLeftOutlined />}
              onClick={() => handleBack()}
            ></Button>
            <p>Promotion & Events Detail</p>
          </div>
        </div>
        <Breadcrumb
          items={[
            {
              title: <HomeOutlined style={{ cursor: 'pointer' }} />,
            },
            {
              href: '/tours',
              title: <span>Tours</span>,
            },
            {
              href: '',
              title: <span>Detail</span>,
            },
          ]}
        />
      </div>
    )
  }, [setDisplayEmitContent])

  return (
    <div>
      <Row gutter={[8, 2]}>
        {/* Icon */}

        <Col xs={24}>
          <Card>
            <SlideShow />
          </Card>
        </Col>
        <Col xs={24} className='flex justify-between my-2 mx-6'>
          <div className=' '>
            <Title
              style={{ margin: '0px', padding: '0px', fontSize: '24px' }}
              level={20}
            >
              <HomeOutlined style={{ marginRight: 8 }} />
              Device details
            </Title>
            <Text
              // type='secondary'

              className='mx-8'
              style={{ fontSize: '14px', color: '#7E0DE9' }}
            >
              ព័ត៌មានលម្អិតឧបករណ៍
            </Text>
          </div>
          <div className='flex gap-2'>
            <div>
              {postType === 'new_feed' ? (
                <Tag color='blue' className='text-md px-3 py-1'>
                  📢 New Feed
                </Tag>
              ) : (
                <Tag color='green' className='text-md px-3 py-1'>
                  📍 Normal
                </Tag>
              )}
            </div>
            <div>{getStatusTag(postStatus)}</div>
          </div>
        </Col>
      </Row>

      <Card className='my-2 '>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className=' shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <div>
                <div className='text-gray-600 font-medium'>Start Price</div>
                <div className='text-gray-500' style={{ fontSize: '14px' }}>
                  10$
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md  border transition-transform transform hover:scale-105'
            >
              <div>
                <div className='text-gray-600 font-medium'>End Price</div>
                <div className='text-gray-500' style={{ fontSize: '14px' }}>
                  20$
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <div>
                <div className='text-gray-600 font-medium'>Start Date</div>
                <div className='text-gray-500' style={{ fontSize: '14px' }}>
                  {dayjs().format('YYYY-MM-DD')}
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <div>
                <div className='text-gray-600 font-medium'>End Date</div>
                <div className='text-gray-500' style={{ fontSize: '14px' }}>
                  {dayjs().format('YYYY-MM-DD')}
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <div>
                <div className='text-gray-600 font-medium'>Created By</div>
                <div className='text-gray-500' style={{ fontSize: '14px' }}>
                  Admin
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <div>
                <div className='text-gray-600 font-medium'>Created At</div>
                <div className='text-gray-500' style={{ fontSize: '14px' }}>
                  {dayjs().format('YYYY-MM-DD')}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
      <Card className='my-2'>
        <div className='mb-4'>
          <h2 className='text-lg font-bold flex items-center gap-2 text-gray-800'>
            Description
          </h2>
        </div>
        <Divider className='my-4' />

        <p className='text-gray-600'>
          Phnom Penh Province is known for its rich history and vibrant culture.
          Explore the bustling streets, ancient temples, and modern landmarks
          that define this unique place.
        </p>
      </Card>
      <Card>
        <h3 className='font-bold text-lg mb-3'>Related Information</h3>
        {(() => {
          const { data, fields } = getDataByPostOption(postOption)

          if (!data.length) {
            return <p className='text-red-500'>No related information found.</p>
          }

          return (
            <div className='w-full overflow-x-auto'>
              <Divider className='my-4' />
              <div className='flex flex-col gap-4'>
                {data.map((item) => (
                  <div
                    key={item.key}
                    className='bg-white rounded-lg shadow  p-4'
                  >
                    {fields.map((field) => (
                      <div key={field.key} className='mb-2'>
                        <span className='text-xs text-gray-500 font-semibold'>
                          {field.label}:
                        </span>
                        <span className='text-sm text-gray-800'>
                          {item[field.key]}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )
        })()}
      </Card>
    </div>
  )
}

export default ToursDetail
