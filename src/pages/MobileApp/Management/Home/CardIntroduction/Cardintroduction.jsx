import React, { useState, useEffect } from 'react'
import {
  Table,
  Card,
  Button,
  Row,
  Col,
  Tag,
  Tooltip,
  Popconfirm,
  Dropdown,
  Menu,
  Select,
  DatePicker,
} from 'antd'
import {
  EyeOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'

const { Option } = Select
const { RangePicker } = DatePicker

const userOptions = [
  { label: 'John Doe', value: 'john_doe' },
  { label: 'Jane Smith', value: 'jane_smith' },
  { label: 'Sam Johnson', value: 'sam_johnson' },
  { label: 'Alice Brown', value: 'alice_brown' },
]

export default function CardIntroduction() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  // Initialize viewMode with "table" or "card"
  const [viewMode, setViewMode] = useState('table')
  // State for date range filtering on moveAt
  const [dateRange, setDateRange] = useState([])

  // Dummy pagination values to calculate row numbers
  const [currentPage] = useState(1)
  const pageSize = 10

  // Generate sample data (now with moveAt property)
  useEffect(() => {
    const statuses = ['Approved', 'Pending', 'Draft', 'Non-Pending']
    const ownershipTypes = ['Private', 'Government']
    const mainCategories = ['Category A', 'Category B', 'Category C']
    const subCategories = ['SubCat X', 'SubCat Y', 'SubCat Z', 'SubCat Z']

    const tempData = []
    for (let i = 1; i <= 20; i++) {
      const randomUser =
        Math.random() > 0.6
          ? userOptions[Math.floor(Math.random() * userOptions.length)].value
          : null
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      const ownership =
        ownershipTypes[Math.floor(Math.random() * ownershipTypes.length)]
      const mainCat =
        mainCategories[Math.floor(Math.random() * mainCategories.length)]
      const category = 'Some Category'
      const subCat =
        subCategories[Math.floor(Math.random() * subCategories.length)]
      const province = i % 2 === 0 ? 'Phnom Penh' : 'Siem Reap'

      // Set moveAt to a date that is (i-1) days ago.
      const moveAt = dayjs()
        .subtract(i - 1, 'day')
        .format('YYYY-MM-DD')

      tempData.push({
        key: `item_${i}`,
        no: i,
        location_name_en: `Location EN ${i}`,
        location_name_kh: `ទីតាំង ${i}`,
        belongTo: randomUser,
        ownership,
        mainCategory: mainCat,
        province,
        phone_number: `+855 ${Math.floor(10000000 + Math.random() * 90000000)}`,
        createdAt: dayjs().subtract(i, 'day').format('YYYY-MM-DD'),
        createdBy: 'admin',
        status,
        category,
        subCategory: subCat,
        image: `https://picsum.photos/300/200?random=${i}`,
        moveAt, // New property used for filtering
      })
    }
    setData(tempData)
    setLoading(false)
  }, [])

  // Filter data to show only records with status "Approved" (Active)
  // and, if a date range is selected, filter by the moveAt date.
  const filteredData = data.filter((item) => {
    if (item.status !== 'Approved') return false
    if (dateRange && dateRange.length === 2) {
      const [start, end] = dateRange
      const moveAt = dayjs(item.moveAt, 'YYYY-MM-DD')
      return (
        moveAt.isAfter(start.startOf('day')) &&
        moveAt.isBefore(end.endOf('day'))
      )
    }
    return true
  })

  // Define table columns
  const tableColumns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      align: 'center',
      width: 60,
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },

    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      width: 80,
      render: (img) =>
        img ? (
          <img
            src={img}
            alt='thumbnail'
            style={{
              width: 40,
              height: 40,
              objectFit: 'cover',
              borderRadius: '5px',
            }}
          />
        ) : (
          'No image'
        ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 100,
      render: (val) => <Tag color='green'>Active</Tag>,
    },
    {
      title: 'Move At',
      dataIndex: 'moveAt',
      key: 'moveAt',
      align: 'center',
      width: 100,
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (record) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tooltip title='Delete'>
            <Popconfirm
              title='Are you sure you want to delete this record?'
              onConfirm={() => console.log('Delete confirmed', record)}
              okText='Yes'
              cancelText='No'
              placement='top'
            >
              <span className='text-red-500'>Remove</span>
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Belong To',
      dataIndex: 'belongTo',
      key: 'belongTo',
      align: 'center',
      render: (val) => {
        if (!val) return 'No user'
        const found = userOptions.find((u) => u.value === val)
        return found ? found.label : val
      },
    },
    {
      title: 'Place Type',
      key: 'place Type',
      align: 'center',
      render: (_, record) => (record.belongTo ? 'Business' : 'Non-Business'),
    },
    {
      title: 'Place Name (En)',
      dataIndex: 'location_name_en',
      key: 'location_name_en',
      align: 'center',
      render: (_, record) => (
        <a
          className='text-blue-500'
          onClick={() => console.log('View', record)}
          href='#'
        >
          {record.location_name_en}
        </a>
      ),
    },
    {
      title: 'Place Name (Kh)',
      dataIndex: 'location_name_kh',
      key: 'location_name_kh',
      align: 'center',
      render: (_, record) => (
        <a
          className='text-blue-500'
          onClick={() => console.log('View', record)}
          href='#'
        >
          {record.location_name_kh}
        </a>
      ),
    },
    {
      title: 'Ownership',
      dataIndex: 'ownership',
      key: 'ownership',
      align: 'center',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      align: 'center',
      render: (val) => (Array.isArray(val) ? val.join(', ') : val),
    },
    {
      title: 'Sub Category',
      dataIndex: 'subCategory',
      key: 'subCategory',
      align: 'center',
      render: (val) => (Array.isArray(val) ? val.join(', ') : val),
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      align: 'center',
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
    },
  ]

  const toggleView = () => {
    setViewMode(viewMode === 'card' ? 'table' : 'card')
  }

  const renderTable = () => (
    <Table
      dataSource={filteredData}
      columns={tableColumns}
      loading={loading}
      pagination={false}
      scroll={{ x: 'max-content' }}
      size='small'
    />
  )

  const renderCardView = () => (
    <Row gutter={[16, 16]}>
      {filteredData.map((place) => {
        let statusTag = <Tag color='gray'>{place.status}</Tag>
        if (place.status === 'Approved')
          statusTag = <Tag color='green'>Active</Tag>
        else if (place.status === 'Pending')
          statusTag = <Tag color='orange'>Pending</Tag>
        else if (place.status === 'Draft')
          statusTag = <Tag color='blue'>Draft</Tag>
        else if (place.status === 'Inactive')
          statusTag = <Tag color='red'>Inactive</Tag>

        return (
          <Col key={place.key} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                place.image && (
                  <img
                    src={place.image}
                    alt={place.location_name_en}
                    style={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                    }}
                  />
                )
              }
              actions={[
                <Tooltip title='View' key='view'>
                  <Button
                    type='link'
                    icon={<EyeOutlined />}
                    onClick={() => console.log('View', place)}
                  >
                    View
                  </Button>
                </Tooltip>,
                <Tooltip title='Remove' key='remove'>
                  <Popconfirm
                    title='Are you sure you want to delete this record?'
                    onConfirm={() => console.log('Delete confirmed', place)}
                    okText='Yes'
                    cancelText='No'
                    placement='top'
                  >
                    <Button type='link' danger>
                      Remove
                    </Button>
                  </Popconfirm>
                </Tooltip>,
              ]}
            >
              <Card.Meta
                title={
                  <>
                    {statusTag}
                    <div className='font-bold text-gray-600 text-base'>
                      {place.location_name_en}
                    </div>
                    <div className='text-sm font-bold text-gray-400'>
                      {place.location_name_kh}
                    </div>
                  </>
                }
                description={
                  <>
                    <p>
                      <strong>Place:</strong> {place.province}
                    </p>
                    <p>{place.description}</p>
                    <p>
                      <strong>Ownership:</strong> {place.ownership}
                    </p>
                    <p>
                      <strong>Main Category:</strong> {place.mainCategory}
                    </p>
                    <p>
                      <strong>Category:</strong> {place.category}
                    </p>
                    <p>
                      <strong>Sub Category:</strong> {place.subCategory}
                    </p>
                    <p>
                      <strong>Created By:</strong> {place.createdBy}
                    </p>
                    <p>
                      <strong>Created:</strong> {place.createdAt}
                    </p>
                    <p>
                      <strong>Move At:</strong> {place.moveAt}
                    </p>
                  </>
                }
              />
            </Card>
          </Col>
        )
      })}
    </Row>
  )

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        {/* <div className='mb-2 px-5 py-4 bg-white shadow-lg rounded-lg border-l-4 border-blue-500'>
          <div className='sm:flex justify-between items-center'>
            <div className='w-full md:w-full 2xl:w-5/6 sm:mx-1 md:mx-0'>
            </div>
            <div className='flex items-center space-x-2'>
              <Button
                type='primary'
                style={{ background: '#1677ff' }}
                className='cursor-pointer text-white'
                onClick={() => setOpenAdd(true)}
              >
                <PlusOutlined />
                Add
              </Button>
            </div>
          </div>
        </div> */}
        <Card>
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={14} md={12} lg={12} xl={6} xxl={6}>
              <RangePicker
                style={{ width: '100%' }}
                onChange={(dates) => {
                  setDateRange(dates)
                }}
                format='YYYY-MM-DD'
              />
            </Col>
            <Col xs={24} sm={10} md={12} xl={4} xxl={4}>
              <Select
                value={viewMode}
                onChange={(value) => setViewMode(value)}
                style={{ width: '100%' }}
              >
                <Option value='table'>Table View</Option>
                <Option value='card'>Card View</Option>
              </Select>
            </Col>
          </Row>
        </Card>
      </div>
      {viewMode === 'card' ? renderCardView() : renderTable()}
    </div>
  )
}
