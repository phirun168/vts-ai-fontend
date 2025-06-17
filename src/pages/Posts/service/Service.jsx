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
  Card,
  DatePicker,
  Select,
  Pagination,
  Tag,
} from 'antd'
import '@fortawesome/fontawesome-free/css/all.min.css'
import dayjs from 'dayjs'
import ConfirmRemove from './ConfirmRemove'
import Search from './Search'
import AddService from './Add'
import AddPromotion from './AddPromotion'
import EditService from './Edit'
import Dashboard from './dashboard/Dashboard'
import { Link as RouterLink } from 'react-router-dom'
import { PERMS } from '../../../constants/permission/perms'

const { RangePicker } = DatePicker
const { Option } = Select
const pageSizeOptions = ['10', '20', '50']

// Helper function to choose promotion banner color based on type
const getPromotionColor = (discountType) => {
  switch (discountType) {
    case 'percentage':
      return '#16a34a' // green
    case 'cash':
      return '#2563eb' // blue
    case 'text':
      return '#9333ea' // purple
    default:
      return '#000'
  }
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

const Service = () => {
  const { username, access_token, checkPermission } = useContext(AuthContext)
  const { collapsed, setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()
  //CHECK PERMISSION
  useEffect(() => {
    if (!checkPermission(PERMS.SERVICE_MANAGEMENT)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.SERVICE_MANAGEMENT)) {
    return null
  }
  //END CHECK PERMISSION
  // Declare missing filter state variables:
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCreatedBy, setFilterCreatedBy] = useState('all')
  const [dateRange, setDateRange] = useState([])

  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openPromotion, setOpenPromotion] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]) // Track selected rows
  const [searchValue, setSearchValue] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [viewMode, setViewMode] = useState('table') // 'table' or 'card'

  // Sample images array – these images will be assigned to cards in card view.
  const images = [
    'https://nowboarding.changiairport.com/content/dam/canowboarding/homepage-carousel/travel-guide-cambodia-phnom-penh/aerial-view-royal-palace-of-phnom-penh-cambodia-1920x1080.jpg',
    'https://www.pacifichotel.asia/wp-content/uploads/2024/08/palais-royal-du-cambodge-phnom-penh-scaled-1.jpg',
    'https://www.sofitel-phnompenh-phokeethra.com/wp-content/uploads/sites/90/2022/05/RoomSuites-6-1-e1653555311291.jpg',
    'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2020/11/06/0230/Hyatt-Regency-Phnom-Penh-P007-King-Palace-View-Deluxe.jpg/Hyatt-Regency-Phnom-Penh-P007-King-Palace-View-Deluxe.16x9.jpg?imwidth=1920',
    'https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/90/2018/03/24080038/sofitel-phnompenh-phokeethra-suite-prestige-e1534498914746.jpg',
  ]

  const possibleStatuses = ['active', 'inactive', 'expired']
  const possibleServiceNamesEn = [
    'Luxury Spa Treatment',
    'City Tour Guide',
    'Gourmet Cooking Class',
    'Private Boat Cruise',
    'Adventure Trekking',
  ]
  const possibleServiceNamesKh = [
    'សេវាកម្មសម្រាកលំហែប្រណិត',
    'មគ្គុទេសក៍ទេសចរណ៍ទីក្រុង',
    'ថ្នាក់បង្រៀនធ្វើម្ហូបប្រណិត',
    'ការជិះទូកឯកជន',
    'ការធ្វើដំណើរផ្សងព្រេង',
  ]
  const possibleCreatedBy = ['Admin', 'User 1', 'User 2', 'Manager']
  const discountTypes = ['percentage', 'cash', 'text']
  const discountValues = ['10%', '$10.00', 'Special Offer']

  useEffect(() => {
    setSelectedRowKeys([])
  }, [viewMode])

  const generateData = () => {
    const generatedData = []
    for (let i = 1; i <= 50; i++) {
      const status =
        possibleStatuses[Math.floor(Math.random() * possibleStatuses.length)]
      const serviceNameEn =
        possibleServiceNamesEn[
          Math.floor(Math.random() * possibleServiceNamesEn.length)
        ]
      const serviceNameKh =
        possibleServiceNamesKh[
          Math.floor(Math.random() * possibleServiceNamesKh.length)
        ]
      const createdBy =
        possibleCreatedBy[Math.floor(Math.random() * possibleCreatedBy.length)]

      // 50% chance to have promotion or not
      let discountType = ''
      let discountValue = ''
      if (Math.random() > 0.5) {
        discountType =
          discountTypes[Math.floor(Math.random() * discountTypes.length)]
        discountValue =
          discountValues[Math.floor(Math.random() * discountValues.length)]
      }

      const startDate = dayjs()
        .subtract(Math.floor(Math.random() * 30), 'day')
        .format('YYYY-MM-DD')
      const expiredDate = dayjs(startDate)
        .add(Math.floor(Math.random() * 30) + 1, 'day')
        .format('YYYY-MM-DD')

      generatedData.push({
        key: `item_${i}`,
        service_name_en: serviceNameEn,
        service_name_kh: serviceNameKh,
        price: '$60.00',
        discountType: discountType,
        discountValue: discountValue,
        start_date: startDate,
        expired_date: expiredDate,
        status: status,
        createdAt: dayjs().subtract(i, 'day').format('YYYY-MM-DD'),
        created_by: createdBy,
      })
    }
    setData(generatedData)
    setLoading(false)
  }

  useEffect(() => {
    generateData()
  }, [])

  // Update filteredData to include status, created_by, and date range filters:
  const filteredData = data.filter((item) => {
    // Check search value against service names
    const matchesSearch =
      item.service_name_en.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.service_name_kh.toLowerCase().includes(searchValue.toLowerCase())

    // Check status filter (if set to 'all', pass; otherwise, compare)
    const matchesStatus =
      filterStatus === 'all' || item.status.toLowerCase() === filterStatus

    // Check created_by filter (if set to 'all', pass; otherwise, compare)
    const matchesCreatedBy =
      filterCreatedBy === 'all' ||
      item.created_by.toLowerCase() === filterCreatedBy.toLowerCase()

    // Check date range filter against the item's start_date (if provided)
    let matchesDate = true
    if (dateRange && dateRange.length === 2) {
      const [start, end] = dateRange
      const itemDate = dayjs(item.start_date)
      matchesDate =
        itemDate.isSame(start, 'day') ||
        itemDate.isSame(end, 'day') ||
        (itemDate.isAfter(start) && itemDate.isBefore(end))
    }
    return matchesSearch && matchesStatus && matchesCreatedBy && matchesDate
  })

  const renderNo = (_, __, index) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const handleView = () => {
    navigate('/service/detail')
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      align: 'center',
      width: 50,
      render: renderNo,
    },
    {
      title: 'Service Name En',
      dataIndex: 'service_name_en',
      key: 'service_name_en',
      align: 'center',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, record) => (
        <RouterLink
          to={`/service/detail`}
          style={{ color: '#1677ff' }}
          className='hover:underline'
        >
          {text}
        </RouterLink>
      ),
    },
    {
      title: 'Service Name Kh',
      dataIndex: 'service_name_kh',
      key: 'service_name_kh',
      align: 'center',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, record) => (
        <RouterLink
          to={`/service/detail`}
          style={{ color: '#1677ff' }}
          className='hover:underline'
        >
          {text}
        </RouterLink>
      ),
    },
    {
      title: 'Type Of Service',
      dataIndex: 'type_service',
      key: 'type_service',
      align: 'center',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (text, record) => <>60$</>,
    },
    {
      title: 'Discount',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (text, record) => {
        const { discountType, discountValue } = record
        if (discountType === 'percentage') {
          return (
            <p className='text-green-600 font-bold text-xs'>
              {discountValue} Off
            </p>
          )
        } else if (discountType === 'cash') {
          return (
            <>
              <p className='text-gray-500 line-through text-xs'>$60.00</p>
              <p className='text-green-600 font-bold text-xs'>
                {discountValue}
              </p>
            </>
          )
        } else if (discountType === 'text') {
          return (
            <p className='text-blue-600 font-bold text-xs'>{discountValue}</p>
          )
        }
        return null
      },
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => renderStatusTag(status),
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      key: 'created_by',
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

  // Handle search value update from Search component
  const handleSearchValueChange = (value) => {
    setSearchValue(value)
    setCurrentPage(1)
  }

  // External Pagination config
  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: filteredData.length,
    onChange: (page, size) => {
      setCurrentPage(page)
      setPageSize(size)
    },
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  }

  // Calculate paginated data for both Table and Card views
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  useEffect(() => {
    setDisplayEmitContent(
      <div className='flex justify-between my-3'>
        <div className='font-semibold' style={{ color: '#495057' }}>
          Service
        </div>
        <Breadcrumb
          items={[
            { title: <HomeOutlined style={{ cursor: 'pointer' }} /> },
            { href: '', title: <span>Service</span> },
          ]}
        />
      </div>
    )
  }, [navigate, setDisplayEmitContent])

  const addMention = () => {
    setOpenAdd(true)
  }

  // Define rowSelection for Table view
  const rowSelection = {
    type: 'radio',
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
  }

  return (
    <>
      <AddService open={openAdd} setOpen={setOpenAdd} />
      <EditService open={openEdit} setOpen={setOpenEdit} />
      <AddPromotion open={openPromotion} setOpen={setOpenPromotion} />
      <Dashboard data={data} />
      <div className='mb-2 px-5 py-4 bg-white shadow-lg rounded-lg border-l-4 border-blue-500'>
        <Row gutter={[0, 8]}>
          <Col xs={24} sm={21} lg={21} xl={21}>
            <Search onSearch={handleSearchValueChange} />
          </Col>
          <Col
            xs={24}
            sm={3}
            className='flex justify-end items-center space-x-1'
          >
            {selectedRowKeys?.length > 0 ? (
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
                  onClick={() => addMention(true)}
                >
                  <PlusOutlined />
                  Add Promotion
                </Button>
              </Tooltip>
            ) : (
              ''
            )}
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
                onClick={() => addMention(true)}
              >
                <PlusOutlined />
                Add
              </Button>
            </Tooltip>
          </Col>
        </Row>
      </div>
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

      <div className='relative'>
        {viewMode === 'table' ? (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={paginatedData} // Only display current page's data
            loading={loading}
            pagination={false} // Disable built-in Table pagination
            scroll={{ x: 'max-content' }}
            rowKey='key'
          />
        ) : (
          <Row gutter={[16, 16]}>
            {paginatedData.map((item, index) => (
              <Col key={item?.key} xs={24} sm={12} md={12} lg={8} xl={6}>
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
                      <img
                        src={images[index % images.length]}
                        alt='Service'
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
                            left: 8,
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
                        icon={<EyeOutlined />}
                        size='small'
                        onClick={() => handleView(item)}
                      />
                    </Tooltip>,
                    <Tooltip title='Edit' key='edit'>
                      <Button
                        icon={<EditOutlined />}
                        size='small'
                        onClick={() => setOpenEdit(true)}
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
                    item.discountValue?.length === 0 ? (
                      <Tooltip title='Add Promotion' key='promo'>
                        <Button
                          icon={<PlusOutlined />}
                          size='small'
                          onClick={() => setOpenPromotion(true)}
                        />
                      </Tooltip>
                    ) : (
                      'Remove'
                    ),
                  ]}
                >
                  <Card.Meta
                    title={
                      <>
                        <div>
                          {renderStatusTag(item.status)}
                          <div className='font-bold  text-gray-600 text-base'>
                            {item.service_name_en}
                          </div>
                          <div className='text-sm font-bold text-gray-400'>
                            {item.service_name_kh}
                          </div>
                        </div>
                      </>
                    }
                    description={
                      <>
                        <p>
                          <strong>Price:</strong> {item.price}
                        </p>
                        <p>
                          <strong>Discount:</strong> {item.discountValue} (
                          {item.discountType})
                        </p>
                        <p>
                          <strong>Start Date:</strong> {item.start_date}
                        </p>
                        <p>
                          <strong>Expired Date:</strong> {item.expired_date}
                        </p>
                        <p>
                          <strong>Created At:</strong> {item.createdAt}
                        </p>
                        <p>
                          <strong>Created By:</strong> {item.created_by}
                        </p>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
        <div className='mt-4 flex justify-center'>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredData.length}
            onChange={(page, size) => {
              setCurrentPage(page)
              setPageSize(size)
            }}
            pageSizeOptions={['10', '20', '50', '100']}
            showSizeChanger
          />
        </div>
      </div>
    </>
  )
}

export default Service
