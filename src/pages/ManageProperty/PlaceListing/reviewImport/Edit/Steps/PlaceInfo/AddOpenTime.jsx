import React, { useState } from 'react'
import { Modal, Button, DatePicker, TimePicker, Card } from 'antd'

const { RangePicker: DateRangePicker } = DatePicker
const { RangePicker: TimeRangePicker } = TimePicker

export default function AddOpenTimeModal({ open, setOpen, onSave }) {
  const [selectedDays, setSelectedDays] = useState([])
  const [timeRange, setTimeRange] = useState([])

  const handleDayClick = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const handleOk = () => {
    if (selectedDays.length === 0 || timeRange.length !== 2) return

    onSave?.({
      days: selectedDays,
      openTime: timeRange[0],
      closeTime: timeRange[1],
    })

    setSelectedDays([])
    setTimeRange([])
    setOpen(false)
  }

  return (
    <Modal
      title='Add Open Time'
      open={open}
      onOk={handleOk}
      onCancel={() => setOpen(false)}
      okText='Save'
      cancelText='Cancel'
    >
      {/* ... rest of your component stays the same */}

      {/* Select Days */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
            const isSelected = selectedDays.includes(day)
            return (
              <Button
                key={day}
                type={isSelected ? 'primary' : 'default'}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </Button>
            )
          })}
        </div>
      </div>

      <Card>
        <TimeRangePicker
          style={{ width: '100%' }}
          format='HH:mm'
          value={timeRange}
          onChange={(vals) => setTimeRange(vals || [])}
          placeholder={['Open Time', 'Close Time']}
        />
      </Card>
    </Modal>
  )
}
