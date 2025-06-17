import { ArrowLeftOutlined, HomeOutlined, TagOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Card, Col, Form, Row, Tag } from 'antd'
import { useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

import CoverPromotionAndEvent from './Cover'
import dayjs from 'dayjs'
//
import AddInfoService from './AddInfoService'
import { PERMS } from '../../../../constants/permission/perms'
const AdditionalService = () => {
  const { collapsed, setDisplayEmitContent } = useOutletContext()

  const postType = 'new_feed'
  const postStatus = 'active'
  const postOption = 'location'
  const navigate = useNavigate()
  const getStatusTag = (status) => {
    switch (status) {
      case 'active':
        return (
          <Tag color='green' className='px-3 py-1'>
            ✅ Active
          </Tag>
        )
      case 'inactive':
        return (
          <Tag color='gray' className='px-3 py-1'>
            ⚪ Inactive
          </Tag>
        )
      case 'expired':
        return (
          <Tag color='red' className='px-3 py-1'>
            ❌ Expired
          </Tag>
        )
      default:
        return (
          <Tag color='blue' className='px-3 py-1'>
            🆕 Unknown
          </Tag>
        )
    }
  }
  const locationData = [
    {
      key: 1,
      pp_code: 'PP001',
      location_name_en: 'Siem Reap',
      location_name_kh: 'សៀមរាប',
      location_owner: 'ម៉ាលីស',
      created_by: 'Admin',
      created_at: dayjs().format('YYYY-MM-DD'),
      province: 'Phnom Penh',
    },
  ]
  const locationFields = [
    { label: 'PP Code', key: 'pp_code' },
    { label: 'Place Name (En)', key: 'location_name_en' },
    { label: 'Place Name (Kh)', key: 'location_name_kh' },
    { label: 'Place Owner', key: 'location_owner' },
    { label: 'Created By', key: 'created_by' },
    { label: 'Created At', key: 'created_at' },
    { label: 'Province', key: 'province' },
  ]
  function getDataByPostOption(postOption) {
    switch (postOption) {
      case 'location':
        return { data: locationData, fields: locationFields }
      default:
        return { data: [], fields: [] }
    }
  }

  useEffect(() => {
    setDisplayEmitContent(
      <div className='flex justify-between my-2'>
        <div className='font-semibold' style={{ color: '#495057' }}>
          <div className='flex space-x-1  items-center'>
            <Button
              style={{ width: '40px', color: 'red' }}
              icon={<ArrowLeftOutlined />}
              onClick={() => handleBack()}
            ></Button>
            <p> Additional service detail</p>
          </div>
        </div>
        <Breadcrumb
          items={[
            {
              title: <HomeOutlined style={{ cursor: 'pointer' }} />,
            },
            {
              href: '/additional-service',
              title: (
                <>
                  <span>Additional</span>
                </>
              ),
            },
            {
              href: '',
              title: (
                <>
                  <span>Detail</span>
                </>
              ),
            },
          ]}
        />
      </div>
    )
  }, [navigate])
  return (
    <>
      <div className='bg-gray-100 '>
        <div className='mx-auto py-8'>
          <Row gutter={[8, 2]}>
            <Col xs={24}>
              <Card>
                <CoverPromotionAndEvent />
              </Card>
            </Col>
            <Col xs={24}>
              <div className='relative sm:flex justify-between   px-6 py-2 rounded-lg mb-4'>
                <div className=''>
                  <h1 className='text-2xl font-bold flex items-center gap-2'>
                    <TagOutlined className='text-xl' />
                    Cultural Festival
                  </h1>
                  <div style={{ color: '#7E0DE9' }} className='sm:mx-8'>
                    <span>ការសំដែងរាំបុរាណ</span> <span></span>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <div>
                    {postType === 'new_feed' ? (
                      <Tag color='blue' className='text-md px-3 py-1'>
                        📢 New Feed
                      </Tag>
                    ) : (
                      <Tag color='green' className='text-md px-3 py-1'>
                        📍 Normal
                      </Tag>
                    )}
                  </div>
                  <div>{getStatusTag(postStatus)}</div>
                </div>
              </div>
            </Col>
          </Row>
          <AddInfoService />
          <Card className='my-2'>
            <h3 className='font-bold text-lg mb-3  '>Place Information</h3>
            {(() => {
              const { data, fields } = getDataByPostOption(postOption)
              if (!data.length) {
                return (
                  <p className='text-red-500'>No related information found.</p>
                )
              }
              return (
                <div className=''>
                  {data.map((item) => (
                    <Card key={item.key} className=''>
                      {fields.map((field) => (
                        <div key={field.key} className='mb-2'>
                          <span className='font-medium text-gray-600'>
                            {field.label}:{' '}
                          </span>
                          <span className='text-gray-500'>
                            {item[field.key]}
                          </span>
                        </div>
                      ))}
                      {/* If an action field exists, render an example Edit/View button */}
                      {fields.some((f) => f.key === 'action') && (
                        <div className='mt-3 text-right'>
                          <Button
                            icon={<EyeOutlined style={{ color: 'green' }} />}
                            size='small'
                            onClick={() => handleView(item)}
                          >
                            View
                          </Button>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              )
            })()}
          </Card>
        </div>
      </div>
    </>
  )
}
export default AdditionalService
