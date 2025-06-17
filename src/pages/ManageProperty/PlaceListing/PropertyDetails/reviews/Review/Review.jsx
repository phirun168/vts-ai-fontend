// Review.jsx
import React, { useState } from 'react'
import { Card, Avatar, Typography, Button, Badge, Space, Row, Col } from 'antd'
import { EyeInvisibleOutlined, LikeOutlined } from '@ant-design/icons'

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
    hidden: false,
  },
  {
    id: 'r3',
    author: 'jimmy',
    avatar:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop',
    date: 'Posted Oct 26, 2024',
    text: 'Angkor is one of the most important archaeological sites in South-East Asia. Stretching over some 400 km², including forested area…',
    rating: 3,
    images: [
      'https://picsum.photos/seed/d/200/120',
      'https://picsum.photos/seed/e/200/120',
    ],
    helpful: 12,
    hidden: false,
  },
]

export default function Review() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS)

  const hideReview = (id) => {
    setReviews((rs) =>
      rs.map((r) => (r.id === id ? { ...r, hidden: true } : r))
    )
  }

  return (
    <Space
      direction='vertical'
      size={24}
      style={{ width: '100%' }}
      className='my-5'
    >
      {reviews
        .filter((r) => !r.hidden)
        .map((r) => (
          <Card
            key={r.id}
            bodyStyle={{ padding: 16 }}
            style={{
              borderRadius: 8,
              border: '1px solid #E2EFFF',
              background: '#fff',
            }}
          >
            {/* header: avatar, name/date, rating badge */}
            <Row justify='space-between' align='middle'>
              <Space>
                <Avatar src={r.avatar} size={40} />
                <div>
                  <Text strong>{r.author}</Text>
                  <br />
                  <Text type='secondary' style={{ fontSize: 12 }}>
                    {r.date}
                  </Text>
                </div>
              </Space>
              <Badge
                count={`${r.rating}/5`}
                style={{ backgroundColor: '#722ED1' }}
              />
            </Row>

            {/* review text */}
            <Paragraph style={{ margin: '16px 0' }}>{r.text}</Paragraph>

            {/* images row */}
            {r.images.length > 0 && (
              <Row gutter={16} style={{ marginBottom: 16 }}>
                {r.images.map((src, i) => (
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

            {/* footer: helpful + hide button */}
            <Row justify='space-between' align='middle'>
              <Space>
                <Text>Helpful</Text>
                <LikeOutlined />
                <Text strong>{r.helpful}</Text>
              </Space>

              <Button
                type='primary'
                icon={<EyeInvisibleOutlined />}
                onClick={() => hideReview(r.id)}
              >
                Hide this review
              </Button>
            </Row>
          </Card>
        ))}
    </Space>
  )
}
