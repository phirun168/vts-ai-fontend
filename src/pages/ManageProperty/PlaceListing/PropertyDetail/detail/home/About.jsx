import {
  AppstoreOutlined,
  EditOutlined,
  EnvironmentOutlined,
  FolderOpenOutlined,
  TagsOutlined,
} from '@ant-design/icons'
import { Button, Card, Col, Modal, Row, Statistic, Tabs, Tag } from 'antd'

const { TabPane } = Tabs
import { useEffect, useState } from 'react'
import EditAmenity from '../updates/ProfileInfo/about/EditAmenity'
import EditPrivacy from '../updates/ProfileInfo/about/EditPrivacy'
import EditInfo from '../updates/ProfileInfo/homes/Step'
import EditMap from '../updates/ProfileInfo/homes/Address'
import Address from './Address'
import dayjs from 'dayjs'

const Home = (props) => {
  const { businessProperty } = props
  const [isAmenityModalOpen, setIsAmenityModalOpen] = useState(false)
  const [openPrivacy, setOpenPrivacy] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [category, setCategory] = useState([])
  const [subcategory, setSubcategory] = useState([])
  const [keywords, setKeyword] = useState([])
  const [activity, setActivity] = useState([])
  const [openLocation, setOpenLocation] = useState(false)

  useEffect(() => {
    if (businessProperty?.mainCategory) {
      setCategory((prev) => [...prev, businessProperty.mainCategory])
    }
    if (businessProperty?.subCategory) {
      setSubcategory((prev) => [...prev, businessProperty.subCategory])
    }
    if (businessProperty?.keyword) {
      setKeyword(businessProperty?.keyword)
    }
    if (businessProperty?.activity) {
      setActivity(businessProperty?.activity)
    }
  }, [businessProperty])
  //
  //
  return (
    <>
      <EditInfo open={isModalOpen} setOpen={() => setIsModalOpen(false)} />
      <EditMap open={openLocation} setOpen={setOpenLocation} />
      <Modal
        title='Edit Amenities'
        open={isAmenityModalOpen}
        onCancel={() => setIsAmenityModalOpen(false)}
        footer={null}
      >
        <EditAmenity onClose={() => setIsAmenityModalOpen(false)} />
      </Modal>
      <Modal
        title='Edit Privacy'
        open={openPrivacy}
        onCancel={() => setOpenPrivacy(false)}
        footer={null}
      >
        <EditPrivacy onClose={() => setOpenPrivacy(false)} />
      </Modal>
      {/*  */}
      <Card
        bordered={false}
        className='mb-4 shadow-md '
        title={<> Place Information</>}
        extra={
          <div className=''>
            <Button
              type='default'
              style={{ background: '#ECB603', color: 'white' }}
              onClick={() => setIsModalOpen(true)}
              className='flex justify-center items-center'
            >
              <EditOutlined />
            </Button>
          </div>
        }
      >
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12} md={8}>
            <Card
              bodyStyle={{ padding: '12px', background: '#FAFAFA' }}
              className='shadow-sm hover:shadow-md transition-transform transform '
            >
              <div className='flex flex-col'>
                <p className='text-gray-400  text-sm font-medium mb-1'>
                  Place ID
                </p>
                <p className='text-gray-500 text-sm font-medium '>
                  {businessProperty?.placeId}
                </p>
              </div>
            </Card>
          </Col>

          {/* 📌 Location Name (EN) */}
          <Col xs={24} sm={12} md={8}>
            <Card
              bodyStyle={{ padding: '12px', background: '#FAFAFA' }}
              className='bg-gray-100 shadow-sm hover:shadow-md transition-transform transform'
            >
              <div className='flex flex-col'>
                <p className='text-gray-400  text-sm mb-1 font-medium'>
                  Place Name Khmer
                </p>
                <p className='text-gray-500 text-sm font-medium'>
                  {businessProperty?.nameKh}
                </p>
              </div>
            </Card>
          </Col>

          {/* 📌 Location Name (KH) */}
          <Col xs={24} sm={12} md={8}>
            <Card
              bodyStyle={{ padding: '12px', background: '#FAFAFA' }}
              className='bg-gray-100 shadow-sm hover:shadow-md transition-transform transform '
            >
              <div className='flex flex-col'>
                <p className='text-gray-400  text-sm mb-1 font-medium'>
                  {' '}
                  Place Name English
                </p>
                <p className='text-gray-500 text-sm  font-medium'>
                  {businessProperty?.nameEn}
                </p>
              </div>
            </Card>
          </Col>

          {/* 📌 Belong To */}
          <Col xs={24} sm={12} md={8}>
            <Card
              bodyStyle={{ padding: '12px', background: '#FAFAFA' }}
              className='bg-gray-100 shadow-sm hover:shadow-md transition-transform transform '
            >
              <div className='flex flex-col'>
                <p className='text-gray-400  text-sm mb-1 font-medium'>
                  Ownership
                </p>
                <p className='text-gray-500 text-sm font-medium'>
                  {' '}
                  {businessProperty?.ownership}
                </p>
              </div>
            </Card>
          </Col>
          {businessProperty?.belong_to ? (
            <Col xs={24} sm={12} md={8}>
              <Card
                bodyStyle={{ padding: '12px', background: '#FAFAFA' }}
                className='bg-gray-100 shadow-sm hover:shadow-md transition-transform transform '
              >
                <div className='flex flex-col'>
                  <p className='text-gray-400  text-sm mb-1 font-medium'>
                    Belong To
                  </p>
                  <p className='text-gray-500 text-sm font-medium'>
                    {' '}
                    {businessProperty?.belong_to}
                  </p>
                </div>
              </Card>
            </Col>
          ) : (
            ''
          )}
          {/* 📌 Commune */}
          {businessProperty?.phone1 || businessProperty?.phone2 ? (
            <Col xs={24} sm={12} md={8}>
              <Card
                bodyStyle={{ padding: '12px', background: '#FAFAFA' }}
                className='bg-gray-100 shadow-sm hover:shadow-md transition-transform transform '
              >
                <div className='flex flex-col'>
                  <p className='text-gray-400  text-sm mb-1 font-medium'>
                    Phone Number
                  </p>
                  <p className='text-gray-500 text-sm font-medium'>
                    {businessProperty?.phone1} - {businessProperty?.phone2}
                  </p>
                </div>
              </Card>
            </Col>
          ) : (
            ''
          )}

          {/* 📌 Created By */}
          {businessProperty?.createdBy ? (
            <Col xs={24} sm={12} md={8}>
              <Card
                bodyStyle={{ padding: '12px', background: '#FAFAFA' }}
                className='bg-gray-100 shadow-sm hover:shadow-md transition-transform transform '
              >
                <div className='flex flex-col'>
                  <p className='text-gray-400  text-sm mb-1 font-medium'>
                    Created By
                  </p>
                  <p className='text-gray-500 text-sm font-medium'>
                    {businessProperty?.createdBy}
                  </p>
                </div>
              </Card>
            </Col>
          ) : (
            ''
          )}

          {/* 📌 Created At */}
          <Col xs={24} sm={12} md={8}>
            <Card
              bodyStyle={{ padding: '12px', background: '#FAFAFA' }}
              className='bg-gray-100 shadow-sm hover:shadow-md transition-transform transform '
            >
              <div className='flex flex-col'>
                <p className='text-gray-400  text-sm mb-1 font-medium'>
                  Created At
                </p>
                <p className='text-gray-500 text-sm font-medium'>
                  {' '}
                  {dayjs(businessProperty?.createdAt).format('YYYY-MM-DD')}
                </p>
              </div>
            </Card>
          </Col>
          {businessProperty?.star ? (
            <Col xs={24} sm={12} md={8}>
              <Card
                bodyStyle={{ padding: '12px', background: '#FAFAFA' }}
                className='bg-gray-100 shadow-sm hover:shadow-md transition-transform transform '
              >
                <div className='flex flex-col'>
                  <p className='text-gray-400  text-sm mb-1 font-medium'>
                    Star
                  </p>
                  <p className='text-gray-500 text-sm font-medium'>
                    {businessProperty?.star}
                  </p>
                </div>
              </Card>
            </Col>
          ) : (
            ''
          )}
          {businessProperty?.descriptionKh ? (
            <Col xs={24}>
              <Card
                bodyStyle={{ padding: '12px', background: '#FAFAFA' }}
                className='bg-gray-100 shadow-sm hover:shadow-md transition-transform transform '
              >
                <div className='flex flex-col'>
                  <p className='text-gray-400  text-sm mb-1'>
                    Description Khmer
                  </p>
                  <p className='text-gray-500 text-sm '>
                    {businessProperty?.descriptionKh}
                  </p>
                </div>
              </Card>
            </Col>
          ) : (
            ''
          )}
          {businessProperty?.descriptionEn ? (
            <Col xs={24}>
              <Card
                bodyStyle={{ padding: '12px', background: '#FAFAFA' }}
                className='bg-gray-100 shadow-sm hover:shadow-md transition-transform transform '
              >
                <div className='flex flex-col'>
                  <p className='text-gray-400  text-sm font-medium  mb-1'>
                    Description English
                  </p>
                  <p className='text-gray-500 text-sm  font-medium '>
                    {businessProperty?.descriptionEn}
                  </p>
                </div>
              </Card>
            </Col>
          ) : (
            ''
          )}
        </Row>
      </Card>
      {/*  */}
      <Row gutter={[16, 16]} className='mb-4'>
        <Col xs={24}>
          <Card
            title={
              <div className='flex items-center gap-2'>
                <span className='font-semibold text-gray-700'>
                  Website / Social Media link
                </span>
              </div>
            }
            className='shadow-md'
            bordered={false}
          >
            <span className='text-blue-500 cursor-pointer'>
              {businessProperty?.links?.join(', ')}
            </span>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className='mb-4'>
        <Col xs={24}>
          <Card
            title={
              <div className='flex items-center gap-2'>
                <span className='font-semibold text-gray-700'>
                  Reference Link
                </span>
              </div>
            }
            className='shadow-md'
            bordered={false}
          >
            <span className='text-blue-500 text-sm font-medium cursor-pointer'>
              {businessProperty?.referenceLinks?.join(', ')}
            </span>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className='mb-4'>
        <Col xs={24} md={24} lg={12}>
          <Card
            title={
              <div className='flex items-center gap-2'>
                <span className='font-semibold text-gray-700'>
                  Main Category
                </span>
              </div>
            }
            className='shadow-md'
            bordered={false}
          >
            {category?.map((type, index) => (
              <Tag
                key={index}
                className='px-3 py-1 my-1  text-sm font-medium cursor-pointer hover:bg-gray-100 transition duration-300'
              >
                {type?.nameKh}-{type?.nameEn}
              </Tag>
            ))}
          </Card>
        </Col>
        <Col xs={24} lg={12} xl={12}>
          <Card
            title={
              <div className='flex items-center gap-2'>
                <span className='font-semibold text-gray-700'>
                  Sub Category
                </span>
              </div>
            }
            className='shadow-md'
            bordered={false}
          >
            <div className='flex flex-wrap gap-2'>
              {subcategory?.map((type, index) => (
                <Tag
                  key={index}
                  className='px-3 py-1 my-1  text-sm font-medium cursor-pointer hover:bg-gray-100 transition duration-300'
                >
                  {type?.nameKh}-{type?.nameEn}
                </Tag>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className='mb-4'>
        {/* 🏷️ Sub Category Section */}
        <Col xs={24} lg={12} xl={12}>
          <Card
            title={
              <div className='flex items-center gap-2'>
                <span className='font-semibold text-gray-700'>Keyword</span>
              </div>
            }
            className='shadow-md'
            bordered={false}
          >
            <div className='flex flex-wrap gap-2'>
              {keywords?.map((type, index) => (
                <Tag
                  key={index}
                  className='px-3 py-1 my-1  text-sm font-medium cursor-pointer hover:bg-gray-100 transition duration-300'
                >
                  {type}
                </Tag>
              ))}
            </div>
          </Card>
        </Col>

        {/* 🏷️ Types Section */}
        <Col xs={24} lg={12} xl={12}>
          <Card
            title={
              <div className='flex items-center gap-2'>
                <span className='font-semibold text-gray-700'>Activity</span>
              </div>
            }
            className='shadow-md'
            bordered={false}
          >
            <div className='flex flex-wrap gap-2'>
              {activity?.map((type, index) => (
                <Tag
                  key={index}
                  className='px-3 py-1 my-1  text-sm font-medium cursor-pointer hover:bg-gray-100 transition duration-300'
                >
                  {type?.nameKh}-{type?.nameEn}
                </Tag>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Address
        setOpenLocation={setOpenLocation}
        businessProperty={businessProperty}
      />
    </>
  )
}

export default Home
