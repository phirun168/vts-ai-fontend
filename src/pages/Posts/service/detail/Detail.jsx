import {
  Breadcrumb,
  Card,
  Col,
  Row,
  Tag,
  Divider,
  Tabs,
  Button,
  Tooltip,
} from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import {
  ArrowLeftOutlined,
  HomeOutlined,
  TagOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import SlideShow from './SlideShow'
import dayjs from 'dayjs'
import EditServiceInfo from './Edit/EditServiceInfo'
import EditDiscount from './Edit/EditDiscount'
import EditImg from './Edit/EditImg'

// Custom component to display a label and its value
const InfoItem = ({ title, value, valueStyle }) => (
  <div style={{ padding: '0px' }}>
    <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '0px' }}>
      {title}
    </div>
    <div style={{ fontSize: '16px', ...valueStyle }}>{value}</div>
  </div>
)

const ServiceDetail = () => {
  const { setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editDiscountOpen, setEditDiscountOpen] = useState(false)
  const [isEditCover, setIsEditCover] = useState(false)
  const [activeTab, setActiveTab] = useState('1')

  const postOption = 'location'
  const postStatus = 'active'
  const discount = {
    discountType: 'percentage',
    discountValue: '10%',
    startDate: '2024-01-15',
    expiredDate: '2024-02-15',
    status: 'active',
  }

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
    { label: 'LOC Code', key: 'pp_code' },
    { label: 'Place Name (En)', key: 'location_name_en' },
    { label: 'Place Name (Kh)', key: 'location_name_kh' },
    { label: 'Place Owner', key: 'location_owner' },
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

  const handleBack = () => {
    navigate('/service')
  }

  // Handler functions for editing sections.
  const handleEditPhoto = () => {
    console.log('Edit photo/images clicked')
  }
  const handleEditAbout = () => {
    console.log('Edit about information clicked')
  }
  const handleEditDiscount = () => {
    console.log('Edit discount details clicked')
    setEditDiscountOpen(true)
  }

  useEffect(() => {
    setDisplayEmitContent(
      <div className='flex justify-between my-2'>
        <div className='font-semibold flex' style={{ color: '#495057' }}>
          <div className='flex space-x-1 items-center'>
            <Button
              style={{ width: '40px', color: 'red' }}
              icon={<ArrowLeftOutlined />}
              onClick={handleBack}
            />
            <p> Service Detail</p>
          </div>
        </div>
        <Breadcrumb
          items={[
            { title: <HomeOutlined style={{ cursor: 'pointer' }} /> },
            { href: '/service', title: <span>Service</span> },
            { href: '', title: <span>Detail</span> },
          ]}
        />
      </div>
    )
  }, [navigate, setDisplayEmitContent])

  // Define an array of image URLs for the Image tab.
  const images = [
    'https://nowboarding.changiairport.com/content/dam/canowboarding/homepage-carousel/travel-guide-cambodia-phnom-penh/aerial-view-royal-palace-of-phnom-penh-cambodia-1920x1080.jpg',
    'https://www.pacifichotel.asia/wp-content/uploads/2024/08/palais-royal-du-cambodge-phnom-penh-scaled-1.jpg',
    'https://www.sofitel-phnompenh-phokeethra.com/wp-content/uploads/sites/90/2022/05/RoomSuites-6-1-e1653555311291.jpg',
    'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2020/11/06/0230/Hyatt-Regency-Phnom-Penh-P007-King-Palace-View-Deluxe.jpg/Hyatt-Regency-Phnom-Penh-P007-King-Palace-View-Deluxe.16x9.jpg?imwidth=1920',
    'https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/90/2018/03/24080038/sofitel-phnompenh-phokeethra-suite-prestige-e1534498914746.jpg',
  ]

  // For Feature, Amenity, and Privacy tabs we use groups with separate names for English and Khmer.
  const featureGroups = [
    {
      groupName: 'Features',
      items: [
        { id: 1, name_en: 'Feature 1', name_kh: 'លក្ខណៈ ១' },
        { id: 2, name_en: 'Feature 2', name_kh: 'លក្ខណៈ ២' },
        { id: 3, name_en: 'Feature 3', name_kh: 'លក្ខណៈ ៣' },
      ],
    },
  ]
  const amenityGroups = [
    {
      groupName: 'Amenities',
      items: [
        { id: 1, name_en: 'Amenity 1', name_kh: 'សេវា ១' },
        { id: 2, name_en: 'Amenity 2', name_kh: 'សេវា ២' },
        { id: 3, name_en: 'Amenity 3', name_kh: 'សេវា ៣' },
      ],
    },
  ]
  const privacyGroups = [
    {
      groupName: 'Privacy',
      items: [
        { id: 1, name_en: 'Privacy 1', name_kh: 'ឯកជនភាព ១' },
        { id: 2, name_en: 'Privacy 2', name_kh: 'ឯកជនភាព ២' },
        { id: 3, name_en: 'Privacy 3', name_kh: 'ឯកជនភាព ៣' },
      ],
    },
  ]

  // Dummy handlers for viewing and removing group items.
  const handleViewItem = (groupName, id) => {
    console.log(`View item ${id} in group ${groupName}`)
  }
  const handleRemoveItem = (groupName, id) => {
    console.log(`Remove item ${id} from group ${groupName}`)
  }

  return (
    <div>
      <EditServiceInfo
        open={isModalOpen}
        setOpen={setIsModalOpen}
        initialData={{
          roomNameEn: '',
          roomNameKh: 'បន្ទប់',
          serviceProduct: 'Coffee',
          startDate: dayjs(),
          expiredDate: dayjs(),
          status: 'Active',
          createdBy: 'Admin',
          createdAt: dayjs(),
        }}
      />
      <EditDiscount
        open={editDiscountOpen}
        setOpen={setEditDiscountOpen}
        initialData={{
          discountType: 'percentage',
          discountValue: '10%',
          startDate: '2024-01-15',
          expiredDate: '2024-02-15',
          status: 'active',
          description: 'A special discount for early booking',
        }}
      />
      <EditImg open={isEditCover} setOpen={setIsEditCover} />

      {/* Part 1: Header Slide Image Section */}
      <Row gutter={[8, 16]}>
        <Col xs={24}>
          <Card>
            <SlideShow />
          </Card>
        </Col>
      </Row>
      <div className='relative sm:flex justify-between items-center px-6 py-2 rounded-lg mb-4'>
        <div>
          <h1 className='text-2xl font-bold flex items-center gap-2'>
            <TagOutlined className='text-xl' />
            Room
          </h1>
          <div className='text-purple-700 sm:mx-8'>
            <span>បន្ទប់</span>
          </div>
        </div>
        <div>{getStatusTag(postStatus)}</div>
      </div>

      {/* Part 2: About Data Section with Edit Button */}
      <Card
        title={
          <div className='flex justify-between items-center'>
            <span>About Room</span>
            <Button
              icon={<EditOutlined />}
              onClick={() => setIsModalOpen(true)}
            >
              Edit
            </Button>
          </div>
        }
        className='mb-4 shadow-md p-4'
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <InfoItem
                title='Template'
                value='Accommodation'
                valueStyle={{ fontSize: '14px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <InfoItem
                title='Room Name (En)'
                value='Room'
                valueStyle={{ fontSize: '14px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <InfoItem
                title='Room Name (Kh)'
                value='បន្ទប់'
                valueStyle={{ fontSize: '14px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <InfoItem
                title='Room Type'
                value='Rooms'
                valueStyle={{ fontSize: '14px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <InfoItem
                title='Start Date'
                value={dayjs().format('YYYY-MM-DD')}
                valueStyle={{ fontSize: '14px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <InfoItem
                title='Expired Date'
                value={dayjs().format('YYYY-MM-DD')}
                valueStyle={{ fontSize: '14px', color: 'red' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <InfoItem
                title='Status'
                value='Active'
                valueStyle={{ fontSize: '14px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <InfoItem
                title='Created By'
                value='Admin'
                valueStyle={{ fontSize: '14px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <InfoItem
                title='Created At'
                value={dayjs().format('YYYY-MM-DD')}
                valueStyle={{ fontSize: '14px' }}
              />
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Part 3: Discount Details Section with Edit Button */}
      <Card className='mb-4 shadow-md p-4'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-bold flex items-center gap-2 text-gray-800'>
            <TagOutlined className='text-blue-500 text-lg' />
            Discount Details
          </h2>
          <Button
            icon={<EditOutlined />}
            onClick={() => setEditDiscountOpen(true)}
          >
            Edit
          </Button>
        </div>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <InfoItem
                title='Discount Type'
                value={discount.discountType.toUpperCase()}
                valueStyle={{ fontSize: '14px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <InfoItem
                title='Discount Value'
                value={discount.discountValue}
                valueStyle={{
                  fontSize: '14px',
                  color:
                    discount.discountType === 'percentage'
                      ? 'blue'
                      : discount.discountType === 'cash'
                        ? 'green'
                        : 'purple',
                }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <InfoItem
                title='Start Date'
                value={dayjs(discount.startDate).format('YYYY-MM-DD')}
                valueStyle={{ fontSize: '14px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <InfoItem
                title='Expired Date'
                value={dayjs(discount.expiredDate).format('YYYY-MM-DD')}
                valueStyle={{
                  fontSize: '14px',
                  color: dayjs().isAfter(discount.expiredDate)
                    ? 'red'
                    : 'inherit',
                }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <InfoItem
                title='Status'
                value='Active'
                valueStyle={{
                  fontSize: '14px',
                  color: dayjs().isAfter(discount.expiredDate)
                    ? 'blue'
                    : 'inherit',
                }}
              />
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
              Phnom Penh Province is known for its rich history and vibrant
              culture. Explore the bustling streets, ancient temples, and modern
              landmarks that define this unique place.
            </div>
          </Col>
        </Row>
      </Card>
      {/* Part 4: Tabs for Additional Place Info and Images */}
      <Tabs
        defaultActiveKey='1'
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        type='card'
        tabBarStyle={{
          background: '#fafafa',
          padding: '10px',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
        tabBarExtraContent={
          activeTab === '2' && (
            <Button
              type='primary'
              icon={<EditOutlined />}
              onClick={handleEditPhoto}
            >
              Edit Image
            </Button>
          )
        }
      >
        {/* Tab 1: Place Information */}
        <Tabs.TabPane tab='Place' key='1'>
          <h3 className='font-bold text-lg mb-3'>Place Information</h3>
          {(() => {
            const { data, fields } = getDataByPostOption(postOption)
            if (!data.length) {
              return (
                <p className='text-red-500'>No related information found.</p>
              )
            }
            return (
              <div
                className='grid gap-4'
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                }}
              >
                {data.map((item) => (
                  <Card
                    key={item.key}
                    bordered={false}
                    style={{
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    {fields.map((field) => (
                      <p
                        key={field.key}
                        style={{ margin: '4px 0', fontSize: '14px' }}
                      >
                        <strong>{field.label}:</strong> {item[field.key]}
                      </p>
                    ))}
                  </Card>
                ))}
              </div>
            )
          })()}
        </Tabs.TabPane>

        {/* Tab 2: Image Display */}
        <Tabs.TabPane tab='Image' key='2'>
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
        </Tabs.TabPane>

        {/* Tab 3: Feature - Only Name (En & Kh) */}
        <Tabs.TabPane tab='Feature' key='3'>
          {featureGroups.map((group) => (
            <div key={group.groupName} className='mb-4'>
              <h4 className='text-md font-semibold text-gray-700 mb-2'>
                {group.groupName}
              </h4>
              <Row gutter={[16, 8]} className='flex flex-wrap'>
                {group.items.map((item) => (
                  <Col key={item.id} xs='auto' className='mx-1'>
                    <div
                      className='item-container relative inline-flex flex-col items-center border px-4 py-2 rounded-md shadow-sm transition-transform transform duration-300 ease-in-out hover:scale-105 cursor-pointer'
                      onClick={() => handleViewItem(group.groupName, item.id)}
                    >
                      <span className='text-gray-600 text-center'>
                        {item.name_en}
                      </span>
                      <span className='text-gray-600 text-center'>
                        {item.name_kh}
                      </span>
                      <div
                        className='item-overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity duration-300'
                        style={{ borderRadius: 'inherit' }}
                      >
                        <EyeOutlined
                          style={{ fontSize: '24px', color: '#fff' }}
                        />
                      </div>
                      <Button
                        type='text'
                        danger
                        icon={<DeleteOutlined className='text-md' />}
                        size='small'
                        style={{ position: 'absolute', top: -8, right: -10 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveItem(group.groupName, item.id)
                        }}
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Tabs.TabPane>

        {/* Tab 4: Amenity - Only Name (En & Kh) */}
        <Tabs.TabPane tab='Amenity' key='4'>
          {amenityGroups.map((group) => (
            <div key={group.groupName} className='mb-4'>
              <h4 className='text-md font-semibold text-gray-700 mb-2'>
                {group.groupName}
              </h4>
              <Row gutter={[16, 8]} className='flex flex-wrap'>
                {group.items.map((item) => (
                  <Col key={item.id} xs='auto' className='mx-1'>
                    <div
                      className='item-container relative inline-flex flex-col items-center border px-4 py-2 rounded-md shadow-sm transition-transform transform duration-300 ease-in-out hover:scale-105 cursor-pointer'
                      onClick={() => handleViewItem(group.groupName, item.id)}
                    >
                      <span className='text-gray-600 text-center'>
                        {item.name_en}
                      </span>
                      <span className='text-gray-600 text-center'>
                        {item.name_kh}
                      </span>
                      <div
                        className='item-overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity duration-300'
                        style={{ borderRadius: 'inherit' }}
                      >
                        <EyeOutlined
                          style={{ fontSize: '24px', color: '#fff' }}
                        />
                      </div>
                      <Button
                        type='text'
                        danger
                        icon={<DeleteOutlined className='text-md' />}
                        size='small'
                        style={{ position: 'absolute', top: -8, right: -10 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveItem(group.groupName, item.id)
                        }}
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Tabs.TabPane>

        {/* Tab 5: Privacy - Only Name (En & Kh) */}
        <Tabs.TabPane tab='Privacy' key='5'>
          {privacyGroups.map((group) => (
            <div key={group.groupName} className='mb-4'>
              <h4 className='text-md font-semibold text-gray-700 mb-2'>
                {group.groupName}
              </h4>
              <Row gutter={[16, 8]} className='flex flex-wrap'>
                {group.items.map((item) => (
                  <Col key={item.id} xs='auto' className='mx-1'>
                    <div
                      className='item-container relative inline-flex flex-col items-center border px-4 py-2 rounded-md shadow-sm transition-transform transform duration-300 ease-in-out hover:scale-105 cursor-pointer'
                      onClick={() => handleViewItem(group.groupName, item.id)}
                    >
                      <span className='text-gray-600 text-center'>
                        {item.name_en}
                      </span>
                      <span className='text-gray-600 text-center'>
                        {item.name_kh}
                      </span>
                      <div
                        className='item-overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity duration-300'
                        style={{ borderRadius: 'inherit' }}
                      >
                        <EyeOutlined
                          style={{ fontSize: '24px', color: '#fff' }}
                        />
                      </div>
                      <Button
                        type='text'
                        danger
                        icon={<DeleteOutlined className='text-md' />}
                        size='small'
                        style={{ position: 'absolute', top: -8, right: -10 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveItem(group.groupName, item.id)
                        }}
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

// Dummy handler functions for group items
const handleViewItem = (groupName, id) => {
  console.log(`View item ${id} in group ${groupName}`)
}
const handleRemoveItem = (groupName, id) => {
  console.log(`Remove item ${id} from group ${groupName}`)
}

export default ServiceDetail
