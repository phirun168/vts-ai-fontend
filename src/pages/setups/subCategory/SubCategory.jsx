import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
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
import AddSubCategory from './Add'
import Search from './Search'
import SubEditCategory from './Edit'
import ConfirmRemove from './ConfirmRemove'
// //
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileImageOutlined,
  HomeOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import SubCategoryServices from '../../../services/setup/SubCategory'
import dayjs from 'dayjs'
import { PERMS } from '../../../constants/permission/perms'
// import './Style.css'

const SubCategoryList = () => {
  const { access_token, checkPermission } = useContext(AuthContext)
  const { collapsed, setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()
  const { getFileImage } = helpFunctions
  //
  //CHECK PERMISSION
  useEffect(() => {
    if (!checkPermission(PERMS.SUB_CATEGORY_MANAGEMENT)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.SUB_CATEGORY_MANAGEMENT)) {
    return null
  }
  //END CHECK PERMISSION
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [propData, setPropData] = useState()
  //
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [pageSize, setPageSize] = useState(10)
  //
  const [subCategory, setSubCategory] = useState([])
  //
  const getSubCategory = async (search) => {
    setLoading(true)
    try {
      const doc = { search: search ? search : '' }
      const res = await SubCategoryServices.fetchSubCategory({
        access_token,
        doc,
      })
      if (res) {
        setSubCategory(res)
        setLoading(false)
      }
    } catch {}
  }

  useEffect(() => {
    getSubCategory()
  }, [])
  useEffect(() => {
    if (openEdit === false) {
      getSubCategory()
    }
  }, [openEdit])

  //
  const handleEdit = (record) => {
    setOpenEdit(true)
    setPropData(record)
  }
  const handleView = (record) => {
    navigate('/sub-category/detail/' + record?._id)
  }

  //
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
      title: <span className='table-header'>Icon</span>,
      dataIndex: 'icon',
      key: 'icon',
      width: 50,
      align: 'center',
      render: (text, record) => (
        <span>
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
        </span>
      ),
    },
    {
      title: <span className='table-header'>Sub Category Name (En)</span>,
      dataIndex: 'nameEn',
      key: 'nameKh',
      render: (text, record) => (
        <span
          className='text-blue-500 cursor-pointer'
          onClick={() => handleView(record)}
        >
          {text}
        </span>
      ),
    },
    {
      title: <span className='table-header'>Sub Category Name (Kh)</span>,
      dataIndex: 'nameKh',
      key: 'nameKh',
      render: (text, record) => (
        <span
          className='text-blue-500 cursor-pointer'
          onClick={() => handleView(record)}
        >
          {text}
        </span>
      ),
    },
    {
      title: <span className='table-header'>Category</span>,
      dataIndex: 'catEn',
      key: 'catEn',
      render: (text, record) => (
        <span>{record?.catEn + ' - ' + record?.catKh}</span>
      ),
    },

    {
      title: <span className='table-header'>Created By</span>,
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: <span className='table-header'>Created At</span>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => dayjs(record?.createdAt).format('YYYY-MM-DD'),
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
                    getSubCategory,
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
                  disabled={!checkPermission(PERMS.ASSIGNED_USER)}
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
    total: subCategory?.length,
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
          Sub Category
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
                  <span>Sub Category</span>
                </>
              ),
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
              <Search getSubCategory={getSubCategory} />
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

      <AddSubCategory
        open={openAdd}
        setOpen={setOpenAdd}
        access_token={access_token}
        getSubCategory={getSubCategory}
        setLoading={setLoading}
        loading={loading}
      />
      {openEdit === true ? (
        <SubEditCategory
          open={openEdit}
          setOpen={setOpenEdit}
          access_token={access_token}
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
          dataSource={subCategory}
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

export default SubCategoryList
