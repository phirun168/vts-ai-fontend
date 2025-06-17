import { Button } from 'antd'
import React from 'react'

function WelcomeBanner() {
  return (
    <div className='p-5 bg-gradient-to-r from-[#BE575F] via-[#A338E3] to-[#AC76D6] rounded-xl'>
      <h2 className='font-bold text-2xl text-white'>AI Career Coach Agent</h2>
      <p className='text-white'>
        Smarter career decisions start here - get tailord advice, real-time
        market.
      </p>
      <Button variant={'outlined'} className='mt-3'>
        Let's Get Started
      </Button>
    </div>
  )
}

export default WelcomeBanner
