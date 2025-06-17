import {
  CaretRightOutlined,
  CheckCircleOutlined,
  CheckOutlined,
} from '@ant-design/icons'
import {
  Card,
  Col,
  Collapse,
  Divider,
  Form,
  Row,
  Select,
  Table,
  theme,
} from 'antd'
import { useRef, useState } from 'react'

const ModuleUser = (props) => {
  const { test } = props

  const [search, setSearch] = useState('')
  const onChangeRef = useRef(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const [loading, setLoading] = useState(false)
  const [roles, setRole] = useState([
    {
      key: 1, // Ensure this key is present
      no: 1,
      staff_code: 'VTS-0444',
      title_name: 'Admin',
      user_name: 'Kalan Somnak',
      company_name: 'VTS',
    },
    {
      key: 2, // Ensure this key is present
      no: 2,
      staff_code: 'VTS-0444',
      title_name: 'iT',
      user_name: 'Kalan Somnak',
      company_name: 'VTS',
    },
  ])

  const getRowSelection = () => ({
    type: 'radio',
    selectedRowKeys,
    onChange: (_, selectedRows) => {
      const newSelectedRowKeys = selectedRows.map((row) => row.key) // Use key here
      setSelectedRowKeys(newSelectedRowKeys)
      setPropData(selectedRows[0])
      onChangeRef.current = getRowSelection().onChange
    },
  })

  const handleSearch = () => {
    if (!search) {
      return roles // Return all roles if no search term
    }

    const search_text = search.toLowerCase().replace(/\s+/g, '')

    const filteredData = roles.filter((item) => {
      const companyName = item?.company_name
        ? item?.company_name.toLowerCase().replace(/\s+/g, '')
        : ''

      return companyName.includes(search_text)
    })

    return filteredData
  }

  const renderNo = (_, __, index) => {
    const calculatedIndex = (currentPage - 1) * pageSize + index + 1
    return calculatedIndex
  }

  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    onChange: (page) => setCurrentPage(page),
    total: handleSearch().length, // Update total to match filtered data length
    showSizeChanger: false,
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'No',
      width: 50,
      align: 'center',
      render: renderNo,
    },
    {
      title: 'Staff Code',
      dataIndex: 'staff_code',
      key: 'staff_code',
    },
    {
      title: 'User Name',
      dataIndex: 'user_name',
      key: 'user_name',
    },
    {
      title: 'Name ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Department ',
      dataIndex: 'department_name',
      key: 'department_name',
    },
    {
      title: 'Position ',
      dataIndex: 'position_name',
      key: 'position_name',
    },
  ]

  return (
    <>
      <Collapse
        className='my-5'
        accordion
        bordered={true}
        // defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        size='small'
      >
        <Collapse.Panel
          header={
            <>
              {' '}
              <h2 className='text-md'>
                <strong>Permission</strong>
              </h2>{' '}
            </>
          }
          key='1'
        >
          <div className=''>
            <Divider orientation='left'>
              TeleSales & Marketing - OFFICER
            </Divider>
            <Row gutter={(8, 2)}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <span className='mx-1'>
                  {' '}
                  <CheckCircleOutlined />
                </span>
                <span className='mx-1'>Search Phone</span>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                <span className='mx-1'>
                  {' '}
                  <CheckCircleOutlined />
                </span>
                <span className='mx-1'>Search Tracking</span>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                <span className='mx-1'>
                  {' '}
                  <CheckCircleOutlined />
                </span>
                <span className='mx-1'>Search Customer</span>
              </Col>

              <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                <span className='mx-1'>
                  {' '}
                  <CheckCircleOutlined />
                </span>
                <span className='mx-1'>Search Container</span>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                <span className='mx-1'>
                  {' '}
                  <CheckCircleOutlined />
                </span>
                <span className='mx-1'>Correct Phone Number</span>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                <span className='mx-1'>
                  {' '}
                  <CheckCircleOutlined />
                </span>
                <span className='mx-1'>Show Customer Phone</span>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                <span className='mx-1'>
                  {' '}
                  <CheckCircleOutlined />
                </span>
                <span className='mx-1'>Show Customer Info</span>
              </Col>
            </Row>
            <Divider orientation='left'>
              TeleSales & Marketing - OFFICER
            </Divider>
            <Row gutter={(8, 2)}>
              <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                <span className='mx-1'>
                  {' '}
                  <CheckCircleOutlined />
                </span>
                <span className='mx-1'>Search Phone</span>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                <span className='mx-1'>
                  {' '}
                  <CheckCircleOutlined />
                </span>
                <span className='mx-1'>Search Tracking</span>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                <span className='mx-1'>
                  {' '}
                  <CheckCircleOutlined />
                </span>
                <span className='mx-1'>Search Customer</span>
              </Col>

              <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                <span className='mx-1'>
                  {' '}
                  <CheckCircleOutlined />
                </span>
                <span className='mx-1'>Search Container</span>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                <span className='mx-1'>
                  {' '}
                  <CheckCircleOutlined />
                </span>
                <span className='mx-1'>Correct Phone Number</span>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                <span className='mx-1'>
                  {' '}
                  <CheckCircleOutlined />
                </span>
                <span className='mx-1'>Show Customer Phone</span>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                <span className='mx-1'>
                  {' '}
                  <CheckCircleOutlined />
                </span>
                <span className='mx-1'>Show Customer Info</span>
              </Col>
            </Row>
          </div>
        </Collapse.Panel>
      </Collapse>
      <Table
        rowKey='key' // Ensure rowKey is correctly set
        // rowSelection={getRowSelection()}
        columns={columns}
        dataSource={handleSearch()} // Use the filtered data
        pagination={paginationConfig} // Correct pagination
        size='small'
        loading={loading}
        scroll={{ x: 'max-content' }}
      />
    </>
  )
}

export default ModuleUser
