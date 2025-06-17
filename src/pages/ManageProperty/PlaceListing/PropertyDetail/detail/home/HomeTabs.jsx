import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import Home from './About' // Your Place Information component
import Album from './Album'
import User from './User'
const { TabPane } = Tabs

const HomeTabs = (props) => {
  const { businessProperty } = props
  const [media, setMedia] = useState()
  useEffect(() => {
    setMedia(businessProperty?.media)
  }, [businessProperty])
  return (
    <div className='p-4 customize-tabs-place-detail-home'>
      <Tabs defaultActiveKey='1'>
        <TabPane
          tab={<div className='px-4 py-2'>Place Information</div>}
          key='1'
        >
          <Home businessProperty={businessProperty} />
        </TabPane>
        <TabPane tab={<div>Album</div>} key='2'>
          <Album media={media} />
        </TabPane>
        <TabPane tab={<div>Users</div>} key='3'>
          <User />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default HomeTabs
