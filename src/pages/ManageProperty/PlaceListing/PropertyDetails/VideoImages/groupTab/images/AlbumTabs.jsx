// AlbumTabs.jsx
import React, { useState } from 'react'
import { Tabs, Row, Col, Typography, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

const { TabPane } = Tabs
const { Title } = Typography

/**
 * Props:
 * - images: array of { id, url, album }  // album is case-insensitive
 * - onPreview: (item) => void
 * - onDelete:  (item) => void
 */
export default function AlbumTabs({ images = [], onPreview, onDelete }) {
  // Your album definitions (key === lowercase album)
  const albums = [
    { key: 'all', label: 'All' },
    { key: 'exterior', label: 'Exterior' },
    { key: 'room', label: 'Room' },
    { key: 'dining', label: 'Dining' },
    { key: 'other', label: 'Other' },
  ]

  const [activeKey, setActiveKey] = useState('all')

  // Renders one thumbnail tile
  const renderTile = (item) => (
    <div
      key={item.id}
      style={{
        position: 'relative',
        borderRadius: 8,
        overflow: 'hidden',
        background: '#f0f0f0',
      }}
    >
      <div
        style={{ width: '100%', paddingBottom: '56.25%', position: 'relative' }}
      >
        <img
          src={item.url}
          alt={item.id}
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

      <Button
        type='text'
        icon={<DeleteOutlined />}
        onClick={() => onDelete?.(item)}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          background: 'red',
          color: 'white',
          borderRadius: '50%',
          padding: 4,
        }}
      />

      <Button
        type='link'
        onClick={() => onPreview?.(item)}
        style={{
          position: 'absolute',
          bottom: 8,
          left: 8,
          padding: '0 8px',
          background: 'rgba(0,0,0,0.6)',
          color: '#fff',
          borderRadius: 4,
          fontSize: 12,
          lineHeight: '16px',
        }}
      >
        Preview
      </Button>
    </div>
  )

  return (
    <Tabs
      activeKey={activeKey}
      onChange={setActiveKey}
      animated={false}
      size='large'
      tabBarGutter={16}
      className='tab-image-property'
    >
      {albums.map(({ key, label }) => (
        <TabPane tab={label} key={key} className='mt-5'>
          {key === 'all' ? (
            // --- GROUPED VIEW FOR ALL ---
            albums
              .filter((a) => a.key !== 'all')
              .map(({ key: albKey, label: albLabel }) => {
                const group = images.filter(
                  (img) => img.album.toLowerCase() === albKey
                )
                if (!group.length) return null
                return (
                  <div key={albKey} style={{ marginBottom: 32 }}>
                    <Title level={5}>{albLabel}</Title>
                    <Row gutter={[16, 16]}>
                      {group.map((img) => (
                        <Col key={img.id} xs={24} sm={12} md={8} lg={6}>
                          {renderTile(img)}
                        </Col>
                      ))}
                    </Row>
                  </div>
                )
              })
          ) : (
            // --- SINGLE ALBUM VIEW ---
            <>
              <div className='mt-5'>
                {/* <Title level={5} style={{ marginBottom: 16 }}>
                {label}
              </Title> */}
                <Row gutter={[16, 16]}>
                  {images
                    .filter((img) => img.album.toLowerCase() === key)
                    .map((img) => (
                      <Col key={img.id} xs={24} sm={12} md={8} lg={6}>
                        {renderTile(img)}
                      </Col>
                    ))}
                </Row>
              </div>
            </>
          )}
        </TabPane>
      ))}
    </Tabs>
  )
}
