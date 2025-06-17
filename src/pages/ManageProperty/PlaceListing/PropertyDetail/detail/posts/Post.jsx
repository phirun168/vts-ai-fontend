'use client'

import React from 'react'
import { Card, Tabs, Divider, Row, Col } from 'antd'
import {
  GiftOutlined,
  CameraOutlined,
  FireOutlined,
  ShopOutlined,
} from '@ant-design/icons'
import Moment from './Moments/Moment'
import Service from './service/Service'
import Promotion from './Promotion/Promotion'
const { TabPane } = Tabs

export default function Post() {
  return (
    <div className=' '>
      <Card>
        <Tabs defaultActiveKey='1'>
          {/* ✅ Service Tab */}
          <TabPane tab='Room' key='1'>
            <Service />
          </TabPane>

          {/* ✅ Promotion Tab */}
          <TabPane tab='Promotion' key='2'>
            <Promotion />
          </TabPane>

          {/* ✅ Moments Tab */}
          <TabPane tab='Moments' key='3'>
            <Moment />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  )
}
