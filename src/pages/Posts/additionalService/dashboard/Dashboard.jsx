import React from 'react'
import { Card, Row, Col } from 'antd'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'

const Dashboard = ({ data }) => {
  // Compute counts based on the data
  const activeCount = data.filter(
    (item) => item.status.toLowerCase() === 'active'
  ).length
  const inactiveCount = data.filter(
    (item) => item.status.toLowerCase() === 'inactive'
  ).length
  const expiredCount = data.filter(
    (item) => item.status.toLowerCase() === 'expired'
  ).length
  const totalCount = data.length // Total number of Additional Service items

  return (
    <Row gutter={[16, 16]} className='mb-2 mt-1'>
      <Col xs={24} sm={12} md={6}>
        <Card
          bordered={false}
          size='small'
          style={{
            textAlign: 'center',
            borderLeft: '4px solid #1677ff',
          }}
          className='transition-transform duration-300 hover:scale-105 cursor-pointer'
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '4px',
            }}
          >
            <PlusCircleOutlined
              style={{ color: '#1677ff', marginRight: '8px' }}
            />
            {totalCount}
          </div>
          <div style={{ fontSize: '12px' }}>Total Additional Services</div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card
          bordered={false}
          size='small'
          style={{
            textAlign: 'center',
            borderLeft: '4px solid green',
          }}
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
              style={{ color: 'green', marginRight: '8px' }}
            />
            {activeCount}
          </div>
          <div style={{ fontSize: '12px' }}>Active Additional Services</div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card
          bordered={false}
          size='small'
          style={{
            textAlign: 'center',
            borderLeft: '4px solid gray',
          }}
          className='transition-transform duration-300 hover:scale-105 cursor-pointer'
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '4px',
            }}
          >
            <CloseCircleOutlined
              style={{ color: 'gray', marginRight: '8px' }}
            />
            {inactiveCount}
          </div>
          <div style={{ fontSize: '12px' }}>Inactive Additional Services</div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card
          bordered={false}
          size='small'
          style={{
            textAlign: 'center',
            borderLeft: '4px solid red',
          }}
          className='transition-transform duration-300 hover:scale-105 cursor-pointer'
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '4px',
            }}
          >
            <ExclamationCircleOutlined
              style={{ color: 'red', marginRight: '8px' }}
            />
            {expiredCount}
          </div>
          <div style={{ fontSize: '12px' }}>Expired Additional Services</div>
        </Card>
      </Col>
    </Row>
  )
}

export default Dashboard
