import React, { useState, useEffect, useContext } from 'react'
import { Card, Row, Select, DatePicker, Col } from 'antd'

const { Option } = Select
const { RangePicker } = DatePicker
import Search from './Search'
import CategoryServices from '../../../../../services/setup/Category'
import { AuthContext } from '../../../../../contexts/AuthContext'
import ProvinceServices from '../../../../../services/setup/Province'
import AdminUserServices from '../../../../../services/admin/User'

export default function FilterSelection({
  onHandleFilterCategory,
  onHandleFilterProvince,
  onHandleFilterUser,
  onHandleFilterOwnership,
  onHandleSearch,
  onHandleAllFilter,
  onHandleFilterDateRange,
}) {
  const { user, access_token } = useContext(AuthContext)

  // Set initial state for each filter
  const [mainCategory, setMainCategory] = useState('All Main Category')
  const [province, setProvince] = useState('All Province')
  const [createdBy, setCreatedBy] = useState('All CreatedBy')
  const [ownership, setOwnership] = useState('All Ownership')
  //data && function
  // -------variable-----
  const [categories, setCategories] = useState([])
  const [provinces, setProvinces] = useState([])
  const [users, setUsers] = useState([])
  //--------function-----
  const getCategory = async () => {
    try {
      const doc = { search: '' }
      const data = await CategoryServices.fetchCategory({ doc, access_token })
      if (data) {
        setCategories(data)
      }
    } catch {}
  }
  const getProvince = async () => {
    try {
      const doc = { search: '' }
      const data = await ProvinceServices.fetchProvince({ doc, access_token })
      if (data) {
        setProvinces(data)
      }
    } catch {}
  }
  const getUser = async () => {
    try {
      const data = await AdminUserServices.fetchUser({ access_token })
      if (data) {
        setUsers(data)
      }
    } catch {}
  }
  useEffect(() => {
    getCategory()
    getProvince()
    getUser()
  }, [])
  //
  //filter
  const handleFilterByCategory = (value) => {
    setMainCategory(value)
    if (typeof onHandleFilterCategory === 'function') {
      onHandleFilterCategory?.({
        filterCategory: value,
      })
    }
  }
  const handleFilterProvince = (value) => {
    setProvince(value)
    if (typeof onHandleFilterProvince === 'function') {
      onHandleFilterProvince?.({
        filterProvince: value,
      })
    }
  }
  const handleFilterUser = (value) => {
    setCreatedBy(value)
    if (typeof onHandleFilterUser === 'function') {
      onHandleFilterUser?.({
        filterUser: value,
      })
    }
  }
  const handleFilterOwnership = (value) => {
    setOwnership(value)
    if (typeof onHandleFilterOwnership === 'function') {
      onHandleFilterOwnership?.({
        filterOwnership: value,
      })
    }
  }
  const handleFilterDateRange = (value) => {
    if (typeof onHandleFilterDateRange === 'function') {
      onHandleFilterDateRange?.({
        filterDateRange: value,
      })
    }
  }
  //filter
  return (
    <div>
      <div className='my-2'>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={12}>
            <RangePicker
              style={{ width: '100%' }}
              onChange={(dates) => {
                handleFilterDateRange(dates)
              }}
              format='YYYY-MM-DD'
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Search
              onHandleSearch={onHandleSearch}
              onHandleAllFilter={onHandleAllFilter}
            />
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Select
              value={mainCategory}
              onChange={handleFilterByCategory}
              style={{ width: '100%' }}
              allowClear
              showSearch
              placeholder='filter category'
            >
              {categories?.map((category) => (
                <Option key={category._id} value={category.nameEn}>
                  {category.nameKh}-{category.nameEn}
                </Option>
              ))}
            </Select>
          </Col>

          <Col xs={24} sm={24} md={12} xl={6}>
            <Select
              value={province}
              onChange={handleFilterProvince}
              style={{ width: '100%' }}
              allowClear
              showSearch
              placeholder='filter category'
            >
              {provinces?.map((pro) => (
                <Option key={pro._id} value={pro.provinceEn}>
                  {pro.provinceKh}-{pro.provinceEn}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Select
              value={createdBy}
              onChange={handleFilterUser}
              style={{ width: '100%' }}
              allowClear
              showSearch
              placeholder='filter category'
            >
              {users?.map((user) => (
                <Option key={user._id} value={user?.username}>
                  {user?.fullName}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Select
              value={ownership}
              onChange={handleFilterOwnership}
              style={{ width: '100%' }}
            >
              <Option value='Private'>Private</Option>
              <Option value='Public'>Public</Option>
            </Select>
          </Col>
        </Row>
      </div>
    </div>
  )
}
