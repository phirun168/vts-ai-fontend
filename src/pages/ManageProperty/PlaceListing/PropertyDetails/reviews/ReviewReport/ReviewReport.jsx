// ReviewReport.jsx
import React, { useState } from 'react'
import { Card, Avatar, Typography, Button, Badge, Space, Row, Col } from 'antd'
import {
  EyeInvisibleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'

const { Text, Paragraph } = Typography

const INITIAL_REPORTS = [
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
    helpful: 5,
    reports: 1,
  },
]

export default function ReviewReport() {
  const [reports, setReports] = useState(INITIAL_REPORTS)

  const hideReview = (id) => {
    setReports((list) => list.filter((r) => r.id !== id))
  }

  return (
    <Space
      direction='vertical'
      size={24}
      style={{ width: '100%' }}
      className='my-5'
    >
      {reports.map((r) => (
        <Card
          key={r.id}
          bodyStyle={{ padding: 16 }}
          style={{
            borderRadius: 8,
            border: '1px solid #FF5E5E',
            background: '#fff',
          }}
        >
          {/* Header */}
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
              style={{ backgroundColor: '#F5222D' }}
            />
          </Row>

          {/* Text */}
          <Paragraph style={{ margin: '16px 0' }}>{r.text}</Paragraph>

          {/* Images */}
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

          {/* Footer */}
          <Row justify='space-between' align='middle'>
            <Space>
              <Text type='secondary'>
                Report{' '}
                <Badge
                  count={r.reports}
                  size='small'
                  style={{ backgroundColor: '#F5222D' }}
                />
              </Text>
            </Space>
            <Button
              type='primary'
              danger
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
