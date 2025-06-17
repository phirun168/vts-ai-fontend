import React, { useContext, useEffect, useState } from 'react'
import { Breadcrumb, Button, Card, Tabs } from 'antd'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { HomeOutlined, PlusOutlined } from '@ant-design/icons'
import Cardintroduction from './CardIntroduction/Cardintroduction'
const { TabPane } = Tabs
import Search from './Search'
import MoveToModal from './MoveTo'
import { PERMS } from '../../../../constants/permission/perms'
import { AuthContext } from '../../../../contexts/AuthContext'
export default function Home() {
  const { collapsed, setDisplayEmitContent } = useOutletContext()
  const { access_token, checkPermission } = useContext(AuthContext)

  const navigate = useNavigate()
  const [defaultActiveKey, setDefaultActiveKey] = useState('1')
  const [openIntro, setOpenIntro] = useState(false)
  //CHECK PERMISSION
  useEffect(() => {
    if (!checkPermission(PERMS.HOME_PAGE_MANAGEMENT)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.HOME_PAGE_MANAGEMENT)) {
    return null
  }
  //END CHECK PERMISSION
  useEffect(() => {
    setDisplayEmitContent(
      <div className='flex justify-between my-3'>
        <div className='font-semibold' style={{ color: '#495057' }}>
          Home Page Management
        </div>
        <Breadcrumb
          items={[
            { title: <HomeOutlined style={{ cursor: 'pointer' }} /> },
            { href: '', title: <span>Home</span> },
            { href: '', title: <span>Page</span> },
            { href: '', title: <span>Management</span> },
          ]}
        />
      </div>
    )
  }, [navigate, setDisplayEmitContent])
  const handleTabChange = (key) => {
    setDefaultActiveKey(key)
  }

  return (
    <div>
      <MoveToModal
        open={openIntro}
        modalTitle={
          defaultActiveKey === '1' ? 'Introduction' : 'New Place for hangout'
        }
        setOpen={setOpenIntro}
      />

      <Card>
        <Tabs
          defaultActiveKey={defaultActiveKey}
          onChange={handleTabChange}
          tabBarExtraContent={
            <>
              {checkPermission(PERMS.ASSIGNED_USER) ? (
                <Button
                  type='primary'
                  style={{ background: '#1677ff' }}
                  className='cursor-pointer text-white'
                  onClick={() => setOpenIntro(true)}
                >
                  <PlusOutlined />
                  Add
                </Button>
              ) : (
                ''
              )}
            </>
          }
        >
          <TabPane tab='Introduction' key='1'>
            <Search />
          </TabPane>
          <TabPane tab='New Place for Hangout' key='2'>
            <Search />{' '}
          </TabPane>
        </Tabs>
      </Card>
      <div>
        {defaultActiveKey === '1' ? (
          <>
            <Cardintroduction />
          </>
        ) : (
          <div>
            <Cardintroduction />
          </div>
        )}
      </div>
    </div>
  )
}
