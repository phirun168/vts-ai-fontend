import React, { useState } from 'react'
import { Card, Row, Col, Divider, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import Edit from '../Edit'
const sampleFormData = {
  additionalService_en: 'Service One',
  additionalService_kh: 'សេវាកម្ម មួយ',
  placeName: 'Place A',
  status: 'active',
  startDate: '2025-01-01',
  expiredDate: '2025-12-31',
  createdBy: 'Admin',
  createdAt: '2025-01-01',
  description: 'This is a sample description for the additional service.',
}

export default function AddInfoService() {
  const [openEdit, setOpenEdit] = useState(false)
  return (
    <div>
      <Edit open={openEdit} setOpen={setOpenEdit} />
      <Card
        title='Additional Service Information '
        style={{ marginTop: '20px' }}
        extra={
          <Button onClick={() => setOpenEdit(true)} icon={<EditOutlined />}>
            Edit
          </Button>
        }
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <div>
                <div className='text-gray-600 font-medium'>
                  Additional Service (En)
                </div>
                <div className='text-gray-500' style={{ fontSize: '14px' }}>
                  {sampleFormData.additionalService_en}
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <div>
                <div className='text-gray-600 font-medium'>
                  Additional Service (Kh)
                </div>
                <div className='text-gray-500' style={{ fontSize: '14px' }}>
                  {sampleFormData.additionalService_kh}
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <div>
                <div className='text-gray-600 font-medium'>Place Name</div>
                <div className='text-gray-500' style={{ fontSize: '14px' }}>
                  {sampleFormData.placeName}
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <div>
                <div className='text-gray-600 font-medium'>Status</div>
                <div className='text-gray-500' style={{ fontSize: '14px' }}>
                  {sampleFormData.status}
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <div>
                <div className='text-gray-600 font-medium'>Start Date</div>
                <div className='text-gray-500' style={{ fontSize: '14px' }}>
                  {sampleFormData.startDate}
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <div>
                <div className='text-gray-600 font-medium'>Expired Date</div>
                <div className='text-gray-500' style={{ fontSize: '14px' }}>
                  {sampleFormData.expiredDate}
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <div>
                <div className='text-gray-600 font-medium'>Created By</div>
                <div className='text-gray-500' style={{ fontSize: '14px' }}>
                  {sampleFormData.createdBy}
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} xl={8}>
            <Card
              bodyStyle={{ padding: '12px' }}
              className='bg-white shadow-sm hover:shadow-md border transition-transform transform hover:scale-105'
            >
              <div>
                <div className='text-gray-600 font-medium'>Created At</div>
                <div className='text-gray-500' style={{ fontSize: '14px' }}>
                  {sampleFormData.createdAt}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
