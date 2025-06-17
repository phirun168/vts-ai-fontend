import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Popconfirm,
  Row,
  Table,
  Tooltip,
} from 'antd'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { useNavigate, useOutletContext } from 'react-router-dom'
//
import helpFunctions from '../../../utils/helpFunctions'
//
//
import AddCategory from './Add'
import CategorySearch from './Search'
import EditCategory from './Edit'
import ConfirmRemove from './ConfirmRemove'
//
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  HomeOutlined,
  MobileOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import CategoryServices from '../../../services/setup/Category'
import dayjs from 'dayjs'
import { PERMS } from '../../../constants/permission/perms'

const CategoryList = () => {
  const { access_token, checkPermission } = useContext(AuthContext)
  const { collapsed, setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()
  //CHECK PERMISSION
  useEffect(() => {
    if (!checkPermission(PERMS.CATEGORY_MANAGEMENT)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.CATEGORY_MANAGEMENT)) {
    return null
  }
  //END CHECK PERMISSION
  const { getFileImage } = helpFunctions
  const [pageSize, setPageSize] = useState(10)
  // Modal / dialog states for adding, editing, and deleting
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [propData, setPropData] = useState()

  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  //
  const [category, setCategory] = useState([])
  //
  const getCategory = async (search) => {
    setLoading(true)
    try {
      const doc = { search: search ? search : '' }
      const res = await CategoryServices.fetchCategory({ access_token, doc })
      if (res) {
        setCategory(res)
        setLoading(false)
      }
    } catch {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCategory()
  }, [])
  useEffect(() => {
    if (openEdit === false) {
      getCategory()
    }
  }, [openEdit])

  const handleEdit = (record) => {
    // Set any record data you need to pass to the edit modal
    setPropData(record)
    setOpenEdit(true)
  }
  const handleView = (record) => {
    navigate(`/category/detail/${record?._id}/subcategory`)
  }
  const renderNo = (_, __, index) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const columns = [
    {
      title: <span className='table-header'>No</span>,
      dataIndex: 'no',
      key: 'no',
      width: 50,
      align: 'center',
      render: renderNo,
    },
    {
      title: <span>Icon</span>,
      dataIndex: 'icon',
      key: 'icon',
      width: 50,
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
      title: <span className='table-header'>Category Name (En)</span>,
      dataIndex: 'nameEn',
      key: 'nameEn',
      render: (text, record) => (
        <span
          className='text-blue-500 cursor-pointer'
          onClick={() => handleView(record)}
        >
          {record.nameEn}
        </span>
      ),
    },
    {
      title: <span className='table-header'>Category Name (Kh)</span>,
      dataIndex: 'nameKh',
      key: 'nameKh',
      render: (text, record) => (
        <span
          className='text-blue-500 cursor-pointer'
          onClick={() => handleView(record)}
        >
          {record.nameKh}
        </span>
      ),
    },
    {
      title: <span className='table-header'>Description</span>,
      dataIndex: 'description',
      key: 'description',
      align: 'center',
    },
    {
      title: <span>Created By</span>,
      dataIndex: 'createdBy',
      key: 'createdBy',
      align: 'center',
    },
    {
      title: <span>Created At</span>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: (text) => <>{dayjs(text)?.format('YYYY-MM-DD')}</>,
    },
    {
      title: <span className='table-header'>Action</span>,
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      width: 50,
      render: (_, record) => (
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
            ' '
          )}

          {checkPermission(PERMS.ASSIGNED_USER) ? (
            <Tooltip title={'Delete'}>
              <Popconfirm
                title='Are you sure you want to delete this record?'
                onConfirm={() =>
                  ConfirmRemove({
                    record,
                    access_token,
                    getCategory,
                    setLoading,
                    getFileImage,
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
    total: category?.length,
    onChange: (page, pageSize) => {
      setCurrentPage(page)
      setPageSize(pageSize)
    },
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  }
  // Set a header breadcrumb for display in the parent layout
  useEffect(() => {
    setDisplayEmitContent(
      <div className='flex justify-between my-3'>
        <div className='font-semibold' style={{ color: '#495057' }}>
          Category
        </div>
        <Breadcrumb
          items={[
            {
              title: <HomeOutlined style={{ cursor: 'pointer' }} />,
            },
            {
              href: '',
              title: <span>Category</span>,
            },
          ]}
        />
      </div>
    )
  }, [navigate, setDisplayEmitContent])

  return (
    <>
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
              <CategorySearch getCategory={getCategory} />
            </div>
            {/* {checkPermission(PERMS.ASSIGNED_USER) && ( */}
            {checkPermission(PERMS.ASSIGNED_USER) ? (
              <Button
                type='primary'
                style={{ background: '#1677ff', color: 'white' }}
                className='cursor-pointer text-white'
                onClick={() => setOpenAdd(true)}
              >
                <PlusOutlined /> add
              </Button>
            ) : (
              ''
            )}

            {/* )} */}
          </div>
        </div>
      </div>

      <AddCategory
        open={openAdd}
        setOpen={setOpenAdd}
        access_token={access_token}
        getCategory={getCategory}
        setLoading={setLoading}
      />
      {openEdit === true ? (
        <EditCategory
          open={openEdit}
          setOpen={setOpenEdit}
          access_token={access_token}
          setLoading={setLoading}
          propData={propData}
          getFileImage={getFileImage}
        />
      ) : (
        ''
      )}
      <div className='category'>
        <Table
          rowKey={(record) => record._id}
          columns={columns}
          dataSource={category}
          pagination={pagination}
          bordered={false}
          size='small'
          loading={loading}
          scroll={{ x: 'max-content' }}
          className='custom-table-category'
          rowClassName={(record, index) =>
            index % 2 === 0 ? 'even-row' : 'odd-row'
          }
        />
      </div>
    </>
  )
}
export default CategoryList
