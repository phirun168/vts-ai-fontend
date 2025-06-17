import { ArrowLeftOutlined, HomeOutlined, TagOutlined } from '@ant-design/icons'
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Descriptions,
  Row,
  Tag,
  Tooltip,
} from 'antd'
import { useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import CoverPromotionAndEvent from './Cover'
import dayjs from 'dayjs'

const PromotionAndEvent = () => {
  const { collapsed, setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()

  // Dummy promotion detail (to be replaced with real data)
  const promotionDetail = {
    promotion_name_en: 'Super Holiday Discount',
    promotion_name_kh: 'ការបញ្ចុះតម្លៃថ្ងៃឈប់សម្រាក',
    discount: '50%',
    service: 'Coffee',
    start_date: dayjs().format('YYYY-MM-DD'),
    expired_date: dayjs().add(10, 'day').format('YYYY-MM-DD'),
    location: 'Siem Reap',
    location_owner: 'ម៉ាលីស',
    type: 'new_feed', // can be 'new_feed' or 'normal'
    status: 'active', // 'active', 'inactive', 'expired'
    created_by: 'Admin',
    created_at: dayjs().format('YYYY-MM-DD'),
    description:
      'This exclusive promotion brings a 50% discount, making it a great opportunity to enjoy high-quality coffee at a fraction of the price. Whether you are a daily coffee enthusiast or looking for a treat, this deal ensures you get the best value.',
    image: '', // you can add a cover image URL if needed
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

  const handleBack = () => {
    navigate('/hightlight')
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
              href: '/promotion&event',
              title: <span>Promotion & Events</span>,
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

  return (
    <>
      <div className='bg-gray-100'>
        <div className='mx-auto'>
          <Row gutter={[8, 2]}>
            <Col xs={24}>
              <CoverPromotionAndEvent />
            </Col>
            <Col xs={24}>
              <div className='relative sm:flex justify-between px-6 py-2 rounded-lg mb-4'>
                <div>
                  <h1 className='text-2xl font-bold flex items-center gap-2'>
                    <TagOutlined className='text-xl' />
                    {promotionDetail.promotion_name_en} -{' '}
                    {promotionDetail.discount} OFF!
                  </h1>
                  <div style={{ color: '#7E0DE9' }} className='sm:mx-8'>
                    <span>{promotionDetail.promotion_name_kh}</span>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <div>
                    {promotionDetail.type === 'new_feed' ? (
                      <Tag color='blue' className='text-md px-3 py-1'>
                        📢 New Feed
                      </Tag>
                    ) : (
                      <Tag color='green' className='text-md px-3 py-1'>
                        📍 Normal
                      </Tag>
                    )}
                  </div>
                  <div>{getStatusTag(promotionDetail.status)}</div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Details Card */}
          <Card className='my-2'>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={12} xl={8}>
                <Card
                  bodyStyle={{ padding: '12px' }}
                  className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
                >
                  <div>
                    <div className='text-gray-600 font-medium'>
                      Promotion Name (En)
                    </div>
                    <div className='text-gray-500' style={{ fontSize: '14px' }}>
                      {promotionDetail?.promotion_name_en}
                    </div>
                  </div>
                </Card>
              </Col>
              {/* Additional detail cards follow... */}
              <Col xs={24} sm={12} md={12} xl={8}>
                <Card
                  bodyStyle={{ padding: '12px' }}
                  className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
                >
                  <div>
                    <div className='text-gray-600 font-medium'>
                      Promotion Name (Kh)
                    </div>
                    <div className='text-gray-500' style={{ fontSize: '14px' }}>
                      {promotionDetail.promotion_name_kh}
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
                    <div className='text-gray-600 font-medium'>
                      Discount (%)
                    </div>
                    <div className='text-gray-500' style={{ fontSize: '14px' }}>
                      {promotionDetail.discount}
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
                    <div className='text-gray-600 font-medium'>
                      Service/Product
                    </div>
                    <div className='text-gray-500' style={{ fontSize: '14px' }}>
                      {promotionDetail.service}
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
                      {promotionDetail.start_date}
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
                    <div className='text-gray-600 font-medium'>
                      Expired Date
                    </div>
                    <div className='text-gray-500' style={{ fontSize: '14px' }}>
                      {promotionDetail.expired_date}
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
                    <div className='text-gray-600 font-medium'>Place</div>
                    <div className='text-gray-500' style={{ fontSize: '14px' }}>
                      {promotionDetail.location}
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
                    <div className='text-gray-600 font-medium'>Place Owner</div>
                    <div className='text-gray-500' style={{ fontSize: '14px' }}>
                      {promotionDetail.location_owner}
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
                    <div className='text-gray-600 font-medium'>Type</div>
                    <div className='text-gray-500' style={{ fontSize: '14px' }}>
                      {promotionDetail.type === 'new_feed'
                        ? 'New Feed'
                        : 'Normal'}
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
                    <div className='text-gray-600 font-medium'>Status</div>
                    <div className='text-gray-500' style={{ fontSize: '14px' }}>
                      {promotionDetail.status}
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
                      {promotionDetail.created_by}
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
                      {promotionDetail.created_at}
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>

          {/* Description Card */}
          <Card className='my-2'>
            <div className='p-2'>
              <h3 className='font-bold text-lg'>Description</h3>
              <p className='text-gray-600'>{promotionDetail.description}</p>
            </div>
          </Card>
          <Card className='my-2'>
            <div className='p-4'>
              <h3 className='font-bold text-lg mb-3'>Related Information</h3>
              <div className='mb-2'>
                <span className='font-medium'>PP Code: </span>
                <span>PP001</span>
              </div>
              <div className='mb-2'>
                <span className='font-medium'>Place Name (En): </span>
                <span>{promotionDetail.location}</span>
              </div>
              <div className='mb-2'>
                <span className='font-medium'>Place Name (Kh): </span>
                <span>សៀមរាប</span>
              </div>
              <div className='mb-2'>
                <span className='font-medium'>Place Owner: </span>
                <span>{promotionDetail.location_owner}</span>
              </div>
              <div className='mb-2'>
                <span className='font-medium'>Created By: </span>
                <span>{promotionDetail.created_by}</span>
              </div>
              <div className='mb-2'>
                <span className='font-medium'>Created At: </span>
                <span>{promotionDetail.created_at}</span>
              </div>
              <div className='mb-2'>
                <span className='font-medium'>Province: </span>
                <span>Phnom Penh</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

export default PromotionAndEvent
