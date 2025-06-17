import {
  CloudOutlined,
  CustomerServiceOutlined,
  EditOutlined,
  LockOutlined,
  WifiOutlined,
  TableOutlined,
  DeleteOutlined,
  CheckOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { Button, Card, Col, Divider, Modal, Row, Tabs } from 'antd'
import { useState } from 'react'
import EditAmenity from '../updates/ProfileInfo/about/EditAmenity'
import EditPrivacy from '../updates/ProfileInfo/about/EditPrivacy'
import SocialMediaLink from './SocialMedialLink'

const { TabPane } = Tabs

const AboutLocation = () => {
  const [isAmenityModalOpen, setIsAmenityModalOpen] = useState(false)
  const [openPrivacy, setOpenPrivacy] = useState(false)

  // Grouped amenities. For example, the "Furniture" group includes Table and Chair.
  const [amenityGroups, setAmenityGroups] = useState([
    {
      groupName: 'General Amenities',
      items: [
        {
          id: 'a1',
          icon: <WifiOutlined className='text-blue-500 text-md mr-2' />,
          text: 'Free Wi-Fi',
        },
        {
          id: 'a2',
          icon: (
            <CustomerServiceOutlined className='text-green-500 text-md mr-2' />
          ),
          text: '24/7 Support',
        },
        {
          id: 'a3',
          icon: <CloudOutlined className='text-cyan-500 text-md mr-2' />,
          text: 'Air Conditioning',
        },
        {
          id: 'a4',
          // No icon provided – default tick icon will be shown
          icon: null,
          text: 'Secure Rooms',
        },
      ],
    },
    {
      groupName: 'Furniture',
      items: [
        {
          id: 'f1',
          icon: <TableOutlined className='text-purple-500 text-md mr-2' />,
          text: 'Table',
        },
        {
          id: 'f2',
          icon: null,
          text: 'Chair',
        },
      ],
    },
  ])

  // Grouped privacy items.
  const [privacyGroups, setPrivacyGroups] = useState([
    {
      groupName: 'Room Privacy',
      items: [
        {
          id: 'p1',
          // No icon provided – default tick icon will be shown
          icon: null,
          text: 'Secure Rooms',
        },
      ],
    },
    {
      groupName: 'Parking',
      items: [
        {
          id: 'p2',
          icon: <CloudOutlined className='text-cyan-500 text-md mr-2' />,
          text: 'No Parking',
        },
      ],
    },
  ])

  // Handler to remove an amenity item from a specific group.
  const handleRemoveAmenityItem = (groupName, itemId) => {
    setAmenityGroups((prev) =>
      prev.map((group) =>
        group.groupName === groupName
          ? {
              ...group,
              items: group.items.filter((item) => item.id !== itemId),
            }
          : group
      )
    )
  }

  // Handler to remove a privacy item from a specific group.
  const handleRemovePrivacyItem = (groupName, itemId) => {
    setPrivacyGroups((prev) =>
      prev.map((group) =>
        group.groupName === groupName
          ? {
              ...group,
              items: group.items.filter((item) => item.id !== itemId),
            }
          : group
      )
    )
  }

  // Placeholder view handler for an item.
  const handleViewItem = (groupName, itemId) => {
    console.log('View item from group', groupName, 'item', itemId)
    // Replace this with your actual view logic.
  }

  return (
    <>
      {/* Inline style for the view overlay */}
      <style>
        {`
          .item-container {
            position: relative;
            cursor: pointer;
          }
          .item-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            border-radius: 0.375rem;
          }
          .item-container:hover .item-overlay {
            opacity: 1;
          }
        `}
      </style>

      {/* Edit Modals */}
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
      <SocialMediaLink />

      <Card className='my-2'>
        <Tabs defaultActiveKey='1'>
          {/* Amenity Tab */}
          <TabPane tab='Amenity' key='2'>
            <div className='flex justify-between items-center'>
              <h3 className='text-lg font-semibold text-gray-700'>
                Available Amenities
              </h3>
              <Button
                icon={<EditOutlined />}
                onClick={() => setIsAmenityModalOpen(true)}
              />
            </div>
            <Divider />
            {amenityGroups.map((group) => (
              <div key={group.groupName} className='mb-4'>
                <h4 className='text-md font-semibold text-gray-700 mb-2'>
                  {group.groupName}
                </h4>
                <Row gutter={[16, 8]} className='flex flex-wrap'>
                  {group.items.map((item) => (
                    <Col key={item.id} xs='auto' className='mx-1'>
                      <div
                        className='item-container inline-flex items-center border px-4 py-2 rounded-md shadow-sm transition-transform transform duration-300 ease-in-out hover:scale-105'
                        onClick={() => handleViewItem(group.groupName, item.id)}
                      >
                        {item.icon || (
                          <CheckOutlined className='text-gray-500 text-md mr-2' />
                        )}
                        <span className='text-gray-600'>{item.text}</span>
                        <div className='item-overlay'>
                          <EyeOutlined
                            style={{ fontSize: '24px', color: '#fff' }}
                          />
                        </div>
                        <Button
                          type='text'
                          danger
                          icon={<DeleteOutlined className='text-md' />}
                          size='small'
                          style={{ position: 'absolute', top: -8, right: -10 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveAmenityItem(group.groupName, item.id)
                          }}
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </TabPane>

          {/* Privacy Tab */}
          <TabPane tab='Privacy' key='3'>
            <div className='flex justify-between items-center'>
              <h3 className='text-lg font-semibold text-gray-700'>
                Available Privacy
              </h3>
              <Button
                icon={<EditOutlined />}
                onClick={() => setOpenPrivacy(true)}
              />
            </div>
            <Divider />
            {privacyGroups.map((group) => (
              <div key={group.groupName} className='mb-4'>
                <h4 className='text-md font-semibold text-gray-700 mb-2'>
                  {group.groupName}
                </h4>
                <Row gutter={[16, 8]} className='flex flex-wrap'>
                  {group.items.map((item) => (
                    <Col key={item.id} xs='auto' className='mx-1'>
                      <div
                        className='item-container inline-flex items-center border px-4 py-2 rounded-md shadow-sm transition-transform transform duration-300 ease-in-out hover:scale-105'
                        onClick={() => handleViewItem(group.groupName, item.id)}
                      >
                        {item.icon || (
                          <CheckOutlined className='text-gray-500 text-md mr-2' />
                        )}
                        <span className='text-gray-600'>{item.text}</span>
                        <div className='item-overlay'>
                          <EyeOutlined
                            style={{ fontSize: '24px', color: '#fff' }}
                          />
                        </div>
                        <Button
                          type='text'
                          danger
                          icon={<DeleteOutlined className='text-md' />}
                          size='small'
                          style={{ position: 'absolute', top: -8, right: -10 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemovePrivacyItem(group.groupName, item.id)
                          }}
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </TabPane>

          {/* Payment Method Tab */}

          {/* Payment Method and Spoken Language tabs remain unchanged */}
          <TabPane tab='Payment Method' key='4'>
            <h3 className='text-lg font-semibold text-gray-700'>
              Accepted Payment Methods:
            </h3>
            <Divider className='my-4' />
            <Row gutter={[8, 8]} className='mt-4 mx-auto'>
              <Col xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
                <div className='flex justify-center rounded-md border border-gray-300 mx-2 transition-transform transform duration-300 ease-in-out hover:scale-105'>
                  <img
                    src='https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png'
                    alt='Visa'
                    className='h-20 w-32 object-contain p-2'
                  />
                </div>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
                <div className='flex justify-center rounded-md border border-gray-300 mx-2 transition-transform transform duration-300 ease-in-out hover:scale-105'>
                  <img
                    src='https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg'
                    alt='Mastercard'
                    className='h-20 w-20 object-contain p-2'
                  />
                </div>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
                <div className='flex justify-center rounded-md border border-gray-300 mx-2 transition-transform transform duration-300 ease-in-out hover:scale-105'>
                  <img
                    src='https://bredcambodia.com.kh/wp-content/uploads/2022/12/KHQR-available-here-logo-with-bg-1024x422.png'
                    alt='KHQR'
                    className='h-20 w-32 object-contain p-2'
                  />
                </div>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
                <div className='flex justify-center rounded-md border border-gray-300 mx-2 transition-transform transform duration-300 ease-in-out hover:scale-105'>
                  <div className='h-20 w-20 overflow-hidden flex items-center justify-center p-2'>
                    <img
                      src='https://assets.weforum.org/organization/image/PzGCoGzzpAThSuN5jz7APZ3gTJS8pUT6H4x34_RW3wU.jpg'
                      alt='ACLEDA'
                      className='h-full w-full rounded-full object-cover'
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </TabPane>

          <TabPane tab='Spoken Language' key='5'>
            <h3 className='text-lg font-semibold text-gray-700'>
              Languages Spoken:
            </h3>
            <Divider className='my-4' />
            <Row gutter={[8, 2]} className='mt-4'>
              <Col
                xs={24}
                sm={8}
                md={6}
                xl={5}
                xxl={3}
                className='flex items-center border mx-1 rounded-lg justify-center transition-transform transform duration-300 ease-in-out hover:scale-105'
              >
                <div className='h-18 w-24 overflow-hidden flex items-center justify-center p-2'>
                  <img
                    src='https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_Cambodia.svg'
                    alt='Khmer'
                    className='h-full w-full rounded-lg object-cover'
                  />
                </div>
                <span className='text-gray-600 mx-2 font-bold text-lg'>
                  Khmer
                </span>
              </Col>
              <Col
                xs={24}
                sm={8}
                md={6}
                xl={5}
                xxl={3}
                className='flex items-center border mx-1 rounded-lg justify-center transition-transform transform duration-300 ease-in-out hover:scale-105'
              >
                <div className='h-18 w-24 overflow-hidden flex items-center justify-center p-2'>
                  <img
                    src='https://cdn.britannica.com/90/7490-004-BAD4AA72/Flag-China.jpg'
                    alt='Chinese'
                    className='h-full w-full rounded-lg object-cover'
                  />
                </div>
                <span className='text-gray-600 mx-2 font-bold text-lg'>
                  Chinese
                </span>
              </Col>
              <Col
                xs={24}
                sm={8}
                md={6}
                xl={5}
                xxl={3}
                className='flex items-center border mx-1 rounded-lg justify-center transition-transform transform duration-300 ease-in-out hover:scale-105'
              >
                <div className='h-18 w-24 overflow-hidden flex items-center justify-center p-2'>
                  <img
                    src='https://m.media-amazon.com/images/I/41Q-7p2hzDL._AC_UF894,1000_QL80_.jpg'
                    alt='English'
                    className='h-full w-full rounded-lg object-cover'
                  />
                </div>
                <span className='text-gray-600 mx-2 font-bold text-lg'>
                  English
                </span>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>
    </>
  )
}

export default AboutLocation
