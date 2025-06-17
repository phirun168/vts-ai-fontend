import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  HomeOutlined,
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
} from '@ant-design/icons'
import {
  Button,
  Row,
  Col,
  Table,
  Tooltip,
  Popconfirm,
  Avatar,
  Breadcrumb,
} from 'antd'
import '@fortawesome/fontawesome-free/css/all.min.css'
import dayjs from 'dayjs'
import ConfirmRemove from './ConfirmRemove'
import Search from './Search'
import AddAmenity from './Add'
import EditAmenity from './Edit'
import AmenityServices from '../../../services/setup/Amenity'
import helpFunctions from '../../../utils/helpFunctions'
import GroupTypeService from '../../../services/setup/GroupType'
import { PERMS } from '../../../constants/permission/perms'
// imp
const Amenity = () => {
  const { access_token, checkPermission } = useContext(AuthContext)
  const { collapsed, setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()
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
  const { getFileImage } = helpFunctions
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [amenity, setAmenity] = useState([])
  const [groupType, setGroupType] = useState([])
  const [loading, setLoading] = useState(true)
  const [propData, setPropData] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const getAmenity = async (search) => {
    try {
      const doc = { search: search ? search : '' }
      const res = await AmenityServices.fetchAmenity({ access_token, doc })
      if (res) {
        setLoading(false)
        setAmenity(res)
      }
    } catch {}
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
    getGroupType('Amenity')
    getAmenity()
  }, [])
  useEffect(() => {
    if (openEdit === false) {
      getAmenity()
    }
  }, [openEdit])
  //
  const handleView = (record) => {
    navigate('/amenity/detail/' + record?._id)
  }
  //
  const renderNo = (_, __, index) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      width: 50,
      align: 'center',
      render: renderNo,
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      width: 100,
      align: 'center',
      render: (text, record) => (
        <>
          <div
            style={{ height: '20px' }}
            className='flex justify-center items-center'
          >
            <Avatar
              shape='square'
              size={35} // Adjust size as needed
              src={getFileImage(record?.filePath) + '/large-' + record?.image}
              style={{ cursor: 'pointer', marginLeft: '10px' }} // Added margin for spacing
            />
          </div>
        </>
      ),
    },
    {
      title: 'Amenity Name (En)',
      dataIndex: 'nameEn',
      key: 'nameEn',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, record) => (
        <Link
          to={`/amenity/detail/` + record?._id}
          style={{ color: '#1677ff' }}
        >
          {record?.nameEn}
        </Link>
      ),
    },
    {
      title: 'Amenity Name (Kh)',
      dataIndex: 'nameKh',
      key: 'nameKh',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, record) => (
        <Link
          to={`/amenity/detail/` + record?._id}
          style={{ color: '#1677ff' }}
        >
          {record?.nameKh}
        </Link>
      ),
    },
    {
      title: 'Group Type',
      dataIndex: 'group',
      key: 'group',
      align: 'center',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      align: 'center',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: (_, record) => dayjs(record?.createdAt).format('YYYY-MM-DD'),
    },

    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: 40,
      render: (text, record) => (
        <div className='flex justify-center'>
          <Tooltip title='View'>
            <Button
              icon={<EyeOutlined style={{ color: 'green' }} />}
              shape='circle'
              size='small'
              onClick={() => handleView(record)}
              style={{ marginRight: 8 }}
            />
          </Tooltip>
          {checkPermission(PERMS.ASSIGNED_USER) ? (
            <Button
              icon={<EditOutlined />}
              shape='circle'
              size='small'
              onClick={() => handleEdit(record)}
              style={{ marginRight: 8 }}
            />
          ) : (
            ''
          )}
          <Tooltip
            title={
              checkPermission(PERMS.ASSIGNED_USER)
                ? 'Delete'
                : 'You don’t have permission '
            }
          ></Tooltip>
          {checkPermission(PERMS.ASSIGNED_USER) ? (
            <Tooltip title='Delete'>
              <Popconfirm
                title='Are you sure you want to delete this record?'
                onConfirm={() =>
                  ConfirmRemove({
                    record,
                    access_token,
                    getAmenity,
                    setLoading,
                    getFileImage,
                    getGroupType,
                    groupType,
                  })
                }
                okText='Yes'
                cancelText='No'
                placement='top'
              >
                <Button
                  icon={<DeleteOutlined />}
                  shape='circle'
                  size='small'
                  danger
                />
              </Popconfirm>
            </Tooltip>
          ) : (
            ''
          )}
        </div>
      ),
    },
  ]

  const pagination = {
    current: currentPage,
    pageSize: pageSize,
    total: amenity.length,
    onChange: (page, pageSize) => {
      setCurrentPage(page)
      setPageSize(pageSize)
    },
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  }

  useEffect(() => {
    setDisplayEmitContent(
      <div className='flex justify-between my-3'>
        <div className='font-semibold' style={{ color: '#495057' }}>
          Amenity
        </div>
        <Breadcrumb
          items={[
            {
              title: <HomeOutlined style={{ cursor: 'pointer' }} />,
            },
            {
              title: 'Amenity',
            },
          ]}
        />
      </div>
    )
  }, [navigate])

  const addMention = () => {
    setOpenAdd(true)
  }
  const handleEdit = (record) => {
    setPropData(record)
    setOpenEdit(true)
  }

  return (
    <>
      {openAdd === true ? (
        <AddAmenity
          open={openAdd}
          setOpen={setOpenAdd}
          getAmenity={getAmenity}
          groupType={groupType}
          access_token={access_token}
        />
      ) : (
        ''
      )}

      {openEdit === true ? (
        <EditAmenity
          open={openEdit}
          setOpen={setOpenEdit}
          groupType={groupType}
          propData={propData}
          access_token={access_token}
          getFileImage={getFileImage}
        />
      ) : (
        ''
      )}
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
              <Search getAmenity={getAmenity} />
            </div>
            {checkPermission(PERMS.ASSIGNED_USER) ? (
              <Button
                disabled={!checkPermission(PERMS.ASSIGNED_USER)}
                type='primary'
                style={{ background: '#1677ff' }}
                className='cursor-pointer text-white'
                onClick={() => setOpenAdd(true)}
              >
                <PlusOutlined /> add
              </Button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>

      <div className='relative'>
        <div>
          <Table
            rowKey={(record) => record._id}
            scroll={{ x: 'max-content' }}
            columns={columns}
            dataSource={amenity}
            loading={loading}
            pagination={pagination}
          />
        </div>
      </div>
    </>
  )
}
export default Amenity
