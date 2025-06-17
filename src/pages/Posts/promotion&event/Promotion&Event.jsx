import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Table,
  Tooltip,
  DatePicker,
  Card,
  Tag,
} from 'antd'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileImageOutlined,
  HomeOutlined,
  PlusOutlined,
} from '@ant-design/icons'
const { RangePicker } = DatePicker
const { Option } = Select
import Search from './Search'
import AddPromotionAndEvent from './Add'
import EditPromotionAndEvent from './Edit'
import ConfirmRemove from './ConfirmRemove'
import dayjs from 'dayjs'
import Dashboard from './dashboard/Dashboard'
import { PERMS } from '../../../constants/permission/perms'

const PromotionAndEvents = () => {
  const { access_token, checkPermission } = useContext(AuthContext)
  const { collapsed, setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()
  //CHECK PERMISSION
  useEffect(() => {
    if (!checkPermission(PERMS.PROMOTION_AND_EVENT_MANAGEMENT)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.PROMOTION_AND_EVENT_MANAGEMENT)) {
    return null
  }
  //END CHECK PERMISSION
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [propData, setPropData] = useState()

  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('table') // 'table' or 'card'

  // Added filter states
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCreatedBy, setFilterCreatedBy] = useState('all')
  const [dateRange, setDateRange] = useState([])

  // Sample arrays for random data generation
  const possibleStatuses = ['active', 'inactive', 'expired']
  const possibleTypes = ['new_feed', 'normal']
  const possibleLocations = ['Siem Reap', 'Phnom Penh', 'Battambang', 'Kampot']
  const possibleOwners = [
    'John Doe',
    'Mary Smith',
    'Alice Johnson',
    'David Lee',
  ]
  const possibleCreatedBy = ['Admin', 'Manager', 'Supervisor']
  const possiblePromotionNamesEn = [
    'Super Holiday Discount',
    'Weekend Mega Sale',
    'Summer Flash Deal',
    'Limited Time Offer',
  ]
  const possiblePromotionNamesKh = [
    'ការបញ្ចុះតម្លៃថ្ងៃឈប់សម្រាក',
    'ការលក់ដាច់ចុងសប្ដាហ៍',
    'ការបញ្ចុះតម្លៃរដូវក្តៅ',
    'ការផ្តល់ជូនពិសេស',
  ]
  const images = [
    'https://nowboarding.changiairport.com/content/dam/canowboarding/homepage-carousel/travel-guide-cambodia-phnom-penh/aerial-view-royal-palace-of-phnom-penh-cambodia-1920x1080.jpg',
    'https://www.pacifichotel.asia/wp-content/uploads/2024/08/palais-royal-du-cambodge-phnom-penh-scaled-1.jpg',
    'https://www.sofitel-phnompenh-phokeethra.com/wp-content/uploads/sites/90/2022/05/RoomSuites-6-1-e1653555311291.jpg',
    'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2020/11/06/0230/Hyatt-Regency-Phnom-Penh-P007-King-Palace-View-Deluxe.jpg/Hyatt-Regency-Phnom-Penh-P007-King-Palace-View-Deluxe.16x9.jpg?imwidth=1920',
    'https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/90/2018/03/24080038/sofitel-phnompenh-phokeethra-suite-prestige-e1534498914746.jpg',
  ]

  const generateData = () => {
    const generatedData = []
    for (let i = 1; i <= 50; i++) {
      const status =
        possibleStatuses[Math.floor(Math.random() * possibleStatuses.length)]
      const type =
        possibleTypes[Math.floor(Math.random() * possibleTypes.length)]
      const location =
        possibleLocations[Math.floor(Math.random() * possibleLocations.length)]
      const owner =
        possibleOwners[Math.floor(Math.random() * possibleOwners.length)]
      const createdBy =
        possibleCreatedBy[Math.floor(Math.random() * possibleCreatedBy.length)]
      const promotionNameEn =
        possiblePromotionNamesEn[
          Math.floor(Math.random() * possiblePromotionNamesEn.length)
        ]
      const promotionNameKh =
        possiblePromotionNamesKh[
          Math.floor(Math.random() * possiblePromotionNamesKh.length)
        ]
      const startDate = dayjs()
        .add(Math.floor(Math.random() * 5), 'day')
        .format('YYYY-MM-DD')
      const expiredDate = dayjs(startDate)
        .add(Math.floor(Math.random() * 30) + 1, 'day')
        .format('YYYY-MM-DD')

      generatedData.push({
        key: `item_${i}`,
        promotion_name_en: promotionNameEn,
        promotion_name_kh: promotionNameKh,
        start_date: startDate,
        expired_date: expiredDate,
        location: location,
        location_owner: owner,
        created_by: createdBy,
        status: status,
        type: type,
        created_at: dayjs().format('YYYY-MM-DD'),
        // Use images in a cyclical manner if i exceeds images length.
        image: images[(i - 1) % images.length],
      })
    }
    setData(generatedData)
    setLoading(false)
  }

  useEffect(() => {
    generateData()
  }, [])

  // Apply filters to the data before pagination.
  const filteredData = data.filter((record) => {
    const statusMatch =
      filterStatus === 'all' || record.status.toLowerCase() === filterStatus
    const createdByMatch =
      filterCreatedBy === 'all' ||
      record.created_by.toLowerCase() === filterCreatedBy
    let dateMatch = true
    if (dateRange && dateRange.length === 2) {
      const [start, end] = dateRange
      const recordDate = dayjs(record.start_date)
      dateMatch =
        recordDate.isSame(start, 'day') ||
        recordDate.isSame(end, 'day') ||
        (recordDate.isAfter(start, 'day') && recordDate.isBefore(end, 'day'))
    }
    return statusMatch && createdByMatch && dateMatch
  })

  // Pagination logic using filtered data
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = Array.isArray(filteredData)
    ? filteredData.slice(startIndex, endIndex)
    : []

  const handleEdit = (record) => {
    setOpenEdit(true)
  }
  const handleView = (record) => {
    navigate('/promotion&event/detail')
  }
  const renderNo = (_, __, index) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  // Custom renderers for status and type tags
  const renderStatusTag = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return (
          <Tag color='green' className='px-4 '>
            Active
          </Tag>
        )
      case 'inactive':
        return (
          <Tag color='gray' className='px-3 '>
            Inactive
          </Tag>
        )
      case 'expired':
        return (
          <Tag color='red' className='px-3 '>
            Expired
          </Tag>
        )
      default:
        return <Tag>Unknown</Tag>
    }
  }

  const renderTypeTag = (type) => {
    switch (type.toLowerCase()) {
      case 'new_feed':
        return (
          <Tag color='blue' className=''>
            New Feed
          </Tag>
        )
      case 'normal':
        return <Tag className='px-4'>Normal</Tag>
      default:
        return <Tag className='px-3'>Unknown</Tag>
    }
  }

  const columns = [
    {
      title: 'No',
      width: 50,
      align: 'center',
      render: renderNo,
    },
    {
      title: 'Promotion Name (En)',
      dataIndex: 'promotion_name_en',
      key: 'promotion_name_en',
      render: (text, record) => (
        <Link
          to={`/promotion&event/detail`}
          style={{ color: '#1677ff' }}
          className='hover:underline'
        >
          {text}
        </Link>
      ),
    },
    {
      title: 'Promotion Name (Kh)',
      dataIndex: 'promotion_name_kh',
      key: 'promotion_name_kh',
      render: (text, record) => (
        <Link
          to={`/promotion&event/detail`}
          style={{ color: '#1677ff' }}
          className='hover:underline'
        >
          {text}
        </Link>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
    },
    {
      title: 'Expired Date',
      dataIndex: 'expired_date',
      key: 'expired_date',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Location Owner',
      dataIndex: 'location_owner',
      key: 'location_owner',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => renderTypeTag(type),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => renderStatusTag(status),
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      key: 'created_by',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: <span className='table-header'>Action</span>,
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      width: 50,
      render: (_, record) => (
        <div className='flex justify-center'>
          <Tooltip title='View'>
            <Button
              icon={<EyeOutlined style={{ color: 'green' }} />}
              shape='circle'
              size='small'
              onClick={() => handleView(record)}
              style={{ marginRight: 8 }}
            />
          </Tooltip>
          <Tooltip
            title={
              checkPermission(PERMS.ASSIGNED_USER)
                ? 'Edit'
                : 'You don’t have permission '
            }
          >
            <Button
              disabled={!checkPermission(PERMS.ASSIGNED_USER)}
              icon={<EditOutlined />}
              shape='circle'
              size='small'
              onClick={() => handleEdit(record)}
              style={{ marginRight: 8 }}
            />
          </Tooltip>
          {checkPermission(PERMS.ASSIGNED_USER) ? (
            <Tooltip title='Delete'>
              <Popconfirm
                title='Are you sure you want to delete this record?'
                onConfirm={() => ConfirmRemove(record)}
                okText='Yes'
                cancelText='No'
                placement='top'
              >
                <Button
                  icon={<DeleteOutlined />}
                  shape='circle'
                  size='small'
                  danger
                />
              </Popconfirm>
            </Tooltip>
          ) : (
            <Tooltip
              title={
                checkPermission(PERMS.ASSIGNED_USER)
                  ? 'Delete'
                  : 'You don’t have permission '
              }
            >
              <Button
                disabled={!checkPermission(PERMS.ASSIGNED_USER)}
                icon={<DeleteOutlined />}
                shape='circle'
                size='small'
                style={{ marginRight: 8 }}
              />
            </Tooltip>
          )}
        </div>
      ),
    },
  ]

  useEffect(() => {
    setDisplayEmitContent(
      <div className='flex justify-between my-3'>
        <div className='font-semibold' style={{ color: '#495057' }}>
          Promotion&Events
        </div>
        <Breadcrumb
          items={[
            {
              title: <HomeOutlined style={{ cursor: 'pointer' }} />,
            },
            {
              href: '',
              title: <span>Promotion&Events</span>,
            },
          ]}
        />
      </div>
    )
  }, [navigate])

  // Render card view for promotions and events with type and status tags above the title.
  // Each card displays only a single image (the record's thumbnail) and shows both location and location owner.
  const renderCardView = () => {
    return (
      <Row gutter={[16, 16]}>
        {paginatedData.map((record) => (
          <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={6} key={record.key}>
            <Card
              hoverable
              cover={
                <img
                  alt={record.promotion_name_en}
                  src={record.image}
                  style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                />
              }
              actions={[
                <Tooltip title='View' key='view'>
                  <Button
                    icon={<EyeOutlined style={{ color: 'green' }} />}
                    shape='circle'
                    size='small'
                    onClick={() => handleView(record)}
                  />
                </Tooltip>,
                <Tooltip title='Edit' key='edit'>
                  <Button
                    icon={<EditOutlined />}
                    shape='circle'
                    size='small'
                    onClick={() => handleEdit(record)}
                  />
                </Tooltip>,
                <Tooltip title='Delete' key='delete'>
                  <Popconfirm
                    title='Are you sure you want to delete this record?'
                    onConfirm={() => ConfirmRemove(record)}
                    okText='Yes'
                    cancelText='No'
                  >
                    <Button
                      icon={<DeleteOutlined />}
                      shape='circle'
                      size='small'
                      danger
                    />
                  </Popconfirm>
                </Tooltip>,
              ]}
            >
              <Card.Meta
                title={
                  <>
                    <div className='flex gap-1 mb-2'>
                      {renderTypeTag(record.type)}
                      {renderStatusTag(record.status)}
                    </div>
                    <p className='text-gray-600 text-base font-bold'>
                      {record.promotion_name_en}
                    </p>
                    <p className='text-sm font-bold text-gray-400'>
                      {record.promotion_name_kh}
                    </p>
                  </>
                }
                description={
                  <>
                    <p>
                      {record.start_date} -{' '}
                      <span className='text-red-500'>
                        {record.expired_date}
                      </span>
                    </p>
                    <p>Place: {record.location}</p>
                    <p>Owner: {record.location_owner}</p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    )
  }

  return (
    <>
      <AddPromotionAndEvent open={openAdd} setOpen={setOpenAdd} />
      <EditPromotionAndEvent open={openEdit} setOpen={setOpenEdit} />
      <Dashboard data={paginatedData} />

      <div className='mb-2 px-5 py-4 bg-white shadow-lg rounded-lg border-l-4 border-blue-500'>
        <div className='sm:flex justify-between items-center'>
          <div className='w-full md:w-full 2xl:w-5/6 sm:mx-1 md:mx-0'>
            <Search />
          </div>
          <div className='flex items-center space-x-2 mt-2 sm:mt-0 md:ml-2'>
            <Tooltip
              title={
                checkPermission(PERMS.ASSIGNED_USER)
                  ? 'Edit'
                  : 'You don’t have permission '
              }
            >
              <Button
                disabled={!checkPermission(PERMS.ASSIGNED_USER)}
                type='primary'
                style={{ background: '#1677ff' }}
                className='cursor-pointer text-white'
                onClick={() => setOpenAdd(true)}
              >
                <PlusOutlined />
                Add
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      <Card className='my-2'>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={12} xl={6}>
            <RangePicker
              style={{ width: '100%' }}
              onChange={(dates) => {
                console.log('Selected Dates:', dates)
                setDateRange(dates)
              }}
              format='YYYY-MM-DD'
            />
          </Col>
          <Col xs={24} md={12} lg={12} xl={6} xxl={4}>
            <Select
              value={filterStatus}
              onChange={(value) => {
                setFilterStatus(value)
                setCurrentPage(1)
              }}
              className='w-full'
            >
              <Option value='all'>All Status</Option>
              <Option value='active'>Active</Option>
              <Option value='inactive'>Inactive</Option>
              <Option value='expired'>Expired</Option>
            </Select>
          </Col>
          <Col xs={24} md={12} lg={12} xl={6} xxl={4}>
            <Select
              value={filterCreatedBy}
              onChange={(value) => {
                setFilterCreatedBy(value)
                setCurrentPage(1)
              }}
              className='w-full'
            >
              <Option value='all'>All Created By</Option>
              <Option value='admin'>Admin</Option>
              <Option value='manager'>Manager</Option>
              <Option value='supervisor'>Supervisor</Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={4}>
            <Select
              value={viewMode}
              onChange={(value) => setViewMode(value)}
              className='w-full'
            >
              <Option value='table'>Table View</Option>
              <Option value='card'>Card View</Option>
            </Select>
          </Col>
        </Row>
      </Card>

      {/* Added Pagination component in the middle */}

      {viewMode === 'table' ? (
        <Table
          columns={columns}
          dataSource={paginatedData}
          bordered={false}
          size='small'
          loading={loading}
          pagination={false}
          scroll={{ x: 'max-content' }}
          className='custom-table-category'
          rowClassName={(record, index) =>
            index % 2 === 0 ? 'even-row' : 'odd-row'
          }
        />
      ) : (
        renderCardView()
      )}
      <div className='flex justify-center my-4' style={{ textAlign: 'center' }}>
        <Pagination
          current={currentPage}
          total={filteredData.length}
          pageSize={pageSize}
          pageSizeOptions={[
            '10',
            '20',
            '30',
            '40',
            '50',
            '60',
            '70',
            '80',
            '90',
            '100',
          ]}
          showSizeChanger
          onChange={(page, size) => {
            setCurrentPage(page)
            setPageSize(size)
          }}
          onShowSizeChange={(current, size) => {
            setCurrentPage(1)
            setPageSize(size)
          }}
        />
      </div>
    </>
  )
}

export default PromotionAndEvents
