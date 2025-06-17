import React, { useState } from 'react'
import { Button, Divider, Table, message } from 'antd'
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from '@ant-design/icons'
const TikTokIcon = () => (
  <svg
    viewBox='0 0 24 24'
    fill='currentColor'
    height='1em'
    width='1em'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M12.45 2.06h3.17c.06.43.11.87.18 1.3a5.5 5.5 0 004.92 4.7c.06 1.06-.13 2.1-.55 3.07a6.9 6.9 0 01-5.27-2.11v7.87a5.61 5.61 0 01-4.5 5.53 5.6 5.6 0 01-6.58-3.66A5.6 5.6 0 018.4 12.2v3.18a2.47 2.47 0 00-1.33 2.06 2.46 2.46 0 003.1 2.41c1.14-.29 1.94-1.32 1.95-2.49V2.07z'></path>
  </svg>
)
const ConnectSocialMedia = () => {
  const [connectedAccounts, setConnectedAccounts] = useState([])

  const handleConnect = (platform) => {
    if (connectedAccounts.some((account) => account.platform === platform)) {
      message.warning(`${platform} is already connected!`)
      return
    }

    const newConnection = {
      key: platform,
      platform: platform,
      link: `https://www.${platform.toLowerCase()}.com/yourprofile`, // Dummy link
      date: new Date().toLocaleString(),
    }

    setConnectedAccounts((prev) => [...prev, newConnection])
    message.success(`Connected to ${platform}`)
  }

  const handleDisconnect = (platform) => {
    setConnectedAccounts((prev) =>
      prev.filter((account) => account.platform !== platform)
    )
    message.info(`Disconnected from ${platform}`)
  }

  const columns = [
    {
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',

      render: (text) => (
        <a href={text} target='_blank' rel='noopener noreferrer'>
          {text}
        </a>
      ),
    },
    {
      title: 'Connected At',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Button
          type='danger'
          className='bg-red-400 text-white'
          onClick={() => handleDisconnect(record.platform)}
        >
          Disconnect
        </Button>
      ),
    },
  ]

  return (
    <div className=''>
      <h2 className='text-2xl font-bold mb-4'>Connect Your Social Media</h2>
      <Divider />
      <div className='flex space-x-4 mb-6'>
        <Button
          type='primary'
          icon={<FacebookOutlined />}
          onClick={() => handleConnect('Facebook')}
          disabled={connectedAccounts.some(
            (account) => account.platform === 'Facebook'
          )}
        >
          {connectedAccounts.some((account) => account.platform === 'Facebook')
            ? 'Connected ✅'
            : 'Facebook'}
        </Button>

        <Button
          type='primary'
          icon={<TwitterOutlined />}
          onClick={() => handleConnect('Twitter')}
          disabled={connectedAccounts.some(
            (account) => account.platform === 'Twitter'
          )}
        >
          {connectedAccounts.some((account) => account.platform === 'Twitter')
            ? 'Connected ✅'
            : 'Twitter'}
        </Button>

        <Button
          type='primary'
          icon={<InstagramOutlined />}
          onClick={() => handleConnect('Instagram')}
          disabled={connectedAccounts.some(
            (account) => account.platform === 'Instagram'
          )}
        >
          {connectedAccounts.some((account) => account.platform === 'Instagram')
            ? 'Connected ✅'
            : 'Instagram'}
        </Button>

        <Button
          type='primary'
          icon={<TikTokIcon />}
          onClick={() => handleConnect('TikTok')}
          disabled={connectedAccounts.some(
            (account) => account.platform === 'TikTok'
          )}
        >
          {connectedAccounts.some((account) => account.platform === 'TikTok')
            ? 'Connected ✅'
            : 'TikTok'}
        </Button>
      </div>

      {/* Display Connected Accounts */}
      {connectedAccounts.length > 0 && (
        <Table
          dataSource={connectedAccounts}
          columns={columns}
          pagination={false}
        />
      )}
    </div>
  )
}

export default ConnectSocialMedia
