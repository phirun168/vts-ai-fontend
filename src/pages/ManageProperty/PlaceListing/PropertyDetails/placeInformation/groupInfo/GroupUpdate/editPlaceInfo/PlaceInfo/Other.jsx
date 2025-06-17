import React, { useEffect, useState } from 'react'
import { Form, Button, Select, Radio } from 'antd'
import { keyBy } from 'lodash'

const { Option } = Select
// Inline data for types of food
const typesOfFood = [
  { value: 'Khmer', label: 'អាហារខ្មែរ – Khmer Food' },
  { value: 'Western', label: 'អាហារខាងលិច – Western Food' },
  { value: 'Asian', label: 'អាហារខាងកើត – Asian Food' },
  { value: 'Seafood', label: 'អាហារក្រឡុកសមុទ្រ – Seafood' },
]
export default function Other(props) {
  // State for main keyCat
  const { keyCat, typeOfFood, typeOfPlace, dynamicLabelTypeOfPlace, form } =
    props

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
      {/* <Form layout='vertical' onFinish={handleSubmit}> */}
      {/* Render fields based on the main keyCat */}
      {keyCat?.trim().toLowerCase() === 'accommodation' && (
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
      {keyCat?.trim().toLowerCase() === 'attraction' ||
      keyCat?.trim().toLowerCase() === 'activities' ? (
        <Form.Item
          label={`Type Of Pace (${dynamicLabelTypeOfPlace})`}
          name='typeOfPlace'
        >
          <Select
            mode='multiple'
            placeholder='Select Type of place'
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
      ) : (
        keyCat?.trim().toLowerCase() !== 'accommodation' && (
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
        )
      )}

      {/* //{' '}
      </Form> */}
    </>
  )
}
