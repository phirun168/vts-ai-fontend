import './tabs-custom.css'

import React, { useContext, useEffect, useState } from 'react'
import { Tabs as AntTabs, Row, Col, Badge, Card, Breadcrumb } from 'antd'
import Thumbnail from './placeInformation/Thumail'
import SlideImage from './placeInformation/SlideImage'
import DashboardCard from './placeInformation/DashboardCard'
import GroupInfo from './placeInformation/groupInfo/Tabs'
// MAIN GROUP
//------VIDEO & IMAGES------//
import VideoImageTab from './VideoImages/Tabs'
import ReviewTabs from './reviews/Tabs'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'
import AllPropertyServices from '../../../../services/ManageProperty/PlaceListing/AllProperty'
import { AuthContext } from '../../../../contexts/AuthContext'
import helpFunctions from '../../../../utils/helpFunctions'

//------END VIDEO & IMAGES---//
//END MAIN GROUP
const { TabPane } = AntTabs

export default function Tabs() {
  const { setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()
  const { user, access_token, checkPermission } = useContext(AuthContext)
  const { getFileByName } = helpFunctions
  const { id } = useParams() // id will be a string

  // 1) keep track of the active tab in state
  //MAIN VARIABLE
  const [activeKey, setActiveKey] = useState('1')
  const [businessProperty, setBusinessProperty] = useState()
  const [thumbnail, setThumbnail] = useState()
  const [showInfoOnThumbnail, setShowInfoOnThumbnail] = useState()
  const [slideShow, setSlideShow] = useState()
  //END VARIABLE
  const getBusinessProperty = async (id) => {
    try {
      const doc = { id: id }
      const data = await AllPropertyServices.fetchNonBusinessPropertyById({
        doc,
        access_token,
      })
      if (data) {
        console.log(data?.data?.locations?.[0], 'data test')
        setBusinessProperty(data?.data?.locations?.[0])
        setThumbnail(data?.data?.locations?.[0]?.media?.image)
        setSlideShow(data?.data?.locations?.[0]?.media?.gallery)
        //
        setShowInfoOnThumbnail({
          nameEn: data?.data?.locations?.[0]?.nameEn,
          nameKh: data?.data?.locations?.[0]?.nameKh,
          star: data?.data?.locations?.[0]?.star,
          mainCategory: data?.data?.locations?.[0]?.mainCategory,
          subCategory: data?.data?.locations?.[0]?.subCategory,
        })

        //
      }
    } catch {}
  }

  useEffect(() => {
    if (id !== null && id !== undefined && id !== '') {
      getBusinessProperty(id)
    }
  }, [id])
  // 2) handler to switch tabs
  const activeTabs = (key) => {
    setActiveKey(key)
  }
  useEffect(() => {
    setDisplayEmitContent('')
  }, [navigate, setDisplayEmitContent])
  return (
    <>
      <AntTabs
        activeKey={activeKey}
        onChange={activeTabs}
        tabBarGutter={16}
        className='custom-tabs w-full'
      >
        <TabPane key='1' tab={<span className='px-5'>Place Information</span>}>
          <Card
            bordered={false}
            bodyStyle={{ padding: 0 }}
            style={{
              background: '#fff',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <Row gutter={0}>
              {/* left column ▸ hotel card */}
              <Col xs={24} sm={24} md={12} xl={8}>
                <div style={{ padding: 16 }}>
                  <Thumbnail
                    thumbnail={thumbnail}
                    getFileByName={getFileByName}
                    showInfoOnThumbnail={showInfoOnThumbnail}
                  />
                </div>
              </Col>
              {/* right column ▸ hero carousel */}
              <Col xs={24} xl={16} className=''>
                <SlideImage
                  slideShow={slideShow}
                  getFileByName={getFileByName}
                />
              </Col>
            </Row>
          </Card>
        </TabPane>

        <TabPane key='2' tab={<span className='px-5'>Video & Image</span>}>
          <div className='px-5 '>
            {' '}
            <VideoImageTab />
          </div>
        </TabPane>

        <TabPane
          key='3'
          tab={
            <span className='flex items-center gap-1 px-5'>
              <Badge
                count={2}
                size='small'
                offset={[0, -2]}
                style={{ backgroundColor: '#d93025' }}
              >
                Review
              </Badge>
            </span>
          }
        >
          <div className='p-8 text-center text-gray-400'>
            <ReviewTabs />
          </div>
        </TabPane>
      </AntTabs>
      {activeKey === '1' && (
        <span className='dashboard-card-property '>
          <Card className='my-2 '>
            <DashboardCard />
          </Card>
        </span>
      )}
      {activeKey === '1' && (
        <span className='dashboard-card-property '>
          <Card className='my-2 '>
            <GroupInfo
              businessProperty={businessProperty}
              getBusinessProperty={getBusinessProperty}
            />
          </Card>
        </span>
      )}
    </>
  )
}
