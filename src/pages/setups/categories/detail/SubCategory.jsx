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

const SubCategoryList = (props) => {
  const { isConfirmDelete, renderActions } = props
  const { access_token } = useContext(AuthContext)
  const navigate = useNavigate()
  const [userList, setUserList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [pageSize, setPageSize] = useState(10)

  // Generate sample data to match table columns
  const generateUserData = () => {
    // Sample arrays for random data
    const categoriesEn = ['Category One', 'Category Two', 'Category Three']
    const categoriesKh = ['ប្រភេទមួយ', 'ប្រភេទពីរ', 'ប្រភេទបី']
    const descriptions = [
      'Lorem ipsum dolor sit amet.',
      'Consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt.',
    ]
    const createdBys = ['Alice', 'Bob', 'Charlie', 'David']

    const generatedData = []

    for (let i = 1; i <= 0; i++) {
      // Randomly pick data from arrays
      const randomCategoryIndex = Math.floor(
        Math.random() * categoriesEn.length
      )
      const randomDescIndex = Math.floor(Math.random() * descriptions.length)
      const randomCreatorIndex = Math.floor(Math.random() * createdBys.length)

      // For created_at, create a random past date within the last 30 days
      const daysAgo = Math.floor(Math.random() * 30)
      const createdAt = new Date()
      createdAt.setDate(createdAt.getDate() - daysAgo)

      generatedData.push({
        key: `place_${i}`,
        name: `Place ${i}`, // title & used for Avatar tooltip
        category_name_en: categoriesEn[randomCategoryIndex],
        category_name_kh: categoriesKh[randomCategoryIndex],
        description: descriptions[randomDescIndex],
        created_by: createdBys[randomCreatorIndex],
        created_at: createdAt.toLocaleDateString(),
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

  const handleEdit = (record) => {
    console.log('Edit record:', record)
    // Implement edit logic as needed.
  }

  const handleDelete = (record) => {
    console.log(`Delete record: ${record.key}`)
    // Implement delete logic as needed.
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
      title: 'Image',
      dataIndex: 'name',
      key: 'name',
      width: 50,
      align: 'center',
      render: () => (
        <Tooltip title='Click to view image' trigger='click'>
          <Avatar
            shape='square'
            size={24}
            icon={<FileImageOutlined />}
            style={{ cursor: 'pointer' }}
          />
        </Tooltip>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <span
          className='text-blue-500 cursor-pointer'
          onClick={() => console.log(record)}
        >
          {record.name}
        </span>
      ),
    },
    {
      title: 'Category Name (En)',
      dataIndex: 'category_name_en',
      key: 'category_name_en',
      align: 'center',
    },
    {
      title: 'Category Name (Kh)',
      dataIndex: 'category_name_kh',
      key: 'category_name_kh',
      align: 'center',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      key: 'created_by',
      align: 'center',
    },
    {
      title: 'CreatedAt',
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
              onConfirm={() => handleDelete(record)}
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
      <SearchDetail />
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

export default SubCategoryList
