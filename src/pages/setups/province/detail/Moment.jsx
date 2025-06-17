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
} from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
// import ConfirmRemove from './ConfirmRemove'
// import './Moment.scss'

const Moments = () => {
  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(true)
  
  // Optional states for editing or delete confirmation
  // const [openEdit, setOpenEdit] = useState(false)
  // const [confirmDelete, setConfirmDelete] = useState(false)

  const generateData = () => {
    const generatedData = []
    // Example arrays for generating sample hashtags and mentions (optional)
    for (let i = 1; i <= 10; i++) {
      generatedData.push({
        key: `item_${i}`,
        // Moment Name to be rendered as a link
        moment_name: `Moment Title ${i}`,
        // Location | Province | Category: You can combine multiple info into one string
        location: `Location ${i}`,
        // Hashtags: an array. Here we simply generate a couple of dummy hashtags.
        hashtags: [`#hashtag${i}`, `#hashtag${i + 1}`],
        // Post By: Who posted the moment.
        post_by: `User ${i}`,
        // Map: This field is left as a dummy value which you can extend.
        map: `Map ${i}`,
        // Description: Additional description if needed.
        description: `This is a description for Moment ${i}.`,
      })
    }
    setData(generatedData)
    setLoading(false)
  }

  useEffect(() => {
    generateData()
  }, [])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (value) => {
    setPageSize(Number(value))
    setCurrentPage(1) // Reset to first page
  }

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = data.slice(startIndex, endIndex)

  const handleEdit = (record) => {
    // Example: Open edit dialog or navigate to edit page
    console.log(`Edit record: ${record.key}`)
    // setOpenEdit(true) or navigate(`/moment/edit/${record.key}`)
  }

  const handleView = (record) => {
    // Navigate to the moment's detail page
    navigate('/moment/detail')
  }

  const handleDelete = (record) => {
    console.log(`Delete record: ${record.key}`)
    // setConfirmDelete(true) or execute delete logic
  }

  const renderNo = (_, __, index) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const columns = [
    {
      title: 'No',
      width: 50,
      align: 'center',
      render: renderNo,
    },
    {
      title: 'Moment Name',
      dataIndex: 'moment_name',
      key: 'moment_name',
      render: (text) => (
        <Link
          to={`/moment/detail`}
          style={{ color: '#3085d6', textDecoration: 'none' }}
        >
          {text}
        </Link>
      ),
    },
    {
      title: 'Location | Province | Category',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Hashtags',
      dataIndex: 'hashtags',
      key: 'hashtags',
      // Display the count of hashtags (you can change this to join them as text if preferred)
      render: (hashtags) => (hashtags ? hashtags.length : 0),
    },
    {
      title: 'Post By',
      dataIndex: 'post_by',
      key: 'post_by',
    },
    {
      title: 'Map',
      dataIndex: 'map',
      key: 'map',
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
              // Uncomment and implement onConfirm logic when needed
              // onConfirm={() => handleDelete(record)}
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
    total: paginatedData?.length,
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
        dataSource={paginatedData}
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

export default Moments
