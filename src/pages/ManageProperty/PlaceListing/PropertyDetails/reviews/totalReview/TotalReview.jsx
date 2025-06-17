// TotalReview.jsx
import React, { useState } from 'react'
import { Card, Avatar, Typography, Button, Badge, Space, Row, Col } from 'antd'
import {
  DeleteOutlined,
  LikeOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons'

const { Text, Paragraph } = Typography

const INITIAL_REVIEWS = [
  {
    id: 'r1',
    author: 'Dara',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop',
    date: 'Posted Oct 26, 2024',
    text: 'ប្រសាសន៍របស់អ្នកពិតជាពោរពេញដោយភាពច្នៃប្រឌិត ។ ឆ្លង និងស្នាក់នៅ និងបរិយាកាសដ៏ស្រស់ស្អាត។',
    rating: 3,
    images: [
      'https://picsum.photos/seed/a/200/120',
      'https://picsum.photos/seed/b/200/120',
      'https://picsum.photos/seed/c/200/120',
    ],
    helpful: 12,
    reports: 2,
    hidden: false,
  },
  {
    id: 'r2',
    author: 'Dom',
    avatar:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=80&h=80&fit=crop',
    date: 'Posted Oct 26, 2024',
    text: 'ប្រសាសន៍របស់អ្នកពិតជាពោរពេញដោយភាពច្នៃប្រឌិត ។ ឆ្លង និងស្នាក់នៅ និងបរិយាកាសដ៏ស្រស់ស្អាត។',
    rating: 3,
    images: [],
    helpful: 12,
    reports: 0,
    hidden: false,
  },
  {
    id: 'r3',
    author: 'jimmy',
    avatar:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop',
    date: 'Posted Oct 26, 2024',
    text: 'Angkor is one of the most important archaeological sites in South-East Asia. Stretching over some 400 km²…',
    rating: 3,
    images: [
      'https://picsum.photos/seed/d/200/120',
      'https://picsum.photos/seed/e/200/120',
    ],
    helpful: 12,
    reports: 0,
    hidden: false,
  },
  {
    id: 'r4',
    author: 'Dom',
    avatar:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=80&h=80&fit=crop',
    date: 'Posted Oct 26, 2024',
    text: 'ប្រសាសន៍របស់អ្នកពិតជាពោរពេញដោយភាពច្នៃប្រឌិត ។ ឆ្លង និងស្នាក់នៅ និងបរិយាកាសដ៏ស្រស់ស្អាត។',
    rating: 3,
    images: [],
    helpful: 12,
    reports: 2,
    hidden: true,
  },
]

export default function TotalReview() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS)

  const toggleHidden = (id) => {
    setReviews((r) =>
      r.map((rev) => (rev.id === id ? { ...rev, hidden: !rev.hidden } : rev))
    )
  }

  return (
    <Space
      direction='vertical'
      style={{ width: '100%' }}
      size={24}
      className='my-5'
    >
      {reviews.map((rev) => {
        const borderColor = rev.hidden
          ? '#E2EFFF'
          : rev.reports > 0
            ? '#FF5E5E'
            : '#E2EFFF'
        const badgeColor = rev.hidden
          ? '#A79A9A'
          : rev.reports > 0
            ? '#F5222D'
            : '#722ED1'

        return (
          <Card
            key={rev.id}
            bodyStyle={{ padding: 16 }}
            style={{
              borderRadius: 8,
              border: `1px solid ${borderColor}`,
              background: rev.hidden ? '#FAFAFA' : '#fff',
            }}
          >
            <Row justify='space-between' align='middle'>
              <Space>
                <Avatar src={rev.avatar} size={40} />
                <div className='p-0 m-0'>
                  <Text className='flex flex-start m-0 p-0' strong>
                    {rev.author}
                  </Text>
                  {/* <br /> */}
                  <Text type='secondary' style={{ fontSize: 12 }}>
                    {rev.date}
                  </Text>
                </div>
              </Space>
              <Badge
                count={`${rev.rating}/5`}
                style={{ backgroundColor: badgeColor }}
              />
            </Row>

            <Paragraph
              className=' flex flex-start'
              style={{ marginTop: 16, marginBottom: 16 }}
            >
              {rev.text}
            </Paragraph>

            {rev.images.length > 0 && (
              <Row gutter={16} style={{ marginBottom: 16 }}>
                {rev.images.map((src, i) => (
                  <Col key={i}>
                    <img
                      src={src}
                      alt=''
                      style={{
                        width: 120,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: 4,
                      }}
                    />
                  </Col>
                ))}
              </Row>
            )}

            <Row justify='space-between' align='middle'>
              <Space>
                <Text>Helpful</Text>
                <LikeOutlined />
                <Text strong>{rev.helpful}</Text>
              </Space>

              <Space>
                <Text type='secondary'>
                  Report{' '}
                  {rev.reports > 0 && (
                    <Badge count={rev.reports} size='small' />
                  )}
                </Text>
                <Button
                  type={rev.hidden ? 'default' : 'primary'}
                  icon={rev.hidden ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  onClick={() => toggleHidden(rev.id)}
                >
                  {rev.hidden ? 'Show this review' : 'Hide this review'}
                </Button>
              </Space>
            </Row>
          </Card>
        )
      })}
    </Space>
  )
}
