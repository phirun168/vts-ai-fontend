import { Avatar, Button, Popconfirm, Table, Tooltip } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileImageOutlined,
} from '@ant-design/icons'
//
import SearchDetail from './Search'
import renderActions from 'components/Icon/MoreOption'

//
const Tours = (props) => {
  const { isConfirmDelete } = props
  const { access_token } = useContext(AuthContext)
  const navigate = useNavigate()
  const [userList, setUserList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const pageSize = 10
  // Function to generate a random 10-digit phone number starting with '071'
  const generatePhoneNumber = () => {
    let phone = '071'
    for (let i = 0; i < 7; i++) {
      phone += Math.floor(Math.random() * 10)
    }
    return phone
  }

  const generateUserData = () => {
    const generatedData = []
    // Sample arrays for randomized data
    const provinces = ['Province A', 'Province B', 'Province C']
    const statuses = ['Active', 'Inactive', 'Expired']

    for (let i = 1; i <= 10; i++) {
      // Create a random start date within the past 30 days
      const startDate = new Date(
        Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
      )
      // Create an expired date between 1 and 30 days after start date
      const expiredDate = new Date(
        startDate.getTime() +
          Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
      )

      generatedData.push({
        key: `place_${i}`,
        // Dummy field for the Avatar/Image column; using name for reference
        name: `Place ${i}`,
        // Tour Name field
        tour_name: `Tour ${i}`,
        // Start Price: Random price between 100 and 1000
        start_price: `$${(Math.random() * (1000 - 100) + 100).toFixed(2)}`,
        end_price: `$${(Math.random() * (900 - 100) + 100).toFixed(2)}`,
        // Start Date field formatted as a locale date string
        start_date: startDate.toLocaleDateString(),
        // Expired Date field formatted as a locale date string
        expired_date: expiredDate.toLocaleDateString(),
        // Province: randomly selected from the provinces array
        province: provinces[Math.floor(Math.random() * provinces.length)],
        // Status field: randomly selected from the statuses array
        status: statuses[Math.floor(Math.random() * statuses.length)],
        // Created By field
        create_by: `User ${i}`,
        // Created At: a random date within the last year
        created_at: new Date(
          Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
        ).toLocaleDateString(),
        // Additional field sample (you can remove or modify as needed)
        description: `Description for Tour ${i}`,
        // If you need the phone number later, it's available (not displayed in the table)
        phone: generatePhoneNumber(),
        // PP Code is optional (you can remove it if not needed)
        pp_code: `PP00${i}`,
        // English and Khmer location names are optional as well.
        location_name_en: `Location Name En ${i}`,
        location_name_kh: `Location Name Kh ${i}`,
      })
    }
    setUserList(generatedData)
    setLoading(false)
  }

  useEffect(() => {
    generateUserData()
  }, [])

  const handleView = (record) => {
    navigate('/category/detail')
  }

  const handleDelete = (record) => {
    console.log(`Delete record: ${record.key}`)
  }

  const renderNo = (_, __, index) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      width: 50,
      align: 'center',
      render: renderNo,
    },

    {
      title: 'Tour Name',
      dataIndex: 'tour_name',
      key: 'tour_name',
    },

    {
      title: 'Start Price',
      dataIndex: 'start_price',
      key: 'start_price',
      align: 'center',
    },
    {
      title: 'End Price',
      dataIndex: 'end_price',
      key: 'end_price',
      align: 'center',
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
    },
    {
      title: 'Created By',
      dataIndex: 'create_by',
      key: 'hashtags_name',
      align: 'center',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      hidden: isConfirmDelete,
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
          <Tooltip title='Edit'>
            <Button
              icon={<EditOutlined />}
              shape='circle'
              size='small'
              onClick={() => handleEdit(record)}
              style={{ marginRight: 8 }}
            />
          </Tooltip>
          <Tooltip title='Delete'>
            <Popconfirm
              title='Are you sure you want to delete this record?'
              // onConfirm={() => ConfirmDelete(record)}
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
        </div>
      ),
    },
  ]
  const pagination = {
    current: currentPage,
    pageSize: pageSize,
    total: userList?.length,
    onChange: (page, pageSize) => {
      setCurrentPage(page)
      setPageSize(pageSize)
    },
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={userList}
        pagination={pagination}
        bordered={false}
        size='small'
        loading={loading}
        scroll={{ x: 'max-content' }}
        className='custom-table-category'
        rowClassName={(record, index) =>
          index % 2 === 0 ? 'even-row' : 'odd-row'
        }
      />
    </>
  )
}

export default Tours
