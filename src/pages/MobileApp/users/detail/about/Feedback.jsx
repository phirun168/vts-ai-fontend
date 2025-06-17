import React, { useState } from 'react'
import { Input, Button, Rate, List, message, Card, Divider } from 'antd'

const { TextArea } = Input

const Feedback = () => {
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [feedbackList, setFeedbackList] = useState([
    {
      id: 1,
      comment: 'Good app, but the user interface needs a refresh.',
      rating: 3.6,
      date: '2025-01-02 01:24:30',
    },
    {
      id: 2,
      comment: 'I love the UI and the functionality.',
      rating: 2.0,
      date: '2025-02-06 01:24:30',
    },
    {
      id: 3,
      comment: 'Superb! Everything works as expected.',
      rating: 3.8,
      date: '2024-11-18 01:24:30',
    },
    {
      id: 4,
      comment: 'Great service! Really impressed.',
      rating: 1.9,
      date: '2025-01-06 01:24:30',
    },
    {
      id: 5,
      comment: "Not bad, but there's room for improvement.",
      rating: 2.0,
      date: '2024-11-05 01:24:30',
    },
    {
      id: 6,
      comment: "I'm not satisfied with the performance.",
      rating: 2.9,
      date: '2025-01-11 01:24:30',
    },
    {
      id: 7,
      comment: 'The performance can be improved, but overall, good.',
      rating: 3.3,
      date: '2025-01-22 01:24:30',
    },
    {
      id: 8,
      comment: 'Had a few issues, but customer support helped me out.',
      rating: 1.7,
      date: '2024-12-23 01:24:30',
    },
    {
      id: 9,
      comment: 'The performance can be improved, but overall, good.',
      rating: 4.4,
      date: '2025-02-06 01:24:30',
    },
    {
      id: 10,
      comment: 'Great service! Really impressed.',
      rating: 4.8,
      date: '2025-01-20 01:24:30',
    },
  ])

  // Submit Feedback
  const handleSubmitFeedback = () => {
    if (comment.trim() === '' || rating === 0) {
      message.warning('Please provide a comment and rating.')
      return
    }

    const newFeedback = {
      id: Date.now(),
      comment,
      rating,
      date: new Date().toLocaleString(),
    }

    setFeedbackList((prev) => [newFeedback, ...prev])
    setComment('')
    setRating(0)
    message.success('Feedback submitted successfully!')
  }

  return (
    <div className=''>
      {/* <h2 className='text-2xl font-bold mb-4'>Feedback</h2> */}

      {/* Feedback Form */}
      {/* <Card className='w-full max-w-lg mb-6'>
        <h3 className='text-lg font-semibold'>Submit Your Feedback</h3>
        <Rate
          allowHalf
          value={rating}
          onChange={(value) => setRating(value)}
          className='mb-2'
        />
        <TextArea
          rows={4}
          placeholder='Write your feedback here...'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          type='primary'
          className='mt-2'
          onClick={handleSubmitFeedback}
          block
        >
          Submit Feedback
        </Button>
      </Card> */}

      {/* List of Feedback */}

      <div className=''>
        <h3 className='text-lg font-semibold mb-2'>Feedback List</h3>
        <Divider />
        {feedbackList.length === 0 ? (
          <p className='text-gray-500'>No feedback available yet.</p>
        ) : (
          <List
            dataSource={feedbackList}
            renderItem={(item) => (
              <List.Item>
                <Card className='w-full'>
                  <Rate allowHalf value={item.rating} disabled />
                  <p className='mt-2'>{item.comment}</p>
                  <small className='text-gray-500'>{item.date}</small>
                </Card>
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  )
}

export default Feedback
