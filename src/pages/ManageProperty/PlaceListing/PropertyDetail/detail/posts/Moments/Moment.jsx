import {
  Button,
  Col,
  Pagination,
  Popconfirm,
  Row,
  Tooltip,
  Card,
  Tag,
  Divider,
} from 'antd'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../../../../contexts/AuthContext'
import { useNavigate, useOutletContext } from 'react-router-dom'
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons'

// Function to truncate description
const truncateDescription = (text, limit) => {
  return text.length > limit ? text.substring(0, limit) + '...' : text
}

import AddMoment from '../../../../../../Posts/moment/Add'
import ConfirmRemove from '../ConfirmRemove'
const Moments = () => {
  const { access_token } = useContext(AuthContext)
  const { setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()
  const [openAdd, setOpenAdd] = useState(false)
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [loading, setLoading] = useState(true)

  const mediaFiles = [
    {
      type: 'image',
      title: 'Beautiful Moment',
      khmerTitle: 'ពេលវេលាស្រស់ស្អាត',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn2OpRgPyBbjS_VH4cb2ZJtFpNXG1X5rSktw&s',
    },
    {
      type: 'video',
      title: 'Mountain Adventure',
      khmerTitle: 'ការផ្សងព្រេងលើភ្នំ',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      type: 'image',
      title: 'Ocean Breeze',
      khmerTitle: 'ខ្យល់សមុទ្រ',
      url: 'https://www.nomadicchick.com/wp-content/uploads/2024/01/65045f093c166fdddb4a94a5_x-65045f0266217.webp',
    },
  ]

  const generateData = () => {
    const generatedData = []
    const statusOptions = ['Active', 'Inactive', 'Expired'] // Rotate statuses

    for (let i = 1; i <= 20; i++) {
      let media = mediaFiles[i % mediaFiles.length] // Rotate between images and videos
      let postType = i % 2 === 0 ? 'New Feed' : 'Normal' // Alternating post types
      let status = statusOptions[i % 3] // Rotate statuses between Active, Inactive, Expired

      generatedData.push({
        key: `item_${i}`,
        title: media.title,
        khmerTitle: media.khmerTitle,
        mediaType: media.type,
        mediaUrl: media.url,
        postType: postType,
        status: status, // Status added
        hashtags: [`#travel${i}`, `#adventure${i + 1}`],
        mention: [`@user${i}`, `@user${i + 1}`],
        location: `Location ${i}`,
        post_by: `User ${i}`,
        description: `This is a beautiful moment captured in location ${i}. Explore more amazing travel experiences!`,
      })
    }
    setData(generatedData)
    setLoading(false)
  }

  useEffect(() => {
    generateData()
  }, [])

  // Pagination logic
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handleEdit = (record) => {
    console.log('Edit', record)
  }

  const handleView = (record) => {
    navigate('/moment/detail')
  }

  const handleDelete = (record) => {
    console.log('Delete', record)
  }

  // Status Tag Colors
  const getStatusTag = (status) => {
    switch (status) {
      case 'Active':
        return <Tag color='green'>🟢 Active</Tag>
      case 'Inactive':
        return <Tag color='orange'>🟠 Inactive</Tag>
      case 'Expired':
        return <Tag color='red'>🔴 Expired</Tag>
      default:
        return <Tag color='gray'>Unknown</Tag>
    }
  }

  return (
    <>
      <AddMoment open={openAdd} setOpen={setOpenAdd} />

      {/* Add Button */}
      <div className='flex justify-end mb-2'>
        <button
          onClick={() => setOpenAdd(true)}
          className='text-sm px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md'
        >
          <PlusOutlined /> Add
        </button>
      </div>

      <Divider />

      <Row gutter={[16, 16]} className='mt-4'>
        {paginatedData.map((item) => (
          <Col xs={24} sm={12} md={8} lg={12} xl={8} xxl={6} key={item.key}>
            <Card
              hoverable
              className='h-full flex flex-col shadow-lg rounded-lg overflow-hidden border border-gray-200'
              cover={
                <>
                  <div
                    className='relative w-full'
                    style={{ paddingTop: '80%' }}
                  >
                    {/* Post Type Badge */}
                    <div className='absolute top-2 left-2 z-10'>
                      <Tag
                        style={{
                          background:
                            item.postType === 'New Feed'
                              ? 'linear-gradient(135deg, #4A90E2, #1E3A8A)' // Vibrant Blue Gradient
                              : 'linear-gradient(135deg, #A0A0A0, #696969)', // Dark Gray Gradient
                          color: 'white',
                          fontWeight: 'bold',
                          padding: '5px 10px',
                          borderRadius: '5px',
                          fontSize: '12px',
                        }}
                      >
                        {item.postType}
                      </Tag>
                    </div>

                    {/* Media (Image or Video) */}
                    {item.mediaType === 'image' ? (
                      <img
                        src={item.mediaUrl}
                        alt={item.title}
                        className='absolute top-0 left-0 w-full h-full object-cover rounded-b-lg'
                      />
                    ) : (
                      <video
                        controls
                        className='absolute top-0 left-0 w-full h-full object-cover rounded-b-lg'
                      >
                        <source src={item.mediaUrl} type='video/mp4' />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </>
              }
              actions={[
                <Tooltip title='View'>
                  <EyeOutlined
                    style={{ color: 'green' }}
                    onClick={() => handleView(item)}
                  />
                </Tooltip>,
                <Tooltip title='Edit'>
                  <EditOutlined onClick={() => handleEdit(item)} />
                </Tooltip>,
                <Tooltip title='Delete'>
                  <Popconfirm
                    title='Are you sure you want to delete this moment?'
                    onConfirm={() =>
                      ConfirmRemove({
                        item,
                        access_token,
                        setLoading,
                        //  getFileImage,
                      })
                    }
                    okText='Yes'
                    cancelText='No'
                  >
                    <DeleteOutlined style={{ color: 'red' }} />
                  </Popconfirm>
                </Tooltip>,
              ]}
            >
              <div className=''>
                {/* Status Tag */}
                <div className='mb-1'>{getStatusTag(item.status)}</div>

                {/* Title */}
                <p className='text-lg font-bold text-gray-900'>{item.title}</p>
                <p className='text-lg font-bold text-gray-900 font-[Kh Battambang]'>
                  {item.khmerTitle}
                </p>

                {/* Description */}
                <p className='text-sm text-gray-700 mt-1'>
                  {truncateDescription(item.description, 100)}
                </p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Moments
