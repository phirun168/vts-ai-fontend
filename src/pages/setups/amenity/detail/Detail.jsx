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
  CloseOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons'
import {
  useNavigate,
  useOutletContext,
  useLocation,
  useParams,
} from 'react-router-dom'

import Locations from './Location'
import EditCategory from '../Edit'
import AmenityServices from '../../../../services/setup/Amenity'
import { AuthContext } from '../../../../contexts/AuthContext'
import helpFunctions from '../../../../utils/helpFunctions'
import GroupTypeService from '../../../../services/setup/GroupType'
import { PERMS } from '../../../../constants/permission/perms'

const { TabPane } = Tabs

const AmenityDetail = () => {
  const [form] = Form.useForm()
  const { access_token, checkPermission } = useContext(AuthContext)
  const { getFileImage } = helpFunctions
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const { collapsed, setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const [openEdit, setOpenEdit] = useState(false)
  const [groupType, setGroupType] = useState()
  const [amenity, setAmenity] = useState(null)
  //CHECK PERMISSION
  useEffect(() => {
    if (!checkPermission(PERMS.AMENITY_MANAGEMENT)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.AMENITY_MANAGEMENT)) {
    return null
  }
  //END CHECK PERMISSION
  const handleBack = () => {
    navigate('/amenity')
  }

  const getAmenityById = async (id) => {
    try {
      const doc = { _id: id }
      const res = await AmenityServices.fetchAmenityById({ access_token, doc })
      if (res) {
        setAmenity(res)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (id) {
      getAmenityById(id)
    }
  }, [id])

  useEffect(() => {
    if (id) {
      getAmenityById(id)
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
            <p>Amenity Detail</p>
          </div>
        </div>
        <Breadcrumb
          items={[
            {
              title: <HomeOutlined style={{ cursor: 'pointer' }} />,
              href: '/amenity',
            },
            {
              href: '/amenity',
              title: <span>Amenity</span>,
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
      console.log(res, 'test now 123')
      if (res) {
        setGroupType(res)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getGroupType('Amenity')
  }, [openEdit])

  // In the Images tab, we display the image with a remove button overlay.
  const handleRemoveImage = () => {
    // TODO: Add your remove logic here. For example, you could call an API to remove the image.
    // For now, we simply clear the image.
    setAmenity((prev) => ({ ...prev, filePath: null, image: null }))
  }

  return (
    <>
      {openEdit === true ? (
        <EditCategory
          open={openEdit}
          setOpen={setOpenEdit}
          groupType={groupType}
          propData={amenity}
          access_token={access_token}
          getFileImage={getFileImage}
        />
      ) : (
        ''
      )}

      {/* Top Card with Amenity title and image */}
      <Card className='my-2'>
        <div className='flex items-center w-full'>
          <div className='flex items-center'>
            <Avatar
              shape='square'
              size={40}
              src={getFileImage(amenity?.filePath) + '/large-' + amenity?.image}
              style={{ cursor: 'pointer', marginLeft: '10px' }}
            />
            <div className='mx-2'>
              <h2 className='font-bold text-2xl'>{amenity?.nameEn}</h2>
              <p className='text-sm text-gray-600'>{amenity?.nameKh} </p>
            </div>
          </div>
          <div className='ml-auto'>
            {checkPermission(PERMS.ASSIGNED_USER) ? (
              <Button
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
              <div>
                <h2 className='text-lg font-bold flex items-center gap-2 text-gray-800'>
                  Description
                </h2>
              </div>
              <Divider className='my-2' />
              <p className='text-gray-600'>{amenity?.description}</p>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Main Content: Two Tabs */}
      {/* <Card className='my-2'>
        <Tabs defaultActiveKey='1'>
          <Tabs.TabPane tab='Location' key='1'>
            <Locations />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Images' key='2'>
            <div style={{ position: 'relative' }}>
              <Row gutter={[8, 2]}>
                {amenity?.filePath ? (
                  <>
                    <Col xs={24} sm={6} md={6} lg={6} xl={4}>
                      <div className='border rounded-xl'>
                        <img
                          src={
                            getFileImage(amenity?.filePath) +
                            '/large-' +
                            amenity?.image
                          }
                          alt={amenity?.nameEn}
                          style={{
                            width: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <Button
                          type='text'
                          danger
                          icon={<DeleteOutlined />}
                          onClick={handleRemoveImage}
                          style={{
                            position: 'absolute',
                            top: 1,
                            right: 12,
                            background: 'rgba(229, 225, 225, 0.8)',
                            borderRadius: '100px',
                          }}
                        />
                      </div>
                    </Col>
                  </>
                ) : (
                  <p>No image available</p>
                )}
              </Row>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </Card> */}
    </>
  )
}

export default AmenityDetail
