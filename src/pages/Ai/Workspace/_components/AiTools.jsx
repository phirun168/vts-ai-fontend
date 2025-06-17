import React from 'react'
import AiToolCard from './AiToolCard'

const aiToolsList = [
  {
    name: 'AI Career Q&A Chat',
    desc: 'Chat with AI Agent',
    icon: '/chatbot.png',
    button: 'Ask Now',
    path: '/chat-board',
  },
  {
    name: 'AI Resume Analyzer',
    desc: 'Chat with AI Agent',
    icon: '/resume.png',
    button: 'Analyze Now',
    path: '/ai-chat',
  },
  {
    name: 'Learning Roadmap',
    desc: 'Chat with AI Agent',
    icon: '/learning-roadmap.png',
    button: 'Generate Now',
    path: '/ai-chat',
  },
  {
    name: 'Cover Letter Generator',
    desc: 'Chat with AI Agent',
    icon: '/cover-letter.png',
    button: 'Create Now',
    path: '/ai-chat',
  },
]

function AiTools() {
  return (
    <div className='mt-7 p-5 bg-white border rounded-xl'>
      <h2 className='font-bold text-lg'>Available AI Tools</h2>
      <p>Start Building and Shape Your Career with this</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4'>
        {aiToolsList.map((tool, index) => (
          <AiToolCard tool={tool} key={index} />
        ))}
      </div>
    </div>
  )
}

export default AiTools
