import { EditOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { Button, Card, Col, Divider, Row, Statistic, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import DisplayMap from '../../../other/DisplayMap'
export default function Address(props) {
  const { setLocation, setOpenLocation, businessProperty } = props
  const [province, setProvince] = useState()
  const [district, setDistrict] = useState()
  const [commune, setCommune] = useState()
  const [village, setVillage] = useState()
  const [addressDetails, setAddressDetails] = useState()
  const [googleMap, setGoogleMap] = useState()
  const [googlePlaceLink, setGooglePlaceLink] = useState()

  useEffect(() => {
    if (businessProperty?.address?.location) {
      setProvince(businessProperty?.address?.location?.provinceEn)
      setDistrict(businessProperty?.address?.location?.districtEn)
      setCommune(businessProperty?.address?.location?.communeEn)
      setVillage(businessProperty?.address?.location?.villageEn)
    }
    if (businessProperty?.address?.addressDetails) {
      setAddressDetails(businessProperty?.address?.addressDetails)
    }
    if (businessProperty?.address?.googleMap) {
      setGoogleMap(businessProperty?.address?.googleMap)
    }
    if (businessProperty?.address?.googlePlaceLink) {
      setGooglePlaceLink(businessProperty?.address?.googlePlaceLink)
    }
  }, [businessProperty])
  return (
    <>
      <Card
        title={'Place Address'}
        extra={
          <Button
            type='default'
            style={{ background: '#ECB603' }}
            icon={<EditOutlined />}
            onClick={() => setOpenLocation(true)}
          ></Button>
        }
      >
        <Row gutter={[8, 8]}>
          {/* 📌 Province */}
          {province ? (
            <Col xs={24} sm={12} md={12} lg={12} xl={6}>
              <Card
                bodyStyle={{ padding: '12px', background: '#FAFAFA' }}
                className='bg-gray-100 shadow-sm hover:shadow-md transition-transform transform '
              >
                <div className='flex flex-col'>
                  <p className='text-gray-400  text-sm mb-1 font-medium'>
                    {' '}
                    Province
                  </p>
                  <p className='text-gray-500 text-sm  font-medium'>
                    {province}
                  </p>
                </div>
              </Card>
            </Col>
          ) : (
            ''
          )}

          {/* 📌 District */}
          {district ? (
            <Col xs={24} sm={12} md={12} lg={12} xl={6}>
              <Card
                bodyStyle={{ padding: '12px', background: '#FAFAFA' }}
                className='bg-gray-100 shadow-sm hover:shadow-md transition-transform transform '
              >
                <div className='flex flex-col'>
                  <p className='text-gray-400  text-sm mb-1 font-medium'>
                    {' '}
                    District
                  </p>
                  <p className='text-gray-500 text-sm  font-medium'>
                    {district}
                  </p>
                </div>
              </Card>
            </Col>
          ) : (
            ''
          )}

          {/* 📌 Commune */}
          {commune ? (
            <Col xs={24} sm={12} md={12} lg={12} xl={6}>
              <Card
                bodyStyle={{ padding: '12px', background: '#FAFAFA' }}
                className='bg-gray-100 shadow-sm hover:shadow-md transition-transform transform '
              >
                <div className='flex flex-col'>
                  <p className='text-gray-400  text-sm mb-1 font-medium'>
                    {' '}
                    Commune
                  </p>
                  <p className='text-gray-500 text-sm  font-medium'>
                    {commune}
                  </p>
                </div>
              </Card>
            </Col>
          ) : (
            ''
          )}

          {/* 📌 village */}
          {village ? (
            <Col xs={24} sm={12} md={12} lg={12} xl={6}>
              <Card
                bodyStyle={{ padding: '12px', background: '#FAFAFA' }}
                className='bg-gray-100 shadow-sm hover:shadow-md transition-transform transform '
              >
                <div className='flex flex-col'>
                  <p className='text-gray-400  text-sm mb-1 font-medium'>
                    {' '}
                    Village
                  </p>
                  <p className='text-gray-500 text-sm  font-medium'>
                    {village}
                  </p>
                </div>
              </Card>
            </Col>
          ) : (
            ''
          )}
        </Row>
      </Card>
      <Card title={'Address Details'} className='my-2'>
        <p className='text-gray-600 text-sm font-medium'>{addressDetails}</p>
      </Card>
      <Card className='my-2' title={'Link Google Map'}>
        <p className='text-gray-600 text-sm font-medium'>
          <a href={googleMap} target='_blank' className='text-blue-500'>
            {googleMap}
          </a>
        </p>
        <div className='mt-4'>
          <DisplayMap displayGoogleMap={googlePlaceLink} />
        </div>
      </Card>
    </>
  )
}
