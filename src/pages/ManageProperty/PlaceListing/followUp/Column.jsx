import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Button, Dropdown, Modal, Tag, Tooltip } from 'antd'
import {
  EllipsisOutlined,
  FormOutlined,
  HomeOutlined,
  PlusOutlined,
  DeleteOutlined,
  FileDoneOutlined,
  DiffOutlined,
  CaretDownOutlined,
} from '@ant-design/icons'

import DescriptionDetail from '../other/DescriptionDetail'
import { AuthContext } from '../../../../contexts/AuthContext'
import { PERMS } from '../../../../constants/permission/perms'
export default function getTableColumns(
  currentPage,
  pageSize,
  activeTab,
  setIsAddRemarkOpen,
  setCommentOpen,
  handleView,
  renderStatusTag
) {
  const [comentNow, setComment] = useState('')
  // For modal visibility
  const [isRemarkModalOpen, setIsRemarkModalOpen] = useState(false)
  // Keep track of the currently selected record
  const [selectedRecord, setSelectedRecord] = useState(null)

  useEffect(() => {
    console.log(comentNow, 'activeTab what comentNow')
    setComment(activeTab)
  }, [activeTab])

  // Function to close the modal
  const handleCloseRemarkModal = () => {
    setIsRemarkModalOpen(false)
    setSelectedRecord(null)
  }
  const { username, access_token, checkPermission } = useContext(AuthContext)
  const hasFullAccess = checkPermission(PERMS.ASSIGNED_USER)
  return [
    {
      title: '',
      key: 'changeStatus',
      align: 'center',
      render: (record) => {
        const status = record.status.toLowerCase()
        let menuItems = []

        if (activeTab === 'remark') {
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
                  hasFullAccess &&
                  console.log('Edit Place clicked for', record),
              },
              {
                key: 'delete',
                label: 'Delete Place',
                disabled: !hasFullAccess,

                icon: (
                  <DeleteOutlined style={{ fontSize: '14px', color: 'red' }} />
                ),
                onClick: () =>
                  hasFullAccess &&
                  console.log('Delete Place clicked for', record),
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
                label: 'Inactive',
                disabled: !hasFullAccess,

                icon: (
                  <HomeOutlined style={{ fontSize: '14px', color: 'red' }} />
                ),
                onClick: () =>
                  hasFullAccess && console.log('Inactive clicked for', record),
              },
              {
                key: 'addRemark',
                label: 'Add Remark',
                disabled: !hasFullAccess,

                icon: (
                  <FormOutlined style={{ fontSize: '14px', color: 'orange' }} />
                ),
                onClick: () => hasFullAccess && setIsAddRemarkOpen(true),
              },
            ]
          }
        } else if (activeTab === 'comment') {
          if (status === 'in review') {
            menuItems = [
              {
                key: 'edit',
                label: 'Edit Place',
                disabled: !hasFullAccess,

                icon: (
                  <FormOutlined style={{ fontSize: '14px', color: 'green' }} />
                ),
                onClick: () => console.log('Edit Place clicked for', record),
              },
              {
                key: 'delete',
                label: 'Delete Place',
                disabled: !hasFullAccess,

                icon: (
                  <DeleteOutlined style={{ fontSize: '14px', color: 'red' }} />
                ),
                onClick: () =>
                  hasFullAccess &&
                  console.log('Delete Place clicked for', record),
              },
              {
                key: 'approve',
                label: 'Approve Place',
                disabled: !hasFullAccess,

                icon: (
                  <FileDoneOutlined
                    style={{ fontSize: '14px', color: 'blue' }}
                  />
                ),
                onClick: () =>
                  hasFullAccess &&
                  console.log('Approve Place clicked for', record),
              },
              {
                key: 'addComment',
                label: 'Add Comment',

                disabled: !hasFullAccess,

                icon: (
                  <DiffOutlined style={{ fontSize: '14px', color: 'orange' }} />
                ),
                onClick: () => hasFullAccess && setCommentOpen(true),
              },
            ]
          }
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
      title: activeTab === 'remark' ? 'Remark' : 'Comments',
      dataIndex: 'ActiveTab',
      key: 'ActiveTab',
      align: 'center',
      render: (_, record) => DescriptionDetail(record, activeTab),
    },
    {
      title: 'Place ID',
      dataIndex: 'placeID',
      key: 'placeID',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 100,
      render: (val) => {
        if (val.toLowerCase() === 'active')
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
        if (val.toLowerCase() === 'pending')
          return <Tag color='orange'>Pending</Tag>
        if (val.toLowerCase() === 'draft') return <Tag color='blue'>Draft</Tag>
        if (val.toLowerCase() === 'inactive')
          return <Tag color='red'>Inactive</Tag>
        if (val.toLowerCase() === 'in review')
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
        return <Tag color='gray'>{val}</Tag>
      },
    },
    {
      title: 'Click Count',
      dataIndex: 'click_count',
      key: 'click_count',
      align: 'center',
    },
    {
      title: 'Property Profile',
      key: 'property_profile',
      align: 'end',
      render: (_, record) => (
        <div className='flex items-center space-x-1'>
          {record.image ? (
            <Avatar
              shape='square'
              style={{ width: '60px', height: '40px' }}
              src={record.image}
              alt={record.location_name_en}
            />
          ) : (
            'N/A'
          )}
          <div className='flex flex-col items-start'>
            <p
              className='text-blue-500 cursor-pointer'
              onClick={() => handleView()}
            >
              {record.location_name_en}
            </p>
            <p
              className='text-blue-500 cursor-pointer'
              onClick={() => handleView()}
            >
              {record.location_name_kh}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Belong To',
      dataIndex: 'belong_to',
      key: 'belong_to',
      align: 'center',
    },
    {
      title: 'Ownership',
      dataIndex: 'Ownership',
      key: 'Ownership',
      align: 'center',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      align: 'center',
    },
    {
      title: 'Sub Category',
      dataIndex: 'sub_category',
      key: 'sub_category',
      align: 'center',
    },
    {
      title: 'Type Of Place',
      dataIndex: 'type_of_place',
      key: 'type_of_place',
      align: 'center',
    },
    {
      title: 'City/Province',
      dataIndex: 'city_province',
      key: 'city_province',
      align: 'center',
    },
    {
      title: 'District/Khan',
      dataIndex: 'district_khan',
      key: 'district_khan',
      align: 'center',
    },
    {
      title: 'Commune/Sangkat',
      dataIndex: 'commune_sangkat',
      key: 'commune_sangkat',
      align: 'center',
    },
    {
      title: 'Created By',
      dataIndex: 'Created By',
      key: 'createdAt',
      align: 'center',
      sorter: (a, b) =>
        String(a['Created By']).localeCompare(String(b['Created By'])),
      sortDirections: ['ascend', 'descend'],
      className: 'column-sort', // add this
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      sortDirections: ['ascend', 'descend'],
      className: 'column-sort', // add this
    },
    {
      // The Modal for viewing remarks (when the Remark column cell is clicked)
      title: '',
      key: 'modal',
      render: () =>
        isRemarkModalOpen && (
          <Modal
            title='Remark'
            open={true}
            onCancel={handleCloseRemarkModal}
            footer={null}
          >
            {selectedRecord?.remarks?.length ? (
              <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                {selectedRecord.remarks.map((remark, index) => (
                  <div
                    key={index}
                    style={{
                      border: '1px solid #f0f0f0',
                      borderRadius: 6,
                      marginBottom: 8,
                      padding: '8px',
                    }}
                  >
                    <p style={{ fontWeight: 'bold', marginBottom: 4 }}>
                      {remark.dateTime}
                    </p>
                    <p style={{ margin: 0 }}>{remark.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No remarks found for this record.</p>
            )}
          </Modal>
        ),
    },
  ]
}
