import React, { useState } from 'react'
import { Modal, Button, Select, Row, Col, Card } from 'antd'
import { CloseOutlined, EyeOutlined } from '@ant-design/icons'

const { Option } = Select

export default function MoveToModal(props) {
  const { open, setOpen, modalTitle } = props

  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [selectedPlaces, setSelectedPlaces] = useState([])

  // Template options
  const templateOptions = [
    { label: 'Accommodation', value: 'accommodation' },
    { label: 'Rental', value: 'rental' },
    { label: 'Attraction', value: 'attraction' },
  ]

  // Return place options based on selected template
  const getPlaceOptions = () => {
    if (selectedTemplate === 'accommodation') {
      return [
        { label: 'Hotel', value: 'hotel', image: 'hotel.jpg' },
        { label: 'Hostel', value: 'hostel', image: 'hostel.jpg' },
        { label: 'Hostel2', value: 'hostel2', image: 'hostel.jpg' },
        { label: 'Resort', value: 'resort', image: 'resort.jpg' },
        { label: 'Resort1', value: 'resort1', image: 'resort.jpg' },
      ]
    } else if (selectedTemplate === 'rental') {
      return [
        { label: 'Apartment', value: 'apartment', image: 'apartment.jpg' },
        { label: 'House', value: 'house', image: 'house.jpg' },
        { label: 'Villa', value: 'villa', image: 'villa.jpg' },
      ]
    } else if (selectedTemplate === 'attraction') {
      return [
        { label: 'Museum', value: 'museum', image: 'museum.jpg' },
        { label: 'Park', value: 'park', image: 'park.jpg' },
        { label: 'Gallery', value: 'gallery', image: 'gallery.jpg' },
      ]
    } else {
      return []
    }
  }

  const handleRemove = (placeValue) => {
    setSelectedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.value !== placeValue)
    )
  }

  const handleView = (place) => {
    console.log('Viewing:', place)
  }

  const handleOk = () => {
    console.log('Selected Template:', selectedTemplate)
    console.log('Selected Places:', selectedPlaces)
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <Modal
      title={<>Move To {modalTitle}</>}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Select
            placeholder='Select Template'
            style={{ width: '100%' }}
            onChange={(value) => {
              setSelectedTemplate(value)
              setSelectedPlaces([])
            }}
            value={selectedTemplate}
          >
            {templateOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24}>
          <Select
            mode='multiple'
            placeholder='Select Places'
            style={{ width: '100%' }}
            onChange={(values) => {
              const selected = values.map((value) =>
                getPlaceOptions().find((opt) => opt.value === value)
              )
              setSelectedPlaces(selected)
            }}
            value={selectedPlaces.map((p) => p.value)}
            disabled={!selectedTemplate}
          >
            {getPlaceOptions().map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24}>
          <span className='my-8'>
            <strong> Places:</strong>
          </span>
          <div
            style={{
              maxHeight: '300px',
              overflowY: 'auto',
              paddingRight: '8px',
            }}
          >
            {selectedPlaces.map((place) => (
              <Card key={place.value} className='mb-1 '>
                <div className='flex items-center justify-between w-full '>
                  <div className='flex items-center'>
                    <img
                      src={place.image}
                      alt={place.label}
                      className='w-8 h-8 object-cover rounded-lg mr-4'
                    />
                    <div className='flex-1 font-medium'>{place.label}</div>
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      type='link'
                      icon={<EyeOutlined />}
                      onClick={() => handleView(place)}
                    >
                      View
                    </Button>
                    <Button
                      type='link'
                      danger
                      icon={<CloseOutlined />}
                      onClick={() => handleRemove(place.value)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Modal>
  )
}
