import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Spin, Breadcrumb, Empty, Button } from 'antd'
import { HomeOutlined, PlusOutlined } from '@ant-design/icons'
import SearchProvince from './SearchProvince'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
//
import helpFunctions from '../../../utils/helpFunctions'
//
import AddProvince from './Add'
import EditProvince from './Edit'
import renderActions from 'components/Icon/MoreOutline'
import ProvinceServices from '../../../services/setup/Province'
import { PERMS } from '../../../constants/permission/perms'
//
const Province = () => {
  const { collapsed, setDisplayEmitContent } = useOutletContext()
  const { access_token, checkPermission } = useContext(AuthContext)
  const navigate = useNavigate()

  //
  //CHECK PERMISSION
  useEffect(() => {
    if (!checkPermission(PERMS.PROVINCE_MANAGEMENT)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.PROVINCE_MANAGEMENT)) {
    return null
  }
  //END CHECK PERMISSION
  const { getFileImage } = helpFunctions
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  //
  const [provinces, setProvince] = useState([])
  //
  const handleView = (_id) => {
    navigate(`/province/detail/${_id}`)
  }
  const handleEdit = (province) => {
    setOpenEdit(true)
  }

  const ConfirmDelete = (province) => {
    console.log('Delete', province)
  }
  //Fetch API
  const getProvinceList = async (search) => {
    setLoading(true)
    try {
      const doc = { search: search ? search : '' }
      const res = await ProvinceServices.fetchProvince({ access_token, doc })
      setProvince(res)
      setLoading(false)
    } catch {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getProvinceList()
  }, [])
  //end fetch API
  useEffect(() => {
    setDisplayEmitContent(
      <div className='flex justify-between my-3'>
        <div className='font-semibold' style={{ color: '#495057' }}>
          Province
        </div>
        <Breadcrumb
          items={[
            {
              title: <HomeOutlined style={{ cursor: 'pointer' }} />,
            },
            {
              href: '',
              title: (
                <>
                  <span>Province</span>
                </>
              ),
            },
          ]}
        />
      </div>
    )
  }, [navigate])
  //
  return (
    <>
      {/*  */}
      <AddProvince open={openAdd} setOpen={setOpenAdd} />
      <EditProvince open={openEdit} setOpen={setOpenEdit} />
      {/*  */}
      <div
        className='mb-2'
        style={{
          borderRadius: '5px',
          background: 'white',
        }}
      >
        <div className='mb-2 px-5  py-4 bg-white shadow-lg rounded-lg border-l-4 border-blue-500'>
          <div className='sm:flex justify-between items-center'>
            {/* Search field container */}
            <div className='w-full md:w-full 2xl:w-5/6 sm:mx-1 md:mx-0'>
              <SearchProvince getProvinceList={getProvinceList} />
            </div>
          </div>
        </div>
      </div>
      <span>
        <Spin
          className='mt-40'
          spinning={loading}
          tip='Loading....'
          size='large'
        >
          {provinces.length > 0 ? (
            <Row gutter={[16, 16]} className='my-4 '>
              {provinces?.map((province, index) => (
                <Col
                  xs={24}
                  sm={12}
                  md={12}
                  lg={8}
                  xl={6}
                  xxl={6}
                  key={province.id || `province-${index}`}
                >
                  <div className='rounded mx-1 overflow-hidden shadow-lg bg-white transition-transform duration-300 ease-in-out hover:shadow-xl hover:scale-105'>
                    <div className='relative'>
                      <div
                        style={{
                          position: 'absolute',
                          top: '0px',
                          right: '0px',
                          cursor: 'pointer',
                          zIndex: '20',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            boxShadow:
                              'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                            borderBottomRightRadius: '20px',
                          }}
                          className='shadow-lg bg-white p-2'
                          role='button'
                        >
                          {renderActions({
                            isView: true,
                            isEdit: false,
                            isDelete: false,
                            onView: () => handleView(province?._id),
                            setOpenEdit: () => handleEdit(),
                          })}
                        </div>
                      </div>
                    </div>

                    <div className='bg-white p-1 cursor-pointer'>
                      {province?.images?.length > 0 ? (
                        <img
                          onClick={() => handleView(province?._id)}
                          className='w-full h-[20vh] object-cover'
                          src={
                            province?.images?.length > 0
                              ? `${getFileImage(province?.filePath)}/large-${province?.images?.[0]}`
                              : 'https://via.placeholder.com/150'
                          }
                          alt={province?.provinceEn || 'No Image'}
                        />
                      ) : (
                        <img
                          onClick={() => handleView(province?._id)}
                          className='w-full h-[20vh] object-cover'
                          src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNlZWVlZWUiIC8+PHRleHQgeD0iMTUwIiB5PSIxMDAiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTZweCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4='
                          alt={province?.provinceEn || 'No Image'}
                        />
                      )}
                    </div>

                    <div className='px-6 py-4'>
                      <div className='text-gray-600 font-semibold mb-2 text-center'>
                        <p className='text-xl'>{province?.provinceEn}</p>
                        <span>{province?.provinceKh}</span>
                      </div>

                      <div className='flex justify-around items-center border-t border-gray-300 pt-4'>
                        <div className='border-l border-gray-300 h-full'></div>
                        <div className='font-medium text-center flex-1'>
                          <p className='text-gray-400'>Top Location</p>
                          <p className='text-gray-600'>100</p>
                        </div>
                      </div>
                    </div>

                    <div className='px-6 py-4 mb-auto flex justify-between'>
                      <p className='text-gray-500 text-sm'>2025-01-03</p>
                      <p className='text-gray-500 text-sm'>Admin</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            !loading && (
              <div className='flex justify-center items-center h-64 '>
                <Empty description='No data Found' />
              </div>
            )
          )}
        </Spin>
      </span>
    </>
  )
}
export default Province
