import React from 'react'
import { Card, Row, Col } from 'antd'
import {
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'

const Dashboard = ({ data }) => {
  // Compute counts based on user properties
  const allCount = data.length
  const activeCount = data.filter(
    (item) => item.status.toLowerCase() === 'active'
  ).length
  const inactiveCount = data.filter(
    (item) => item.status.toLowerCase() === 'inactive'
  ).length

  return (
    <Row gutter={[16, 16]} className='mt-1 mb-2'>
      <Col xs={24} sm={12} md={8}>
        <Card
          bordered={false}
          size='small'
          style={{ textAlign: 'center', borderLeft: '4px solid blue' }}
          className='transition-transform duration-300 hover:scale-105 cursor-pointer'
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '4px',
            }}
          >
            <UserOutlined style={{ marginRight: '8px', color: 'blue' }} />
            {allCount}
          </div>
          <div style={{ fontSize: '12px' }}>All Users</div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card
          bordered={false}
          size='small'
          style={{ textAlign: 'center', borderLeft: '4px solid green' }}
          className='transition-transform duration-300 hover:scale-105 cursor-pointer'
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '4px',
            }}
          >
            <CheckCircleOutlined
              style={{ marginRight: '8px', color: 'green' }}
            />
            {activeCount}
          </div>
          <div style={{ fontSize: '12px' }}>Active Users</div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card
          bordered={false}
          size='small'
          style={{ textAlign: 'center', borderLeft: '4px solid red' }}
          className='transition-transform duration-300 hover:scale-105 cursor-pointer'
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '4px',
            }}
          >
            <CloseCircleOutlined style={{ marginRight: '8px', color: 'red' }} />
            {inactiveCount}
          </div>
          <div style={{ fontSize: '12px' }}>Inactive Users</div>
        </Card>
      </Col>
    </Row>
  )
}

export default Dashboard
