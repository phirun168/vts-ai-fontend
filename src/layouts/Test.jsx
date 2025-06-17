import React, { useContext, useEffect, useState } from 'react'
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Dropdown,
  Grid,
  Image,
  Space,
  Tooltip,
  Badge,
} from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  PoweroffOutlined,
  SettingOutlined,
  BellOutlined,
} from '@ant-design/icons'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from 'contexts/AuthContext'
import GetMenuSideBar from './GetMenuSideBar'
//
import vtsLogo from 'assets/images/vts-logo.png'
//

//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
//
import { NotifyContext } from '../contexts/NotifyContext'
//
import './contentLayout.scss'

//

const { useBreakpoint } = Grid
const { Header, Sider, Content } = Layout
//
import { useContent } from '../contexts/ContentContext'

//
const MyComponent = () => {
  const { content } = useContent()
  const screens = useBreakpoint()
  const [collapsed, setCollapsed] = useState(!screens.lg)
  const [smallScreen, setSmallScreen] = useState(!screens.lg)
  //
  const { count, setCount } = useContext(NotifyContext)
  //
  useEffect(() => {
    // Automatically update `collapsed` based on screen size
    setCollapsed(!screens.lg)
  }, [screens.lg])
  useEffect(() => {
    // Automatically update `collapsed` based on screen size
    setSmallScreen(!screens.md)
    setCollapsed(false)
  }, [smallScreen.md])
  const [screenMove, setScreenMove] = useState(true)
  useEffect(() => {
    setScreenMove(false)
  }, [screens])

  const { username } = useContext(AuthContext)
  const navigate = useNavigate()
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    }
  }
  const itemsProfile = [
    {
      key: 'username',
      label: username,
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'version',
      label: 'Version : 1.0.0',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'administrator/user',
      label: 'Administrator',
      disabled: false,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <Button
          onClick={() => {
            navigate('/logout')
          }}
          style={{ color: 'black' }}
          size='small'
          type='link'
          icon={<PoweroffOutlined style={{ color: 'red' }} />}
        >
          Logout
        </Button>
      ),
    },
  ]
  //
  const itemsNotification = [
    {
      key: '1',
      label: (
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://www.antgroup.com'
        >
          1st menu item
        </a>
      ),
    },
  ]
  //
  const [openKeys, setOpenKeys] = useState(
    localStorage.getItem('open-key-active') || ''
  )
  //
  const [defaultSelectedKey, setDefaultSelectedKey] = useState(
    location.pathname
  )
  useEffect(() => {
    setDefaultSelectedKey(location.pathname)
  }, [location.pathname])
  //
  const onOpenChange = (keys) => {
    if (keys.length) {
      setOpenKeys(keys[keys.length - 1])
    } else {
      setOpenKeys('')
    }
  }
  return (
    <Layout className={`h-screen ${collapsed ? 'collapsed' : ''}`}>
      <Sider
        className={`h-screen h-full ${!screens?.md ? 'fixed z-40' : ''} 
        transition-all duration-300 ease-in-out
        ${
          !screens?.md
            ? collapsed || screenMove
              ? 'opacity-0 scale-95 pointer-events-none left-[-850px] '
              : 'opacity-100 scale-100  left-[0px] '
            : ''
        }`}
        style={{
          position: !screens?.md ? 'fixed' : '',
          // height: '100vh',
          transform: !screens?.md ? 'translateX(0%)' : 'translateX(0)',
          transition: !screens?.md ? 'all 0.5s ease-in-out' : '',
        }}
        trigger={null}
        collapsible
        collapsed={collapsed || screenMove}
        // hidden={!screens.md && collapsed}
      >
        <div>
          <Button
            hidden={screens.md}
            className='absolute top-1 right-0'
            type='text'
            icon={<MenuUnfoldOutlined size='large' />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '20px', color: !screens.md ? 'white' : '' }}
          />
        </div>
        <div
          className='logo '
          style={{
            borderBottom: 'solid 1px white',
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px',
            padding: '20px',
          }}
        >
          {/*  */}

          {/*  */}
          <Image
            alt='logo'
            src={vtsLogo}
            style={{ width: '75', height: '75%' }}
            preview={false}
            hidden={!screens.md}
          />

          {/*  */}
          <div className=' flex justify-between'>
            <Avatar
              hidden={screens.md}
              size={50}
              style={{ backgroundColor: '#f79421' }}
              src='https://cdn-icons-png.flaticon.com/512/3607/3607444.png'
            >
              {username ? username[0].toUpperCase() : ''}
            </Avatar>
            {/* .... */}
            <FontAwesomeIcon
              hidden={screens.md}
              className='text-white relative top-8 left-3 cursor-pointer'
              icon={faSignOutAlt}
              style={{ fontSize: '15px' }}
              onClick={() => {
                navigate('/logout')
              }}
            />
            {/* .... */}
          </div>
        </div>
        <Menu
          openKeys={[openKeys]}
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[defaultSelectedKey]}
          selectedKeys={[defaultSelectedKey]}
          onOpenChange={onOpenChange}
          onClick={() => (!screens?.md ? setCollapsed(!collapsed) : '')}
          items={GetMenuSideBar(collapsed)}
          onSelect={({ key, keyPath }) => {
            navigate(key)

            // setCollapsed(collapsed === true)
            setDefaultSelectedKey(key)
            if (keyPath.length > 1) {
              localStorage.setItem('open-key-active', keyPath[1])
            } else {
              localStorage.setItem('open-key-active', '')
            }
          }}
        />
        <Sider
          hidden={screens.md}
          style={{
            overflow: 'auto',
            zIndex: '999',
            bottom: '30px',
            color: 'white',
            borderBottom: '1px solid #FFFFFF',
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px',
            position: !screens?.md ? 'fixed' : '',
            transform: !screens?.md ? 'translateX(0%)' : 'translateX(0)',

            transition: !screens?.md ? 'all 0.5s ease-in-out' : '', // Smooth transition
          }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div
            style={{
              overflow: 'auto',

              zIndex: '999',
              bottom: '20px',
              // left: 0,
              // right: 0,
              color: 'white',
              padding: '10px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <Button
                type='primary'
                style={{
                  background: '#001529',
                  textAlign: 'left',
                }}
                className='cursor-pointer text-white'
                icon={<SettingOutlined />}
                onClick={() => navigate('/administrator/user')}
              >
                Administrator
              </Button>
            </div>
          </div>
          {/* </div> */}
        </Sider>
      </Sider>
      {/* end setting */}
      {/* )} */}
      {/* navigation */}

      <Layout>
        {/* hover overlay */}
        {collapsed !== true && !screens.md ? (
          <div
            onClick={() => setCollapsed(!collapsed)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
              zIndex: 20, // Ensure the overlay appears above the content
              cursor: 'pointer',
            }}
          />
        ) : (
          ''
        )}
        {/* header */}
        <Header
          style={{
            padding: 0,
            display: 'flex',

            background: !screens.md ? '' : 'white',
            // justifyContent: 'space-between',
          }}
        >
          {/* button click open sidebar */}
          {/* open */}
          <div className='flex items-start my-4 mx-2  '>
            <Button
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', color: !screens.md ? 'white' : '' }}
            />
          </div>
          {/* end open */}
          {/* vtsLogo on small screen */}
          <div
            className='logo flex justify-center items-center py-4 mb-2 relative'
            style={{
              textAlign: 'center',
              top: '50%',
              left: !screens.md ? '45%' : !screens?.xs ? '40%' : '',
              transform: 'translate(-80%, -50%)',
            }}
            hidden={!screens.md}
          >
            <Image
              hidden={screens.md}
              alt='logo'
              src={vtsLogo}
              width={100}
              preview={false}
            />
          </div>

          {/* right side  */}

          <div
            className={`ml-auto mx-5 flex `} // Conditional class
          >
            {/* notification */}
            <Dropdown
              menu={{ items: itemsNotification }}
              className={!screens.md ? 'mx-0 ' : 'mx-3 '}
              trigger={['click']}
            >
              <a
                onClick={(e) => {
                  setCount(0)
                  e.preventDefault()
                }}
              >
                <div
                  style={{
                    marginTop: '5px',
                  }}
                >
                  <Badge size='small' className='relative bottom-1'>
                    <BellOutlined
                      style={{
                        fontSize: '20px',
                        color: !screens?.md ? 'white' : '',
                      }}
                    />
                  </Badge>
                </div>
              </a>
            </Dropdown>
            {/* end notification */}
            <Dropdown
              menu={{
                items: itemsProfile,
                onClick: ({ key }) => {
                  if (key === 'logout') {
                    return (window.location.href = '/logout')
                  }
                  navigate(`/${key}`)
                },
              }}
              trigger={['click']}
              className={`  ${screens.md ? '' : 'hidden '}`}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar style={{ backgroundColor: '#f79421' }}>
                    {username ? username[0].toUpperCase() : ''}
                  </Avatar>
                  <DownOutlined
                    style={{ color: !screens.md ? '#FFFFFF' : '' }}
                  />
                </Space>
              </a>
            </Dropdown>
          </div>

          {/* end right side */}
        </Header>
        <div className=' py-2 px-4  '>{content}</div>
        <Content
          className='   px-1  min-h-[280px]     bg-[var(--color-bg-container)] rounded-lg overflow-y-auto'
          style={{
            margin: '0px 10px',
            zIndex: 10,
            position: 'relative',
          }}
        >
          <Outlet context={{ collapsed }} />
        </Content>
      </Layout>
    </Layout>
  )
}
export default MyComponent
