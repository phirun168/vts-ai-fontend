import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'antd'
import {
  ApartmentOutlined,
  ClusterOutlined,
  HomeOutlined,
  TeamOutlined,
  BarChartOutlined,
  SettingOutlined,
  SolutionOutlined,
  CameraOutlined,
} from '@ant-design/icons'
import MobileAppUserServices from '../../services/mobiles/apps/user'

const AnimatedCard = ({
  children,
  borderColor,
  title,
  count,
  icon,
  style,
  ...rest
}) => {
  const [hover, setHover] = useState(false)

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: hover
      ? '0 4px 12px rgba(0, 0, 0, 0.15)'
      : '0 2px 6px rgba(0, 0, 0, 0.1)',
    borderLeft: `4px solid ${borderColor}`,
    padding: '0px',
    transition: 'all 0.3s ease',
    transform: hover ? 'scale(0.95)' : 'scale(1)',
    cursor: 'pointer',
    ...style,
  }

  return (
    <Card
      style={cardStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
      size='small'
    >
      <div
        className='m-0 p-0'
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <span
          className='text-gray-400 text-md '
          style={{ marginBottom: '8px' }}
        >
          {title}
        </span>
        <div
          className='p-0 m-0'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: borderColor,
            }}
          >
            {count}
          </div>
          {icon}
        </div>
      </div>
      {children}
    </Card>
  )
}

export default function CardDashboard(props) {
  const { access_token } = props
  const [users, setUsers] = useState([])
  const [company_list, setCompanyList] = useState([])
  const [department_list, setDepartmentList] = useState([])
  const [position_list, setPositionList] = useState([])

  const GetUser = async () => {
    try {
      const res = await MobileAppUserServices?.fetchUserApp({ access_token })
      setUsers(res)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    GetUser()
  }, [])

  return (
    <Row gutter={[16, 16]} style={{ marginTop: '16px', marginBottom: '16px' }}>
      {/* Users Card */}
      <Col xs={24} sm={12} md={12} xl={6}>
        <AnimatedCard
          title='Users'
          count={users?.length > 0 ? users?.length : 0}
          icon={<TeamOutlined style={{ fontSize: '40px' }} />}
          borderColor='#3b82f6' // blue
        />
      </Col>

      {/* Place Card */}
      <Col xs={24} sm={12} md={12} xl={6}>
        <AnimatedCard
          title='Place'
          count={company_list.length > 0 ? company_list.length : 0}
          icon={<HomeOutlined style={{ fontSize: '40px' }} />}
          borderColor='#10b981' // green
        />
      </Col>

      {/* Service Card with different icon */}
      <Col xs={24} sm={12} md={12} xl={6}>
        <AnimatedCard
          title='Service'
          count={department_list.length > 0 ? department_list.length : 0}
          icon={<SettingOutlined style={{ fontSize: '40px' }} />}
          borderColor='#8b5cf6' // purple
        />
      </Col>

      {/* Additional Service Card with different icon */}
      <Col xs={24} sm={12} md={12} xl={6}>
        <AnimatedCard
          title='Additional Service'
          count={department_list.length > 0 ? department_list.length : 0}
          icon={<SolutionOutlined style={{ fontSize: '40px' }} />}
          borderColor='#8b5cf6' // purple
        />
      </Col>

      {/* Moments Card with different icon */}
      <Col xs={24} sm={12} md={12} xl={6}>
        <AnimatedCard
          title='Moments'
          count={department_list.length > 0 ? department_list.length : 0}
          icon={<CameraOutlined style={{ fontSize: '40px' }} />}
          borderColor='#8b5cf6' // purple
        />
      </Col>

      {/* Tours Card */}
      <Col xs={24} sm={12} md={12} xl={6}>
        <AnimatedCard
          title='Tours'
          count={position_list.length > 0 ? position_list.length : 0}
          icon={<ClusterOutlined style={{ fontSize: '40px' }} />}
          borderColor='#ef4444' // red
        />
      </Col>
      <Col xs={24} sm={12} md={12} xl={6}>
        <AnimatedCard
          title='Promotion&Events'
          count={position_list.length > 0 ? position_list.length : 0}
          icon={<ClusterOutlined style={{ fontSize: '40px' }} />}
          borderColor='blue' // red
        />
      </Col>
    </Row>
  )
}
