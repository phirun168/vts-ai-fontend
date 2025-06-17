import React from 'react'
import { Dropdown, Button } from 'antd'
import {
  FormOutlined,
  PlusOutlined,
  EyeInvisibleOutlined,
  HomeOutlined,
  FileDoneOutlined,
  DiffOutlined,
  EllipsisOutlined,
  DeleteOutlined,
} from '@ant-design/icons'

export default function buildCardFooterActions(record) {
  const status = record.status.toLowerCase()

  let menuItems = []

  if (status === 'active') {
    menuItems = [
      {
        key: 'edit',
        label: 'Edit Place',
        icon: <FormOutlined style={{ fontSize: '14px', color: 'green' }} />,
        onClick: () => console.log('Edit Place clicked for', record),
      },
      {
        key: 'delete',
        label: 'Delete Place',
        icon: <DeleteOutlined style={{ fontSize: '14px', color: 'red' }} />,
        onClick: () => console.log('Delete Place clicked for', record),
      },
      {
        key: 'addToBusiness',
        label: 'Add To Business Place',
        icon: <PlusOutlined style={{ fontSize: '14px', color: 'blue' }} />,
        onClick: () => console.log('Add To Business Place clicked for', record),
      },
      {
        key: 'inactive',
        label: 'Inactive',
        icon: (
          <EyeInvisibleOutlined style={{ fontSize: '14px', color: 'red' }} />
        ),
        onClick: () => console.log('Inactive clicked for', record),
      },
      {
        key: 'addRemark',
        label: 'Add Remark',
        icon: <FormOutlined style={{ fontSize: '14px', color: 'orange' }} />,
        onClick: () => console.log('Add Remark clicked for', record),
      },
    ]
  } else if (status === 'pending') {
    menuItems = [
      {
        key: 'edit',
        label: 'Edit Place',
        icon: <FormOutlined style={{ fontSize: '14px', color: 'green' }} />,
        onClick: () => console.log('Edit Place clicked for', record),
      },
      {
        key: 'delete',
        label: 'Delete Place',
        icon: <DeleteOutlined style={{ fontSize: '14px', color: 'red' }} />,
        onClick: () => console.log('Delete Place clicked for', record),
      },
      {
        key: 'inReview',
        label: 'In Review',
        icon: <FormOutlined style={{ fontSize: '14px', color: 'purple' }} />,
        onClick: () => console.log('In Review clicked for', record),
      },
      {
        key: 'approve',
        label: 'Approve Place',
        icon: <HomeOutlined style={{ fontSize: '14px', color: 'blue' }} />,
        onClick: () => console.log('Approve Place clicked for', record),
      },
    ]
  } else if (status === 'draft') {
    menuItems = [
      {
        key: 'edit',
        label: 'Edit Place',
        icon: <FormOutlined style={{ fontSize: '14px', color: 'green' }} />,
        onClick: () => console.log('Edit Place clicked for', record),
      },
      {
        key: 'delete',
        label: 'Delete Place',
        icon: <DeleteOutlined style={{ fontSize: '14px', color: 'red' }} />,
        onClick: () => console.log('Delete Place clicked for', record),
      },
    ]
  } else if (status === 'inactive') {
    menuItems = [
      {
        key: 'edit',
        label: 'Edit Place',
        icon: <FormOutlined style={{ fontSize: '14px', color: 'green' }} />,
        onClick: () => console.log('Edit Place clicked for', record),
      },
      {
        key: 'delete',
        label: 'Delete Place',
        icon: <DeleteOutlined style={{ fontSize: '14px', color: 'red' }} />,
        onClick: () => console.log('Delete Place clicked for', record),
      },
      {
        key: 'active',
        label: 'Active',
        icon: <HomeOutlined style={{ fontSize: '14px', color: 'blue' }} />,
        onClick: () => console.log('Active clicked for', record),
      },
    ]
  } else if (status === 'in review') {
    menuItems = [
      {
        key: 'edit',
        label: 'Edit Place',
        icon: <FormOutlined style={{ fontSize: '14px', color: 'green' }} />,
        onClick: () => console.log('Edit Place clicked for', record),
      },
      {
        key: 'delete',
        label: 'Delete Place',
        icon: <DeleteOutlined style={{ fontSize: '14px', color: 'red' }} />,
        onClick: () => console.log('Delete Place clicked for', record),
      },
      {
        key: 'approve',
        label: 'Approve Place',
        icon: <FileDoneOutlined style={{ fontSize: '14px', color: 'blue' }} />,
        onClick: () => console.log('Approve Place clicked for', record),
      },
      {
        key: 'addComment',
        label: 'Add Comment',
        icon: <DiffOutlined style={{ fontSize: '14px', color: 'orange' }} />,
        onClick: () => console.log('Add Comment clicked for', record),
      },
    ]
  }

  return (
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
        // type='text'
        className='bg-white'
        style={{ transform: 'rotate(90deg)' }}
        icon={<EllipsisOutlined />}
      />
    </Dropdown>
  )
}
