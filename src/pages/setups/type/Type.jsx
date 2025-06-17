import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useContext,
  useEffect,
} from 'react'
import {
  Avatar,
  Breadcrumb,
  Button,
  message,
  Popconfirm,
  Table,
  Tabs,
  Tooltip,
  Empty,
} from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  HomeOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import Search from './Search'
import AddType from './Add'
import EditType from './Edit'
import ConfirmDelete from './ConfirmDelete'
import TypeServices from '../../../services/setup/Type'
import helpFunctions from '../../../utils/helpFunctions'
const { TabPane } = Tabs
import './Type.scss'
import { PERMS } from '../../../constants/permission/perms'
const Types = () => {
  const { access_token, checkPermission } = useContext(AuthContext)
  const { setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()
  const location = useLocation()
  const { getFileImage } = helpFunctions
  //CHECK PERMISSION
  useEffect(() => {
    if (!checkPermission(PERMS.TYPE_MANAGEMENT)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.TYPE_MANAGEMENT)) {
    return null
  }
  //END CHECK PERMISSION
  // Determine tab from URL
  const initialTab = location.pathname.endsWith('/food') ? 'Food' : 'Place'
  const [currentTab, setCurrentTab] = useState(initialTab)

  // Modal state
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [propData, setPropData] = useState(null)

  // Table data & loading
  const [typeList, setTypeList] = useState([])
  const [loading, setLoading] = useState(false)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Sync tab state when URL changes
  useEffect(() => {
    const tab = location.pathname.endsWith('/food') ? 'Food' : 'Place'
    setCurrentTab(tab)
    setCurrentPage(1)
  }, [location.pathname])

  // Fetch function
  const getType = async (type, search = '') => {
    setLoading(true)

    try {
      const doc = { type, search }
      const res = await TypeServices.fetchType({ access_token, doc })
      setTypeList(res || [])
    } catch {
      message.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  // Load on mount & tab change
  useEffect(() => {
    getType(currentTab)
  }, [currentTab])

  // Refresh after edit closes
  useEffect(() => {
    if (!openEdit) getType(currentTab)
  }, [openEdit])

  // Breadcrumb & header
  useEffect(() => {
    setDisplayEmitContent(
      <div className='flex justify-between my-3'>
        <div className='font-semibold text-gray-700'>Type</div>
        <Breadcrumb
          items={[
            { title: <HomeOutlined style={{ cursor: 'pointer' }} /> },
            { title: 'Type' },
          ]}
        />
      </div>
    )
  }, [setDisplayEmitContent])

  // Handlers
  const handleTabChange = (key) => {
    // Navigate to new route
    navigate(`/type/${key.toLowerCase()}`)
  }
  const handleView = (r) => navigate(`/type/detail/${r._id}`)
  const handleEdit = (r) => {
    setPropData(r)
    setOpenEdit(true)
  }
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    message.success(`Copied ID: ${text}`)
  }
  const renderNo = (_, __, idx) => (currentPage - 1) * pageSize + idx + 1

  // Table columns
  const columns = [
    { title: 'No', width: 60, align: 'center', render: renderNo },
    {
      title: 'Copy ID',
      width: 80,
      align: 'center',
      render: (_, rec) => (
        <CopyOutlined
          onClick={() => copyToClipboard(rec._id)}
          className='text-blue-500 hover:text-blue-600 cursor-pointer'
        />
      ),
    },
    {
      title: 'Icon',
      key: 'icon',
      width: 70,
      align: 'center',
      render: (_, rec) => (
        <Avatar
          shape='square'
          size={35}
          src={`${getFileImage(rec.filePath)}/large-${rec.image}`}
        />
      ),
    },
    {
      title: 'Type Name (En)',
      dataIndex: 'nameEn',
      key: 'nameEn',
      render: (t, rec) => (
        <span
          className='text-blue-600 cursor-pointer'
          onClick={() => handleView(rec)}
        >
          {t}
        </span>
      ),
    },
    {
      title: 'Type Name (Kh)',
      dataIndex: 'nameKh',
      key: 'nameKh',
      render: (t, rec) => (
        <span
          className='text-blue-600 cursor-pointer'
          onClick={() => handleView(rec)}
        >
          {t}
        </span>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_, rec) => (
        <div className='flex justify-center space-x-2'>
          <Tooltip title='View'>
            <Button
              icon={<EyeOutlined style={{ color: 'green' }} />}
              shape='circle'
              size='small'
              onClick={() => handleView(rec)}
            />
          </Tooltip>

          {checkPermission(PERMS.ASSIGNED_USER) ? (
            <Button
              icon={<EditOutlined />}
              shape='circle'
              size='small'
              onClick={() => handleEdit(rec)}
            />
          ) : (
            'You don’t have permission '
          )}

          {checkPermission(PERMS.ASSIGNED_USER) ? (
            <Tooltip title='Delete'>
              <Popconfirm
                title='Delete this record?'
                onConfirm={() =>
                  ConfirmDelete({
                    record: rec,
                    access_token,
                    getType: () => getType(currentTab),
                    setLoading,
                    getFileImage,
                  })
                }
                okText='Yes'
                cancelText='No'
              >
                <Button
                  icon={<DeleteOutlined />}
                  shape='circle'
                  danger
                  size='small'
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

  // Pagination
  const pagination = {
    current: currentPage,
    pageSize,
    total: typeList.length,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    onChange: (p, s) => {
      setCurrentPage(p)
      setPageSize(s)
    },
  }

  return (
    <>
      {/* Add/Edit */}
      <AddType
        open={openAdd}
        setOpen={setOpenAdd}
        getType={() => getType(currentTab)}
        access_token={access_token}
        type={currentTab}
      />
      {openEdit && (
        <EditType
          open={openEdit}
          setOpen={setOpenEdit}
          propData={propData}
          access_token={access_token}
          getType={() => getType(currentTab)}
          getFileImage={getFileImage}
          category={currentTab}
        />
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
              <Search onSearch={(s) => getType(currentTab, s)} />
            </div>

            {checkPermission(PERMS.ASSIGNED_USER) ? (
              <Button
                type='primary'
                style={{ background: '#1677ff' }}
                className='cursor-pointer text-white'
                onClick={() => setOpenAdd(true)}
              >
                <PlusOutlined /> add
              </Button>
            ) : (
              ' '
            )}
          </div>
        </div>
      </div>
      {/* Search + Add */}

      {/* Tabs */}
      <div className='tabs-type-card'>
        <Tabs
          activeKey={currentTab}
          onChange={handleTabChange}
          className='mb-4 '
          size='small'
          type='card'
          items={[
            { label: 'Type Of Place', key: 'Place' },
            { label: 'Type Of Food', key: 'Food' },
          ]}
        />
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={typeList.filter((r) => r.type === currentTab)}
        rowKey={(r) => r._id}
        loading={loading}
        pagination={pagination}
        size='small'
        scroll={{ x: 'max-content' }}
        className='custom-table-category'
        rowClassName={(_, idx) => (idx % 2 === 0 ? 'even-row' : 'odd-row')}
      />

      {/* No data */}
      {typeList.filter((r) => r.type === currentTab).length === 0 &&
        !loading && (
          <Empty
            className='mt-8'
            description='No data exists'
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
    </>
  )
}

export default Types
