import React, { useState, useEffect } from 'react'
import {
  AppstoreOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { Card } from 'antd'

const StatusCard = ({
  activeTab,
  label,
  count,
  icon: IconComponent,
  colorClass,
  colorStyle,
  isActive,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className='transition-transform duration-300 hover:scale-90 cursor-pointer'
    >
      <Card
        size='small'
        style={{
          // always apply the base colorStyle
          ...colorStyle,
          ...(isActive && {
            border: `1px solid ${label === 'All' ? 'gray' : label === 'Active' ? 'green' : label === 'Inactive' ? 'red' : label === 'In Review' ? '#FFBF00' : label === 'Pending' ? 'orange' : label === 'Draft' ? 'purple' : label === 'Dashboard' ? 'blue' : label === 'Trash' ? 'red' : 'gray'}`,
          }),
        }}
        className={`
        ${colorClass}
        text-center shadow-sm rounded-md
        
      
      `}
      >
        <div className='text-xs'>{label} </div>
        <div className='flex items-center justify-center text-xl font-bold mb-1'>
          {label === 'Dashboard' && (
            <IconComponent
              style={{ color: '#1645DD' }}
              className={`mr-2 ${label === 'Dashboard' ? 'py-1' : ''}`}
            />
          )}
          <span
            style={{
              color:
                label === 'Active'
                  ? '#6AC917'
                  : label === 'Inactive'
                    ? '#AD3838'
                    : label === 'Pending'
                      ? '#DD991B'
                      : label === 'Draft'
                        ? '#5C6BB2'
                        : label === 'Dashboard'
                          ? '#1645DD'
                          : '',
            }}
          >
            {count}
          </span>
        </div>
      </Card>
    </div>
  )
}

export default function CardStatus(props) {
  // Internal activeStatus state
  const { activeTab, status, activeStatus, setActiveStatus } = props

  // Destructure stats

  // If status is undefined, fall back to an empty object
  const {
    All: all = 0,
    Active: active = 0,
    Inactive: inactive = 0,
    Pending: pending = 0,
    Draft: draft = 0,
    ['In Review']: inReview = 0,
    Trash: trash = 0,
  } = status || {}

  return (
    <div
      className={`grid grid-cols-1 ${activeTab === 'all' ? 'sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-9' : 'sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-9'} gap-1`}
    >
      <StatusCard
        activeTab={activeTab}
        label='All'
        count={all}
        icon={AppstoreOutlined}
        colorStyle={{ background: '#F9F9F9' }}
        isActive={activeStatus === 'All'}
        onClick={() => setActiveStatus('All')}
      />
      <StatusCard
        activeTab={activeTab}
        label='Active'
        count={active}
        icon={CheckCircleOutlined}
        colorStyle={{ background: '#6AC9170A' }}
        isActive={activeStatus === 'Active'}
        onClick={() => setActiveStatus('Active')}
      />
      <StatusCard
        activeTab={activeTab}
        label='Inactive'
        count={inactive}
        icon={CloseCircleOutlined}
        colorStyle={{ background: '#AD38380D' }}
        isActive={activeStatus === 'Inactive'}
        onClick={() => setActiveStatus('Inactive')}
      />
      <StatusCard
        activeTab={activeTab}
        label='In Review'
        count={inReview}
        icon={ExclamationCircleOutlined}
        colorStyle={{ background: '#E8C5040D' }}
        isActive={activeStatus === 'In Review'}
        onClick={() => setActiveStatus('In Review')}
      />
      <StatusCard
        activeTab={activeTab}
        label='Pending'
        count={pending}
        icon={ExclamationCircleOutlined}
        colorStyle={{ background: '#DD991B0D' }}
        isActive={activeStatus === 'Pending'}
        onClick={() => setActiveStatus('Pending')}
      />
      <StatusCard
        activeTab={activeTab}
        label='Draft'
        count={draft}
        icon={ExclamationCircleOutlined}
        colorStyle={{ background: '#DD991B0D' }}
        isActive={activeStatus === 'Draft'}
        onClick={() => setActiveStatus('Draft')}
      />
      <StatusCard
        activeTab={activeTab}
        label='Trash'
        count={trash}
        icon={ExclamationCircleOutlined}
        colorStyle={{ background: 'rgba(215, 0, 64, 0.19)' }}
        isActive={activeStatus === 'Trash'}
        onClick={() => setActiveStatus('Trash')}
      />
      {activeTab === 'all' ? (
        <StatusCard
          activeTab={activeTab}
          label='Dashboard'
          icon={AppstoreOutlined}
          colorStyle={{ background: '#F7F7FB' }}
          isActive={activeStatus === 'Dashboard'}
          onClick={() => setActiveStatus('Dashboard')}
        />
      ) : (
        ''
      )}
    </div>
  )
}
