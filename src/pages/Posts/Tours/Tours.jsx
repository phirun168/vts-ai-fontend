import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  HomeOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {
  Button,
  Row,
  Col,
  Table,
  Tooltip,
  Popconfirm,
  Breadcrumb,
  DatePicker,
  Select,
  Card,
  Tag,
  Pagination,
} from 'antd'
import '@fortawesome/fontawesome-free/css/all.min.css'
import dayjs from 'dayjs'
import ConfirmRemove from './ConfirmRemove'
import Search from './Search'
import AddService from './Add'
import AddPromotion from './AddPromotion'
import EditService from './Edit'

const { RangePicker } = DatePicker
const { Option } = Select
import Dashboard from './dashboard/Dashboard'
import { PERMS } from '../../../constants/permission/perms'
const Tours = () => {
  const { username, access_token, checkPermission } = useContext(AuthContext)
  const { collapsed, setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()
  //CHECK PERMISSION
  useEffect(() => {
    if (!checkPermission(PERMS.TOURS_MANAGEMENT)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.TOURS_MANAGEMENT)) {
    return null
  }
  //END CHECK PERMISSION
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openPromotion, setOpenPromotion] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Filter states
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCreatedBy, setFilterCreatedBy] = useState('all')
  const [dateRange, setDateRange] = useState([])

  // View mode: table or card view
  const [viewMode, setViewMode] = useState('table')
  const images = [
    'https://nowboarding.changiairport.com/content/dam/canowboarding/homepage-carousel/travel-guide-cambodia-phnom-penh/aerial-view-royal-palace-of-phnom-penh-cambodia-1920x1080.jpg',
    'https://www.pacifichotel.asia/wp-content/uploads/2024/08/palais-royal-du-cambodge-phnom-penh-scaled-1.jpg',
    'https://www.sofitel-phnompenh-phokeethra.com/wp-content/uploads/sites/90/2022/05/RoomSuites-6-1-e1653555311291.jpg',
    'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2020/11/06/0230/Hyatt-Regency-Phnom-Penh-P007-King-Palace-View-Deluxe.jpg/Hyatt-Regency-Phnom-Penh-P007-King-Palace-View-Deluxe.16x9.jpg?imwidth=1920',
    'https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/90/2018/03/24080038/sofitel-phnompenh-phokeethra-suite-prestige-e1534498914746.jpg',
  ]

  const generateData = () => {
    const generatedData = []
    const statuses = ['active', 'inactive', 'expired']
    for (let i = 1; i <= 100; i++) {
      generatedData.push({
        key: i,
        image: images[(i - 1) % images.length],
        tour_name_en: `Angkor Tour ${i}`,
        tour_name_kh: `ទេសចរណ៍អង្គរវត្ត ${i}`,
        start_price: `$${50 + i}`,
        end_price: `$${70 + i}`,
        start_date: dayjs().subtract(i, 'day').format('YYYY-MM-DD'),
        expired_date: dayjs().add(i, 'day').format('YYYY-MM-DD'),
        province: i % 2 === 0 ? 'Siem Reap' : 'Phnom Penh',
        status: statuses[Math.floor(Math.random() * statuses.length)],
        createdAt: dayjs().subtract(i, 'day').format('YYYY-MM-DD'),
        created_by: `User ${i}`,
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
    const statusMatch = filterStatus === 'all' || record.status === filterStatus
    const createdByMatch =
      filterCreatedBy === 'all' ||
      record.created_by.toLowerCase() === filterCreatedBy.toLowerCase()
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

  // Slice filtered data based on currentPage and pageSize
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      align: 'center',
      width: 50,
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Tours Name (En)',
      dataIndex: 'tour_name_en',
      key: 'tour_name_en',
      align: 'center',
      sorter: (a, b) => a.tour_name_en.localeCompare(b.tour_name_en),
      render: (text, record) => (
        <Link to={`/tours/detail`} style={{ color: '#1677ff' }}>
          {text}
        </Link>
      ),
    },
    {
      title: 'Tours Name (Kh)',
      dataIndex: 'tour_name_kh',
      key: 'tour_name_kh',
      align: 'center',
      sorter: (a, b) => a.tour_name_kh.localeCompare(b.tour_name_kh),
      render: (text, record) => (
        <Link to={`/tours/detail`} style={{ color: '#1677ff' }}>
          {text}
        </Link>
      ),
    },
    {
      title: 'Start Price',
      dataIndex: 'start_price',
      key: 'start_price',
      align: 'center',
      render: (text, record) => <>{record.start_price}</>,
    },
    {
      title: 'End Price',
      dataIndex: 'end_price',
      key: 'end_price',
      align: 'center',
      render: (text, record) => <>{record.end_price}</>,
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
      title: 'Province',
      dataIndex: 'province',
      key: 'province',
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
      align: 'center',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
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

  // Manual pagination props
  const paginationProps = {
    current: currentPage,
    pageSize: pageSize,
    total: filteredData.length,
    onChange: (page, newPageSize) => {
      setCurrentPage(page)
      setPageSize(newPageSize)
    },
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  }

  useEffect(() => {
    setDisplayEmitContent(
      <div className='flex justify-between my-3'>
        <div className='font-semibold' style={{ color: '#495057' }}>
          Tours
        </div>
        <Breadcrumb
          items={[
            {
              title: <HomeOutlined style={{ cursor: 'pointer' }} />,
            },
            {
              href: '',
              title: <span>Tours</span>,
            },
          ]}
        />
      </div>
    )
  }, [navigate, setDisplayEmitContent])

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

  const renderCardView = () => {
    return (
      <Row gutter={[16, 16]}>
        {paginatedData.map((record) => (
          <Col key={record.key} xs={24} sm={12} md={12} lg={8} xl={6}>
            <Card
              hoverable
              cover={
                <img
                  alt={record.tour_name_en}
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
                    onClick={() => navigate('/tours/detail')}
                  />
                </Tooltip>,
                <Tooltip title='Edit' key='edit'>
                  <Button
                    icon={<EditOutlined />}
                    shape='circle'
                    size='small'
                    onClick={() => setOpenEdit(true)}
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
                    <div className='mb-2'>{renderStatusTag(record.status)}</div>
                    <div className='text-gray-600 text-base font-bold'>
                      {record.tour_name_en}
                    </div>
                    <div className='text-sm font-bold  text-gray-400'>
                      {record.tour_name_kh}
                    </div>
                  </>
                }
                description={
                  <>
                    <p className='font-semibold'>
                      {/* <strong> */} {record.start_date} -{' '}
                      <span className='text-red-500'>
                        {record.expired_date}
                      </span>
                      {/* </strong> */}
                    </p>

                    <p className=''>
                      <strong>Province: </strong>
                      <span className=''> {record.province}</span>
                    </p>
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
      <AddService open={openAdd} setOpen={setOpenAdd} />
      <EditService open={openEdit} setOpen={setOpenEdit} />
      <AddPromotion open={openPromotion} setOpen={setOpenPromotion} />

      <Dashboard data={data} />
      <div className='mb-2 px-5 py-4 bg-white shadow-lg rounded-lg border-l-4 border-blue-500'>
        <div className='sm:flex justify-between items-center'>
          <div className='w-full md:w-full 2xl:w-5/6 sm:mx-1 md:mx-0'>
            <Search />
          </div>
          <div className='flex items-center space-x-2 mt-2 sm:mt-0 md:ml-2'>
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

      <Card className='my-2'>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={12} xl={6}>
            <RangePicker
              style={{ width: '100%' }}
              onChange={(dates) => setDateRange(dates)}
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
      {viewMode === 'table' ? (
        <div className='relative'>
          <Table
            columns={columns}
            dataSource={paginatedData}
            loading={loading}
            pagination={false}
            scroll={{ x: 'max-content' }}
            rowKey='key'
          />
        </div>
      ) : (
        renderCardView()
      )}
      <div className='flex justify-center my-4'>
        <Pagination {...paginationProps} />
      </div>
    </>
  )
}

export default Tours
