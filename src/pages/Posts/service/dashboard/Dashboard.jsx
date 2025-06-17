import React from 'react'
import { Card } from 'antd'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  PercentageOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'

const Dashboard = ({ data }) => {
  // Compute counts based on the service data
  const allCount = data.length
  const activeCount = data.filter((item) => item.status === 'active').length
  const inactiveCount = data.filter((item) => item.status === 'inactive').length
  const expiredCount = data.filter((item) =>
    dayjs().isAfter(dayjs(item.expired_date))
  ).length
  const discountCount = data.filter((item) => item.discountType).length

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:grid-cols-5 gap-4 mb-2 mt-1'>
      <div className='transition-transform duration-300 hover:scale-105 cursor-pointer'>
        <Card
          bordered={false}
          size='small'
          className='text-center border-l-4 border-blue-500'
        >
          <div className='flex items-center justify-center text-xl font-bold mb-1'>
            <AppstoreOutlined className='text-blue-500 mr-2' />
            {allCount}
          </div>
          <div className='text-xs'>All Services</div>
        </Card>
      </div>
      <div className='transition-transform duration-300 hover:scale-105 cursor-pointer'>
        <Card
          bordered={false}
          size='small'
          className='text-center border-l-4 border-green-500'
        >
          <div className='flex items-center justify-center text-xl font-bold mb-1'>
            <CheckCircleOutlined className='text-green-500 mr-2' />
            {activeCount}
          </div>
          <div className='text-xs'>Active Services</div>
        </Card>
      </div>
      <div className='transition-transform duration-300 hover:scale-105 cursor-pointer'>
        <Card
          bordered={false}
          size='small'
          className='text-center border-l-4 border-gray-500'
        >
          <div className='flex items-center justify-center text-xl font-bold mb-1'>
            <CloseCircleOutlined className='text-gray-500 mr-2' />
            {inactiveCount}
          </div>
          <div className='text-xs'>Inactive Services</div>
        </Card>
      </div>
      <div className='transition-transform duration-300 hover:scale-105 cursor-pointer'>
        <Card
          bordered={false}
          size='small'
          className='text-center border-l-4 border-red-500'
        >
          <div className='flex items-center justify-center text-xl font-bold mb-1'>
            <ExclamationCircleOutlined className='text-red-500 mr-2' />
            {expiredCount}
          </div>
          <div className='text-xs'>Expired Services</div>
        </Card>
      </div>
      <div className='transition-transform duration-300 hover:scale-105 cursor-pointer'>
        <Card
          bordered={false}
          size='small'
          className='text-center border-l-4 border-purple-500'
        >
          <div className='flex items-center justify-center text-xl font-bold mb-1'>
            <PercentageOutlined className='text-purple-500 mr-2' />
            {discountCount}
          </div>
          <div className='text-xs'>Discount Services</div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
