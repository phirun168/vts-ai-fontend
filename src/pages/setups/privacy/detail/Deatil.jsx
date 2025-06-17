import React, { useContext, useEffect, useState } from 'react'
import {
  Col,
  Form,
  Row,
  Button,
  Card,
  Breadcrumb,
  Tabs,
  Avatar,
  Divider,
  Tooltip,
} from 'antd'
import {
  HomeOutlined,
  DoubleLeftOutlined,
  EditOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons'
import {
  useNavigate,
  useOutletContext,
  useLocation,
  useParams,
} from 'react-router-dom'

// Utility: convert uploaded image file to Base64 for preview
const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

import Locations from './Location'
//
import EditCategory from '../Edit'
import { AuthContext } from '../../../../contexts/AuthContext'
import helpFunctions from '../../../../utils/helpFunctions'
import GroupTypeService from '../../../../services/setup/GroupType'
import PrivacyServices from '../../../../services/setup/Privacy'
import { PERMS } from '../../../../constants/permission/perms'
//

const PrivacyDetail = () => {
  const [form] = Form.useForm()
  const { access_token, checkPermission } = useContext(AuthContext)
  const { getFileImage } = helpFunctions
  const { collapsed, setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const [openEdit, setOpenEdit] = useState(false)
  const [groupType, setGroupType] = useState()
  // Update clickedKey based on current route
  //

  const [privacy, setPrivacy] = useState()
  //
  //CHECK PERMISSION
  useEffect(() => {
    if (!checkPermission(PERMS.PRIVACY_MANAGEMENT)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.PRIVACY_MANAGEMENT)) {
    return null
  }
  //END CHECK PERMISSION
  const handleBack = () => {
    navigate('/privacy')
  }
  const getPrivacyById = async (id) => {
    try {
      const doc = { _id: id }

      const res = await PrivacyServices.fetchPrivacyById({ access_token, doc })
      if (res) {
        setPrivacy(res)
      }
    } catch {}
  }
  useEffect(() => {
    if (id) {
      getPrivacyById(id)
    }
  }, [id])
  useEffect(() => {
    if (id) {
      getPrivacyById(id)
    }
  }, [openEdit])
  useEffect(() => {
    setDisplayEmitContent(
      <div className='flex justify-between my-2'>
        <div className='font-semibold flex' style={{ color: '#495057' }}>
          <div
            className='flex items-center space-x-1'
            style={{ color: '#495057' }}
          >
            <Button
              style={{ width: '40px', color: 'red' }}
              icon={<ArrowLeftOutlined />}
              onClick={() => handleBack()}
            />
            <p>Privacy Detail</p>
          </div>
        </div>
        <Breadcrumb
          items={[
            {
              title: <HomeOutlined style={{ cursor: 'pointer' }} />,
              href: '/privacy',
            },
            {
              href: '/privacy',
              title: <span>Privacy</span>,
            },
            {
              href: '',
              title: <span className='text-blue-500'>Detail</span>,
            },
          ]}
        />
      </div>
    )
  }, [navigate, setDisplayEmitContent])

  const onEdit = () => {
    setOpenEdit(true)
  }
  const getGroupType = async (type) => {
    try {
      const doc = { type: type ? type : '' }
      const res = await GroupTypeService.fetchGroupTypeByType({
        access_token,
        doc,
      })

      if (res) {
        setGroupType(res)
      }
    } catch {}
  }
  useEffect(() => {
    getGroupType('Privacy')
  }, [openEdit])
  return (
    <>
      {/*  */}
      {openEdit === true ? (
        <EditCategory
          open={openEdit}
          setOpen={setOpenEdit}
          groupType={groupType}
          propData={privacy}
          access_token={access_token}
          getFileImage={getFileImage}
        />
      ) : (
        ''
      )}
      {/*  */}
      {/* Top Card with Category title and image */}
      <Card className='my-2'>
        <div className='flex  items-center w-full '>
          <div className='flex items-center'>
            <Avatar
              shape='square'
              size={40} // Adjust size as needed
              src={getFileImage(privacy?.filePath) + '/large-' + privacy?.image}
              style={{ cursor: 'pointer', marginLeft: '10px' }}
            />
            <div className='mx-2'>
              <h2 className='font-bold text-2xl'>{privacy?.nameEn}</h2>
              <p className='text-sm text-gray-600'>{privacy?.nameKh} </p>
            </div>
          </div>
          <div className='ml-auto'>
            {checkPermission(PERMS.ASSIGNED_USER) ? (
              <Button
                disabled={!checkPermission(PERMS.ASSIGNED_USER)}
                onClick={() => onEdit()}
                type='default'
                icon={<EditOutlined />}
              />
            ) : (
              ' '
            )}
          </div>
        </div>
      </Card>
      {/* About Card */}
      <Card className='my-2'>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <div className='p-2'>
              <div className=''>
                <h2 className='text-lg font-bold flex items-center gap-2 text-gray-800 '>
                  Description
                </h2>
              </div>
              <Divider className='my-2' />
              <p className='text-gray-600'>{privacy?.description}</p>
            </div>
          </Col>
        </Row>
      </Card>
      {/* Main content: Tabs */}
      {/* <Card>
        <Locations />
      </Card> */}
    </>
  )
}

export default PrivacyDetail
