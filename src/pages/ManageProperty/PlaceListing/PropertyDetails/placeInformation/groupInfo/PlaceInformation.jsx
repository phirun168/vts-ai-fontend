// PlaceInformation.jsx
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Typography, Tag, Space } from 'antd'
import { ClockCircleOutlined, ArrowRightOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
const { Title, Text, Paragraph } = Typography
import ScheduleList from './ScheduleList'
export default function PlaceInformation(props) {
  const { information } = props
  // default data matching your screenshot

  const [info, setInfo] = useState()
  console.log(info)
  const [checkIn, setCheckIn] = useState()
  const [checkOut, setCheckout] = useState()
  const [keywords, setKeywords] = useState([])

  useEffect(() => {
    setInfo(information)
    setKeywords(information?.keyword)
  }, [information])
  useEffect(() => {
    setCheckIn(
      dayjs(
        information?.schedule?.days?.Mon?.intervals?.[0]?.openTime,
        'hh:mm A'
      )?.format('hh:mm A')
    )

    setCheckout(
      dayjs(
        information?.schedule?.days?.Mon?.intervals?.[0]?.closeTime,
        'hh:mm A'
      )?.format('hh:mm A')
    )
  }, [information])
  //
  //
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
        {/** Top row */}

        <Col xs={24} sm={12} md={8}>
          <Card size='small' style={cardStyle} bodyStyle={bodyStyle}>
            <Text type='secondary' style={labelStyle}>
              Place ID
            </Text>
            <Paragraph level={5} style={{ margin: 0 }}>
              {info?.placeId}
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card size='small' style={cardStyle}>
            <Text type='secondary'>Place Name Khmer</Text>
            <Paragraph level={5} style={{ margin: 0 }}>
              {info?.nameKh}
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card size='small' style={cardStyle}>
            <Text type='secondary'>Place Name English</Text>
            <Paragraph level={5} style={{ margin: 0 }}>
              {info?.nameEn}
            </Paragraph>
          </Card>
        </Col>

        {/** Second row */}
        <Col xs={24} sm={12} md={8}>
          <Card size='small' style={cardStyle}>
            <Text type='secondary'>Ownership</Text>
            <Paragraph level={5} style={{ margin: 0 }}>
              {info?.ownership}
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card size='small' style={cardStyle}>
            <Text type='secondary'>Phone Number</Text>
            <Paragraph level={5} style={{ margin: 0 }}>
              {info?.phone1} {info?.phone2 ? '-' + info?.phone2 : ''}
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card size='small' style={cardStyle}>
            <Text type='secondary'>Belong To</Text>
            <Paragraph level={5} style={{ margin: 0 }}>
              {info?.belong_to}
            </Paragraph>
          </Card>
        </Col>

        {/** Categories */}
        <Col xs={24} sm={12}>
          <Card size='small' style={cardStyle}>
            <Text type='secondary'>Main Category</Text>
            <div style={{ marginTop: 4 }}>
              <Tag color='blue' style={{ border: 'none', fontWeight: 'bold' }}>
                {info?.mainCategory?.nameKh
                  ? info?.mainCategory?.nameKh + ' - '
                  : ''}
                {info?.mainCategory?.nameEn}
              </Tag>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card size='small' style={cardStyle}>
            <Text type='secondary'>Sub Category</Text>
            <div style={{ marginTop: 4 }}>
              <Tag color='blue' style={{ border: 'none', fontWeight: 'bold' }}>
                {info?.subCategory?.nameKh
                  ? info?.subCategory?.nameKh + ' - '
                  : ''}
                {info?.subCategory?.nameEn}
              </Tag>
            </div>
          </Card>
        </Col>

        {/** Star and Check-in/out */}
        {info?.mainCategory?.nameEn?.trim()?.toLowerCase() ===
          'accommodation' && (
          <Col xs={24} sm={12}>
            <Card size='small' style={cardStyle}>
              <Text type='secondary'>Star</Text>
              <Paragraph level={5} style={{ margin: 0 }}>
                {info?.star}
              </Paragraph>
            </Card>
          </Col>
        )}
        {info?.mainCategory?.nameEn?.trim()?.toLowerCase() ===
          'accommodation' && (
          <Col xs={24} sm={12}>
            <Card size='small' style={cardStyle} bodyStyle={{ padding: '0px' }}>
              {/* Label */}
              <Text
                type='secondary'
                style={{ fontSize: 12, margin: 0, padding: 0 }}
              >
                Check-in / Check-out
              </Text>

              {/* “Input” box */}
              <div
                style={{
                  // marginTop: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1px solid #E6EBF1',
                  borderRadius: 8,
                  padding: '0px 12px',
                }}
              >
                {/* Times + arrow */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: '#333',
                    fontSize: 14,
                    padding: 0,
                  }}
                  className='w-2/3
'
                >
                  <div>{checkIn}</div>
                  <ArrowRightOutlined
                    style={{ margin: '0 8px', color: '#999' }}
                  />
                  <div>{checkOut}</div>
                </div>

                {/* Clock icon */}
                <ClockCircleOutlined style={{ color: '#999', fontSize: 16 }} />
              </div>
            </Card>
          </Col>
        )}
        {info?.mainCategory?.nameEn?.trim()?.toLowerCase() === 'attraction' ||
        info?.mainCategory?.nameEn?.trim()?.toLowerCase() === 'activities' ? (
          <Col xs={24}>
            <Card size='small' style={cardStyle}>
              <Text type='secondary'>Type Of Place</Text>
              <div style={{ marginTop: 4 }}>
                {info?.typeOfPlace?.map((type, i) => (
                  <Tag
                    key={i}
                    color='#00B2FF0F'
                    style={{
                      marginBottom: 4,
                      border: 'none',
                      color: '#00B2FF',
                      fontWeight: 'bold',
                    }}
                  >
                    {type?.nameKh ? type?.nameKh + '- ' : ''} {type?.nameEn}
                  </Tag>
                ))}
              </div>
            </Card>
          </Col>
        ) : (
          info?.mainCategory?.nameEn?.trim()?.toLowerCase() !==
            'accommodation' && (
            <Col xs={24}>
              <Card size='small' style={cardStyle}>
                <Text type='secondary'>Type Of Food</Text>
                <div style={{ marginTop: 4 }}>
                  {info?.typeOfPlace?.map((type, i) => (
                    <Tag
                      key={i}
                      color='#00B2FF0F'
                      style={{
                        marginBottom: 4,
                        border: 'none',
                        color: '#00B2FF',
                        fontWeight: 'bold',
                      }}
                    >
                      {type?.nameKh ? type?.nameKh + '- ' : ''} {type?.nameEn}
                    </Tag>
                  ))}
                </div>
              </Card>
            </Col>
          )
        )}
        {info?.mainCategory?.nameEn?.trim()?.toLowerCase() !==
          'accommodation' && (
          <Col xs={24}>
            <ScheduleList
              scheduleData={information?.schedule}
              cardStyle={cardStyle}
            />
          </Col>
        )}

        {/** Keywords / Activities */}
        <Col xs={24} sm={12}>
          <Card size='small' style={cardStyle}>
            <Text type='secondary'>Keyword</Text>
            <div style={{ marginTop: 4 }}>
              {info?.keyword?.map((k, i) => (
                <Tag
                  key={i}
                  color='#2292650F'
                  style={{
                    marginBottom: 4,
                    border: 'none',
                    color: '#229265',
                    fontWeight: 'bold',
                  }}
                >
                  {k}
                </Tag>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card size='small' style={cardStyle}>
            <Text type='secondary'>Activities</Text>
            <div style={{ marginTop: 4 }}>
              {info?.activity?.map((a, i) => (
                <Tag
                  key={i}
                  color='#688EB20F'
                  style={{
                    marginBottom: 4,
                    border: 'none',
                    color: '#688EB2',
                    fontWeight: 'bold',
                  }}
                >
                  {a?.nameKh} - {a?.nameEn}
                </Tag>
              ))}
            </div>
          </Card>
        </Col>

        {/** Links */}
        <Col xs={24}>
          <Card size='small' style={cardStyle}>
            <Text type='secondary'>Reference Link</Text>
            {info?.referenceLinks?.map((re, i) => (
              <Paragraph copyable style={{ margin: 0, color: '#0070FF' }}>
                {re}
              </Paragraph>
            ))}
          </Card>
        </Col>
        <Col xs={24}>
          <Card size='small' style={cardStyle}>
            <Text type='secondary'>Website / Social Media link</Text>
            {info?.links?.map((link, i) => (
              <Paragraph copyable style={{ margin: 0, color: '#0070FF' }}>
                {link}
              </Paragraph>
            ))}
          </Card>
        </Col>

        {/** Descriptions */}
        <Col xs={24}>
          <Card size='small' style={cardStyle}>
            <Text type='secondary'>Description Khmer</Text>
            <Paragraph style={{ margin: 0 }}>{info?.descriptionKh}</Paragraph>
          </Card>
        </Col>
        <Col xs={24}>
          <Card size='small' style={cardStyle}>
            <Text type='secondary'>Description English</Text>
            <Paragraph style={{ marginTop: 4 }}>
              {info?.descriptionEn}
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
