import React from 'react'

const questionList = [
  'What skills do I need for a data analyst role?',
  'How do I switch careers to UX design?',
]
function EmptyState({ selectedQuestion }) {
  return (
    <div>
      <h2 className='font-bold text-xl text-center'>
        Ask anything to AI career Agnet
      </h2>
      <div>
        {questionList.map((question, index) => (
          <h2
            className='p-4 text-center border rounded-l my-3 hover:border-blue-300 cursor-pointer'
            key={index}
            onClick={() => selectedQuestion(question)}
          >
            {question}
          </h2>
        ))}
      </div>
    </div>
  )
}

export default EmptyState
