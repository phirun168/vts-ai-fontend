import React, { useContext, useEffect, useState } from 'react'
import {
  Table,
  Tag,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Popconfirm,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import CreateForm from './Create/Create'
import EditForm from './Edit/Edit'
import { AuthContext } from '../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { PERMS } from '../../../constants/permission/perms'
export default function ListBlank() {
  //check permission
  const { access_token, checkPermission } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (!checkPermission(PERMS?.MANAGE_CRUD_BLANK)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS?.MANAGE_CRUD_BLANK)) {
    return null
  }
  //end check permission
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [editingRow, setEditingRow] = useState(null)
  //
  /* ───────────── state ───────────── */
  const [data, setData] = useState([
    {
      key: 1,
      name: 'John Brown',
      age: 32,
      address: 'New York No 1',
      tags: ['nice', 'developer'],
    },
    {
      key: 2,
      name: 'Jim Green',
      age: 42,
      address: 'London No 1',
      tags: ['cool'],
    },
    {
      key: 3,
      name: 'Joe Black',
      age: 28,
      address: 'Sydney No 1',
      tags: ['hot', 'teacher'],
    },
    {
      key: 4,
      name: 'Susan White',
      age: 36,
      address: 'Tokyo No 9',
      tags: ['designer'],
    },
    {
      key: 5,
      name: 'Kevin Yellow',
      age: 25,
      address: 'Paris No 42',
      tags: ['intern', 'nice'],
    },
  ])

  const [addForm] = Form.useForm()
  const [editForm] = Form.useForm()

  /* ───────────── actions ───────────── */
  const handleDelete = (key) =>
    setData((prev) => prev.filter((row) => row.key !== key))
  const openAddModal = () => {
    addForm.resetFields()
    setOpenAdd(true)
  }

  const openEditModal = (record) => {
    setEditingRow(record)
    editForm.setFieldsValue(record) // preload
    setOpenEdit(true)
  }

  /* ───────────── table columns ───────────── */
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (raw) => {
        if (!raw) return null // nothing → render empty
        const tags = Array.isArray(raw)
          ? raw
          : String(raw)
              .split(',')
              .map((t) => t.trim()) // string → array
        return tags.map((tag) => (
          <Tag color={tag.length > 4 ? 'geekblue' : 'green'} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        ))
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) =>
        checkPermission(PERMS.ASSIGNED_USER) && (
          <Space>
            <Button
              icon={<EditOutlined />}
              size='small'
              onClick={() => openEditModal(record)}
            />
            <Popconfirm
              title='Delete?'
              onConfirm={() => handleDelete(record.key)}
            >
              <Button danger icon={<DeleteOutlined />} size='small' />
            </Popconfirm>
          </Space>
        ),
    },
  ]

  /* ───────────── render ───────────── */
  return (
    <>
      <div style={{ textAlign: 'right', marginBottom: 16 }}>
        {checkPermission(PERMS.ASSIGNED_USER) ? (
          <Button
            type='primary'
            className='cursor-pointer mt-5'
            icon={<PlusOutlined />}
            onClick={() => openAddModal()}
          >
            Add
          </Button>
        ) : (
          ''
        )}
        <CreateForm
          open={openAdd}
          setOpen={setOpenAdd}
          setData={setData}
          form={addForm}
        />{' '}
        <EditForm
          open={openEdit}
          setOpen={setOpenEdit}
          setData={setData}
          form={editForm}
        />{' '}
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={(record) => record.key}
        scroll={{ x: 'max-content' }}
      />
    </>
  )
}
