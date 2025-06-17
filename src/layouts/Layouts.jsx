import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Dropdown,
  Grid,
  Image,
  Space,
  Badge,
  Drawer,
  Popover,
  Divider,
} from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  PoweroffOutlined,
  SettingOutlined,
  BellOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from 'contexts/AuthContext'
import GetMenuSideBar from './GetMenuSideBar'
//
// import vtsLogo from 'assets/images/vts-logo.png'
import vtsLogo from 'assets/logo/logo2.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
//
import { NotifyContext } from '../contexts/NotifyContext'
import './Layouts.scss'
import { Footer } from 'antd/es/layout/layout'
//
const { useBreakpoint } = Grid
const { Header, Sider, Content } = Layout

const Layouts = () => {
  const screens = useBreakpoint()
  const [collapsed, setCollapsed] = useState(!screens.lg)

  const [smallScreen, setSmallScreen] = useState(!screens.lg)
  //
  const { count, setCount } = useContext(NotifyContext)
  const [displayEmitContent, setDisplayEmitContent] = useState()
  const [drawerVisible, setDrawerVisible] = useState(!screens.lg)
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

  const { user } = useContext(AuthContext)
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
      key: 'profile/info',
      label: (
        <Button
          style={{ color: 'black', padding: 0, margin: 0 }}
          size='small'
          type='link'
          icon={<UserOutlined />}
        >
          <span className='text-gray-600 font-medium'>{user?.username}</span>
        </Button>
      ),
      disabled: false,
    },

    {
      type: 'divider',
    },
    {
      key: 'version',
      label: (
        <span className='text-gray-600 font-medium' disabled>
          Version : 1.0.0
        </span>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'administrator',
      label: <span className='text-gray-600 font-medium'>Administrator</span>,
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
          style={{ color: 'black', padding: 0, margin: 0 }}
          size='small'
          type='link'
          icon={<PoweroffOutlined style={{ color: 'red' }} />}
        >
          <span className='text-gray-600 font-medium'>Logout</span>
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
  const itemsDrawer = [
    {
      key: 'administrator',
      label: 'Administrator',
    },

    {
      key: 'profile/info',
      label: 'Profile',
    },
  ]
  //
  const [openKeys, setOpenKeys] = useState(
    localStorage.getItem('open-key-active') || ''
  )
  //
  const [openDrawKeys, setOpenDrawKeys] = useState(
    localStorage.getItem('open-draw-key-active') || ''
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
  const HandleDrawChange = (keys) => {
    if (keys.length) {
      setOpenDrawKeys(keys[keys.length - 1])
    } else {
      setOpenDrawKeys('')
    }
  }
  return (
    <Layout
      className={`h-screen ${collapsed ? 'collapsed' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      {/* drawer */}
      <div className='md:hidden '>
        <Drawer
          classNames='custom-drawer'
          style={{
            padding: 0,
            width: '62%',
          }}
          footer={
            <div
              style={{
                borderBottom: 'solid 1px white',
                borderBottomLeftRadius: '5px',
                borderBottomRightRadius: '5px',
              }}
            >
              <Popover
                content={
                  <>
                    <div className='text-center'>
                      {itemsDrawer?.map((item, index) => (
                        <div
                          key={index}
                          // style={{ borderBottom: 'solid 1px red' }}
                        >
                          <Divider style={{ margin: 0, padding: '1px' }} />
                          <Button
                            onClick={() => navigate(`/${item.key}`)}
                            type='text'
                          >
                            {item.label}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </>
                }
                title=' '
                trigger='click' // Popup appears on click
                style={{ background: 'red', width: '100px ' }}
              >
                <button className='cursor-pointer text-white py-2 mx-8 '>
                  <SettingOutlined className='mx-1' />
                  Administrator
                </button>
              </Popover>
            </div>
          }
          placement='left'
          closable={false}
          onClose={() => setDrawerVisible(false)}
          open={!screens?.md ? drawerVisible : false}
          className='custom-drawer '
        >
          <div
            style={{
              display: 'flex', // Use flexbox
              justifyContent: 'flex-end', // Align items to the end (right)
              alignItems: 'center', // Vertically center items
            }}
            className='m-0 p-0'
          >
            <Button
              hidden={screens.md}
              // className=' top-1 left-[100px] top-[0px]'
              type='text'
              icon={<MenuUnfoldOutlined size='large' />}
              onClick={() => setDrawerVisible(!drawerVisible)}
              style={{
                fontSize: '20px',
                color: !screens.md ? 'white' : '',
                // position: !screen.md ? 'relative' : '',
                margin: 0,
                padding: 0,
              }}
            />
          </div>
          <div className='text-center m-0 px-0  border-b rounded-b-md  '>
            <Avatar
              hidden={screens.md}
              size={80}
              style={{ backgroundColor: '#f79421' }}
              src='https://cdn-icons-png.flaticon.com/512/3607/3607444.png'
            >
              {user ? user?.username?.[0].toUpperCase() : ''}
            </Avatar>
            {/* .... */}
            <div
              className=' mx-2 my-1'
              style={{
                display: 'flex', // Use flexbox
                justifyContent: 'flex-end', // Align items to the end (right)
                alignItems: 'center', // Vertically center items
                // margin: 0,
                padding: 0,
              }}
            >
              <FontAwesomeIcon
                hidden={screens.md}
                icon={faSignOutAlt}
                style={{
                  fontSize: '15px',
                  color: 'red',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  navigate('/logout')
                }}
              />
            </div>
          </div>
          <Menu
            openKeys={[openDrawKeys]}
            theme='dark'
            mode='inline'
            defaultSelectedKeys={[defaultSelectedKey]}
            selectedKeys={[defaultSelectedKey]}
            onOpenChange={HandleDrawChange}
            // onClick={() => (!screens?.md ? setCollapsed(!collapsed) : '')}
            items={GetMenuSideBar(!drawerVisible)}
            onSelect={({ key, keyPath }) => {
              navigate(key)

              // setCollapsed(collapsed === true)
              setDefaultSelectedKey(key)
              if (keyPath.length > 1) {
                localStorage.setItem('open-draw-key-active', keyPath[1])
              } else {
                localStorage.setItem('open-draw-key-active', '')
              }
            }}
          />
        </Drawer>
      </div>
      <Sider
        style={{
          display: !screens?.md ? 'none' : 'block',
          height: '100vh', // Full viewport height
          overflow: 'auto', // Enable scrolling when content overflows
        }}
        trigger={null}
        collapsible
        collapsed={collapsed || screenMove}
      >
        <div
          className='logo'
          style={{
            borderBottom: 'solid 1px white',
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px',
            padding: '20px',
          }}
        >
          <div className='flex  items-center'>
            <div
              style={{ height: '3vh' }}
              className=' flex justify-center items-center'
            >
              <Image
                alt='logo'
                className='m-0 p-0'
                src={vtsLogo}
                style={{ width: collapsed ? '100%' : '85%', height: 'auto' }}
                preview={false}
                hidden={!screens.md}
              />{' '}
            </div>
            {collapsed ? (
              ''
            ) : (
              <span className='text-white text-2xl font-bold'>Khreview</span>
            )}
          </div>
          <div className='flex justify-between'>
            <Avatar
              hidden={screens.md}
              size={50}
              style={{ backgroundColor: '#f79421' }}
              src='https://cdn-icons-png.flaticon.com/512/3607/3607444.png'
            >
              {user ? user?.username?.[0].toUpperCase() : ''}
            </Avatar>
          </div>
        </div>
        <Menu
          openKeys={[openKeys]}
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[defaultSelectedKey]}
          selectedKeys={[defaultSelectedKey]}
          onOpenChange={onOpenChange}
          items={GetMenuSideBar(collapsed)}
          onSelect={({ key, keyPath }) => {
            navigate(key)
            setDefaultSelectedKey(key)
            if (keyPath.length > 1) {
              localStorage.setItem('open-key-active', keyPath[1])
            } else {
              localStorage.setItem('open-key-active', '')
            }
          }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            display: 'flex',
            background: !screens.md ? '' : 'white',
          }}
        >
          {/* button click open sidebar */}
          {/* open */}
          <div className='flex items-start my-4 mx-2  '>
            <Button
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() =>
                !screens.md
                  ? setDrawerVisible(!drawerVisible)
                  : setCollapsed(!collapsed)
              }
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
            <div className='flex  items-center'>
              <div
                style={{ height: '3vh', marginRight: screens.xs ? '20px' : '' }}
                className=' flex justify-center items-center mt-2'
              >
                <Image
                  hidden={screens.md}
                  alt='logo'
                  className='m-0 p-0'
                  src={vtsLogo}
                  style={{
                    width: collapsed ? '100%' : '100%',
                    height: 'auto',
                  }}
                  preview={false}
                />{' '}
              </div>

              <span
                style={{ display: screens.xs ? 'none' : '' }}
                className='text-white text-2xl font-bold'
              >
                Khreview
              </span>
            </div>
            {/* <Image
              hidden={screens.md}
              alt='logo'
              src={vtsLogo}
              width={100}
              preview={false}
            /> */}
          </div>

          {/* right side  */}

          <div className={`ml-auto mx-5 flex `}>
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
                    {user ? user?.username?.[0].toUpperCase() : ''}
                  </Avatar>
                  <DownOutlined
                    style={{ color: !screens.md ? '#FFFFFF' : '' }}
                  />
                </Space>
              </a>
            </Dropdown>
          </div>
        </Header>
        <div
          className=' hidden  mt-2 mx-6'
          style={{
            // borderLeft: '#f79421ff 3px solid',
            borderRadius: '5px',
            // boxShadow:
            //   'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px',
            background: 'white',
          }}
        >
          <div className='mx-3'>{displayEmitContent}</div>
        </div>
        <Content
          className=' px-6 py-1  min-h-[280px]  bg-[var(--color-bg-container)] rounded-lg overflow-y-auto'
          style={{
            zIndex: 10,
            position: 'relative',
          }}
        >
          <Outlet
            context={{
              collapsed,
              setDisplayEmitContent,
            }}
          />
        </Content>
        <Footer
          className='text-center bg-gray-100 text-gray-600 py-4 mt-4 border-t'
          style={{
            position: 'relative',
            bottom: 0,
            width: '100%',
          }}
        >
          <div className='flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-4'>
            {/* Left Section - Brand Info */}
            <div className='flex items-center space-x-2'>
              <img src={vtsLogo} alt='Logo' className='w-10 h-10' />
              <span className='text-lg font-semibold text-gray-700'>
                Khreview
              </span>
            </div>

            {/* Middle Section - Links */}
            <div className='flex space-x-6 text-sm'>
              <a href='/about' className='hover:text-blue-500 transition'>
                About Us
              </a>
              <a href='/privacy' className='hover:text-blue-500 transition'>
                Privacy Policy
              </a>
              <a href='/contact' className='hover:text-blue-500 transition'>
                Contact
              </a>
            </div>

            {/* Right Section - Social Icons */}
            <div className='flex space-x-4'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-facebook text-blue-600 text-xl'></i>
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-twitter text-blue-400 text-xl'></i>
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-instagram text-pink-500 text-xl'></i>
              </a>
            </div>
          </div>

          {/* Bottom Text */}
          <div className='text-xs text-gray-500 mt-2'>
            © {new Date().getFullYear()} Khreview. All rights reserved.
          </div>
        </Footer>
      </Layout>
    </Layout>
  )
}
export default Layouts
