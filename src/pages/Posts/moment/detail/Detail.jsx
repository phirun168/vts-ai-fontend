import {
  Breadcrumb,
  Card,
  Col,
  Row,
  Tag,
  Tabs,
  Table,
  Tooltip,
  Button,
  Select,
  Radio,
  Input,
  Divider,
  Popconfirm,
} from 'antd'
import { useEffect, useState } from 'react'
import CategoryList from './Category'
import LocationList from './Location'
import SwiperImageVideo from './Cover'
import { useNavigate, useOutletContext } from 'react-router-dom'
import {
  CalendarOutlined,
  DoubleLeftOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  FileTextOutlined,
  GlobalOutlined,
  HomeOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'

const { TabPane } = Tabs

const MomentDetail = () => {
  const { setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()
  const [clickedKey, setClickedKey] = useState('1')

  // Sample data for post type and status
  const postType = 'new_feed'
  const postStatus = 'active'
  // This value is used in getDataByPostOption; we compare with lower-case.
  const postOption = 'category'

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
  const provinceData = [
    {
      key: 1,
      province_name_en: 'Phnom Penh',
      province_name_kh: 'ភ្នំពេញ',
      created_by: 'admin',
      created_at: dayjs().format('YYYY-MM-DD'),
      population: '2.1M',
    },
  ]
  const categoryData = [
    {
      key: 1,
      category_name_en: 'Travel',
      category_name_kh: 'ដើរលេង',
      created_by: 'admin',
      created_at: dayjs().format('YYYY-MM-DD'),
    },
  ]
  // Function to get the appropriate status tag
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

  const locationFields = [
    { label: 'LOC Code', key: 'pp_code' },
    { label: 'Place Name (En)', key: 'location_name_en' },
    { label: 'Place Name (Kh)', key: 'location_name_kh' },
    { label: 'Place Owner', key: 'location_owner' },
    { label: 'Province', key: 'province' },
  ]
  // (provinceFields and categoryFields are omitted for brevity)
  const provinceFields = [
    /* ... */
  ]
  const categoryFields = [
    /* ... */
  ]

  // Updated getDataByPostOption converts option to lower-case.
  function getDataByPostOption(option) {
    const opt = option.toLowerCase()
    switch (opt) {
      case 'place':
        return { data: locationData, fields: locationFields }
      case 'province':
        return { data: provinceData, fields: provinceFields }
      case 'category':
        return { data: categoryData, fields: categoryFields }
      default:
        return { data: [], fields: [] }
    }
  }

  const handleBack = () => {
    navigate('/moment')
  }

  useEffect(() => {
    setDisplayEmitContent(
      <div className='flex justify-between my-2'>
        <div
          className='font-semibold flex space-x-1 items-center'
          style={{ color: '#495057' }}
        >
          <div className='flex space-x-1  items-center'>
            <Button
              style={{ width: '40px', color: 'red' }}
              icon={<ArrowLeftOutlined />}
              onClick={() => handleBack()}
            ></Button>
            <p> Moment Detail</p>
          </div>
        </div>
        <Breadcrumb
          items={[
            { title: <HomeOutlined style={{ cursor: 'pointer' }} /> },
            { href: '/moment', title: <span>Moment</span> },
            { href: '', title: <span>Detail</span> },
          ]}
        />
      </div>
    )
  }, [navigate, setDisplayEmitContent])

  // Sample form data from AddMoment (replace with actual values)
  const sampleFormData = {
    template: 'Template 1',
    moment_name: 'My Beautiful Moment',
    choose_option: 'Place',
    province: '', // Only if choose_option === 'Province'
    category: '', // Only if choose_option === 'Category'
    location: 'Angkor Wat',
    location_owner: 'Admin',
    map: '1600 Amphitheatre Parkway, Mountain View, CA',
    hashtags: ['Angkor Wat', 'Phnom Penh'],
    type: 'normal',
    status: 'Active',
    description: 'This is a description of my beautiful moment.',
  }

  // Sample images array for the Images tab; these URLs will be reused for the Videos tab.
  const images = [
    'https://swiperjs.com/demos/images/nature-1.jpg',
    'https://swiperjs.com/demos/images/nature-2.jpg',
    'https://swiperjs.com/demos/images/nature-3.jpg',
    'https://swiperjs.com/demos/images/nature-4.jpg',
    'https://swiperjs.com/demos/images/nature-5.jpg',
  ]
  const videos = [
    'https://www.vecteezy.com/video/10876623-drops-of-rain-with-green-tree-nature-background-romantic-shot-scene-content-colorful-raindropsg',
    'https://swiperjs.com/demos/images/nature-2.jpg',
    'https://swiperjs.com/demos/images/nature-3.jpg',
    'https://swiperjs.com/demos/images/nature-4.jpg',
    'https://swiperjs.com/demos/images/nature-5.jpg',
  ]

  // For the Place Info grid – wrap sampleFormData in an array.
  const paginatedData = [sampleFormData]

  return (
    <>
      <div>
        {/* Main Card Header */}
        <Card>
          <div className='flex justify-center'>
            <div className=' w-full'>
              <SwiperImageVideo />
            </div>
          </div>
        </Card>

        <div className='mb-4 mx-6 xs:block md:flex justify-between items-center'>
          <div className='p-0 m-0 flex flex-col items-center sm:items-start sm:text-left w-full'>
            <div className='text-2xl font-bold text-gray-700 flex flex-wrap justify-center sm:justify-start items-center gap-x-2 p-0 m-0 text-center sm:text-left'>
              <GlobalOutlined className='text-blue-500 text-lg' />
              <span>Sunset at the Beach</span>
            </div>
            <p
              className='md:mx-10 font-semibold text-center sm:text-left'
              style={{ color: '#7E0DE9' }}
            >
              <span className=' block sm:inline'>ថ្ងៃលិចនៅឆ្នេរសមុទ្រ</span>
            </p>
          </div>
          {/* Post Type Badge */}
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
        </div>

        {/* Swiper Section */}

        {/* Preview Card for Moment Information */}
        <Card title='Moment Information Preview' style={{ marginTop: '20px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={12} xl={8}>
              <Card
                bodyStyle={{ padding: '12px' }}
                className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
              >
                <div className=''>
                  <div className='text-gray-600 font-medium'>Template</div>
                  <div className='text-gray-500' style={{ fontSize: '14px' }}>
                    {sampleFormData.template}
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} xl={8}>
              <Card
                bodyStyle={{ padding: '12px' }}
                className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
              >
                <div className=''>
                  <div className='text-gray-600 font-medium'>
                    Moment Name (En)
                  </div>
                  <div className='text-gray-500' style={{ fontSize: '14px' }}>
                    {sampleFormData.moment_name}
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} xl={8}>
              <Card
                bodyStyle={{ padding: '12px' }}
                className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
              >
                <div className=''>
                  <div className='text-gray-600 font-medium'>
                    Moment Name (Kh)
                  </div>
                  <div className='text-gray-500' style={{ fontSize: '14px' }}>
                    {sampleFormData.moment_name}
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} xl={8}>
              <Card
                bodyStyle={{ padding: '12px' }}
                className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
              >
                <div className=''>
                  <div className='text-gray-600 font-medium'>Post On</div>
                  <div className='text-gray-500' style={{ fontSize: '14px' }}>
                    {sampleFormData.choose_option}
                  </div>
                </div>
              </Card>
            </Col>
            {sampleFormData.choose_option.toLowerCase() === 'province' && (
              <Col xs={24} sm={12} md={12} xl={8}>
                <Card
                  bodyStyle={{ padding: '12px' }}
                  className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
                >
                  <div className=''>
                    <div className='text-gray-600 font-medium'>Province</div>
                    <div className='text-gray-500' style={{ fontSize: '14px' }}>
                      {sampleFormData.province}
                    </div>
                  </div>
                </Card>
              </Col>
            )}
            {sampleFormData.choose_option.toLowerCase() === 'category' && (
              <Col xs={24} sm={12} md={12} xl={8}>
                <Card
                  bodyStyle={{ padding: '12px' }}
                  className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
                >
                  <div className=''>
                    <div className='text-gray-600 font-medium'>Category</div>
                    <div className='text-gray-500' style={{ fontSize: '14px' }}>
                      {sampleFormData.category}
                    </div>
                  </div>
                </Card>
              </Col>
            )}
            {sampleFormData.choose_option.toLowerCase() === 'place' && (
              <>
                <Col xs={24} sm={12} md={12} xl={8}>
                  <Card
                    bodyStyle={{ padding: '12px' }}
                    className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
                  >
                    <div className=''>
                      <div className='text-gray-600 font-medium'>Place</div>
                      <div
                        className='text-gray-500'
                        style={{ fontSize: '14px' }}
                      >
                        {sampleFormData.location}
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={12} xl={8}>
                  <Card
                    bodyStyle={{ padding: '12px' }}
                    className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
                  >
                    <div className=''>
                      <div className='text-gray-600 font-medium'>
                        Place Owner
                      </div>
                      <div
                        className='text-gray-500'
                        style={{ fontSize: '14px' }}
                      >
                        {sampleFormData.location_owner}
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={12} xl={8}>
                  <Card
                    bodyStyle={{ padding: '12px' }}
                    className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
                  >
                    <div className=''>
                      <div className='text-gray-600 font-medium'>Map</div>
                      <div
                        className='text-gray-500'
                        style={{ fontSize: '14px' }}
                      >
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            sampleFormData.map
                          )}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='underline text-blue-500'
                        >
                          {sampleFormData.map}
                        </a>
                      </div>
                    </div>
                  </Card>
                </Col>
              </>
            )}
            <Col xs={24} sm={12} md={12} xl={8}>
              <Card
                bodyStyle={{ padding: '12px' }}
                className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
              >
                <div className=''>
                  <div className='text-gray-600 font-medium'>Hashtags</div>
                  <div className='text-gray-500' style={{ fontSize: '14px' }}>
                    {sampleFormData.hashtags.join(', ')}
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} xl={8}>
              <Card
                bodyStyle={{ padding: '12px' }}
                className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
              >
                <div className=''>
                  <div className='text-gray-600 font-medium'>Type</div>
                  <div className='text-gray-500' style={{ fontSize: '14px' }}>
                    {sampleFormData.type}
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} xl={8}>
              <Card
                bodyStyle={{ padding: '12px' }}
                className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
              >
                <div className=''>
                  <div className='text-gray-600 font-medium'>Status</div>
                  <div className='text-gray-500' style={{ fontSize: '14px' }}>
                    {sampleFormData.status}
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Card>

        <Card className='my-2'>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <div>
                <h2 className='text-lg font-bold flex items-center gap-2 text-gray-800'>
                  Description
                </h2>
                <Divider className='my-2' />
                {sampleFormData.description}
              </div>
            </Col>
          </Row>
        </Card>

        {/* Related Information */}
        <Card>
          <h3 className='font-bold text-lg mb-3'>Related Information</h3>
          {(() => {
            const { data, fields } = getDataByPostOption(postOption)
            if (!data.length) {
              return (
                <p className='text-red-500'>No related information found.</p>
              )
            }
            return (
              <div className='w-full overflow-x-auto'>
                <div className='hidden md:table w-full'>
                  <div className='table-header-group bg-gray-200'>
                    <div className='table-row'>
                      {fields.map((field) => (
                        <div
                          key={field.key}
                          className='table-cell p-2 border whitespace-nowrap'
                        >
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              sampleFormData.map
                            )}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='underline text-blue-500'
                          >
                            {sampleFormData.map}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='table-row-group'>
                    {data.map((item) => (
                      <div key={item.key} className='table-row'>
                        {fields.map((field) => (
                          <div
                            key={field.key}
                            className='table-cell p-2 whitespace-nowrap'
                          >
                            {item[field.key]}
                            {field.key === 'action' ? (
                              <Tooltip title='View'>
                                <Button
                                  icon={
                                    <EyeOutlined style={{ color: 'green' }} />
                                  }
                                  shape='circle'
                                  size='small'
                                  onClick={() => handleView(item)}
                                  style={{ marginRight: 8 }}
                                />
                              </Tooltip>
                            ) : (
                              ''
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className='md:hidden flex flex-col gap-4'>
                  {data.map((item) => (
                    <div key={item.key} className='p-4'>
                      {fields.map((field) => (
                        <p key={field.key}>
                          <strong>{field.label}:</strong> {item[field.key]}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )
          })()}
        </Card>

        {/* Tabs - placed at the very end */}
        <Tabs defaultActiveKey='1' className='my-4'>
          <TabPane tab='Hashtags' key='1'>
            <Card className='my-2'>
              <h3 className='font-bold text-lg mb-3'>Hashtags</h3>
              <Row>
                <span className='bg-gray-100 rounded-lg p-3 mx-2 shadow-sm'>
                  <span className='text-gray-500'>#Adventure</span>
                </span>
                <span className='bg-gray-100 rounded-lg p-3 mx-2 shadow-sm'>
                  <span className='text-gray-500'>#Temple</span>
                </span>
                <span className='bg-gray-100 rounded-lg mx-2 p-3 shadow-sm'>
                  <span className='text-gray-500'>#Trip</span>
                </span>
              </Row>
            </Card>
          </TabPane>
          <TabPane tab='Place Info' key='2'>
            <h3 className='font-bold text-lg mb-3'>Place Information</h3>
            {sampleFormData.choose_option.toLowerCase() === 'place' ? (
              <div
                className='grid gap-4'
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                }}
              >
                {paginatedData.map((item, index) => (
                  <Card
                    key={index}
                    bordered={false}
                    className='transition-transform duration-300 hover:scale-105 cursor-pointer'
                    style={{
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    {locationFields.map((field) => (
                      <p key={field.key} style={{ margin: '4px 0' }}>
                        <strong>{field.label}:</strong> {item[field.key]}
                      </p>
                    ))}
                  </Card>
                ))}
              </div>
            ) : (
              <p className='text-gray-500'>No Place information available.</p>
            )}
          </TabPane>
          <TabPane tab='Images' key='3'>
            <Row gutter={[8, 2]} className='p-0'>
              {images.map((url, index) => (
                <Col
                  xs={24}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={8}
                  xxl={6}
                  key={index}
                  style={{ position: 'relative', marginBottom: '16px' }}
                >
                  <img
                    src={url}
                    alt={`Place ${index + 1}`}
                    className='w-full object-cover rounded'
                    style={{ height: '200px' }}
                  />
                  <DeleteOutlined
                    onClick={() => console.log('Remove image at index:', index)}
                    style={{
                      position: 'absolute',
                      top: 3,
                      right: 8,
                      fontSize: '18px',
                      color: '#fff',
                      backgroundColor: 'red',
                      borderRadius: '50%',
                      padding: 4,
                      cursor: 'pointer',
                      zIndex: 2,
                    }}
                  />
                </Col>
              ))}
            </Row>
          </TabPane>
          <TabPane tab='Videos' key='4'>
            <Row gutter={[8, 2]} className='p-0'>
              {videos.map((url, index) => (
                <Col
                  xs={24}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={8}
                  xxl={6}
                  key={index}
                  style={{ position: 'relative', marginBottom: '16px' }}
                >
                  <video
                    src={url}
                    controls
                    className='w-full rounded'
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <DeleteOutlined
                    onClick={() => console.log('Remove video at index:', index)}
                    style={{
                      position: 'absolute',
                      top: 3,
                      right: 8,
                      fontSize: '18px',
                      color: '#fff',
                      backgroundColor: 'red',
                      borderRadius: '50%',
                      padding: 4,
                      cursor: 'pointer',
                      zIndex: 2,
                    }}
                  />
                </Col>
              ))}
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </>
  )
}

export default MomentDetail
