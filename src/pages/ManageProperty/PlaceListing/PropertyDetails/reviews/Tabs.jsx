// ReviewTabs.jsx
import React, { useState } from 'react'
import { Tabs, Typography } from 'antd'

const { TabPane } = Tabs
const { Text } = Typography

//MAIN TAB
import TotalReview from './totalReview/TotalReview'
import Review from './Review/Review'
import ReviewReport from './ReviewReport/ReviewReport'
import HideReview from './HIdeReview/HideReview'
//END MAIN TAB
export default function ReviewTabs() {
  const [activeKey, setActiveKey] = useState('hide')

  return (
    <Tabs
      activeKey={activeKey}
      onChange={setActiveKey}
      animated={false}
      className='tab-review-property'
      size='large'
      tabBarGutter={32}
      tabBarStyle={{
        borderBottom: '1px solid #E0F0FF',
        margin: 0,
        padding: '0 24px',
      }}
      tabBarUnderlineStyle={{ height: 3, background: '#1677FF' }}
      tabBarExtraContent={
        <div
          style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}
        >
          <Text
            strong
            style={{ fontSize: 20, color: '#FAAD14', lineHeight: 1 }}
          >
            4.5
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#666',
              marginLeft: 4,
              lineHeight: 1,
            }}
          >
            /5
          </Text>
        </div>
      }
    >
      <TabPane tab='Total Review(1450)' key='all'>
        <TotalReview />
      </TabPane>
      <TabPane tab='Review(1420)' key='review'>
        <Review />{' '}
      </TabPane>
      <TabPane tab='Review with report(20)' key='report'>
        <ReviewReport />
      </TabPane>
      <TabPane tab='Hide Review(10)' key='hide'>
        {' '}
        <HideReview />{' '}
      </TabPane>
    </Tabs>
  )
}
