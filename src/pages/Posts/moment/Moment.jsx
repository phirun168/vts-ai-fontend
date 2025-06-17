import React, { useContext, useEffect, useState } from 'react'
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
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileImageOutlined,
  HomeOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'

import { AuthContext } from '../../../contexts/AuthContext'
import SearchType from './SearchMoment'
import AddType from './Add'
import EditType from './Edit'
import ConfirmRemove from './ConfirmRemove'
import Dashboard from './dashboard/Dashboard'
import './Moment.scss'
import { PERMS } from '../../../constants/permission/perms'

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

// Helper function for promotion color (if needed)
const getPromotionColor = (discountType) => {
  switch (discountType) {
    case 'percentage':
      return '#16a34a'
    case 'cash':
      return '#2563eb'
    case 'text':
      return '#9333ea'
    default:
      return '#000'
  }
}

const Moments = () => {
  const { access_token, checkPermission } = useContext(AuthContext)
  const navigate = useNavigate()
  const { collapsed, setDisplayEmitContent } = useOutletContext()
  //CHECK PERMISSION
  useEffect(() => {
    if (!checkPermission(PERMS.MOMENT_MANAGEMENT)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.MOMENT_MANAGEMENT)) {
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
  const [selectedOption, setSelectedOption] = useState('')
  const [viewMode, setViewMode] = useState('table') // 'table' or 'card'

  // Added filter state declarations
  const [searchValue, setSearchValue] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCreatedBy, setFilterCreatedBy] = useState('all')
  const [dateRange, setDateRange] = useState([])

  // Generate sample data
  const generateData = () => {
    const generatedData = []
    for (let i = 1; i <= 15; i++) {
      generatedData.push({
        key: i,
        moment_name_en: `Moment EN ${i}`,
        moment_name_kh: `ម៉ូមិនខ្មែរ ${i}`,
        location_province_category: `Province ${i}`,
        location: `Sample Place ${i}`,
        location_owner: `Place Owner ${i}`,
        hashtags: [`#hashtag${i}`, `#moment${i}`],
        status: i % 2 === 0 ? 'Active' : i % 3 === 1 ? 'Inactive' : 'Expired',
        type: i % 2 === 0 ? 'New Feed' : 'Normal',
        created_by: i % 2 === 0 ? 'John Smith' : 'Jane Doe',
        // Added created_at field for filtering by date range
        created_at: dayjs().subtract(i, 'day').format('YYYY-MM-DD'),
      })
    }
    setData(generatedData)
    setLoading(false)
  }

  useEffect(() => {
    generateData()
  }, [])

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

  // Update filteredData to include all filters (search, status, created_by, date range)
  const filteredData = data.filter((item) => {
    const searchText = searchValue.toLowerCase()
    const matchService =
      item.moment_name_en.toLowerCase().includes(searchText) ||
      item.moment_name_kh.toLowerCase().includes(searchText)
    const matchStatus =
      filterStatus === 'all' || item.status.toLowerCase() === filterStatus
    const matchCreatedBy =
      filterCreatedBy === 'all' ||
      item.created_by.toLowerCase() === filterCreatedBy.toLowerCase()
    let matchDate = true
    if (dateRange && dateRange.length === 2) {
      const [start, end] = dateRange
      const itemDate = dayjs(item.created_at)
      matchDate =
        itemDate.isSame(start, 'day') ||
        itemDate.isSame(end, 'day') ||
        (itemDate.isAfter(start) && itemDate.isBefore(end))
    }
    return matchService && matchStatus && matchCreatedBy && matchDate
  })

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = filteredData.slice(startIndex, endIndex)

  const renderNo = (_, __, index) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const handleEdit = (record) => {
    setOpenEdit(true)
  }
  const handleView = (record) => {
    navigate('/moment/detail')
  }
  const handleDelete = (record) => {
    setConfirmDelete(true)
  }

  const columns = [
    {
      title: 'No',
      width: 50,
      align: 'center',
      render: renderNo,
    },
    {
      title: 'Moment Name (En)',
      dataIndex: 'moment_name_en',
      key: 'moment_name_en',
      render: (text) => (
        <Link
          to='/moment/detail'
          style={{ color: '#3085d6', textDecoration: 'none' }}
        >
          {text}
        </Link>
      ),
    },
    {
      title: 'Moment Name (Kh)',
      dataIndex: 'moment_name_kh',
      key: 'moment_name_kh',
      render: (text) => (
        <Link
          to='/moment/detail'
          style={{ color: '#3085d6', textDecoration: 'none' }}
        >
          {text}
        </Link>
      ),
    },
    {
      title: 'Place | Province | Category',
      dataIndex: 'location_province_category',
      key: 'location_province_category',
    },
    {
      title: 'Place',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Place Owner',
      dataIndex: 'location_owner',
      key: 'location_owner',
    },
    {
      title: 'Hashtags',
      dataIndex: 'hashtags',
      key: 'hashtags',
      render: (hashtags) => (hashtags ? hashtags.length : 0),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
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
          Moment
        </div>
        <Breadcrumb
          items={[
            { title: <HomeOutlined style={{ cursor: 'pointer' }} /> },
            { href: '', title: <span>Moment</span> },
          ]}
        />
      </div>
    )
  }, [navigate, setDisplayEmitContent])

  return (
    <>
      <AddType open={openAdd} setOpen={setOpenAdd} />
      <EditType open={openEdit} setOpen={setOpenEdit} />
      <Dashboard data={data} />
      {/* Header with Search, view toggle and Add button */}
      <div className='mb-2 px-5 py-4 bg-white shadow-lg rounded-lg border-l-4 border-blue-500'>
        <div className='sm:flex justify-between items-center'>
          <div className='w-full md:w-full 2xl:w-5/6 sm:mx-1 md:mx-0'>
            <SearchType onSearch={setSearchValue} />
          </div>
          <div className='flex items-center space-x-2'>
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
          </div>
        </div>
      </div>
      {/* New header row: RangePicker on the left, filter Selects on the right */}
      <Card className='my-2'>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={12} xl={6}>
            <RangePicker
              style={{ width: '100%' }}
              onChange={(dates) => {
                setDateRange(dates)
                setCurrentPage(1)
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
          bordered={false}
          size='small'
          loading={loading}
          pagination={false}
          scroll={{ x: 'max-content' }}
          className='custom-table-category'
          rowKey='key'
        />
      ) : (
        <Row gutter={[16, 16]}>
          {paginatedData.map((item, index) => (
            <Col key={item.key} xs={24} sm={12} md={12} lg={8} xl={6} xxl={6}>
              <Card
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
                      alt='Moment'
                      style={{
                        height: '150px',
                        objectFit: 'cover',
                        width: '100%',
                      }}
                    />
                    {item.discountType && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          background: getPromotionColor(item.discountType),
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                        }}
                      >
                        {item.discountType === 'percentage'
                          ? `${item.discountValue} OFF`
                          : item.discountType === 'cash'
                            ? `${item.discountValue} OFF`
                            : item.discountType === 'text'
                              ? item.discountValue
                              : ''}
                      </div>
                    )}
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
                      onConfirm={() => ConfirmRemove(item)}
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
                        <strong>Created At:</strong> {item.created_at}
                      </p>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
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
    </>
  )
}

export default Moments
