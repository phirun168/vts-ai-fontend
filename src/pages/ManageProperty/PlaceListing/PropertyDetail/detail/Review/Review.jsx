import React from 'react'
import { Avatar, Button, Rate, Tooltip } from 'antd'
import { LikeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'

const reviews = [
  {
    name: 'Dara',
    date: 'Oct 26, 2024',
    avatar:
      'https://media.istockphoto.com/id/1180778899/photo/young-woman-taking-a-pictures.jpg?s=170667a&w=0&k=20&c=nryzlDE3twbNsokiX6p0xlsOyQmU1TYrYDOdd182wcY=',
    content:
      'ប្រាសាទអង្គរជាសំណង់បុរាណយ៉ាងអស្ចារ្យនិងមានអត្ថន័យសម្បូរបែប។ ប្រាសាទ បឹងអន្លុក និងថ្ងៃលិចមានភាពស្រស់ស្អាត។',
    images: [
      'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1560674457-12073ed6fae6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtfGVufDB8fDB8fHww',
      'https://media.istockphoto.com/id/1180778899/photo/young-woman-taking-a-pictures.jpg?s=170667a&w=0&k=20&c=nryzlDE3twbNsokiX6p0xlsOyQmU1TYrYDOdd182wcY=',
    ],
    helpful: 12,
    rating: 3,
  },
  {
    name: 'Dom',
    date: 'Oct 26, 2024',
    content:
      'ប្រាសាទអង្គរជាសំណង់បុរាណយ៉ាងអស្ចារ្យនិងមានអត្ថន័យសម្បូរបែប។ ប្រាសាទ បឹងអន្លុក និងថ្ងៃលិចមានភាពស្រស់ស្អាត។',
    images: [],
    helpful: 12,
    rating: 3,
  },
  {
    name: 'jimmy',
    date: 'Oct 26, 2024',
    avatar:
      'https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
    content:
      'Angkor is one of the most important archaeological sites in South-East Asia. Stretching over some 400 km2, including forested area,',
    images: [
      'https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
    ],
    helpful: 12,
    rating: 3,
  },
  {
    name: 'pheap',
    date: 'Oct 26, 2024',
    content:
      'Angkor, in Cambodia’s northern province of Siem Reap, is one of the most important archaeological sites of Southeast Asia.',
    images: [],
    helpful: 12,
    rating: 3,
  },
  {
    name: 'Meng',
    date: 'Oct 26, 2024',
    content:
      'The Angkor complex encompasses all major architectural buildings and hydrological engineering systems from the Khmer period and most of these “barays” and canals still exist today.',
    images: [],
    helpful: 12,
    rating: 3,
  },
]

export default function ReviewList() {
  return (
    <div className='max-w-8xl mx-auto p-4 space-y-6 bg-white rounded-2xl'>
      {reviews.map((review, index) => (
        <div
          key={index}
          className='bg-white border rounded-xl p-4 shadow-sm space-y-3'
        >
          {/* Header: Avatar, Name, Date */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <Avatar src={review?.avatar}>{review.name.charAt(0)}</Avatar>
              <div>
                <p className='font-semibold'>{review.name}</p>
                <p className='text-xs text-gray-500'>Posted {review.date}</p>
              </div>
            </div>
            <div className='bg-purple-400 text-white px-3 py-1 rounded-full text-sm font-semibold'>
              {review.rating}/5
            </div>
          </div>

          {/* Content */}
          <p className='text-sm text-gray-800'>{review.content}</p>

          {/* Images */}
          {review.images?.length > 0 && (
            <div className='flex space-x-2'>
              {review.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`review-${i}`}
                  className='w-24 h-20 object-cover rounded-md'
                />
              ))}
            </div>
          )}

          {/* Footer: Helpful + Button */}
          <div className='flex items-center justify-between mt-2'>
            <div className='text-sm text-gray-600 flex items-center space-x-1'>
              <LikeOutlined />
              <span>Helpful</span>
              <span>{review.helpful}</span>
            </div>
            <Tooltip title='Hide this review'>
              <Button
                size='small'
                icon={<EyeInvisibleOutlined />}
                className='bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-200'
              >
                Hide this review
              </Button>
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  )
}
