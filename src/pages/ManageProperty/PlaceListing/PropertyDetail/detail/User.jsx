import {
  AutoComplete,
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Input,
  Modal,
  Row,
  Table,
  Tooltip,
} from 'antd'
import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import {
  HomeOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'

// Example FileUtils function; replace or import your actual version.
const FileUtils = {
  getFileImage: (path) => {
    // For demo purposes, simply return the path.
    // If the path is null or undefined, this function will return null.
    return path || null
  },
}

import { AuthContext } from '../../../../../contexts/AuthContext'

const UserLocation = () => {
  // Contexts and Navigation
  const { access_token } = useContext(AuthContext)
  const { collapsed, setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()

  // State variables
  const [search, setSearch] = useState('')
  const [userApps, setUsersApp] = useState([])
  const [loading, setLoading] = useState(true)
  const onChangeRef = useRef(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  // Dummy data generation: Generate an array of user records
  const generateDummyUserApps = () => {
    const dummyData = []
    for (let i = 1; i <= 3; i++) {
      dummyData.push({
        _id: `user_${i}`,
        profile: {
          imagePath:
            i % 2 === 0
              ? `https://via.placeholder.com/30?text=User+${i}`
              : null,
        },
        username: `User ${i}`,
        phone: `123-456-789${i % 10}`,
        email: `user${i}@example.com`,
        status: i % 2 === 0 ? 'Active' : 'Inactive',
        user_type: i === 1 ? 'Owner' : `admin `,
        createdAt: dayjs().subtract(i, 'day').toISOString(),
      })
    }
    return dummyData
  }

  // Simulate API call to fetch user apps
  const getUserApp = async () => {
    try {
      // Simulate a delay (e.g., API response time)
      await new Promise((resolve) => setTimeout(resolve, 500))
      const userApp = generateDummyUserApps()
      setUsersApp(userApp)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserApp()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle search changes (filter dummy data by username)
  const handleChangeSearch = async (value) => {
    try {
      const allUsers = generateDummyUserApps()
      const filtered = allUsers.filter((user) =>
        user.username.toLowerCase().includes(value.toLowerCase())
      )
      setUsersApp(filtered)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  // Row selection configuration (using radio selection for example)
  const getRowSelection = () => ({
    type: 'radio',
    selectedRowKeys,
    onChange: (_, selectedRows) => {
      const newSelectedRowKeys = selectedRows.map((row) => row._id)
      setSelectedRowKeys(newSelectedRowKeys)
      // Example: Handle the selected row data here if needed
      onChangeRef.current = getRowSelection().onChange
    },
  })

  // Render the serial number for each row
  const renderNo = (_, __, index) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  // Pagination configuration
  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    onChange: (page) => setCurrentPage(page),
    total: userApps?.length,
    showSizeChanger: false,
  }

  // Define the columns for the table
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
      render: (profile, record) => {
        // Generate a dummy profile image URL using a placeholder API.
        // For example, we can use "https://randomuser.me/api/portraits/men/{id}.jpg"
        // If you want a mix of genders, you could randomize between 'men' and 'women'
        const gender = record._id % 2 === 0 ? 'men' : 'women'
        // Convert record._id to a number if possible or use a fallback index for demonstration
        const idNumber = Number(record._id.replace('user_', '')) % 100 // randomuser API only contains 100 images per gender
        const imageUrl = `https://randomuser.me/api/portraits/${gender}/${idNumber}.jpg`

        return (
          <Avatar
            shape='square'
            size={30}
            src={imageUrl}
            icon={!imageUrl && <UserOutlined />}
            style={{ cursor: 'pointer' }}
          />
        )
      },
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => (
        <Link
          to={`/app/user/profile/${record._id}`}
          style={{ textDecoration: 'none', color: 'blue' }}
        >
          {text}
        </Link>
      ),
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
      title: 'User Type',
      dataIndex: 'user_type',
      key: 'user_type',
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
  ]

  return (
    <>
      <div>
        {/* Table displaying the user apps */}
        <Table
          columns={columns}
          dataSource={userApps?.map((item) => ({
            ...item,
            key: item._id,
          }))}
          pagination={paginationConfig}
          bordered
          size='small'
          loading={loading}
          scroll={{ x: 'max-content' }}
          rowSelection={getRowSelection()}
        />
      </div>
    </>
  )
}

export default UserLocation
