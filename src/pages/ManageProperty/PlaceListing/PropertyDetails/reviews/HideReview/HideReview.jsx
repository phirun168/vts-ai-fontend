// HideReview.jsx
import React, { useState } from 'react'
import { Card, Avatar, Typography, Button, Badge, Space, Row, Col } from 'antd'
import {
  EyeOutlined,
  ExclamationCircleOutlined,
  LikeOutlined,
} from '@ant-design/icons'

const { Text, Paragraph } = Typography

// Sample hidden reviews—replace with props or API data as needed
const INITIAL_HIDDEN = [
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
    helpful: 8,
    reports: 1,
  },
]

export default function HideReview() {
  const [hiddenReviews, setHiddenReviews] = useState(INITIAL_HIDDEN)

  const restoreReview = (id) => {
    // In a real app you'd call your API here.
    setHiddenReviews((list) => list.filter((r) => r.id !== id))
  }

  return (
    <Space
      direction='vertical'
      size={24}
      style={{ width: '100%' }}
      className='my-5'
    >
      {hiddenReviews.map((r) => (
        <Card
          key={r.id}
          bodyStyle={{ padding: 16 }}
          style={{
            borderRadius: 8,
            background: '#EAEAEA',
            border: '1px solid #E2EFFF',
          }}
        >
          {/* header */}
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
              style={{ backgroundColor: '#BFBFBF' }}
            />
          </Row>

          {/* text */}
          <Paragraph style={{ margin: '16px 0' }}>{r.text}</Paragraph>

          {/* images */}
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

          {/* footer */}
          <Row justify='space-between' align='middle'>
            <Space>
              <Text>Helpful</Text>
              <LikeOutlined />
              <Text strong>{r.helpful}</Text>
            </Space>

            <Space>
              <Text type='secondary'>
                Report <Badge count={r.reports} size='small' />
              </Text>
              <Button
                type='primary'
                icon={<EyeOutlined />}
                onClick={() => restoreReview(r.id)}
              >
                Show this review
              </Button>
            </Space>
          </Row>
        </Card>
      ))}
    </Space>
  )
}
