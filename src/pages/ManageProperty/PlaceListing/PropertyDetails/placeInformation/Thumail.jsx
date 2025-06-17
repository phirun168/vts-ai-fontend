// Thumbnail.jsx
import React, { useEffect, useState } from 'react'
import { Card, Typography, Rate, Space, Button, Divider } from 'antd'
import {
  EditOutlined,
  StarFilled,
  AppstoreOutlined,
  HomeOutlined,
  DeploymentUnitOutlined,
  ApartmentOutlined,
  CaretRightOutlined,
} from '@ant-design/icons'
import EditThumbnail from './groupInfo/GroupUpdate/editPlaceInfo/EditThumbnail'
const { Title, Text } = Typography

export default function Thumbnail(
  props,

  {
    imageUrl = 'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8=',
    title = 'សណ្ឋាគារ G Mekong Hotel',
    subtitle = 'G Mekong Hotel',
    rating = 4.5,
    reviews = '2.8k',
    googleRating = 4.9,
    // categories = [
    //   { icon: <AppstoreOutlined />, label: 'កន្លែងស្នាក់នៅ' },
    //   { icon: <ApartmentOutlined />, label: 'សណ្ឋាគារ' },
    // ],
  }
) {
  const { thumbnail, getFileByName, showInfoOnThumbnail } = props
  const [categories, setCategory] = useState([])
  const [openThumbnail, setOpenThumbnail] = useState()
  useEffect(() => {
    setCategory([
      {
        icon: <AppstoreOutlined />,
        label: showInfoOnThumbnail?.mainCategory?.nameKh
          ? showInfoOnThumbnail?.mainCategory?.nameKh
          : '' + ' ' + showInfoOnThumbnail?.mainCategory?.nameEn
            ? showInfoOnThumbnail?.mainCategory?.nameEn
            : '',
      },
      {
        icon: <ApartmentOutlined />,
        label: showInfoOnThumbnail?.subCategory?.nameKh
          ? showInfoOnThumbnail?.subCategory?.nameKh
          : '' + ' ' + showInfoOnThumbnail?.subCategory?.nameEn
            ? showInfoOnThumbnail?.subCategory?.nameEn
            : '',
      },
    ])
  }, [showInfoOnThumbnail])
  return (
    <>
      <EditThumbnail
        thumbnail={thumbnail}
        open={openThumbnail}
        setOpen={setOpenThumbnail}
        getFileByName={getFileByName}
      />
      <Card
        hoverable
        className='thumbnail-non-business'
        style={{ padding: 0 }}
        cover={
          <>
            {/* <div className=' top-4 left-4 bg-yellow-500 text-white text-sm font-medium px-3 py-1 rounded-lg z-20'>
            ww
          </div> */}
            <div style={{ position: 'relative' }}>
              <img src={getFileByName('/' + thumbnail)} alt={title} />
              <Button
                onClick={() => setOpenThumbnail(true)}
                size='small'
                icon={<EditOutlined />}
                style={{
                  position: 'absolute',
                  bottom: 15,
                  left: 15,
                  background: '#fff',
                  color: 'blue',
                  borderRadius: 4,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}
              >
                Edit Thumbnail
              </Button>
            </div>
          </>
        }
        bodyStyle={{ padding: 16 }}
      >
        {/* Title & subtitle */}
        <Title level={5} className='hotel-title'>
          {showInfoOnThumbnail?.nameKh}
        </Title>
        <Text className='hotel-subtitle'>{showInfoOnThumbnail?.nameEn}</Text>

        {/* Stars row */}
        {showInfoOnThumbnail?.mainCategory?.nameEn?.trim()?.toLowerCase() ===
          'accommodation' && (
          <div className='stars-row'>
            <Rate
              disabled
              defaultValue={showInfoOnThumbnail?.star}
              style={{ fontSize: 14, color: '#FFCC59' }}
            />
          </div>
        )}

        {/* Big rating + reviews + Google */}
        <div className='rating-summary'>
          <StarFilled style={{ color: '#FAB02F' }} />
          <span className='rating-value '>{rating}</span>
          <Text style={{ color: '#1a73e8', fontWeight: 'bold' }}>
            {reviews}{' '}
            <span style={{ color: '#0070FF', fontWeight: 'bold' }}>
              បញ្ចេញមតិ
            </span>
          </Text>
          <CaretRightOutlined style={{ color: '#999999' }} />
          <Divider type='vertical' />
          <div className='google-pill'>
            <span className='mx-1'>
              <svg
                viewBox='0 0 48 48'
                width='15'
                height='15'
                className='fill-current text-blue-500'
                role='img'
                aria-label='Google Icon'
              >
                <path
                  fill='#4285F4'
                  d='M45.12 24.52c0-1.46-.13-2.87-.36-4.24H24v8.02h11.95c-.54 2.88-2.16 5.32-4.6 6.98v5.78h7.42c4.36-4.02 6.85-9.94 6.85-16.54z'
                />
                <path
                  fill='#34A853'
                  d='M24 46c6.22 0 11.42-2.06 15.22-5.58l-7.42-5.78c-2.06 1.38-4.72 2.2-7.8 2.2-6.02 0-11.12-4.04-12.94-9.48H3.4v5.92C7.2 39.38 14.04 46 24 46z'
                />
                <path
                  fill='#FBBC05'
                  d='M11.06 27.36c-.5-1.38-.78-2.86-.78-4.36s.28-2.98.78-4.36V12h-7.6C2.04 15.84 0 19.78 0 24s2.04 8.16 5.46 11.02l7.6-5.92z'
                />
                <path
                  fill='#EA4335'
                  d='M24 9.56c3.38 0 6.4 1.16 8.78 3.42l6.46-6.46C34.88 2.18 30.22 0 24 0 14.04 0 7.2 6.62 3.46 12.98l7.6 5.92c1.82-5.44 6.92-9.34 12.94-9.34z'
                />
              </svg>
            </span>
            <StarFilled />
            <Text
              style={{ marginLeft: 4, color: '#1a73e8', fontWeight: 'bold' }}
            >
              {googleRating}
            </Text>
          </div>
        </div>

        {/* Categories with divider */}

        <Space
          size='middle'
          split={<Divider type='vertical' style={{ height: '16px' }} />}
          className='category-row '
        >
          {categories.map((cat, i) => (
            <Space key={i}>
              {cat.icon}
              <Text>
                <span
                  style={{
                    marginLeft: 4,
                    color: '#0070FF',
                    fontWeight: 'bold',
                  }}
                >
                  {cat.label}
                </span>
              </Text>
            </Space>
          ))}
        </Space>
      </Card>
    </>
  )
}
