import React from 'react'
import { Card, Row, Col, Typography, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

// Sample data – a "Place" (store) with multiple managers and one owner
const places = [
  {
    id: 1,
    titleEn: 'Main Store',
    titleKh: 'ហាង​មេ',
    address: '123 Main St.',
    placeCode: 'PLC001',
    phone: '012 345 678',
    managers: ['John Doe', 'Jane Doe'],
    owner: 'Alice Johnson',
    createdAt: '2023-01-02',
    viewLink: '/places/1',
  },
  {
    id: 2,
    titleEn: 'Electronics Dept.',
    titleKh: 'ផ្នែក​អេឡិចត្រូនិច',
    address: '456 Market Ave.',
    placeCode: 'PLC002',
    phone: '098 765 432',
    managers: ['Bob Williams', 'Carol White'],
    owner: 'David Smith',
    createdAt: '2023-01-05',
    viewLink: '/places/2',
  },
  {
    id: 3,
    titleEn: 'Clothing Dept.',
    titleKh: 'ផ្នែក​សំលៀកបំពាក់',
    address: '789 Fashion Rd.',
    placeCode: 'PLC003',
    phone: '011 223 344',
    managers: ['Emily Davis', 'Frank Miller'],
    owner: 'Grace Lee',
    createdAt: '2023-01-10',
    viewLink: '/places/3',
  },
  {
    id: 4,
    titleEn: 'Home Goods Dept.',
    titleKh: 'ផ្នែក​សម្ភារៈផ្ទះ',
    address: '101 Home Dr.',
    placeCode: 'PLC004',
    phone: '099 888 777',
    managers: ['Oliver Brown'],
    owner: 'Lisa Martin',
    createdAt: '2023-02-01',
    viewLink: '/places/4',
  },
  {
    id: 5,
    titleEn: 'Grocery Dept.',
    titleKh: 'ផ្នែក​ឥវ៉ាន់អាហារ',
    address: '202 Food Ln.',
    placeCode: 'PLC005',
    phone: '088 111 222',
    managers: ['Daniel Taylor', 'Nina Patel'],
    owner: 'Sophia Lee',
    createdAt: '2023-02-05',
    viewLink: '/places/5',
  },
]

const Place = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Row gutter={[16, 16]}>
        {places.map((place) => (
          <Col key={place.id} xs={24} sm={12} md={24} lg={12} xl={12} xxl={8}>
            <Card
              hoverable
              style={{
                borderRadius: 8,
                minHeight: 220,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Title / Subtitle */}
              <div>
                <Title level={4} style={{ marginBottom: 0, color: '#333' }}>
                  {place.titleEn}
                </Title>
                <Text type='secondary' style={{ fontSize: 14 }}>
                  {place.titleKh}
                </Text>
              </div>

              {/* Content / Fields */}
              <div style={{ marginTop: '1rem' }}>
                <Text style={{ display: 'block' }}>
                  <strong>Address: </strong>
                  {place.address}
                </Text>
                <Text style={{ display: 'block' }}>
                  <strong>Place Code: </strong>
                  {place.placeCode}
                </Text>
                <Text style={{ display: 'block' }}>
                  <strong>Phone: </strong>
                  {place.phone}
                </Text>
                <Text style={{ display: 'block' }}>
                  <strong>Managers: </strong>
                  {place.managers.join(', ')}
                </Text>
                <Text style={{ display: 'block' }}>
                  <strong>Owner: </strong>
                  {place.owner}
                </Text>
              </div>

              {/* Footer with created date and View Link */}
              <Divider />
              <div className='flex justify-between'>
                <div>
                  <Text style={{ display: 'block' }}>{place.createdAt}</Text>
                </div>
                <div>
                  <a
                    onClick={() => navigate(place.viewLink)}
                    style={{
                      color: '#1890ff',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                  >
                    View
                  </a>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Place
