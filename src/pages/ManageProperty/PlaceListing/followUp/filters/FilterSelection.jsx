import React, { useState, useEffect } from 'react'
import { Card, Row, Select, DatePicker, Col } from 'antd'

const { Option } = Select
const { RangePicker } = DatePicker
import Search from './Search'
export default function FilterSelection({ onFilterChange }) {
  // Set initial state for each filter
  const [mainCategory, setMainCategory] = useState('All Main Category')
  const [province, setProvince] = useState('All Province')
  const [createdBy, setCreatedBy] = useState('All CreatedBy')
  const [ownership, setOwnership] = useState('All Ownership')
  const [property, setProperty] = useState('All Property')

  // Trigger the onFilterChange callback any time a filter value changes
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({ mainCategory, province, createdBy, ownership })
    }
  }, [mainCategory, province, createdBy, ownership, onFilterChange])

  return (
    <div>
      <div className='my-2'>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={12}>
            <RangePicker
              style={{ width: '100%' }}
              onChange={(dates) => {
                handleDateRangeChange(dates)
              }}
              format='YYYY-MM-DD'
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Search />
          </Col>
          <Col xs={24} sm={24} md={12} xl={6} xxl={5}>
            <Select
              value={mainCategory}
              onChange={setMainCategory}
              style={{ width: '100%' }}
            >
              <Option value='All Main Category'>All Main Category</Option>
              <Option value='Category A'>Category A</Option>
              <Option value='Category B'>Category B</Option>
              <Option value='Category C'>Category C</Option>
            </Select>
          </Col>

          <Col xs={24} sm={24} md={12} xl={6} xxl={5}>
            <Select
              value={province}
              onChange={setProvince}
              style={{ width: '100%' }}
            >
              <Option value='All Province'>All Province</Option>
              <Option value='Province 1'>Province 1</Option>
              <Option value='Province 2'>Province 2</Option>
              <Option value='Province 3'>Province 3</Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6} xxl={4}>
            <Select
              value={createdBy}
              onChange={setCreatedBy}
              style={{ width: '100%' }}
            >
              <Option value='All CreatedBy'>All Created By</Option>
              <Option value='User A'>User A</Option>
              <Option value='User B'>User B</Option>
              <Option value='User C'>User C</Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6} xxl={5}>
            <Select
              value={ownership}
              onChange={setOwnership}
              style={{ width: '100%' }}
            >
              <Option value='All Ownership'>All Ownership</Option>
              <Option value='Owned'>Owned</Option>
              <Option value='Shared'>Shared</Option>
              <Option value='Public'>Public</Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6} xxl={5}>
            <Select
              value={property}
              onChange={setProperty}
              style={{ width: '100%' }}
            >
              <Option value='All Property'>All Property</Option>
              <Option value='businessProperty'>Business Property</Option>
              <Option value='nonBusinessProperty'>Non Business Property</Option>
            </Select>
          </Col>
        </Row>
      </div>
    </div>
  )
}
