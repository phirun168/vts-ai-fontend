import React from 'react'
import { Button, Image } from 'antd'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

function AiToolCard({ tool }) {
  const id = uuidv4()
  return (
    <div className='p-3 border rounded-lg'>
      <Image
        src={tool.icon}
        width={50}
        height={50}
        alt={tool.name}
        preview={false}
      />
      <h2 className='font-bold mt-2'>{tool.name}</h2>
      <p className='text-gray-400'>{tool.desc}</p>
      <Link to={tool.path + '/' + id}>
        <Button type='primary' className='w-full mt-3 '>
          {tool.button}
        </Button>
      </Link>
    </div>
  )
}

export default AiToolCard
