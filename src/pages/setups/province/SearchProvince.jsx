import { SearchOutlined } from '@ant-design/icons'
import { AutoComplete, Col, Form, Input, Row, Select } from 'antd'
import { useState } from 'react'

const SearchProvince = (props) => {
  const { getProvinceList } = props
  const { clickedKey } = props
  const handleChangeSearch = (value) => {
    getProvinceList(value)
  }
  return (
    <Row className='card'>
      <Col xs={24} sm={14} lg={14} xl={12} className='m'>
        <AutoComplete
          style={{
            width: '100%',
          }}
          onChange={handleChangeSearch}
          allowClear
        >
          <Input
            id='search_text_value'
            placeholder={`search ${clickedKey === '1' ? 'user' : clickedKey === '2' ? 'role' : clickedKey === '3' ? 'module' : ''}`}
            style={{ paddingTop: '5px', paddingBottom: '5px' }}
            prefix={
              <SearchOutlined style={{ fontSize: '16px', color: '#1890ff' }} />
            }
          />
        </AutoComplete>
      </Col>
    </Row>
  )
}
export default SearchProvince
