import React, { useState } from 'react'
import { Button, Card, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import AddUser from './Add'
import Swal from 'sweetalert2'

const { Meta } = Card

const User = () => {
  const navigate = useNavigate()
  const [openAdd, setOpenAdd] = useState(false)
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      image:
        'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg',
      storeNameKh: 'ហាង ខ្មែរ',
      storeNameEn: 'Khmer Store',
      role: 'Admin',
    },
    {
      id: 2,
      name: 'Jane Smith',
      image:
        'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg',
      storeNameKh: 'ហាង ភ្នំពេញ',
      storeNameEn: 'Phnom Penh Store',
      role: 'Staff',
    },
    {
      id: 3,
      name: 'Alice Brown',
      image:
        'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg',
      storeNameKh: 'ហាង ភ្នំពេញ',
      storeNameEn: 'Phnom Penh Store',
      role: 'Manager',
    },
    {
      id: 4,
      name: 'Bob Johnson',
      image:
        'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg',
      storeNameKh: 'ហាង ភ្នំពេញ',
      storeNameEn: 'Phnom Penh Store',
      role: 'Staff',
    },
    {
      id: 5,
      name: 'Eve Williams',
      image:
        'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg',
      storeNameKh: 'ហាង ភ្នំពេញ',
      storeNameEn: 'Phnom Penh Store',
      role: 'Admin',
    },
    {
      id: 6,
      name: 'Sam Wilson',
      image:
        'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg',
      storeNameKh: 'ហាង ភ្នំពេញ',
      storeNameEn: 'Phnom Penh Store',
      role: 'Staff',
    },
  ])

  // Confirm removal using SweetAlert2
  const handleRemoveUser = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Remove',
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers((prev) => prev.filter((user) => user.id !== id))
        Swal.fire('Removed!', 'The user has been removed.', 'success')
      }
    })
  }

  return (
    <div className='p-4'>
      {/* Add User Modal */}
      <AddUser open={openAdd} setOpen={setOpenAdd} />

      {/* Header with "User List" and Add User button */}
      <div className='flex justify-between items-center mb-4'>
        <div className='text-xl font-bold'>User List</div>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={() => setOpenAdd(true)}
        >
          Add User
        </Button>
      </div>

      <Divider />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {users?.map((user) => (
          <Card
            key={user.id}
            hoverable
            cover={
              <img
                alt={user.name}
                src={user.image}
                className='h-48 w-full object-contain'
              />
            }
            className='rounded-lg shadow-md'
          >
            <Meta
              title={user.name}
              description={
                <>
                  <p>Store Name (KH): {user.storeNameKh}</p>
                  <p>Store Name (EN): {user.storeNameEn}</p>
                  <p>Role: {user.role}</p>
                </>
              }
            />
            <div className='flex gap-4 justify-between mt-4'>
              <Button type='primary'>View User</Button>
              <Button onClick={() => navigate('/location/detail/service')}>
                View Store
              </Button>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveUser(user.id)}
              >
                Remove
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default User
