import {
  PlusOutlined,
  HomeOutlined,
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Table,
  Tooltip,
  DatePicker,
  Tag,
} from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import AddHightlight from './Add'
import EditHightlight from './Edit'
import Dashboard from './dashboard/Dashboard'
import ConfirmRemove from './ConfirmRemove'
import Search from './Search'
import dayjs from 'dayjs'
import { PERMS } from '../../../constants/permission/perms'
import { AuthContext } from '../../../contexts/AuthContext'

const { RangePicker } = DatePicker
const { Option } = Select
const pageSizeOptions = ['10', '20', '50']

// Sample images array for card cover (update URLs as needed)
const images = [
  'https://nowboarding.changiairport.com/content/dam/canowboarding/homepage-carousel/travel-guide-cambodia-phnom-penh/aerial-view-royal-palace-of-phnom-penh-cambodia-1920x1080.jpg',
  'https://www.pacifichotel.asia/wp-content/uploads/2024/08/palais-royal-du-cambodge-phnom-penh-scaled-1.jpg',
  'https://www.sofitel-phnompenh-phokeethra.com/wp-content/uploads/sites/90/2022/05/RoomSuites-6-1-e1653555311291.jpg',
  'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2020/11/06/0230/Hyatt-Regency-Phnom-Penh-P007-King-Palace-View-Deluxe.jpg/Hyatt-Regency-Phnom-Penh-P007-King-Palace-View-Deluxe.16x9.jpg?imwidth=1920',
  'https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/90/2018/03/24080038/sofitel-phnompenh-phokeethra-suite-prestige-e1534498914746.jpg',
]

// Helper for promotion color (if needed)

const AdditionalService = () => {
  // Added searchValue state for filtering
  const [searchValue, setSearchValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const { username, access_token, checkPermission } = useContext(AuthContext)

  // FIX: Added filter state declarations:
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCreatedBy, setFilterCreatedBy] = useState('all')
  const [dateRange, setDateRange] = useState([])

  const { collapsed, setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()
  //CHECK PERMISSION
  useEffect(() => {
    if (!checkPermission(PERMS.ADDITIONAL_SERVICE_MANAGEMENT)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.ADDITIONAL_SERVICE_MANAGEMENT)) {
    return null
  }
  //END CHECK PERMISSION

  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [viewMode, setViewMode] = useState('table') // 'table' or 'card'

  // Generate sample data for Additional Service
  const generateData = () => {
    const generatedData = []
    for (let i = 1; i <= 50; i++) {
      generatedData.push({
        key: `item_${i}`,
        additional_service_en: `Additional Service EN ${i}`,
        additional_service_kh: `សេវាកម្មបន្ថែម ខ្មែរ ${i}`,
        place_name: `Place ${i}`,
        status: i % 2 === 0 ? 'Active' : i % 3 === 0 ? 'Inactive' : 'Expired',
        start_date: dayjs().subtract(i, 'day').format('YYYY-MM-DD'),
        expired_date: dayjs().add(i, 'day').format('YYYY-MM-DD'),
        created_by: i % 2 === 0 ? 'User 1' : 'User 2',
        createdAt: dayjs().subtract(i, 'day').format('YYYY-MM-DD'),
      })
    }
    setData(generatedData)
    setLoading(false)
  }

  useEffect(() => {
    generateData()
  }, [])

  // Handle search value update from Search component
  const handleSearchValueChange = (value) => {
    setSearchValue(value)
    setCurrentPage(1)
  }

  // Handle date range change (if needed for filtering)
  const handleDateRangeChange = (dates) => {
    setDateRange(dates)
    setCurrentPage(1)
  }

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

  // Update filteredData to include all filters (search, category, status, createdBy, date range)
  const filteredData = data.filter((item) => {
    const searchText = searchValue.toLowerCase()
    const matchService =
      item.additional_service_en.toLowerCase().includes(searchText) ||
      item.additional_service_kh.toLowerCase().includes(searchText)
    const matchCategory = selectedCategory
      ? item.category === selectedCategory
      : true
    const matchStatus =
      filterStatus === 'all' || item.status.toLowerCase() === filterStatus
    const matchCreatedBy =
      filterCreatedBy === 'all' ||
      item.created_by.toLowerCase() === filterCreatedBy.toLowerCase()
    let matchDate = true
    if (dateRange && dateRange.length === 2) {
      const [start, end] = dateRange
      const itemDate = dayjs(item.start_date)
      matchDate =
        itemDate.isSame(start, 'day') ||
        itemDate.isSame(end, 'day') ||
        (itemDate.isAfter(start) && itemDate.isBefore(end))
    }
    return (
      matchService &&
      matchCategory &&
      matchStatus &&
      matchCreatedBy &&
      matchDate
    )
  })

  // Pagination logic for table view
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = filteredData.slice(startIndex, endIndex)

  const renderNo = (_, __, index) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  // Action handlers
  const handleView = (record) => {
    navigate('/additional/service/detail')
  }

  const handleEdit = (record) => {
    setOpenEdit(true)
  }

  const handleDelete = (record) => {
    ConfirmRemove(record)
  }

  // Table columns for table view
  const columns = [
    {
      title: 'No',
      key: 'no',
      align: 'center',
      width: 50,
      render: renderNo,
    },
    {
      title: 'Additional Service (En)',
      dataIndex: 'additional_service_en',
      key: 'additional_service_en',
      align: 'center',
      render: (text, record) => (
        <p
          className='text-blue-500 cursor-pointer'
          onClick={() => handleView(record)}
        >
          {text}
        </p>
      ),
    },
    {
      title: 'Additional Service (Kh)',
      dataIndex: 'additional_service_kh',
      key: 'additional_service_kh',
      align: 'center',
      render: (text, record) => (
        <p
          className='text-blue-500 cursor-pointer'
          onClick={() => handleView(record)}
        >
          {text}
        </p>
      ),
    },

    {
      title: 'Place Name',
      dataIndex: 'place_name',
      key: 'place_name',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => renderStatusTag(status),
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
      align: 'center',
    },
    {
      title: 'Expired Date',
      dataIndex: 'expired_date',
      key: 'expired_date',
      align: 'center',
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      key: 'created_by',
      align: 'center',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: 80,
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

  // Update header content
  useEffect(() => {
    setDisplayEmitContent(
      <div className='flex justify-between my-3'>
        <div className='font-semibold' style={{ color: '#495057' }}>
          Additional Service
        </div>
        <Breadcrumb
          items={[
            { title: <HomeOutlined style={{ cursor: 'pointer' }} /> },
            { href: '', title: <span>Additional</span> },
            { href: '', title: <span>Service</span> },
          ]}
        />
      </div>
    )
  }, [navigate, setDisplayEmitContent])

  return (
    <div className=''>
      <AddHightlight open={openAdd} setOpen={setOpenAdd} />
      <EditHightlight open={openEdit} setOpen={setOpenEdit} />
      {/* Dashboard Section */}
      <Dashboard data={data} />
      {/* Header with Search and Add button */}
      <div className='mb-2 px-5 py-4 bg-white shadow-lg rounded-lg border-l-4 border-blue-500'>
        <Row gutter={[0, 8]}>
          <Col xs={24} sm={21} lg={21} xl={21}>
            <Search onSearch={handleSearchValueChange} />
          </Col>
          <Col xs={24} sm={3} className='flex justify-end items-center'>
            <Tooltip
              title={
                checkPermission(PERMS.ASSIGNED_USER)
                  ? ''
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
          </Col>
        </Row>
      </div>
      {/* New header row: RangePicker on the left, View toggle on the right */}
      <Card className='my-2'>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={12} xl={6}>
            <RangePicker
              style={{ width: '100%' }}
              onChange={(dates) => {
                handleDateRangeChange(dates)
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
      {/* Conditionally render Table view or Card view */}
      {viewMode === 'table' ? (
        <Table
          columns={columns}
          dataSource={paginatedData}
          pagination={false} // disable internal pagination
          bordered={false}
          size='small'
          loading={loading}
          scroll={{ x: 'max-content' }}
          rowKey='key'
        />
      ) : (
        <div
          className='grid gap-5'
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          }}
        >
          {paginatedData.map((item, index) => (
            <Card
              key={item.key}
              bordered={false}
              className='transition-transform duration-300 hover:scale-105 cursor-pointer'
              style={{
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
              cover={
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      zIndex: 1,
                      display: 'flex',
                      gap: '4px',
                      flexWrap: 'wrap',
                    }}
                  >
                    {item.status === 'Active' ? (
                      <span
                        style={{
                          backgroundColor: '#16a34a',
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                        }}
                      >
                        Active
                      </span>
                    ) : item.status === 'Inactive' ? (
                      <span
                        style={{
                          backgroundColor: '#808080',
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                        }}
                      >
                        Inactive
                      </span>
                    ) : (
                      <span
                        style={{
                          backgroundColor: '#dc2626',
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                        }}
                      >
                        Expired
                      </span>
                    )}
                  </div>
                  <img
                    src={images[index % images.length]}
                    alt='Additional Service'
                    style={{
                      height: '150px',
                      objectFit: 'cover',
                      width: '100%',
                    }}
                  />
                </div>
              }
              actions={[
                <Tooltip title='View' key='view'>
                  <Button
                    icon={<EyeOutlined style={{ color: 'green' }} />}
                    size='small'
                    onClick={() => handleView(item)}
                  />
                </Tooltip>,
                <Tooltip title='Edit' key='edit'>
                  <Button
                    icon={<EditOutlined />}
                    size='small'
                    onClick={() => handleEdit(item)}
                  />
                </Tooltip>,
                <Tooltip title='Delete' key='delete'>
                  <Popconfirm
                    title='Are you sure you want to delete this record?'
                    onConfirm={() => handleDelete(item)}
                    okText='Yes'
                    cancelText='No'
                    placement='top'
                  >
                    <Button icon={<DeleteOutlined />} size='small' danger />
                  </Popconfirm>
                </Tooltip>,
              ]}
            >
              <Card.Meta
                title={
                  <>
                    <div className='font-bold text-gray-600 text-base'>
                      {item.additional_service_en}
                    </div>
                    <div className='text-sm font-bol text-gray-400'>
                      {item.additional_service_kh}
                    </div>
                  </>
                }
                description={
                  <>
                    <p>
                      <strong>Place:</strong> {item.place_name}
                    </p>
                    <p>
                      <strong>Status:</strong> {item.status}
                    </p>
                    <p>
                      <strong>Start:</strong> {item.start_date}
                    </p>
                    <p>
                      <strong>Expired:</strong> {item.expired_date}
                    </p>
                    <p>
                      <strong>Created By:</strong> {item.created_by}
                    </p>
                    <p>
                      <strong>Created At:</strong> {item.createdAt}
                    </p>
                  </>
                }
              />
            </Card>
          ))}
        </div>
      )}
      <div
        style={{ textAlign: 'center', marginTop: '16px' }}
        className='flex justify-center'
      >
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredData.length}
          onChange={(page, size) => {
            setCurrentPage(page)
            setPageSize(size)
          }}
          pageSizeOptions={pageSizeOptions}
          showSizeChanger
        />
      </div>
    </div>
  )
}

export default AdditionalService
