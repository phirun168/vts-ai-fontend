import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../../../../contexts/AuthContext'
import { useNavigate, useOutletContext } from 'react-router-dom'
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Row,
  Tooltip,
  Popconfirm,
  Pagination,
  Tag,
  Divider,
} from 'antd'
import dayjs from 'dayjs'
const truncateDescription = (text, limit) => {
  return text.length > limit ? text.substring(0, limit) + '...' : text
}
import AddPromotion from '../../updates/posts/AddPromotion'
import AddService from './DesignAddService'
import ConfirmRemove from '../ConfirmRemove'
const Service = () => {
  const { access_token } = useContext(AuthContext)
  const { setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [openAdd, setOpenAdd] = useState(false)
  const [openPromotion, setOpenPromotion] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const imageUrls = [
    'https://media.cnn.com/api/v1/images/stellar/prod/140127103345-peninsula-shanghai-deluxe-mock-up.jpg?q=w_2226,h_1449,x_0,y_0,c_fill/h_447',
    'https://www.nomadicchick.com/wp-content/uploads/2024/01/65045f093c166fdddb4a94a5_x-65045f0266217.webp',
    'https://cdn-ijnhp.nitrocdn.com/pywIAllcUPgoWDXtkiXtBgvTOSromKIg/assets/images/optimized/rev-5794eaa/www.jaypeehotels.com/blog/wp-content/uploads/2024/09/Blog-6-scaled.jpg',
    'https://media.architecturaldigest.com/photos/659d9cb42446c7171718ecf0/master/w_1600%2Cc_limit/atr.royalmansion-bedroom2-mr.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcWWu9_WUImovRROEaM_VZsAQn8Cpnm9kovg&s',
  ]

  const generateData = () => {
    const generatedData = []
    for (let i = 1; i <= 20; i++) {
      const basePrice = 60
      let finalPrice = basePrice
      let discountLabel = ''
      let hasDiscount = false

      if (i % 3 === 0) {
        discountLabel = '10% Off'
        finalPrice = basePrice - basePrice * 0.1
        hasDiscount = true
      } else if (i % 3 === 1) {
        discountLabel = '$10.00 Off'
        finalPrice = basePrice - 10
        hasDiscount = true
      } else {
        discountLabel = 'Special Offer'
        hasDiscount = false
      }

      const statusOptions = ['Active', 'Inactive', 'Expired', 'Active']
      const status = statusOptions[i % 4] // Rotate statuses

      generatedData.push({
        key: `item_${i}`,
        titleKh: `បន្ទប់គ្រែ ${i}`,
        titleEn: `${i} bedroom `,
        image: imageUrls[i % imageUrls.length],
        description: `Experience the beauty of Angkor Wat ${i}.`,
        createdAt: dayjs().format('YYYY-MM-DD'),
        createdBy: 'Admin',
        status: status,
        price: basePrice,
        finalPrice: hasDiscount ? finalPrice : basePrice,
        discountType: hasDiscount ? 'discounted' : 'none',
        discountLabel: hasDiscount ? discountLabel : '',
      })
    }
    setData(generatedData)
    setLoading(false)
  }

  useEffect(() => {
    generateData()
  }, [])

  const handleAddPromotion = () => {
    setOpenPromotion(true)
  }

  const handleView = () => {
    navigate('/service/detail')
  }

  const handleEdit = () => {
    console.log('Edit action')
  }

  const handleDelete = (record) => {
    console.log('Delete action', record)
  }

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handleRemovePromotion = (key) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key
          ? {
              ...item,
              discountType: 'none',
              discountLabel: '',
              finalPrice: item.price,
            }
          : item
      )
    )
  }

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
      {/*  */}
      <AddService open={openAdd} setOpen={setOpenAdd} />
      {/*  */}
      <AddPromotion open={openPromotion} setOpen={setOpenPromotion} />
      <div className='flex justify-end items-center mb-2'>
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
          <Col xs={24} sm={12} md={12} lg={12} xl={8} xxl={6} key={item.key}>
            <Card
              hoverable
              className='h-full flex flex-col'
              cover={
                <div className='relative'>
                  {item.discountType !== 'none' && (
                    <div className='absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center'>
                      <span>{item.discountLabel}</span>
                      <button
                        className='ml-2 text-xs text-red-500 px-1 py-0.5 rounded-full'
                        onClick={() => handleRemovePromotion(item.key)}
                      >
                        <DeleteOutlined style={{ color: 'white' }} />
                      </button>
                    </div>
                  )}
                  <img
                    src={item.image}
                    alt={item.titleEn}
                    className='h-40 object-cover w-full rounded-t-lg'
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
              {/* Status Badge */}
              <div className='mb-2'>{getStatusTag(item.status)}</div>

              <h3 className='font-semibold text-lg text-gray-800'>
                {item.titleKh} / {item.titleEn}
              </h3>

              <p className='text-sm text-gray-600'>
                {truncateDescription(item.description, 100)}
              </p>

              <p className='text-gray-800 font-bold text-lg'>
                ${item.finalPrice.toFixed(2)}
              </p>

              {/* Hide Add Promotion Button if Expired, Inactive, or already has promotion */}
              {item.status === 'Active' && item.discountType === 'none' ? (
                <div>
                  <button
                    onClick={() => handleAddPromotion()}
                    className='text-sm px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white w-full rounded-md'
                  >
                    <PlusOutlined /> Add Promotion
                  </button>
                </div>
              ) : (
                <div className='py-3.5'></div>
              )}
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination Component (Restored) */}
      <div className='flex justify-center mt-4'>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data.length}
          onChange={setCurrentPage}
          showSizeChanger
        />
      </div>
    </>
  )
}

export default Service
