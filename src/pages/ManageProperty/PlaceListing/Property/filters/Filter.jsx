import React, { useContext, useEffect, useState } from 'react'
import { Form, Select, Row, Col, Button, Card, Modal } from 'antd'
import CategoryServices from '../../../../../services/setup/Category'
import { AuthContext } from '../../../../../contexts/AuthContext'
import SubCategoryServices from '../../../../../services/setup/SubCategory'
import TypeServices from '../../../../../services/setup/Type'
import SettingOtherAddressOptServices from '../../../../../services/options/settings/other/address/Address'
import AddressService from '../../../../../services/settings/others/Address'
import AdminUserServices from '../../../../../services/admin/User'
import MobileAppUserServices from '../../../../../services/mobiles/apps/user'

const { Option } = Select

export default function Filter(props) {
  const { filterVisible, setFilterVisible, onHandleAllFilter } = props
  const { user, access_token } = useContext(AuthContext)
  // 1. Create a form instance
  const [form] = Form.useForm()
  const ownershipOptions = ['Private', 'Public']

  const handleClear = () => {
    form.resetFields()
  }
  const handleFilter = () => {
    form
      .validateFields()
      .then((values) => {
        if (typeof onHandleAllFilter === 'function') {
          onHandleAllFilter?.({
            allFilter: values,
          })
        }
        setFilterVisible(false)
      })
      .catch((errorInfo) => {
        console.error('Validate Failed:', errorInfo)
      })
  }

  //variable value
  const [categoryValue, setCategoryValue] = useState()
  const [subCategoryValue, setSubCategoryValue] = useState()
  const [typeOfPlaceValue, setTypeOfPlaceValue] = useState()
  //variable
  const [categories, setCategories] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [typeOfPlaces, setTypeOfPlaces] = useState([])
  // function  [GET]
  const getCategory = async () => {
    try {
      const doc = { search: '' }
      const data = await CategoryServices.fetchCategory({ doc, access_token })

      if (Array.isArray(data)) {
        setCategories(data)
      } else {
        console.warn('Fetched category data is not an array:', data)
      }
    } catch {}
  }
  const getSubCategory = async () => {
    try {
      const doc = { search: '' }
      const data = await SubCategoryServices.fetchSubCategory({
        doc,
        access_token,
      })
      if (Array.isArray(data)) {
        setSubCategory(data)
      } else {
        console.warn('Fetched sub category data is not an array:', data)
      }
    } catch {}
  }
  const getTypeOfPlace = async () => {
    try {
      const doc = { search: '', type: 'Place' }
      const data = await TypeServices.fetchType({
        doc,
        access_token,
      })
      if (Array.isArray(data)) {
        setTypeOfPlaces(data)
        console.log(data, 'type of place')
      } else {
        console.warn('Fetched type of place data is not an array:', data)
      }
    } catch {}
  }
  useEffect(() => {
    getCategory()
    getSubCategory()
    getTypeOfPlace()
  }, [])
  //function
  //function on change
  const handleFilterByCategory = (value) => {
    setCategoryValue(value)
  }
  //
  const handleFilterBySubCategory = (value) => {
    setSubCategoryValue(value)
  }
  const handleFilterByTypeOfPlace = (value) => {
    setTypeOfPlaceValue(value)
  }
  //
  //address
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [communes, setCommunes] = useState([])
  const [address, setAddress] = useState([])

  const [filterProvince, setFilterProvince] = useState(12)
  const [filterDistrict, setFilterDistrict] = useState(null)
  const [filterCommune, setFilterCommune] = useState(null)
  const [search, setSearch] = useState('')

  const getAddress = async (filterPro, filterDist, filterCom, keyword) => {
    try {
      const doc = {
        page: 1,
        size: 20,
        search: keyword || '',
        provinceId: filterPro,
        districtId: filterDist,
        communeId: filterCom || null,
      }
      const data = await AddressService.getAddress({ doc, access_token })
      if (data) {
        setAddress(data?.data)
      }
    } catch {
    } finally {
    }
  }
  useEffect(() => {
    if (filterProvince || filterDistrict || filterCommune || search) {
      getAddress(filterProvince, filterDistrict, filterCommune, search)
    }
  }, [filterProvince, filterDistrict, filterCommune, search])

  const getProvince = async () => {
    try {
      const provinces = await SettingOtherAddressOptServices.getProvinceOpt({
        access_token,
      })
      if (provinces) {
        setProvinces(provinces)
      }
    } catch {}
  }
  useEffect(() => {
    getProvince()
  }, [])

  const handleProvince = (value) => {
    setFilterProvince(value?.provinceId)
    setFilterDistrict(null)
    setFilterCommune(null)
    getDistrict(value?.provinceId)
    setSearch('')
    setDistricts([])
    setCommunes([])
    form.setFieldsValue({
      district: null,
      commune: null,
      village: null,
    })
  }
  const handleAllowClearProvince = () => {
    setSearch('')
    setDistricts([])
    setCommunes([])
    setFilterDistrict(null)
    setFilterCommune(null)
    form.setFieldsValue({
      district: null,
      commune: null,
      village: null,
    })
  }

  const handleDistrict = (value) => {
    setFilterDistrict(value?.districtId)
    setFilterCommune(null)
    getCommune(value?.districtId)
    setSearch('')
    setCommunes([])
    form.setFieldsValue({
      commune: null,
      village: null,
    })
  }
  const handleAllowClearDistrict = () => {
    setSearch('')
    setCommunes([])
    form.setFieldsValue({
      commune: null,
      village: null,
    })
  }

  const handleCommune = (value) => {
    setFilterCommune(value?.communeId)
    setSearch('')
    form.setFieldsValue({
      village: null,
    })
  }
  const handleAllowClearCommune = () => {
    setSearch('')

    form.setFieldsValue({
      village: null,
    })
  }

  const getDistrict = async (id) => {
    try {
      const doc = { id: id }
      const district = await SettingOtherAddressOptServices.getDistrictOpt({
        doc,
        access_token,
      })
      setDistricts(district)
    } catch {}
  }

  const getCommune = async (id) => {
    try {
      const doc = { id: id }
      const commune = await SettingOtherAddressOptServices.getCommuneOpt({
        doc,
        access_token,
      })
      if (commune) {
        setCommunes(commune)
      }
    } catch {}
  }

  //end address
  // other
  //
  const [users, setUsers] = useState([])
  const [usersApp, setUsersApp] = useState([])
  const getUser = async () => {
    try {
      const data = await AdminUserServices.fetchUser({ access_token })
      if (data) {
        setUsers(data)
      }
    } catch {}
  }
  const getUserApp = async () => {
    try {
      const userApp = await MobileAppUserServices.fetchUserApp({ access_token })
      if (userApp) {
        setUsersApp(userApp)
        console.log(userApp, 'tyuusersAppio')
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUser()
    getUserApp()
  }, [])
  //end other

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
                <Select
                  value={categoryValue}
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
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                style={{ marginBottom: 0 }}
                label='Select Sub Category'
                name='subCategory'
              >
                <Select
                  value={subCategoryValue}
                  onChange={handleFilterBySubCategory}
                  style={{ width: '100%' }}
                  allowClear
                  showSearch
                  placeholder='filter sub category'
                >
                  {subCategory?.map((sub) => (
                    <Option key={sub._id} value={sub.nameEn}>
                      {sub?.nameKh}-{sub?.nameEn}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label='Type of place' name='placeType'>
                <Select
                  value={typeOfPlaceValue}
                  onChange={handleFilterByTypeOfPlace}
                  style={{ width: '100%' }}
                  allowClear
                  showSearch
                  placeholder='filter type of place'
                >
                  {typeOfPlaces?.map((type) => (
                    <Option key={type._id} value={type.nameEn}>
                      {type?.nameKh}-{type?.nameEn}
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
                <Select
                  allowClear
                  showSearch
                  placeholder='Filter by Province'
                  className='w-full'
                  optionFilterProp='children'
                  onChange={(value, option) => {
                    if (value === undefined) {
                      handleAllowClearProvince()
                    } else {
                      // Normal selection
                      handleProvince(option.data)
                    }
                  }}
                >
                  {provinces?.map((province) => (
                    <Select.Option
                      key={province._id}
                      value={province.provinceEn}
                      data={province}
                      label={`${province.provinceEn}`}
                    >
                      {province.provinceEn} ({province.provinceKh})
                    </Select.Option>
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
                <Select
                  allowClear
                  showSearch
                  placeholder='Filter by District'
                  className='w-full'
                  optionFilterProp='children'
                  onChange={(value, option) => {
                    if (value === undefined) {
                      handleAllowClearDistrict()
                    } else {
                      // Normal selection
                      handleDistrict(option?.data)
                    }
                  }}
                >
                  {districts?.map((district) => (
                    <Select.Option
                      key={district?._id}
                      value={district?.districtEn}
                      data={district}
                      label={`${district?.districtEn}`}
                    >
                      {district?.districtEn} ({district?.districtKh})
                    </Select.Option>
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
                <Select
                  allowClear
                  showSearch
                  placeholder='Filter by Commune'
                  className='w-full'
                  optionFilterProp='children'
                  onChange={(value, option) => {
                    if (value === undefined) {
                      handleAllowClearCommune()
                    } else {
                      // Normal selection
                      handleCommune(option?.data)
                    }
                  }}
                >
                  {communes?.map((commune) => (
                    <Select.Option
                      key={commune._id}
                      value={commune.communeEn}
                      data={commune}
                      label={`${commune?.communeEn})`}
                    >
                      {commune?.communeEn} ({commune.communeKh})
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label='Select Village' name='village'>
                <Select
                  allowClear
                  showSearch
                  placeholder='Filter by village'
                  className='w-full'
                  optionFilterProp='children'
                >
                  {address?.map((address, index) => (
                    <Select.Option
                      key={`${address._id}-${index}`}
                      value={address.villageEn}
                      data={address}
                      label={`${address?.villageEn}`}
                    >
                      {address?.villageEn} ({address.villageKh})
                    </Select.Option>
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
                <Select
                  allowClear
                  showSearch
                  placeholder='Filter created By'
                  className='w-full'
                  optionFilterProp='children'
                >
                  {users?.map((user, index) => (
                    <Select.Option
                      key={`${user._id}-${index}`}
                      value={user.username}
                      data={users}
                      label={`${user?.villageEn}`}
                    >
                      {address?.fullname}
                    </Select.Option>
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
                <Select
                  allowClear
                  showSearch
                  placeholder='Filter created By'
                  className='w-full'
                  optionFilterProp='children'
                >
                  {usersApp?.map((app, index) => (
                    <Select.Option
                      key={`${app._id}-${index}`}
                      value={app.username}
                      label={`${app?.villageEn}`}
                    >
                      {app?.username}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label='Ownership' name='ownership'>
                <Select placeholder='Select Ownership'>
                  {ownershipOptions?.map((own) => (
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
