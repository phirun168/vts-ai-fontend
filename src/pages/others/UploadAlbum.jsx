import React, { useEffect, useState } from 'react'
import { Upload, Button, Input, Radio, Row, Col, message } from 'antd'
import { PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  position: absolute;
  top: 5px;
  right: 5px;
  transition:
    background 0.3s ease,
    border-bottom-left-radius 0.3s ease;
  &:hover {
    background: white !important;
    border-bottom-right-radius: 30px;
    transition: 0.4s;
  }
`

export default function MultiipleImage(props) {
  const { keyCat, setKeyCat, onImagesChange } = props // NEW (callback)

  /* ─────────── initial state ─────────── */
  const [categories, setCategories] = useState(['Exterior', 'Room', 'Dining'])
  const [activekeyCat, setActivekeyCat] = useState('Exterior')

  const subkeyCatMapping = {
    Attraction: ['Exterior', 'Detail', 'Events'],
    Activities: ['Action', 'Scenery', 'People'],
    Accommodation: ['Exterior', 'Room', 'Dining'],
    Eatery: ['Interior', 'Food', 'Service'],
    Market: ['Stalls', 'Products', 'Crowd'],
    Rental: ['Items', 'Vehicles', 'Accessories'],
    'Coffee & Bakery': ['Coffee', 'Bakery', 'Ambience'],
    'Eat & Relax': ['Dishes', 'Ambience', 'Service'],
  }

  const [imagesBykeyCat, setImagesBykeyCat] = useState({
    Exterior: [],
    Room: [],
    Dining: [],
  })
  const [newkeyCat, setNewkeyCat] = useState('')

  /* ─────────── helpers ─────────── */
  const getFileObject = (file) => file.originFileObj || file

  /* ─────────── update sub-categories on main cat change ─────────── */
  useEffect(() => {
    if (keyCat && subkeyCatMapping[keyCat]) {
      setCategories(subkeyCatMapping[keyCat])
      setActivekeyCat(subkeyCatMapping[keyCat][0])
    }
  }, [keyCat])

  /* ─────────── internal change handlers ─────────── */
  const syncAndNotify = (next) => {
    setImagesBykeyCat(next)
    const asArray = Object.entries(next).map(([category, files]) => ({
      category,
      files,
    }))
    onImagesChange?.(asArray) // NEW
  }

  const handleImageChange =
    (cat) =>
    ({ fileList }) => {
      syncAndNotify({
        ...imagesBykeyCat,
        [cat]: fileList.filter((f) => f.type?.startsWith('image')), // keep images only
      })
    }

  const handleImageRemove = (cat, file) => {
    syncAndNotify({
      ...imagesBykeyCat,
      [cat]: imagesBykeyCat[cat].filter((f) => f.uid !== file.uid),
    })
  }

  /* ─────────── preview ─────────── */
  const handleImagePreview = (file) => {
    const fileObj = getFileObject(file)
    if (!fileObj.type.startsWith('image')) return
    Swal.fire({
      imageUrl: URL.createObjectURL(fileObj),
      imageWidth: '50%',
      imageHeight: 'auto',
      showConfirmButton: false,
      width: '50%',
    })
  }

  /* ─────────── add sub-category ─────────── */
  const handleAddkeyCat = () => {
    const name = newkeyCat.trim()
    if (!name) return
    if (!categories.includes(name)) {
      setCategories((prev) => [...prev, name])
      syncAndNotify({ ...imagesBykeyCat, [name]: [] })
      setActivekeyCat(name)
    }
    setNewkeyCat('')
  }

  /* ─────────── render ─────────── */
  return (
    <div>
      <h2 className='text-lg font-semibold'>Upload Images</h2>
      <p className='text-sm mb-2'>Please select image category</p>

      {/* add category */}
      <div className='mb-4 flex items-center gap-2'>
        <Input
          style={{ width: '50%' }}
          placeholder='New category'
          value={newkeyCat}
          onChange={(e) => setNewkeyCat(e.target.value)}
          size='small'
        />
        <Button
          className='border-none text-blue-400'
          size='small'
          icon={<PlusOutlined />}
          onClick={handleAddkeyCat}
        >
          Add new
        </Button>
      </div>

      {/* category selector */}
      <Radio.Group
        value={activekeyCat}
        onChange={(e) => setActivekeyCat(e.target.value)}
        style={{ marginBottom: 8 }}
      >
        {categories.map((cat) => (
          <Radio key={cat} value={cat} style={{ marginRight: 16 }}>
            {cat}
          </Radio>
        ))}
      </Radio.Group>

      {/* drag-drop */}
      <Upload.Dragger
        accept='image/*' /* NEW – images only */
        multiple
        fileList={imagesBykeyCat[activekeyCat]}
        beforeUpload={(file) => {
          if (!file.type.startsWith('image')) {
            message.error('Only image files are allowed')
            return Upload.LIST_IGNORE // NEW
          }
          return false // prevent auto upload
        }}
        onChange={handleImageChange(activekeyCat)}
        onPreview={handleImagePreview}
        onRemove={(file) => handleImageRemove(activekeyCat, file)}
      >
        <p className='ant-upload-drag-icon'>
          <UploadOutlined />
        </p>
        <p className='ant-upload-hint'>Drag or click to select images.</p>
      </Upload.Dragger>

      {/* thumbnails */}
      <Row gutter={[16, 16]} className='mt-4'>
        {(imagesBykeyCat[activekeyCat] || [])
          .filter((f) => f.type?.startsWith('image'))
          .map((file) => {
            const url = URL.createObjectURL(getFileObject(file))
            return (
              <Col key={file.uid} xs={12} sm={8} md={6} lg={4}>
                <div
                  style={{ position: 'relative', width: '100%', height: 100 }}
                >
                  <img
                    src={url}
                    alt='preview'
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 8,
                      cursor: 'pointer',
                    }}
                    onClick={() => handleImagePreview(file)}
                  />
                  <StyledButton
                    type='text'
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleImageRemove(activekeyCat, file)}
                  />
                </div>
              </Col>
            )
          })}
      </Row>
    </div>
  )
}
