import React, { useState, useEffect } from 'react'
import {
  Modal,
  TimePicker,
  Row,
  Col,
  Form,
  Checkbox,
  Radio,
  Button,
  Card,
} from 'antd'
import dayjs from 'dayjs'

const UpdateScheduleModal = ({ isOpen, onClose, initialValues }) => {
  const [scheduleType, setScheduleType] = useState(1)
  const accommodation = 'Accommodation'
  const [form] = Form.useForm()
  const [checkDay, setCheckDay] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  })

  // Days of the week
  const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  useEffect(() => {
    if (accommodation === 'accommodation') {
      setScheduleType(3)
    }
  }, [accommodation])
  // Update schedule type & time when modal opens
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        scheduleType: initialValues.scheduleType || 1, // Default to 1 if not set
      })
      //   console.log(initialValues, 'initialValues.scheduleType')
      setScheduleType(initialValues?.scheduleType || 1)
    }
  }, [initialValues, form, isOpen])

  // Handle Save & Close
  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave(values)
      onClose()
    })
  }

  return (
    <Modal
      title='Update Schedule'
      open={isOpen}
      onCancel={onClose}
      width={600}
      footer={[
        <Button key='save' type='primary' onClick={handleSave}>
          update
        </Button>,
      ]}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          style={{ marginBottom: '0px' }}
          // label='Schedule Type'
          name='scheduleType'
        >
          <Radio.Group
            onChange={(e) => setScheduleType(e.target.value)}
            value={scheduleType}
          >
            {scheduleType === 1 ? (
              <Radio value={1}>24/7 Hours</Radio>
            ) : scheduleType === 2 ? (
              <Radio value={2}>Costume Hours</Radio>
            ) : scheduleType === 3 ? (
              <Radio value={3}>Check-in / Check-out</Radio>
            ) : (
              ''
            )}
          </Radio.Group>
        </Form.Item>
        <Card>
          {/* Schedule Type Selection */}

          {/* Check-in / Check-out Time */}
          {scheduleType === 3 && (
            <Form.Item
              style={{ marginBottom: '0px' }}
              name='checkin_checkout'
              initialValue={[
                dayjs(initialValues?.checkin_checkout?.[0] || '08:00', 'HH:mm'),
                dayjs(initialValues?.checkin_checkout?.[1] || '17:00', 'HH:mm'),
              ]}
            >
              <TimePicker.RangePicker
                format='HH:mm'
                className='w-full'
                placeholder={['Check-in Time', 'Check-out Time']} // Custom placeholders
              />
            </Form.Item>
          )}

          {/* Custom Schedule - Select Days & Time */}
          {scheduleType === 2 && (
            <>
              {weekDays.map((day, index) => (
                <Row
                  key={index}
                  gutter={[8, 2]}
                  align='middle'
                  className='mb-2'
                >
                  <Col xs={8} lg={4}>
                    <label>{day}</label>
                  </Col>
                  <Col xs={2}>:</Col>
                  <Col xs={2}>
                    <Checkbox
                      checked={checkDay[day.toLowerCase()]}
                      onChange={(e) => {
                        setCheckDay((prev) => ({
                          ...prev,
                          [day.toLowerCase()]: e.target.checked,
                        }))
                        if (!e.target.checked) {
                          form.setFieldsValue({
                            [`${day.toLowerCase()}_timeRange`]: undefined,
                          })
                        }
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={16} lg={16}>
                    <Form.Item
                      style={{ marginBottom: '0px' }}
                      name={`${day.toLowerCase()}_timeRange`}
                      initialValue={
                        initialValues?.[`${day.toLowerCase()}_timeRange`]
                          ? [
                              dayjs(
                                initialValues[
                                  `${day.toLowerCase()}_timeRange`
                                ][0],
                                'HH:mm'
                              ),
                              dayjs(
                                initialValues[
                                  `${day.toLowerCase()}_timeRange`
                                ][1],
                                'HH:mm'
                              ),
                            ]
                          : undefined
                      }
                    >
                      <TimePicker.RangePicker
                        format='HH:mm'
                        className='w-full'
                        disabled={!checkDay[day.toLowerCase()]}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ))}
            </>
          )}
        </Card>
      </Form>
    </Modal>
  )
}

export default UpdateScheduleModal
