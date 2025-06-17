import React, { useEffect, useState, useContext } from 'react'
import { Table, Dropdown, Button, Modal } from 'antd'
import {
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from '@ant-design/icons'
import AdminUserServices from '../../../services/admin/User'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'
import { PERMS } from '../../../constants/permission/perms'
import { AuthContext } from '../../../contexts/AuthContext'
const Users = (props) => {
  const { setPropData, search } = props
  const navigate = useNavigate()
  const { username, access_token, checkPermission } = useContext(AuthContext)

  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const getUser = async () => {
    try {
      const usersData = await AdminUserServices.fetchUser({ access_token })
      if (usersData) {
        setUsers(usersData)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }
  useEffect(() => {
    getUser()
  }, [access_token])

  // Row selection (radio type)
  const getRowSelection = () => ({
    type: 'radio',
    selectedRowKeys,
    onChange: (_, selectedRows) => {
      const newSelectedRowKeys = selectedRows.map((row) => row._id)
      setSelectedRowKeys(newSelectedRowKeys)
      setPropData(selectedRows[0])
    },
  })

  // Search function – filter users based on search input
  const handleSearch = () => {
    if (!search) {
      return users
    }
    const search_text = search.toLowerCase().replace(/\s+/g, '')
    const filteredData = users.filter((item) => {
      const user_name = item.username
        ? item.username.toLowerCase().replace(/\s+/g, '')
        : ''
      const department_name = item.departmentTitle
        ? item.departmentTitle.toLowerCase().replace(/\s+/g, '')
        : ''
      const position_name = item.positionTitle
        ? item.positionTitle.toLowerCase().replace(/\s+/g, '')
        : ''
      return (
        user_name.includes(search_text) ||
        department_name.includes(search_text) ||
        position_name.includes(search_text)
      )
    })
    return filteredData
  }

  // Render row number based on current page and pageSize
  const renderNo = (_, __, index) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  // Pagination configuration with dropdown options for pageSize
  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: handleSearch()?.length,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    onChange: (page, size) => {
      setCurrentPage(page)
      if (size !== pageSize) {
        setPageSize(size)
      }
    },
    onShowSizeChange: (current, size) => {
      setCurrentPage(1)
      setPageSize(size)
    },
  }

  // Action handlers for dropdown menu
  const handleEdit = (record) => {
    console.log('Edit user:', record)
  }
  const handleView = (record) => {
    navigate(`/administrator/user/${record?._id}/info`)
  }

  const handleDelete = (record) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33', // Red color for delete
      cancelButtonColor: '#3085d6', // Blue color for cancel
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const doc = { _id: record?._id }
          const usersData = await AdminUserServices.deleteUser({
            doc,
            access_token,
          })
          console.log(usersData, 'user data')

          if (usersData) {
            getUser()
            Swal.fire({
              title: 'Success!',
              text: 'User has been created.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            })
          }
        } catch (error) {
          console.log(error, 'error')

          const errorMessage =
            error.response?.data?.msg || error.message || 'User deletion failed'
          Swal.fire({
            title: 'Error!',
            text: errorMessage,
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
          })
        }
      }
    })
  }

  // Define dropdown menu items using new API (AntD v5)
  const getActionMenu = (record) => ({
    items: [
      {
        key: 'view',
        label: (
          <>
            <EyeOutlined style={{ color: '#52c41a', marginRight: 5 }} />
            <span style={{ color: '#52c41a' }}>View</span>
          </>
        ),
        onClick: () => handleView(record),
      },

      ...(checkPermission(PERMS?.ASSIGNED_USER)
        ? [
            {
              key: 'delete',
              label: (
                <>
                  <DeleteOutlined
                    style={{ color: '#ff4d4f', marginRight: 5 }}
                  />
                  <span style={{ color: '#ff4d4f' }}>Delete</span>
                </>
              ),
              onClick: () => handleDelete(record),
            },
          ]
        : []),
    ],
  })

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
      title: 'User',
      dataIndex: 'username',
      key: 'username',
      render: (_, record) => (
        <a
          href=''
          onClick={(e) => {
            e.preventDefault()
            handleView(record)
          }}
          style={{ color: '#007BFF' }}
        >
          {record?.username}
        </a>
      ),
    },
    {
      title: 'Staff Code',
      dataIndex: 'staffCode',
      key: 'staffCode',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Department',
      dataIndex: 'departmentTitle',
      key: 'departmentTitle',
    },
    {
      title: 'Position',
      dataIndex: 'positionTitle',
      key: 'positionTitle',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      key: 'created_by',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: (_, record) => dayjs(record?.createdAt).format('YYYY-MM-DD'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Dropdown menu={getActionMenu(record)} trigger={['click']}>
          <Button icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ]

  return (
    <>
      <Table
        rowKey={(row) => row._id}
        columns={columns}
        dataSource={handleSearch()}
        pagination={paginationConfig}
        size='small'
        loading={loading}
        scroll={{ x: 'max-content' }}
      />
    </>
  )
}

export default Users
