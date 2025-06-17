import React, { useState } from 'react'
import { Modal, Button, message, Input, Divider, Card } from 'antd'

const { TextArea } = Input

const TermsPolicy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAccepted, setIsAccepted] = useState(false)
  const [policy, setPolicy] = useState()

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleAccept = () => {
    setIsAccepted(true)
    setIsModalOpen(false)
    message.success('You have accepted the Terms and Privacy Policy!')
  }

  return (
    <div className='items-center justify-center '>
      <div className=' mb-4'>
        <h2 className='text-2xl font-bold'>Please Read Our Terms & Policy</h2>
        <p className='text-gray-600 mt-2'>
          Before proceeding, make sure to review and enter the necessary Terms &
          Privacy Policy.
        </p>
      </div>
      <Button onClick={openModal}>Add</Button>
      <Divider />
      <Modal
        title='Terms &  Policy'
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button key='accept' type='primary' onClick={handleAccept}>
            Add
          </Button>,
        ]}
      >
        <TextArea
          rows={4}
          value={policy}
          onChange={(e) => setPolicy(e.target.value)}
          placeholder='Enter Terms&Policy'
          className='mb-4'
        />
      </Modal>
      <div className=''>
        ទឹកជ្រោះ​​កាទៀង ​ស្ថិត​នៅ​ក្នុងភូមិ​​កាទៀង ឃុំ​ល្បាំង២ ស្រុក​​លំផាត់
        មានចំងាយ​ប្រមាណ​​៩គីឡូម៉ែត្រ ​ពី​ក្រុង​បានលុង ខេត្ត​រតន​គិរី។
        មុន​នឹង​​ធ្វើដំណើរ​​ទៅ​ដល់​រមណីយដ្ឋាន​​ទឹកជ្រោះ​​កាចាញ​
        មានផ្លូវ​​លំបែក​​ទៅ​ស្តាំ​ដៃ​តាមរបង​​រោង​ចក្រ​កៅស៊ី​​ក្រែបឆាយ​​សេង
        ​ទៅ​ខាង​ត្បូង​ គឺជា​​ផ្លូវ​ទៅកាន់​​រមណីយដ្ឋាន​​ទឹកជ្រោះ​​កាទៀង
        ដែល​មាន​ចំងាយ​​ប្រមាណ​​ជា​៣គីឡូម៉ែត្រប៉ុណ្ណោះ
        ​នឹង​​ទៅ​​ដល់​រមណីយដ្ឋាន​​នេះ ។ ទឹកជ្រោះ​​កាទៀង​
        ​ស្ថិត​នៅ​កណ្តាលព្រៃ​​ភ្នំ​​មាន​​​ដើម​ឈើ​ធំៗ​​ដែល​អាច​​​ផ្តល់ជា​
        ម្លប់យ៉ាង​ត្រជាក់​​ត្រឈឹង​​​ត្រឈៃ​ដល់​អ្នក​ទេសចរ​​ទាំង​ឡាយ ។
        ដើម្បី​​គយ​គន់ទេស​ភាព​​​ដ៏​ស្រស់​ត្រកាល​នៃទឹក​ធ្លាក់នេះ​ឱ្យ​កាន់តែ​​
        ប្លែក គឺត្រូវ​ចុះ​តាម​ជណ្តើរ​​​ឈើជា​ច្រើន​​កាំ​​ទៅ​ក្រោម។
        ​នៅខាង​ក្រោយ​​ខ្សែ​​ទឹកធ្លាក់​នោះ​​មាន​រូងថ្ម​​ដ៏ធំ​​អាច​ឱ្យ​ភ្ញៀវ​​
        ចូលទៅ​ក្នុងបាន
        ហើយ​អាច​មើល​ឃើញ​​ទេស​​ភាពល្អ​ៗ​ប្លែកៗ​​ពីធម្មជាតិកាត់​តាមខ្សែ​ទឹក​ដែល​
        កំពុង​​ធ្លាក់​យ៉ាង​ត្របាញ់​នោះ ។
        ​ចំណែក​​នៅ​ខាងលើក្បែរ​​​ចំណុច​​ទឹក​​ធ្លាក់​​
        មាន​​កន្លែង​ជិះ​ដំរី​សំរាប់​​​ការដើរ​កំសាន្ត​​តាម​​ព្រៃ​​ជុំវិញ​​ទីនោះ
        ។​ នៅទីនោះ​​
        មាន​ផលិត​​ផល​​ផលិត​ពី​ដៃ​ដោយ​ជន​​ជាតិគ្រឹង​ជាច្រើនមុខ​​ដាក់តាំង​លក់​​
        ដូចជា ឃ្លោក ស្នា គង ក្រណាត់ប៉ឹង
        សំពត់​តាម​បែប​ប្រពៃណី​​​ជនជាតិ​​ដើម​ភាគ​តិចជា​ដើម
      </div>
    </div>
  )
}

export default TermsPolicy
