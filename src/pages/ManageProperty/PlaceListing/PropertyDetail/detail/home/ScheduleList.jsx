import { EditOutlined } from '@ant-design/icons'
import { Button, Card, Col, Divider, Row } from 'antd'
import { useEffect } from 'react'

export default function ScheduleList({ schedule, category }) {
  const scheduleDays = schedule?.days || []

  return (
    <Card className='my-4'>
      <h2 className='text-lg font-bold text-gray-800 flex items-center gap-2'>
        <svg
          width='25'
          height='25'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 640 512'
        >
          <path
            fill='blue'
            d='M32 32c17.7 0 32 14.3 32 32l0 256 224 0 0-160c0-17.7 14.3-32 32-32l224 0c53 0 96 43 96 96l0 224c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-32-224 0-32 0L64 416l0 32c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z'
          />
        </svg>
        <span className='text-blue-600'>{category}</span>
      </h2>

      <Divider className='my-4' />

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <table className='w-full text-gray-600'>
            <tbody>
              {Object.entries(scheduleDays)
                .filter(([_, value]) => value.enabled)
                .map(([day, value], i) => (
                  <tr key={i} className='border-none'>
                    <td className='font-medium pr-2'>{day}</td>
                    <td className='pr-2'>:</td>
                    <td>
                      {value.intervals.map((interval, j) => {
                        const open = new Date(interval.openTime)
                        const close = new Date(interval.closeTime)
                        const isValidOpen = !isNaN(open)
                        const isValidClose = !isNaN(close)

                        return (
                          <div key={j}>
                            {isValidOpen && isValidClose
                              ? `${open.toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })} - ${close.toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}`
                              : `${interval.openTime} - ${interval.closeTime}`}
                          </div>
                        )
                      })}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Col>
      </Row>

      <div className='mt-4 text-right'>
        <Button
          type='default'
          icon={<EditOutlined />}
          onClick={() => console.log('Open schedule modal')}
        />
      </div>
    </Card>
  )
}
