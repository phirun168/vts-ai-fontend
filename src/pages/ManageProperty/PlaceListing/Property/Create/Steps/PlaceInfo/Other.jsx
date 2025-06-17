import React, { useEffect, useState } from 'react'
import { Form, Button, Select, Radio } from 'antd'

const { Option } = Select
export default function Other(props) {
  // State for main keyCat
  const { keyCat, typeOfFood, typeOfPlace, form } = props
  const [starRating, setStarRating] = useState(null)

  const handleStarChange = (e) => {
    setStarRating(e.target.value)
    console.log('Star rating:', e.target.value)
  }
  useEffect(() => {
    if (
      keyCat?.trim().toLowerCase() === 'attraction' ||
      keyCat?.trim().toLowerCase() === 'activities'
    ) {
      form.resetFields(['typeOfFood']) // reset typeOfFood field only
    }
    if (keyCat?.trim().toLowerCase() === 'eatery') {
      form.resetFields(['typeOfPlace']) // reset typeOfPlace field only
    }
  }, [keyCat, form])

  return (
    <>
      {keyCat === 'Accommodation' && (
        <Form.Item label='Star' name={'star'}>
          <Radio.Group onChange={handleStarChange} value={starRating}>
            <Radio value={1}>1</Radio>
            <Radio value={2}>2</Radio>
            <Radio value={3}>3</Radio>
            <Radio value={4}>4</Radio>
            <Radio value={5}>5</Radio>
            <Radio value={null}>No star</Radio>
          </Radio.Group>
        </Form.Item>
      )}
      {(keyCat?.trim().toLowerCase() === 'attraction' ||
        keyCat?.trim().toLowerCase() === 'activities') && (
        <Form.Item
          label={`Type Of Pace `}
          name='typeOfPlace'
          rules={[{ required: true, message: 'Field required' }]}
        >
          <Select
            mode='multiple'
            placeholder='Select Type of food'
            style={{ width: '100%' }}
            allowClear
            optionFilterProp='children'
            showSearch
          >
            {typeOfPlace?.map((item) => (
              <Option key={item._id} value={item._id}>
                {`${item.nameKh} – ${item.nameEn}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}
      {keyCat?.trim().toLowerCase() === 'eatery' && (
        <Form.Item label='Type of food' name='typeOfFood'>
          <Select
            mode='multiple'
            placeholder='Select Type of food'
            style={{ width: '100%' }}
            allowClear
            optionFilterProp='children'
            showSearch
          >
            {typeOfFood?.map((item) => (
              <Option key={item._id} value={item._id}>
                {`${item.nameKh} – ${item.nameEn}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}
      {/* //{' '}
      </Form> */}
    </>
  )
}
