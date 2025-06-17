// All.jsx
import React from 'react'
import { Row, Col, Typography, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const { Title } = Typography

/**
 * Props:
 * - videos: array of { id, thumbnailUrl }
 * - images: array of { id, url }
 * - onPreview: (item) => void  // optional custom handler
 * - onDelete: (item) => void
 */
export default function All({ videos = [], onPreview, onDelete }) {
  const handlePreview = (item, isVideo) => {
    const src = isVideo ? item.thumbnailUrl : item.url
    Swal.fire({
      imageUrl: src,
      imageAlt: isVideo ? 'Video preview' : 'Image preview',
      showCloseButton: true,
      showConfirmButton: false,

      // direct API for internal padding
      padding: '24px', // space between edge and content

      // you already had width: '50%', you can bump it if you like:
      width: '60%',

      // optional: background behind the popup
      background: '#fff',

      // hook for any additional custom styling
      customClass: {
        popup: 'my-swal-popup',
      },
    })
  }

  const renderTile = (item, isVideo = false) => {
    const src = isVideo ? item.thumbnailUrl : item.url

    return (
      <div
        key={item.id}
        style={{
          position: 'relative',
          borderRadius: 5,
          overflow: 'hidden',
          background: '#f0f0f0',
        }}
      >
        {/* Ratio wrapper */}
        <div
          style={{
            width: '100%',
            paddingBottom: '56.25%',
            position: 'relative',
          }}
        >
          <img
            src={src}
            alt={isVideo ? 'video-thumb' : 'image-thumb'}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Delete button */}
        <Button
          type='text'
          icon={<DeleteOutlined />}
          onClick={() => onDelete && onDelete(item)}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            background: 'rgba(238, 0, 0, 0.8)',
            borderRadius: '50%',
            color: 'white',
            padding: 4,
          }}
        />

        {/* Preview link */}
        <Button
          type='link'
          onClick={() => handlePreview(item, isVideo)}
          style={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            padding: '0 25px',
            background: 'rgba(0,0,0,0.6)',
            color: '#fff',
            borderRadius: 8,
            fontSize: 12,
            lineHeight: '16px',
          }}
        >
          Preview
        </Button>
      </div>
    )
  }

  return (
    <div className='my-5'>
      {/* Video Section */}
      <Row gutter={[16, 16]}>
        {videos.map((video) => (
          <Col key={video.id} xs={24} sm={12} md={8} lg={6}>
            {renderTile(video, true)}
          </Col>
        ))}
      </Row>
    </div>
  )
}
