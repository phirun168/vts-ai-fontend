import React, { useState } from 'react'

const ChangeLanguage = () => {
  const [language, setLanguage] = useState('en')

  return (
    <div className='flex flex-col items-center p-4'>
      <h1 className='text-2xl font-bold mb-4'>
        {language === 'en' ? 'Change Language' : 'ផ្លាស់ប្តូរភាសា'}
      </h1>
      <div className='flex gap-4'>
        <button
          onClick={() => setLanguage('en')}
          className={`flex items-center px-4 py-2 border rounded-lg shadow-md ${
            language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          🇺🇸 <span className='ml-2'>English</span>
        </button>
        <button
          onClick={() => setLanguage('km')}
          className={`flex items-center px-4 py-2 border rounded-lg shadow-md ${
            language === 'km' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          🇰🇭 <span className='ml-2'>ភាសាខ្មែរ</span>
        </button>
      </div>
    </div>
  )
}

export default ChangeLanguage
