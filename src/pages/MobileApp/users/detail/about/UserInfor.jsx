import { Card, Tabs } from 'antd'
import ChangePassword from './ChangePassword'
import SecuritySettings from './security/SecuritySettings'
import ConnectSocialMedia from './ConnectSocialMedia'
import TermsPolicy from './TermsPolicy'
import ChangeLanguage from './ChangeLanguage'
import Information from './Infomation'
import Feedback from './Feedback'

const AboutUser = () => {
  const items = [
    {
      key: '1',
      label: 'Information',
      children: <Information />,
    },
    {
      key: '2',
      label: 'Security',
      children: (
        <div className=''>
          <div className='text-gray-600'>
            <SecuritySettings />
          </div>
        </div>
      ),
    },
    {
      key: '3',
      label: 'Change Language',
      children: (
        <div className='p-4'>
          <div className='text-gray-600'>
            <ChangeLanguage />
          </div>
        </div>
      ),
    },
    {
      key: '4',
      label: 'Terms & Policy',
      children: (
        <div className='p-4'>
          <div className='text-gray-600'>
            <TermsPolicy />
          </div>
        </div>
      ),
    },
    {
      key: '5',
      label: 'Connect Social Media',
      children: (
        <div className='p-4'>
          <div className='text-gray-600'>
            <ConnectSocialMedia />
          </div>
        </div>
      ),
    },
    {
      key: '6',
      label: 'Feedback',
      children: (
        <div className='p-4'>
          <div className='text-gray-600'>
            <Feedback />
          </div>
        </div>
      ),
    },
  ]

  return (
    <Card bordered={false} className='mb-4'>
      <Tabs defaultActiveKey='1' items={items} />
    </Card>
  )
}

export default AboutUser
