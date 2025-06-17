import React from 'react'
import { Form, Select, Row, Col, Button, Card, Modal } from 'antd'

const { Option } = Select

export default function Filter(props) {
  const { filterVisible, setFilterVisible } = props

  // 1. Create a form instance
  const [form] = Form.useForm()

  const mainCategoryOptions = ['ទាក់ទាញ់', 'សកម្មភាពកំសាន្ដ', 'កន្លែងញាំអី']
  const subCategoryOptions = [
    'សណ្ឋាគារ-hotel',
    'រីសត-Resort',
    'ផ្ទះសំណាក់-Hostels',
  ]
  const placeTypeOptions = [
    'រូបសំណាក់-Temple',
    'វិមាន-Palace',
    'ទឹកធ្លាក់-Waterfall',
  ]
  const provinceOptions = ['Phnom Penh', 'Siem Reap', 'Kampong Cham']
  const districtOptions = ['District 1', 'District 2', 'District 3']
  const communeOptions = ['Commune A', 'Commune B', 'Commune C']
  const villageOptions = ['Village 1', 'Village 2', 'Village 3']
  const createdByOptions = ['Admin', 'Manager', 'Supervisor']
  const belongToOptions = ['User 1', 'User 2', 'User 3']
  const ownershipOptions = ['Private', 'Government']

  const handleClear = () => {
    console.log('Clear filter clicked')
    // 2. Reset all fields
    form.resetFields()
  }

  const handleFilter = () => {
    console.log('Filter button clicked')
    setFilterVisible(false)
  }

  return (
    <Modal
      title='Filter'
      open={filterVisible}
      onCancel={() => setFilterVisible(false)}
      footer={null}
      width={900}
    >
      <Card>
        {/* 3. Pass the form instance to Form */}
        <Form layout='vertical' className='space-y-2' form={form}>
          {/* Category Section */}
          <Row gutter={[16, 16]} className='bg-gray-100 rounded p-1'>
            <Col className='font-bold text-blue-600 relative top-2' xs={24}>
              Category
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                style={{ marginBottom: 0 }}
                label='Select Main Category'
                name='mainCategory'
              >
                <Select mode='multiple' placeholder='Select Main Category'>
                  {mainCategoryOptions.map((cat) => (
                    <Option key={cat} value={cat}>
                      {cat}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                style={{ marginBottom: 0 }}
                label='Select Sub Category'
                name='subCategory'
              >
                <Select mode='multiple' placeholder='Select Sub Category'>
                  {subCategoryOptions.map((sub) => (
                    <Option key={sub} value={sub}>
                      {sub}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label='Type of place' name='placeType'>
                <Select mode='multiple' placeholder='Select Type of place'>
                  {placeTypeOptions.map((type) => (
                    <Option key={type} value={type}>
                      {type}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Address Section */}
          <Row gutter={[16, 16]} className='bg-gray-100 rounded p-1'>
            <Col className='font-bold text-blue-600 relative top-2' xs={24}>
              Address
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                style={{ marginBottom: 0 }}
                label='Select Province'
                name='province'
              >
                <Select placeholder='Select Province'>
                  {provinceOptions.map((prov) => (
                    <Option key={prov} value={prov}>
                      {prov}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                style={{ marginBottom: 0 }}
                label='Select District'
                name='district'
              >
                <Select placeholder='Select District'>
                  {districtOptions.map((dist) => (
                    <Option key={dist} value={dist}>
                      {dist}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                style={{ marginBottom: 0 }}
                label='Select Commune'
                name='commune'
              >
                <Select placeholder='Select Commune'>
                  {communeOptions.map((com) => (
                    <Option key={com} value={com}>
                      {com}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label='Select Village' name='village'>
                <Select placeholder='Select Village'>
                  {villageOptions.map((vill) => (
                    <Option key={vill} value={vill}>
                      {vill}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Other Section */}
          <Row gutter={[16, 16]} className='bg-gray-100 rounded p-1'>
            <Col className='font-bold text-blue-600 relative top-2' xs={24}>
              Other
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                style={{ marginBottom: 0 }}
                label='Created By'
                name='createdBy'
              >
                <Select placeholder='Select Created By'>
                  {createdByOptions.map((creator) => (
                    <Option key={creator} value={creator}>
                      {creator}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                style={{ marginBottom: 0 }}
                label='Belong To'
                name='belongTo'
              >
                <Select placeholder='Select Belong To'>
                  {belongToOptions.map((belong) => (
                    <Option key={belong} value={belong}>
                      {belong}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label='Ownership' name='ownership'>
                <Select placeholder='Select Ownership'>
                  {ownershipOptions.map((own) => (
                    <Option key={own} value={own}>
                      {own}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Buttons */}
          <Row justify='end' gutter={[8, 8]}>
            <Col>
              <Button onClick={handleClear}>Clear Filter</Button>
            </Col>
            <Col>
              <Button type='primary' onClick={handleFilter}>
                Filter
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}
