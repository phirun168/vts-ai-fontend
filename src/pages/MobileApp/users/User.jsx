import React, { useState, useEffect, useContext, useRef } from 'react'
import {
  Avatar,
  Button,
  Card,
  Col,
  Row,
  Tabs,
  Breadcrumb,
  Table,
  Tooltip,
  Select,
  DatePicker,
} from 'antd'
import { HomeOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'

import Search from './Search'
import MobileAppUserServices from '../../../services/mobiles/apps/user'
import dayjs from 'dayjs'
import FileUtils from '../../../utils/helpFunctions'
import GroupBtn from '../../../components/GroupBtn'
import Dashboard from './Dashboard/Dashboard'
import Swal from 'sweetalert2'
import { PERMS } from '../../../constants/permission/perms'

const { Option } = Select
const { RangePicker } = DatePicker

const MobileUsersList = () => {
  const { access_token, checkPermission } = useContext(AuthContext)
  const { collapsed, setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()
  //CHECK PERMISSION
  useEffect(() => {
    if (!checkPermission(PERMS.APP_USER_MANAGEMENT)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.APP_USER_MANAGEMENT)) {
    return null
  }
  //END CHECK PERMISSION
  // State for user apps and filters
  const [userApps, setUsersApp] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  // Added viewMode state to control Table vs. Card view
  const [viewMode, setViewMode] = useState('table')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCreatedBy, setFilterCreatedBy] = useState('all')
  const [filterBusiness, setFilterBusiness] = useState('all')
  const [dateRange, setDateRange] = useState([])

  const onChangeRef = useRef(null)

  const getUserApp = async () => {
    try {
      const userApp = await MobileAppUserServices.fetchUserApp({ access_token })
      if (userApp) {
        setUsersApp(userApp)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserApp()
  }, [])

  // Handle search change
  const handleChangeSearch = async (value) => {
    try {
      const doc = { search: value }
      const userApp = await MobileAppUserServices.fetchUserApp({
        doc,
        access_token,
      })
      if (userApp) {
        setUsersApp(userApp)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const handleView = (record) => {
    navigate(`/app/user/profile/${record?._id}`)
  }

  const renderNo = (_, __, index) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  // Function to show preview using SweetAlert2
  const showPreview = (imageUrl) => {
    Swal.fire({
      imageUrl: imageUrl,
      imageAlt: 'Profile Preview',
      showCloseButton: false,
      confirmButtonText: 'Close',
      imageHeight: 400, // Limit image height
      width: 400,
    })
  }

  // Filtering logic: filter by status, createdBy, business type and date range
  const filteredUserApps = userApps.filter((user) => {
    let condition = true
    if (filterStatus !== 'all') {
      condition = condition && user.status.toLowerCase() === filterStatus
    }
    if (filterCreatedBy !== 'all') {
      condition = condition && user.createdBy === filterCreatedBy
    }
    if (filterBusiness !== 'all') {
      if (filterBusiness === 'business') {
        condition = condition && user.belongTo !== null
      } else if (filterBusiness === 'nonBusiness') {
        condition = condition && user.belongTo === null
      }
    }
    if (dateRange && dateRange.length === 2) {
      const [start, end] = dateRange
      condition =
        condition &&
        dayjs(user.createdAt).isAfter(dayjs(start).subtract(1, 'day')) &&
        dayjs(user.createdAt).isBefore(dayjs(end).add(1, 'day'))
    }
    return condition
  })

  // Pagination config (using filteredUserApps)
  const pagination = {
    current: currentPage,
    pageSize: pageSize,
    total: filteredUserApps.length,
    onChange: (page, pageSize) => {
      setCurrentPage(page)
      setPageSize(pageSize)
    },
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  }

  // Columns definition for the table
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'No',
      width: 50,
      align: 'center',
      render: renderNo,
    },
    {
      title: 'Profile',
      dataIndex: 'profile',
      key: 'profile',
      width: 50,
      align: 'center',
      render: (profile) => {
        const imageUrl = profile
          ? FileUtils.getFileImage(profile.imagePath || profile)
          : null
        const largeImageUrl = imageUrl
          ? imageUrl.replace('small', 'large')
          : null
        return (
          <span>
            {/* Using SweetAlert2 for preview on click */}
            <Avatar
              shape='square'
              size={30}
              src={imageUrl}
              icon={!imageUrl && <UserOutlined />}
              style={{ cursor: 'pointer' }}
              onClick={() => showPreview(largeImageUrl)}
            />
          </span>
        )
      },
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => (
        <Link
          to={`/app/user/profile/${record?._id}`}
          style={{ textDecoration: 'none', color: 'blue' }}
        >
          {text}
        </Link>
      ),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Date Of Birth',
      dataIndex: 'dob',
      key: 'dob',
      render: (_, record) => dayjs(record?.dob).format('YYYY-MM-DD'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => (
        <span>{dayjs(createdAt).format('YYYY-MM-DD')}</span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: 100,
      render: (text, record) => (
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
        </div>
      ),
    },
  ]

  useEffect(() => {
    setDisplayEmitContent(
      <div className='flex justify-between my-3'>
        <div className='font-semibold' style={{ color: '#495057' }}>
          User
        </div>
        <div>
          <GroupBtn collapsed={collapsed} />
        </div>
        <Breadcrumb
          items={[
            {
              title: (
                <span className='text-gray-500 font-medium'>
                  <Breadcrumb
                    items={[
                      {
                        href: '',
                        title: <HomeOutlined style={{ cursor: 'pointer' }} />,
                      },
                      {
                        title: 'App',
                      },
                      {
                        href: '',
                        title: <span>User</span>,
                      },
                    ]}
                  />
                </span>
              ),
              key: 'user',
            },
          ]}
        />
      </div>
    )
  }, [navigate, collapsed, setDisplayEmitContent])

  return (
    <>
      {/* Search Bar Section */}
      <Dashboard data={filteredUserApps} />
      <div
        className='mb-2'
        style={{ borderRadius: '5px', background: 'white' }}
      >
        <div className='mb-2 px-5 py-4 bg-white shadow-lg rounded-lg border-l-4 border-blue-500'>
          <div className='sm:flex justify-between items-center'>
            <div className='w-full md:w-full 2xl:w-5/6 sm:mx-1 md:mx-0'>
              <Search onChange={handleChangeSearch} />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
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
          <Col xs={24} md={12} lg={12} xl={6} xxl={4}>
            <Select
              value={filterBusiness}
              onChange={(value) => {
                setFilterBusiness(value)
                setCurrentPage(1)
              }}
              className='w-full'
            >
              <Option value='all'>All Users</Option>
              <Option value='business'>Business Users</Option>
              <Option value='nonBusiness'>Non-Business Users</Option>
            </Select>
          </Col>
        </Row>
      </Card>

      {/* Table View */}
      <Table
        columns={columns}
        dataSource={filteredUserApps.map((item) => ({
          ...item,
          key: item._id,
        }))}
        pagination={pagination}
        size='small'
        loading={loading}
        scroll={{ x: 'max-content' }}
      />
    </>
  )
}

export default MobileUsersList
