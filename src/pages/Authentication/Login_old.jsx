import { useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Form, Input, Button, Checkbox, Row, Col, Divider, Image } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
//
//
import AuthService from 'services/auth/auth'
//
import Login2 from './Login'
import './login.scss'

//
import { AuthContext } from 'contexts/AuthContext'
import { MessageContext } from 'contexts/MessageContext'
//
import logoImg from 'assets/images/vts-logo.svg'

const LoginForm = () => {
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
  const [form] = Form.useForm()

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
  //end get (username,password) on remember
  //end onFinish
  return (
    <>
      <Login2 />
      {/* <div className='bg-login flex items-center justify-center h-screen bg-gray-100'>
        <div
          style={{
            boxShadow:
              ' 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
          }}
          className='w-[349px] flex-col border bg-white px-6 py-10 shadow-md rounded-xl '
        >
          <div className='mb-8'>
            <div className=' flex justify-center '>
              <Image src={logoImg} alt='logo' height={100} preview={false} />
            </div>
            <Divider
              className='text-center mt-4'
              style={{ borderColor: '#666666' }}
            >
              KH Review System
            </Divider>
          </div>

          {/* <hr /> */}
      {/*
       <Form
            className='login-form'
            form={form}
            name='form'
            onFinish={onFinish}
            autoComplete='off'
            initialValues={{
              remember: false,
            }}
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
                prefix={<UserOutlined className='site-form-item-icon ' />}
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
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Password'
              />
            </Form.Item>
            <Form.Item>
              <div>
                <Row>
                  <Col className='gutter-row' span={12}>
                    <Form.Item name='remember' valuePropName='checked' noStyle>
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col className='gutter-row' span={12}>
                    <a
                      className='login-form-forgot flex justify-end cursor-pointer text-blue-500'
                      href=''
                      onClick={() => console.log('forgot password')}
                    >
                      Forgot password
                    </a>
                  </Col>
                </Row>
              </div>
            </Form.Item>

            <Form.Item className='mx-2'>
              <Button
                type='primary'
                htmlType='submit'
                className=' cursor-pointer w-full outline-none border-none  bg-blue-500 text-white rounded-md  scale-105 duration-300'
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
           */}
      {/* </div> */}
      {/* </div> */}
    </>
  )
}

export default LoginForm
