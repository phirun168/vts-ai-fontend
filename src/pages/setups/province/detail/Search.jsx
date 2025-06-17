import { SearchOutlined } from '@ant-design/icons'
import { AutoComplete, Col, Form, Input, Row, Select } from 'antd'

const CategorySearch = (props) => {
  const { setSearch, clickedKey } = props
  const handleChangeSearch = (value) => {
    setSearch(value)
  }
  return (
    <Row className=''>
      <Col xs={24} sm={14} lg={14} xl={12} xxl={12}>
        <AutoComplete
          style={{
            width: '100%',
          }}
          onChange={handleChangeSearch}
          allowClear
        >
          <Input
            id='search_text_value'
            placeholder={`search`}
            prefix={
              <SearchOutlined style={{ fontSize: '16px', color: '#1890ff' }} />
            }
          />
        </AutoComplete>
      </Col>
    </Row>
  )
}
export default CategorySearch
