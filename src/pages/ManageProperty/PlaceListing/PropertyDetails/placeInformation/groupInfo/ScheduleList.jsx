// OpenTime.jsx
import React from 'react'
import { Card, Row, Col, Typography, Input, Space } from 'antd'
import { ClockCircleOutlined, ArrowRightOutlined } from '@ant-design/icons'

const { Text } = Typography

// helper: format Date (ISO) into "HH:mm"
function formatHM(iso) {
  const dt = new Date(iso)
  return dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// full day names ordered Mon→Sun
const DAY_ORDER = [
  { key: 'Mon', label: 'Monday' },
  { key: 'Tue', label: 'Tuesday' },
  { key: 'Wed', label: 'Wednesday' },
  { key: 'Thu', label: 'Thursday' },
  { key: 'Fri', label: 'Friday' },
  { key: 'Sat', label: 'Saturday' },
  { key: 'Sun', label: 'Sunday' },
]

export default function OpenTime({ scheduleData, cardStyle }) {
  const { days, is24x7 } = scheduleData ? scheduleData : []

  // split into two columns
  const left = DAY_ORDER.filter((_, i) => i % 2 === 0)
  const right = DAY_ORDER.filter((_, i) => i % 2 === 1)

  // render one row
  const renderDay = ({ key, label }) => {
    if (is24x7) {
      return (
        <div key={key} className='flex items-center mb-2'>
          <Text style={{ width: 90 }}>{label}</Text>
          <Text>24 × 7</Text>
        </div>
      )
    }

    const info = days?.[key]
    const enabled = info?.enabled
    const intervals = info?.intervals || []

    if (!enabled || intervals?.length === 0) {
      return (
        <div key={key} className='flex items-center mb-2'>
          <Text style={{ width: 90 }}>{label}</Text>
          <Text type='danger'>Closed</Text>
        </div>
      )
    }

    // assume only first interval
    const { openTime, closeTime } = intervals[0]

    return (
      <div key={key} className='flex items-center mb-2 mx-3'>
        <Text style={{ width: 100 }} className='text-semibold'>
          {label}
        </Text>

        <div
          style={{
            // marginTop: 3,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid #E6EBF1',
            borderRadius: 8,
            padding: '4px 12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#333',
              fontSize: 14,
              padding: 0,
            }}
            className='w-1/2'
          >
            <div>{formatHM(openTime)}</div>
            <ArrowRightOutlined style={{ margin: '0 8px', color: '#999' }} />
            <div>{formatHM(closeTime)}</div>
          </div>

          <ClockCircleOutlined style={{ color: '#999', fontSize: 16 }} />
        </div>
        {/* <Input
          value={formatHM(openTime) + { <ArrowRightOutlined style={{ color: '#ccc', marginRight: 8 }} />} + formatHM(closeTime)}
          readOnly
          style={{ width: '100%', marginRight: 8 }}
        /> */}
        {/* <ArrowRightOutlined style={{ color: '#ccc', marginRight: 8 }} /> */}
        {/* <Input
          value={formatHM(closeTime)}
          readOnly
          style={{ width: '100%', marginRight: 8 }}
        /> */}
        {/* <ClockCircleOutlined style={{ color: '#ccc' }} /> */}
      </div>
    )
  }

  return (
    <Card
      title={
        <Text style={{ fontWeight: 'normal', color: '#635959' }}>
          {' '}
          <span>Open Time</span>{' '}
        </Text>
      }
      bordered
      style={cardStyle}
      headStyle={{ borderBottom: 'none' }}
      //   style={{ borderRadius: 8, width: '100%' }}
      bodyStyle={{ padding: 16 }}
    >
      <Row>
        <Col xs={24} md={12}>
          {left.map(renderDay)}
        </Col>
        <Col xs={24} md={12}>
          {right.map(renderDay)}
        </Col>
      </Row>
    </Card>
  )
}
