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
import AddPromotionEvent from '../../../../../../Posts/promotion&event/Add'
import ConfirmRemove from '../ConfirmRemove'
const PromotionAndEvents = () => {
  const { access_token } = useContext(AuthContext)
  const { setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()
  const [openAdd, setOpenAdd] = useState(false)
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [loading, setLoading] = useState(true)

  const imageUrls = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn2OpRgPyBbjS_VH4cb2ZJtFpNXG1X5rSktw&s',
    'https://assets.vogue.com/photos/6769d2a0d27c82be0fbb0ff5/master/w_2560%2Cc_limit/Ambar.jpg',
    'https://cache.marriott.com/content/dam/marriott-renditions/DPSUW/dpsuw-aerial-3200-hor-feat.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1920px:*',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5jVmjg1poRBZ7QctpgpT1qvyS3KLMVhrdRA&s',
    'https://assets.vogue.com/photos/58dd6577fb32ef256418c36d/master/w_1600%2Cc_limit/07-holding-new-zealand-hotels-with-the-best-views.jpg',
  ]

  const generateData = () => {
    const generatedData = []
    for (let i = 1; i <= 50; i++) {
      let status = i % 3 === 0 ? 'Expired' : i % 2 === 0 ? 'Active' : 'Inactive'
      let type = i % 2 === 0 ? 'Normal' : 'New Feed'

      generatedData.push({
        key: `item_${i}`,
        titleKh: `ប្រម៉ូសិន ${i}`,
        titleEn: `Promotion Title ${i}`,
        image: imageUrls[i % imageUrls.length],
        status: status,
        type: type,
        startDate: `2025-01-${String(i).padStart(2, '0')}`,
        expiredDate: `2025-02-${String(i).padStart(2, '0')}`,
      })
    }
    setData(generatedData)
    setLoading(false)
  }

  useEffect(() => {
    generateData()
  }, [])

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handleEdit = (record) => {
    console.log('Edit', record)
  }

  const handleView = (record) => {
    navigate('/promotion&event/detail')
  }

  const handleDelete = (record) => {
    console.log('Delete', record)
  }

  // Function to get Status Tag color
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
      <AddPromotionEvent open={openAdd} setOpen={setOpenAdd} />

      {/* Add Promotion Button */}
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
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={8} key={item.key}>
            <Card
              hoverable
              className='h-full flex flex-col shadow-lg rounded-lg overflow-hidden border border-gray-200'
              cover={
                <div className='relative w-full' style={{ paddingTop: '60%' }}>
                  {/* 🔹 Post Type Badge (New Feed / Normal) - Top Left */}
                  <div className='absolute z-30 top-2 left-2'>
                    <Tag
                      style={{
                        background:
                          item.type === 'New Feed'
                            ? 'linear-gradient(135deg, #1E90FF, #4B0082)' // Blue-Purple Gradient
                            : 'linear-gradient(135deg, #A0A0A0, #696969)', // Gray Gradient
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        fontSize: '12px',
                      }}
                    >
                      {item.type}
                    </Tag>
                  </div>

                  {/* Promotion Image */}
                  <img
                    src={item.image}
                    alt='Promotion Image'
                    className='absolute top-0 left-0 w-full h-full object-cover rounded-b-lg'
                  />
                </div>
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
                    title='Are you sure you want to delete this record?'
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
              <div className='flex flex-col flex-grow '>
                {/* 🔥 Status Tag (Above Title) */}
                <div className='mb-1'>{getStatusTag(item.status)}</div>

                {/* 🏷️ Title (Khmer & English) */}
                <h3 className='font-semibold text-lg text-gray-900 mb-1'>
                  {item.titleKh} / {item.titleEn}
                </h3>

                {/* 🗓️ Start & Expired Dates */}
                <div className='mt-2 flex justify-between'>
                  <span className='text-xs font-semibold text-blue-600'>
                    Start Date: {item.startDate}
                  </span>
                  <span className='text-xs font-semibold text-red-600'>
                    Expired Date: {item.expiredDate}
                  </span>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div className='flex justify-center mt-4'>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data.length}
          onChange={(page, pageSize) => {
            setCurrentPage(page)
            setPageSize(pageSize)
          }}
          showSizeChanger
          pageSizeOptions={['8', '16', '24']}
        />
      </div>
    </>
  )
}

export default PromotionAndEvents
