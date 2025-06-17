import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Form, Input, Row, Image, Divider } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
// import logoImg from 'assets/images/vts-logo.svg'
import KhLogo from 'assets/logo/Logo2.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from 'contexts/AuthContext'
import { MessageContext } from 'contexts/MessageContext'
import AuthService from 'services/auth/auth'
import './login.scss'
const Login = () => {
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(true)
  const [form] = Form.useForm()
  document.title = 'Login'
  //
  const {
    setAccessTokenFn,
    setPermissions,
    setIsAdminFn,
    access_token,
    setMenuSideBar,
  } = useContext(AuthContext)
  const { showMessage } = useContext(MessageContext)
  //
  const navigate = useNavigate()
  const location = useLocation()

  //

  //onFinish
  const onFinish = (values) => {
    const { username, password, remember } = values
    AuthService.login({ username, password })
      .then((res) => {
        //save data into localStorage
        // console.log('login page : ', res?.accessToken)
        if (remember) {
          localStorage.setItem('remember', JSON.stringify(remember))
          localStorage.setItem('username', username)
          localStorage.setItem('password', password)
        } else {
          localStorage.removeItem('username')
          localStorage.removeItem('password')
          localStorage.setItem('remember', JSON.stringify(remember))
        }
        //end save data into
        //
        //set token into localStorage
        localStorage.setItem('token', `${res.accessToken}`)
        //end set token into localStorage
        //
        setAccessTokenFn(res.accessToken)
        setPermissions(res.permissions)

        setIsAdminFn(res.user.isAdmin)
        setMenuSideBar(res.sideBar)

        if (location && location.state) {
          navigate(location.state.from)
        } else {
          navigate('/')
        }
      })
      .catch((err) => {
        showMessage({ type: 'error', content: err.msg, key: 'loginError' })
      })
  }
  //useEffect access token link into navigation
  useEffect(() => {
    if (access_token) navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token])
  //end access token link into navigation
  //
  //get (username,password) on remember
  useEffect(() => {
    const remember = JSON.parse(localStorage.getItem('remember')) || false
    if (remember) {
      const username = localStorage.getItem('username') || null
      const password = localStorage.getItem('password') || null
      form.setFieldValue('remember', remember)
      form.setFieldValue('username', username)
      form.setFieldValue('password', password)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='w-screen h-screen md:fixed md:overflow-hidden '>
      {/* Background Gradient */}
      <div className='bg-purple-900 fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 leading-5 overflow-hidden'></div>

      {/* Logo Section */}
      {/* <div className='text-center md:text-start relative z-10'>
        <div className='flex justify-center md:justify-start'>
          <Image
            className='mx-2 my-4'
            src={logoImg}
            alt='logo'
            height={100}
            preview={false}
          />
        </div>
      </div> */}

      {/* Main Content */}
      <div className='relative z-10 min-h-screen flex flex-col justify-center mt-10'>
        <div className='sm:flex sm:flex-row justify-center bg-transparent rounded-3xl '>
          {/* Left Panel */}
          <div className='flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md'>
            <div className='self-start hidden lg:flex flex-col text-gray-300'>
              <h1 className='my-3 font-semibold text-4xl mb-40'>
                Kh Review System Management
              </h1>
            </div>
          </div>
          {/* Right Panel - Login Form */}
          <div className='flex justify-center self-center lg:mx-10'>
            <div className='px-10 py-20 mb-48 bg-white mx-auto rounded-3xl w-96'>
              <div className='flex justify-center mb-4'>
                <Image src={KhLogo} alt='logo' height={80} preview={false} />
              </div>
              <Divider
                className='text-center mt-4'
                style={{ borderColor: '#666666' }}
              >
                Kh Review
              </Divider>
              <div className='space-y-6'>
                <Form
                  className='login-form'
                  form={form}
                  name='form'
                  onFinish={onFinish}
                  autoComplete='off'
                  initialValues={{ remember: false }}
                >
                  <Form.Item
                    name='username'
                    rules={[
                      {
                        type: 'text',
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input
                      className='py-2'
                      prefix={<UserOutlined className='site-form-item-icon' />}
                      placeholder='username'
                    />
                  </Form.Item>
                  <Form.Item
                    name='password'
                    rules={[
                      {
                        type: 'password',
                        required: true,
                        message: 'Please input your Password!',
                      },
                    ]}
                  >
                    <Input.Password
                      className='py-2'
                      prefix={<LockOutlined className='site-form-item-icon' />}
                      type='password'
                      placeholder='Password'
                    />
                  </Form.Item>
                  <Form.Item>
                    <div>
                      <Row>
                        <Col className='gutter-row' span={12}>
                          <Form.Item
                            name='remember'
                            valuePropName='checked'
                            noStyle
                          >
                            <Checkbox>Remember me</Checkbox>
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  </Form.Item>
                  <Form.Item className='mx-2'>
                    <Button
                      type='primary'
                      htmlType='submit'
                      className='w-full flex justify-center bg-purple-800 hover:bg-purple-700 text-gray-100 p-4 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500'
                    >
                      Sign in
                    </Button>
                  </Form.Item>
                </Form>
                <div className='flex items-center justify-center space-x-2 my-5'>
                  <span className='h-px w-16 bg-gray-100'></span>
                  <span className='h-px w-16 bg-gray-100'></span>
                </div>
              </div>
              <div className='mt-7 text-center text-gray-300 text-xs'>
                <span>Copyright © KH Review</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Footer Shape */}
      <svg
        className='fixed bottom-0 left-0 right-0'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
      >
        <path
          fill='#fff'
          fillOpacity='1'
          d='M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z'
        ></path>
      </svg>
    </div>
  )
}

export default Login
