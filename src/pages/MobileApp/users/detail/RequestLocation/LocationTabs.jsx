import React, { useState, Suspense, lazy } from 'react'
import { Card, Col, Row, Tabs, Layout, Button } from 'antd'
import { EnvironmentOutlined, PlusOutlined } from '@ant-design/icons'
import { Content } from 'antd/es/layout/layout'
const RequestPersonalLocation = lazy(
  () => import('./PersonalRequest/RequestPersonalLocation')
)
const IntroduceNewLocation = lazy(
  () => import('./IntroduceLocation/IntroduceNewLocation')
)

const NewLocation = () => {
  const [selectedTab, setSelectedTab] = useState('1')
  const [personalRequest, setPersonalRequest] = useState(false)
  const [introduceRequest, setIntroduceRequest] = useState(false)
  const renderContent = () => {
    switch (selectedTab) {
      case '1':
        return (
          <RequestPersonalLocation
            open={personalRequest}
            setOpen={setPersonalRequest}
          />
        )
      case '2':
        return (
          <IntroduceNewLocation
            open={introduceRequest}
            setOpen={setIntroduceRequest}
          />
        )
      default:
        return <div>Select a tab to view content</div>
    }
  }

  const tabItems = [
    {
      key: '1',
      label: (
        <>
          <EnvironmentOutlined /> Request Personal Location
        </>
      ),
    },
    {
      key: '2',
      label: (
        <>
          <PlusOutlined /> Introduce New Location
        </>
      ),
    },
  ]

  const handleTabChange = (key) => {
    setSelectedTab(key)
  }

  return (
    <div>
      <Card className='mb-4 p-1'>
        {/* Tabs Navigation */}
        <Tabs
          onChange={handleTabChange}
          defaultActiveKey='1'
          items={tabItems}
          tabBarExtraContent={
            <Button
              onClick={() =>
                selectedTab === '1'
                  ? setPersonalRequest(true)
                  : selectedTab === '2'
                    ? setIntroduceRequest(true)
                    : ''
              }
              type='primary'
            >
              Add
            </Button>
          }
        />
      </Card>

      {/* Main Content */}
      <Row gutter={16}>
        <Col xs={24}>
          <Layout>
            <Content
              style={{
                background: '#fff',
                borderRadius: '4px',
              }}
            >
              <Suspense fallback={<div>Loading content...</div>}>
                {renderContent()}
              </Suspense>
            </Content>
          </Layout>
        </Col>
      </Row>
    </div>
  )
}

export default NewLocation
