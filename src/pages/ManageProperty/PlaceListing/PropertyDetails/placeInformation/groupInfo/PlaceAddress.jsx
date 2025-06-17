// PlaceAddress.jsx
import React from 'react'
import { Row, Col, Card, Typography } from 'antd'

const { Text, Title, Paragraph } = Typography
import DisplayMaps from '../../../other/DisplayMap'
export default function PlaceAddress(props) {
  const { addressInfo } = props
  // default data matching your mock
  const info = addressInfo

  // ?? {
  //   province: 'Phnom Penh',
  //   district: 'Khan Boeng Keng Kang',
  //   commune: 'Phsar Chas',
  //   village: '-',
  //   addressDetails: '-',
  //   googleMapLink: 'https://maps.app.goo.gl/veVzRohY3nu33QUEA',
  //   lat: '11.578248',
  //   lng: '104.913311',
  // }
  const googleLink =
    'https://www.google.com/maps/place/VTS/@11.5470732,104.8589518,909m/data=!3m2!1e3!4b1!4m6!3m5!1s0x310951cb4f46def1:0x8c2d79011e098a0c!8m2!3d11.5470732!4d104.8638227!16s%2Fg%2F11b6r_n_y0?entry=ttu&g_ep=EgoyMDI1MDUxNS4wIKXMDSoASAFQAw%3D%3D'

  const cardStyle = {
    borderRadius: 8,
    border: '1px solid #E2EFFF',
    background: '#fff',
  }
  const bodyStyle = { padding: '8px 12px' }
  const labelStyle = { fontSize: 12 }

  return (
    <div>
      <Row gutter={[16, 16]}>
        {/*
         */}
        <Col xs={24} sm={12} md={8}>
          <Card size='small' style={cardStyle} bodyStyle={bodyStyle}>
            <Text type='secondary' style={labelStyle}>
              Province
            </Text>
            <Paragraph level={5} style={{ margin: 0 }}>
              {info?.address?.location?.provinceKh
                ? info?.address?.location?.provinceKh + ' - '
                : ''}{' '}
              {info?.address?.location?.provinceEn}
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card size='small' style={cardStyle} bodyStyle={bodyStyle}>
            <Text type='secondary' style={labelStyle}>
              District
            </Text>
            <Paragraph level={5} style={{ margin: 0 }}>
              {info?.address?.location?.districtKh
                ? info?.address?.location?.districtKh + ' - '
                : ''}{' '}
              {info?.address?.location?.districtEn}
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card size='small' style={cardStyle} bodyStyle={bodyStyle}>
            <Text type='secondary' style={labelStyle}>
              Commune
            </Text>
            <Paragraph level={5} style={{ margin: 0 }}>
              {info?.address?.location?.communeKh
                ? info?.address?.location?.communeKh + ' - '
                : ''}{' '}
              {info?.address?.location?.communeEn}
            </Paragraph>
          </Card>
        </Col>
        {/*  */}
        {/** Address Details */}
        <Col xs={24}>
          <Card size='small' style={cardStyle} bodyStyle={bodyStyle}>
            <Text type='secondary' style={labelStyle}>
              Address Details
            </Text>
            <Paragraph style={{ margin: '4px 0 0' }}>
              {info?.address?.addressDetails}
            </Paragraph>
          </Card>
        </Col>

        {/** Google Map Link + embed */}
        <Col xs={24}>
          <Card size='small' style={cardStyle} bodyStyle={bodyStyle}>
            <Text type='secondary' style={labelStyle}>
              Link Google Map
            </Text>
            <Paragraph copyable style={{ margin: '4px 0', color: '#0070FF' }}>
              {info?.address?.googleMap}
            </Paragraph>
            <DisplayMaps displayGoogleMap={info?.address?.googlePlaceLink} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
