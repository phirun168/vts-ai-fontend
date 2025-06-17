import React, { useContext, useState } from 'react'
import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Modal,
  Radio,
  Tag,
  Tooltip,
} from 'antd'
import {
  DeleteOutlined,
  EllipsisOutlined,
  ExportOutlined,
  FormOutlined,
  HomeOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import AddRemark from '../other/AddRemark'
import AddComment from '../other/AddComment'
import helpFunctions from '../../../../utils/helpFunctions'
import { updateNonBusinessStatus } from './ChangeStatus' // ← named import
import dayjs from 'dayjs'
import { AuthContext } from '../../../../contexts/AuthContext'
import { PERMS } from '../../../../constants/permission/perms'
const DeleteIcon = (
  <svg
    width='8'
    fill='red'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 448 512'
  >
    <path d='M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z' />
  </svg>
)
// import EditPlace from
export default function getTableColumns(
  currentPage,
  pageSize,
  handleView,
  getAllProperty,
  onUpdateNonBusinessProperty,
  onUpdateMedia
) {
  const [isAddRemarkOpen, setIsAddRemarkOpen] = useState(false)
  const [OpenComment, setOpenComment] = useState(false)
  const { getFileByName } = helpFunctions
  const { username, access_token, checkPermission } = useContext(AuthContext)
  const hasFullAccess = checkPermission(PERMS.ASSIGNED_USER)
  const onHandleChange = async (record, status) => {
    try {
      await updateNonBusinessStatus(
        record?._id,
        record?.status,
        status,
        access_token
      )
      getAllProperty()
    } catch {}
  }
  //trash status
  // 🆕 at the top of getTableColumns (with the other hooks)
  const [statusDlg, setStatusDlg] = useState({
    open: false,
    record: null,
    value: 'Active',
  })

  const confirmStatusChange = async () => {
    const { record, value } = statusDlg
    if (!record) return

    await onHandleChange(record, value) // reuse your existing updater
    setStatusDlg({ open: false, record: null, value: 'Active' })
  }

  //
  return [
    {
      title: '',
      key: 'changeStatus',
      align: 'center',
      render: (record) => {
        // Determine record status (lower-cased for comparisons)
        const status = record?.status?.toLowerCase()

        let menuItems = []

        if (status === 'active') {
          menuItems = [
            {
              key: 'edit',
              label: 'Edit Place',
              disabled: !hasFullAccess,
              icon: (
                <FormOutlined style={{ fontSize: '14px', color: 'green' }} />
              ),
              onClick: () =>
                hasFullAccess && onUpdateNonBusinessProperty(record),
            },

            {
              key: 'editMedia',
              disabled: !hasFullAccess,
              label: 'Edit Media',
              icon: (
                <ExportOutlined style={{ fontSize: '14px', color: 'green' }} />
              ),
              onClick: () => hasFullAccess && onUpdateMedia(record),
            },
            {
              key: 'addToBusiness',
              label: 'Add To Business Place',
              disabled: !hasFullAccess,
              icon: (
                <PlusOutlined style={{ fontSize: '14px', color: 'blue' }} />
              ),
              onClick: () =>
                hasFullAccess &&
                console.log('Add To Business Place clicked for', record),
            },
            {
              key: 'inactive',
              disabled: !hasFullAccess,

              label: 'Inactive',
              icon: <HomeOutlined style={{ fontSize: '14px', color: 'red' }} />,
              onClick: () =>
                hasFullAccess && onHandleChange(record, 'Inactive'),
            },
            {
              key: 'addRemark',
              disabled: !hasFullAccess,
              label: '   Add Remark',
              icon: (
                <FormOutlined style={{ fontSize: '14px', color: 'orange' }} />
              ),
              onClick: () => hasFullAccess && setIsAddRemarkOpen(true),
            },
          ]
        } else if (status === 'pending') {
          menuItems = [
            {
              key: 'edit',
              disabled: !hasFullAccess,
              label: ' Edit Place',
              icon: (
                <FormOutlined style={{ fontSize: '14px', color: 'green' }} />
              ),
              onClick: () =>
                hasFullAccess && onUpdateNonBusinessProperty(record),
            },
            {
              key: 'editMedia',
              disabled: !hasFullAccess,
              label: 'Edit Media',
              icon: (
                <ExportOutlined style={{ fontSize: '14px', color: 'green' }} />
              ),
              onClick: () => hasFullAccess && onUpdateMedia(record),
            },
            {
              key: 'delete',
              disabled: !hasFullAccess,
              label: '   Delete Place',
              icon: (
                <DeleteOutlined style={{ fontSize: '14px', color: 'red' }} />
              ),
              onClick: () => onHandleChange(record, 'Trash'),
            },
            {
              key: 'inReview',
              disabled: !hasFullAccess,
              label: '   In Review',
              icon: (
                <FormOutlined style={{ fontSize: '14px', color: 'purple' }} />
              ),
              onClick: () =>
                hasFullAccess && onHandleChange(record, 'In Review'),
            },
            {
              key: 'approve',
              disabled: !hasFullAccess,
              label: 'Approve Place',
              icon: (
                <HomeOutlined style={{ fontSize: '14px', color: 'blue' }} />
              ),
              onClick: () => hasFullAccess && onHandleChange(record, 'Active'),
            },
          ]
        } else if (status === 'draft') {
          menuItems = [
            {
              key: 'edit',
              disabled: !hasFullAccess,
              label: 'Edit Place',
              icon: (
                <FormOutlined style={{ fontSize: '14px', color: 'green' }} />
              ),
              onClick: () =>
                hasFullAccess && onUpdateNonBusinessProperty(record),
            },
            {
              key: 'editMedia',
              disabled: !hasFullAccess,
              label: 'Edit Media',
              icon: (
                <ExportOutlined style={{ fontSize: '14px', color: 'green' }} />
              ),
              onClick: () => hasFullAccess && onUpdateMedia(record),
            },
            {
              key: 'delete',
              disabled: !hasFullAccess,
              label: '  Delete Place',
              icon: (
                <DeleteOutlined style={{ fontSize: '14px', color: 'red' }} />
              ),

              onClick: () => hasFullAccess && onHandleChange(record, 'Trash'),
            },
          ]
        } else if (status === 'inactive') {
          menuItems = [
            {
              key: 'edit',
              disabled: !hasFullAccess,
              label: '     Edit Place',
              icon: (
                <FormOutlined style={{ fontSize: '14px', color: 'green' }} />
              ),
              onClick: () =>
                hasFullAccess && onUpdateNonBusinessProperty(record),
            },
            {
              key: 'editMedia',
              disabled: !hasFullAccess,
              label: 'Edit Media',
              icon: (
                <ExportOutlined style={{ fontSize: '14px', color: 'green' }} />
              ),
              onClick: () => hasFullAccess && onUpdateMedia(record),
            },
            {
              key: 'delete',
              disabled: !hasFullAccess,
              label: '  Delete Place',
              icon: (
                <DeleteOutlined style={{ fontSize: '14px', color: 'red' }} />
              ),

              onClick: () => hasFullAccess && onHandleChange(record, 'Trash'),
            },
            {
              key: 'active',
              disabled: !hasFullAccess,
              label: 'Active',
              icon: (
                <HomeOutlined style={{ fontSize: '14px', color: 'blue' }} />
              ),
              onClick: () => hasFullAccess && onHandleChange(record, 'Active'),
            },
          ]
        } else if (status === 'in review') {
          menuItems = [
            {
              key: 'edit',
              disabled: !hasFullAccess,
              label: '      Edit Place',
              icon: (
                <FormOutlined style={{ fontSize: '14px', color: 'green' }} />
              ),
              onClick: () =>
                hasFullAccess && onUpdateNonBusinessProperty(record),
            },
            {
              key: 'editMedia',
              disabled: !hasFullAccess,
              label: 'Edit Media',
              icon: (
                <ExportOutlined style={{ fontSize: '14px', color: 'green' }} />
              ),
              onClick: () => hasFullAccess && onUpdateMedia(record),
            },
            {
              key: 'delete',
              disabled: !hasFullAccess,
              label: '  Delete Place',
              icon: (
                <DeleteOutlined style={{ fontSize: '14px', color: 'red' }} />
              ),

              onClick: () => hasFullAccess && onHandleChange(record, 'Trash'),
            },
            {
              key: 'approve',
              disabled: !hasFullAccess,
              label: ' Approve Place',
              icon: (
                <HomeOutlined style={{ fontSize: '14px', color: 'blue' }} />
              ),
              onClick: () => hasFullAccess && onHandleChange(record, 'Active'),
            },
            {
              key: 'addComment',
              disabled: !hasFullAccess,
              label: ' Add Comment',
              icon: (
                <FormOutlined style={{ fontSize: '14px', color: 'orange' }} />
              ),
              onClick: () => hasFullAccess && setOpenComment(true),
            },
          ]
        } else if (status === 'inactive') {
          menuItems = [
            {
              key: 'delete',
              disabled: !hasFullAccess,
              label: <span>Delete Place</span>,
              icon: (
                <DeleteOutlined style={{ fontSize: '14px', color: 'red' }} />
              ),

              onClick: () => hasFullAccess && onHandleChange(record, 'Trash'),
            },
            {
              key: 'approve',
              disabled: !hasFullAccess,
              label: ' Approve Place',
              icon: (
                <HomeOutlined style={{ fontSize: '14px', color: 'blue' }} />
              ),
              onClick: () => hasFullAccess && onHandleChange(record, 'Active'),
            },
          ]
        } else if (status === 'trash') {
          menuItems = [
            {
              key: 'changeStatus',
              label: 'Change Status',
              icon: <FormOutlined style={{ fontSize: 14, color: '#1890ff' }} />,
              onClick: () =>
                setStatusDlg({
                  open: true,
                  record, // ★ keep the row we’re editing
                  value: record.status || 'Active',
                }),
            },
          ]
        } else {
          menuItems = [
            {
              key: 'edit',
              disabled: !hasFullAccess,
              label: '  Edit Place',
              icon: (
                <FormOutlined style={{ fontSize: '14px', color: 'green' }} />
              ),
              onClick: () =>
                hasFullAccess && onUpdateNonBusinessProperty(record),
            },
          ]
        }

        return hasFullAccess ? (
          <Dropdown
            menu={{
              items: menuItems.map((m) => ({
                key: m.key,
                label: m.label,
                icon: m.icon,
                onClick: m.onClick,
              })),
            }}
            trigger={['click']}
          >
            <Button
              type='text'
              style={{ transform: 'rotate(90deg)' }}
              icon={<EllipsisOutlined />}
            />
          </Dropdown>
        ) : (
          ''
        )
      },
    },
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      align: 'center',
      width: 60,
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Place ID',
      dataIndex: 'placeId',
      key: 'placeId',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 100,
      render: (val) => {
        if (val === 'Active')
          return (
            <Tag
              color='green'
              style={{
                background: '#6AC917',
                color: 'white',
                borderRadius: '20px',
              }}
            >
              Active
            </Tag>
          )
        if (val === 'Pending')
          return (
            <Tag
              color='orange'
              style={{
                background: 'orange',
                color: 'white',
                borderRadius: '20px',
              }}
            >
              Pending
            </Tag>
          )
        if (val === 'Draft')
          return (
            <Tag
              color='blue'
              style={{
                background: '#5C6BB2',
                color: 'white',
                borderRadius: '20px',
              }}
            >
              Draft
            </Tag>
          )
        if (val === 'Inactive')
          return (
            <Tag
              color='red'
              style={{
                background: '#AD3838',
                color: 'white',
                borderRadius: '20px',
              }}
            >
              Inactive
            </Tag>
          )
        if (val === 'In Review')
          return (
            <Tag
              style={{
                background: '#E8C504',
                color: 'white',
                borderRadius: '20px',
              }}
              color='gold'
            >
              In Review
            </Tag>
          )
        if (val === 'Trash')
          return (
            <Tag
              style={{
                background: 'Red',
                color: 'white',
                borderRadius: '20px',
              }}
              color='gold'
            >
              Trash
            </Tag>
          )
        return (
          <Tag
            color='gray'
            style={{
              background: 'gray',
              color: 'white',
              borderRadius: '20px',
            }}
          >
            {val}
          </Tag>
        )
      },
    },

    {
      title: 'Click Count',
      dataIndex: 'click_count',
      key: 'click_count_duplicate',
      align: 'center',
    },
    {
      title: 'Property Profile',
      key: 'property_profile',
      align: 'center',

      render: (_, record) => (
        <>
          <div className='flex items-center space-x-1'>
            <p>
              {record?.media?.image ? (
                <Avatar
                  shape='square'
                  style={{ width: '60px', height: '40px' }}
                  src={getFileByName(record?.media?.image?.[0])}
                />
              ) : (
                'N/A'
              )}
            </p>
            <div className='flex flex-col items-start'>
              <p
                className='text-blue-500 cursor-pointer'
                onClick={() => handleView(record)}
              >
                {record?.nameEn}
              </p>
              <p
                className='text-blue-500 cursor-pointer'
                onClick={() => handleView(record)}
              >
                {record?.nameKh}
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      title: 'Belong To',
      dataIndex: 'belong_to',
      key: 'ownership',
      align: 'center',
    },
    {
      title: 'Ownership',
      dataIndex: 'ownership',
      key: 'ownership',
      align: 'center',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      align: 'center',
      render: (_, record) => {
        if (!record?.mainCategory) {
          return ''
        } else if (
          !record?.mainCategory?.nameKh &&
          !record?.mainCategory?.nameEn
        )
          return ''
        return (
          record?.mainCategory?.nameKh ??
          '' + ' - ' + record?.mainCategory?.nameEn ??
          ''
        )
      },
    },
    {
      title: 'Sub Category',
      dataIndex: 'sub_category',
      key: 'sub_category',
      align: 'center',
      render: (_, record) => {
        if (!record?.subCategory) {
          return ''
        } else if (!record?.subCategory?.nameKh && !record?.subCategory?.nameEn)
          return ''
        return (
          record?.subCategory?.nameKh ??
          '' + ' - ' + record?.subCategory?.nameEn ??
          ''
        )
      },
    },
    {
      title: 'Type Of Place',
      dataIndex: 'type_of_place',
      key: 'type_of_place',
      align: 'center',
      render: (_, record) => {
        const list = Array.isArray(record.typeOfPlace)
          ? record.typeOfPlace
          : record.typeOfPlace
            ? [record.typeOfPlace]
            : []

        return list.length ? list.join(', ') : list.length ? '—' : ''
      },
    },
    {
      title: 'City/Province',
      dataIndex: 'city_province',
      key: 'city_province',
      align: 'center',
      render: (_, record) => {
        if (!record?.address) {
          return ''
        } else if (!record?.address?.location) return ''
        return record?.address?.location?.provinceEn ?? ''
      },
    },
    {
      title: 'District/Khan',
      dataIndex: 'district_khan',
      key: 'district_khan',
      align: 'center',
      render: (_, record) => {
        if (!record?.address) {
          return ''
        } else if (!record?.address?.location) return ''
        return record?.address?.location?.districtEn ?? ''
      },
    },
    {
      title: 'Commune/Sangkat',
      dataIndex: 'commune_sangkat',
      key: 'commune_sangkat',
      align: 'center',
      render: (_, record) => {
        if (!record?.address) {
          return ''
        } else if (!record?.address?.location) return ''
        return record?.address?.location?.communeEn ?? ''
      },
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      align: 'center',
      sorter: (a, b) =>
        String(a['Created By']).localeCompare(String(b['Created By'])),
      sortDirections: ['ascend', 'descend'],
      className: 'column-sort',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      sortDirections: ['ascend', 'descend'],
      className: 'column-sort',
      render: (_, record) => {
        if (!record?.createdAt) {
          return ''
        }
        return dayjs(record?.createdAt ?? '').format('YYYY-MM-DD')
      },
    },
    {
      // Dummy column to render the AddRemark modal
      title: '',
      key: 'addRemarkModal',
      render: (_, record) =>
        isAddRemarkOpen && (
          <AddRemark
            open={isAddRemarkOpen}
            setOpen={setIsAddRemarkOpen}
            id={record?._id}
          />
        ),
    },
    {
      // Dummy column to render the AddRemark modal
      title: '',
      key: 'AddCommentModal',
      render: (_, record) =>
        OpenComment && (
          <AddComment
            open={OpenComment}
            setOpen={setOpenComment}
            id={record?._id}
          />
        ),
    },
    {
      title: '',
      key: 'changeStatusDialog',
      render: () =>
        statusDlg?.open && (
          <Modal
            open={statusDlg?.open}
            title='Change Status'
            okText='Update'
            onOk={confirmStatusChange}
            onCancel={() =>
              setStatusDlg({ open: false, record: null, value: 'Active' })
            }
          >
            <Card>
              <Radio.Group
                style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                value={statusDlg?.value}
                onChange={(e) =>
                  setStatusDlg((s) => ({ ...s, value: e.target.value }))
                }
              >
                <Radio value='Active'>Active</Radio>
                <Radio value='Inactive'>Inactive</Radio>
                <Radio value='Draft'>Draft</Radio>
                <Radio value='Pending'>Pending</Radio>
                <Radio value='In Review'>In Review</Radio>
              </Radio.Group>
            </Card>
          </Modal>
        ),
    },
  ]
}
