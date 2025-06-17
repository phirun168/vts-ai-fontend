// PlaceTabs.jsx
import React, { useContext, useEffect, useState } from 'react'
import { Tabs, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
// import './PlaceTabs.css'
import { AuthContext } from '../../../../../../contexts/AuthContext'
import PlaceInformation from './PlaceInformation'
import PlaceAddress from './PlaceAddress'
//
import EditPlaceInfo from './GroupUpdate/editPlaceInfo/EditPlaceInfo'
import EditPlaceAddress from './GroupUpdate/editAddress/AddressModal'
//
const { TabPane } = Tabs

export default function PlaceTabs(props) {
  const { businessProperty, getBusinessProperty } = props
  const [activeKey, setActiveKey] = useState('1')
  const { user, access_token, checkPermission } = useContext(AuthContext)
  const [username, setUsername] = useState()
  //
  const [openEditInfo, setOpenEditInfo] = useState(false)
  const [openEditAddress, setOpenEditAddress] = useState(false)
  //
  useEffect(() => {
    setUsername(user?.username)
  }, [user])
  return (
    <div className='place-tabs-wrapper'>
      <EditPlaceInfo
        open={openEditInfo}
        setOpen={setOpenEditInfo}
        propData={businessProperty}
        access_token={access_token}
        username={username}
        getBusinessProperty={getBusinessProperty}
      />
      <EditPlaceAddress
        open={openEditAddress}
        setOpen={setOpenEditAddress}
        propData={businessProperty}
        access_token={access_token}
        username={username}
        getBusinessProperty={getBusinessProperty}
      />
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        className='place-tabs'
        animated={false}
        tabBarExtraContent={
          activeKey === '1' ? (
            <Button
              style={{ background: '#ECB603', color: 'white' }}
              icon={<EditOutlined />}
              className='place-tabs-edit'
              onClick={() => setOpenEditInfo(true)}
            >
              Edit
            </Button>
          ) : (
            <Button
              style={{ background: '#ECB603', color: 'white' }}
              icon={<EditOutlined />}
              onClick={() => setOpenEditAddress(true)}
              className='place-tabs-edit'
            >
              Edit
            </Button>
          )
        }
      >
        <TabPane tab='Place Information' key='1'>
          <PlaceInformation information={businessProperty} />
        </TabPane>
        <TabPane tab='Place Address' key='2'>
          <PlaceAddress addressInfo={businessProperty} />
        </TabPane>
      </Tabs>
    </div>
  )
}
