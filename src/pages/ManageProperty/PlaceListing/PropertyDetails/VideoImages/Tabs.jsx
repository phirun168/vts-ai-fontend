// MediaTabs.jsx
import React, { useState } from 'react'
import { Tabs, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const { TabPane } = Tabs
//MAIN TAB [ALL,VIDEO,IMAGE, ]
import All from './groupTab/all/All'
import Video from './groupTab/video/Video'
import ImagesTab from './groupTab/images/Tabs'
//

export default function MediaTabs() {
  const [activeKey, setActiveKey] = useState('all')
  //
  const videos = [
    { id: 'v1', thumbnailUrl: 'https://picsum.photos/id/1018/400/225' },
  ]

  // Sample image items
  const images = [
    {
      id: 'i1',
      url: 'https://static.vecteezy.com/system/resources/previews/032/940/265/non_2x/green-meadow-lone-tree-tranquil-horizon-at-dawn-free-photo.jpg',
    },
    {
      id: 'i2',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKn-X2ZRRr7DWK4gEnkQFFo_NSpS4dxoS-gg&s',
    },
    {
      id: 'i3',
      url: 'https://images.discerningassets.com/image/upload/q_auto:best/c_limit,w_1000/v1703805077/xckb1c9zfrdcrwrp3l1p.jpg',
    },
    {
      id: 'i4',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s',
    },
  ]
  const handlePreview = (item) => {
    alert(`Previewing ${item.id}`)
  }
  const handleDelete = (item) => {
    alert(`Deleting ${item.id}`)
  }
  //
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #e8e8e8',
        paddingBottom: 8,
      }}
    >
      {/* Tabs */}
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        animated={false}
        size='large'
        tabBarStyle={{
          borderBottom: '1px solid #E0F0FF',
          margin: 0,
          padding: '0 24px',
        }}
        className='videoImage-tabs-property'
        style={{ flex: 1 }}
        tabBarExtraContent={
          <div className='mt-2'>
            <Button
              type='primary'
              icon={<PlusOutlined />}
              style={{ marginRight: 8 }}
            >
              Add New Video
            </Button>
            <Button type='primary' icon={<PlusOutlined />}>
              Add New Image
            </Button>
          </div>
        }
      >
        <TabPane tab='All' key='all'>
          <All
            videos={videos}
            images={images}
            onPreview={handlePreview}
            onDelete={handleDelete}
          />
        </TabPane>
        <TabPane tab='Video' key='video'>
          <Video videos={videos} />
        </TabPane>
        <TabPane tab='Images' key='images'>
          <ImagesTab />
        </TabPane>
      </Tabs>

      {/* Action buttons */}
    </div>
  )
}
