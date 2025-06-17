import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { PlusOutlined, HomeOutlined } from '@ant-design/icons'
import {
  Button,
  Tag,
  Tabs,
  Card,
  Breadcrumb,
  Pagination,
  Image,
  Row,
  Col,
  Tooltip,
} from 'antd'
import '@fortawesome/fontawesome-free/css/all.min.css'
import dayjs from 'dayjs'
import CreateNonBusiness from './Create/CreateNonBusiness'
import EditNonBusiness from './Edit/CreateNonBusiness'
import FilterSelection from './filters/FilterSelection'
import TableView from './TableView' // Import your new table component
import CardView from './CardView'
import ViewSwitcher from './filters/SwitchButton'
import getTableColumns from './Column' // Import the columns definition
import CardStatus from './dashboard/CardStatus'
import CardDashboard from './dashboard/CardDashboard'
import AllPropertyServices from '../../../../services/ManageProperty/PlaceListing/AllProperty'
import { AuthContext } from '../../../../contexts/AuthContext'
import CategoryServices from '../../../../services/setup/Category'
import SubCategoryServices from '../../../../services/setup/SubCategory'
import { PERMS } from '../../../../constants/permission/perms'
import UpdateMedia from './Edit/Steps/UpdateMedia'
const Pending = () => {
  const { setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()
  const { user, access_token, checkPermission } = useContext(AuthContext)
  const [username, setUsername] = useState(user?.username)
  // "Add" drawer/steps
  //CHECK PERMISSION
  useEffect(() => {
    if (!checkPermission(PERMS.ALL_PROPERTY_MANAGEMENT)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.ALL_PROPERTY_MANAGEMENT)) {
    return null
  }
  //END CHECK PERMISSION
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openMedia, setOpenMedia] = useState(false)

  // View mode: table vs. card
  const [viewMode, setViewMode] = useState('table')

  // Main data & loading state
  const [loading, setLoading] = useState(true)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  //main variable
  const [propData, setPropData] = useState()
  const [propMedia, setPropMedia] = useState()
  // Tabs & filters state
  const [activeTab, setActiveTab] = useState('all')
  const [statusFilter, setStatusFilter] = useState('All')
  const [filterCreatedBy, setFilterCreatedBy] = useState('all')
  const [activeStatus, setActiveStatus] = useState('All')
  const [dateRange, setDateRange] = useState([])
  //main data

  const [properties, setProperties] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  //filter variable
  const [filterSearch, setFilterSearch] = useState()
  const [filterCategory, setFilterCategory] = useState()
  const [filterProvince, setFilterProvince] = useState()
  const [filterUser, setFilterUser] = useState()
  const [filterOwnership, setFilterOwnership] = useState()
  const [allFilter, setAllFilter] = useState()
  const [filterDateRange, setFilterDateRange] = useState()
  //filter variable
  // console.log(properties, 'properties')

  //status
  const [statusSummary, setStatusSummary] = useState()

  const getCategory = async () => {
    try {
      const doc = { search: '' }
      const data = await CategoryServices.fetchCategory({ doc, access_token })
      if (data) {
        setCategory(data || [])
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
      if (data) {
        setSubCategory(data)
      }
    } catch {}
  }
  const getAllProperty = async () => {
    setLoading(true)
    try {
      const data = await AllPropertyServices.fetchAllProperty({ access_token })

      if (data) {
        setProperties(data?.data?.locations || [])
        setStatusSummary(data?.data?.statusSummary || {})
        setLoading(false)
      }
    } catch {
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getSubCategory()
    getCategory()
    getAllProperty()
  }, [])
  // Reset current page when activeTab changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab])
  //address

  //
  const handleView = (record) => {
    navigate('/property/' + record?._id)
  }
  const onUpdateNonBusinessProperty = (record) => {
    setOpenEdit(true)
    setPropData(record)
  }
  /************************************************************
   *                FILTER DATA FUNCTION
   ************************************************************/
  //small filter
  const onHandleSearch = (value) => {
    setFilterSearch(value)
  }
  const onHandleFilterCategory = (value) => {
    setFilterCategory(value)
  }
  const onHandleFilterProvince = (value) => {
    setFilterProvince(value)
  }
  const onHandleFilterUser = (value) => {
    setFilterUser(value)
  }
  const onHandleFilterOwnership = (value) => {
    setFilterOwnership(value)
  }
  const onHandleAllFilter = (value) => {
    setAllFilter(value)
  }
  const onHandleFilterDateRange = (value) => {
    setFilterDateRange(value)
    console.log(value, 'all filters')
  }
  //
  const filterData = () => {
    let filtered = properties
    //tab filter
    if (activeTab === 'all') {
      if (statusFilter !== 'All') {
        filtered = filtered.filter((item) => item.status === statusFilter)
      }
    } else if (activeTab === 'pending') {
      filtered = filtered.filter((item) => item.status === 'Pending')
    } else if (activeTab === 'non-pending') {
      filtered = filtered.filter((item) => item.status === 'Active')
    }

    filtered = filtered.filter((item) =>
      item.status && activeStatus === 'All'
        ? item.status
        : activeStatus !== 'All'
          ? item.status === activeStatus
          : ''
    )
    // Apply date range filter if set
    if (dateRange && dateRange?.length === 2) {
      const [start, end] = dateRange
      filtered = filtered.filter((item) => {
        const created = dayjs(item.createdAt, 'YYYY-MM-DD')
        return (
          created.isAfter(start.startOf('day')) &&
          created.isBefore(end.endOf('day'))
        )
      })
    }

    //filter search
    if (filterSearch && typeof filterSearch?.search === 'string') {
      // Remove spaces from the search term to handle "khmer food" and "khmerfood"
      const normalizedSearchTerm = filterSearch.search
        .replace(/\s+/g, '')
        .toLowerCase()

      filtered = filtered.filter((item) => {
        // Normalize the fields by removing spaces and converting to lowercase
        const normalizedPlaceId = item.placeId
          ?.replace(/\s+/g, '')
          .toLowerCase()
        const normalizedNameEn = item.nameEn?.replace(/\s+/g, '').toLowerCase()
        const normalizedNameKh = item.nameKh?.replace(/\s+/g, '').toLowerCase()

        // Check if the normalized search term is included in any of the normalized fields
        return (
          normalizedPlaceId?.includes(normalizedSearchTerm) ||
          normalizedNameEn?.includes(normalizedSearchTerm) ||
          normalizedNameKh?.includes(normalizedSearchTerm)
        )
      })
    }

    //end filter search
    //filter category
    if (filterCategory && typeof filterCategory.filterCategory === 'string') {
      const normalizedCategoryTerm = filterCategory?.filterCategory
        .replace(/\s+/g, '')
        .toLowerCase()
      filtered = filtered.filter((item) => {
        const normalizedNameEn = item?.mainCategory.nameEn
          ?.replace(/\s+/g, '')
          .toLowerCase()
        return normalizedNameEn?.includes(normalizedCategoryTerm)
      })
    }
    //filter Province
    if (filterProvince && typeof filterProvince?.filterProvince === 'string') {
      const normalizedProvinceTerm = filterProvince?.filterProvince
        .replace(/\s+/g, '')
        .toLowerCase()
      filtered = filtered.filter((item) => {
        const normalizedNameEn = item?.address?.location?.provinceEn
          ?.replace(/\s+/g, '')
          .toLowerCase()
        return normalizedNameEn?.includes(normalizedProvinceTerm)
      })
    }
    //filter user
    if (filterUser && typeof filterUser?.filterUser === 'string') {
      const normalizedUserTerm = filterUser?.filterUser
        .replace(/\s+/g, '')
        .toLowerCase()
      filtered = filtered.filter((item) => {
        const normalizedNameEn = item?.createdBy
          ?.replace(/\s+/g, '')
          .toLowerCase()
        return normalizedNameEn?.includes(normalizedUserTerm)
      })
    }
    //filter user
    if (
      filterOwnership &&
      typeof filterOwnership?.filterOwnership === 'string'
    ) {
      const normalizedOwnershipTerm = filterOwnership?.filterOwnership
        .replace(/\s+/g, '')
        .toLowerCase()
      filtered = filtered.filter((item) => {
        const normalizedNameEn = item?.ownership
          ?.replace(/\s+/g, '')
          .toLowerCase()
        return normalizedNameEn?.includes(normalizedOwnershipTerm)
      })
    }
    //filter date range
    if (
      filterDateRange?.filterDateRange?.length === 2 &&
      dayjs.isDayjs(filterDateRange?.filterDateRange[0]) &&
      dayjs.isDayjs(filterDateRange?.filterDateRange[1])
    ) {
      const [startDate, endDate] = filterDateRange.filterDateRange

      filtered = filtered.filter((item) => {
        const createdAt = dayjs(item?.createdAt)
        return (
          createdAt.isSame(startDate, 'day') ||
          createdAt.isSame(endDate, 'day') ||
          (createdAt.isAfter(startDate, 'day') &&
            createdAt.isBefore(endDate, 'day'))
        )
      })
    }

    //all filter
    if (allFilter?.allFilter) {
      const filter = allFilter.allFilter

      const normalize = (value) =>
        typeof value === 'string' ? value.replace(/\s+/g, '').toLowerCase() : ''

      const normalizedCategory = normalize(filter.mainCategory)
      const normalizedSubCategory = normalize(filter.subCategory)
      const normalizedPlaceType = normalize(filter.placeType)
      const normalizedOwnership = normalize(filter.ownership)
      const normalizedBelongTo = normalize(filter.belongTo)
      const normalizedCreatedBy = normalize(filter.createdBy)
      const normalizedProvince = normalize(filter.province)
      const normalizedDistrict = normalize(filter.district)
      const normalizedCommune = normalize(filter.commune)
      const normalizedVillage = normalize(filter.village)

      filtered = filtered.filter((item) => {
        const normalizedMainCategory = normalize(item?.mainCategory?.nameEn)
        const normalizedSubCategoryNameEn = normalize(item?.subCategory?.nameEn)
        const normalizedTypeOfPlace = normalize(item?.typeOfPlace?.nameEn)
        const normalizedOwnershipApi = normalize(item?.ownership)
        const normalizedBelong_to = normalize(item?.belong_to)
        const normalizedCreatedByApi = normalize(item?.createdBy)
        const normalizedProvinceEn = normalize(
          item?.address?.location?.provinceEn
        )
        const normalizedDistrictEn = normalize(
          item?.address?.location?.districtEn
        )
        const normalizedCommuneEn = normalize(
          item?.address?.location?.communeEn
        )
        const normalizedVillageEn = normalize(
          item?.address?.location?.villageEn
        )

        return (
          (!normalizedCategory ||
            normalizedMainCategory.includes(normalizedCategory)) &&
          (!normalizedSubCategory ||
            normalizedSubCategoryNameEn.includes(normalizedSubCategory)) &&
          (!normalizedPlaceType ||
            normalizedTypeOfPlace.includes(normalizedPlaceType)) &&
          (!normalizedOwnership ||
            normalizedOwnershipApi.includes(normalizedOwnership)) &&
          (!normalizedBelongTo ||
            normalizedBelong_to.includes(normalizedBelongTo)) &&
          (!normalizedCreatedBy ||
            normalizedCreatedByApi.includes(normalizedCreatedBy)) &&
          (!normalizedProvince ||
            normalizedProvinceEn.includes(normalizedProvince)) &&
          (!normalizedDistrict ||
            normalizedDistrictEn.includes(normalizedDistrict)) &&
          (!normalizedCommune ||
            normalizedCommuneEn.includes(normalizedCommune)) &&
          (!normalizedVillage ||
            normalizedVillageEn.includes(normalizedVillage))
        )
      })
    }

    //all filter

    return filtered
  }
  //
  const onChangeActiveFilterCard = (status) => {
    // console.log(status, '3456789')

    setActiveStatus(status)
  }
  const onUpdateMedia = (record) => {
    setOpenMedia(true)
    setPropMedia(record)
    console.log(record, 'what')
  }
  //

  const filteredData = filterData()
  const tableColumns = getTableColumns(
    currentPage,
    pageSize,
    handleView,
    getAllProperty,
    onUpdateNonBusinessProperty,
    onUpdateMedia
  )
  useEffect(() => {
    setDisplayEmitContent(
      <div className='flex justify-between my-3'>
        <div className='flex'>
          <Breadcrumb
            items={[
              { title: <HomeOutlined style={{ cursor: 'pointer' }} /> },
              { title: <span>Warehouse</span> },
              { title: <span>Place Listing</span> },
              { title: <span>All Property</span> },
            ]}
          />
        </div>
      </div>
    )
  }, [navigate, setDisplayEmitContent])
  //
  const onFilterChange = (mainCategory, province, createdBy, ownership) => {
    console.log(
      mainCategory,
      province,
      createdBy,
      ownership,
      'mainCategory, province, createdBy, ownership '
    )
  }
  //

  return (
    <>
      <div className='font-bold text-lg my-1'>All Property</div>
      <CreateNonBusiness
        open={openAdd}
        setOpen={setOpenAdd}
        access_token={access_token}
        username={username}
        getAllProperty={getAllProperty}
      />
      <EditNonBusiness
        open={openEdit}
        setOpen={setOpenEdit}
        propData={propData}
        access_token={access_token}
        username={username}
        getAllProperty={getAllProperty}
      />
      <UpdateMedia
        open={openMedia}
        setOpen={setOpenMedia}
        propMedia={propMedia}
        access_token={access_token}
      />
      <Row className='md:hidden flex my-2' gutter={[8, 2]}>
        {/* <Col xs={24} sm={12}>
          <Button
            style={{ width: '100%' }}
            type='primary'
            icon={<PlusOutlined />}
            // onClick={() => setOpenAdd(true)}
          >
            Add to Business Place
          </Button>
        </Col> */}
        <Col xs={24} sm={24}>
          {checkPermission(PERMS.ASSIGNED_USER) ? (
            <Button
              style={{ width: '100%' }}
              type='primary'
              icon={<PlusOutlined />}
              onClick={() => setOpenAdd(true)}
            >
              Create Place Non Business
            </Button>
          ) : (
            ''
          )}
        </Col>
      </Row>
      {/* Tabs */}
      <span className='apply-all-tabs'>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className=' mb-2 rounded-md '
          tabBarExtraContent={
            <Row className='md:flex hidden mx-3' gutter={[8, 2]}>
              {/* <Col xs={24} sm={12}>
                <Button
                  style={{ width: '100%' }}
                  type='primary'
                  icon={<PlusOutlined />}
                  // onClick={() => setOpenAdd(true)}
                >
                  Add to Business Place
                </Button>
              </Col> */}
              {checkPermission(PERMS.ASSIGNED_USER) ? (
                <Button
                  style={{ width: '100%' }}
                  type='primary'
                  icon={<PlusOutlined />}
                  onClick={() => setOpenAdd(true)}
                >
                  Create Place Non Business
                </Button>
              ) : (
                ' '
              )}

              <Col xs={24} sm={24}></Col>
            </Row>
          }
          items={[
            {
              key: 'all',
              label: (
                <span className='text-md font-semibold'>All Property</span>
              ),
              children: (
                <>
                  <CardStatus
                    activeTab={activeTab}
                    status={statusSummary}
                    activeStatus={activeStatus}
                    setActiveStatus={onChangeActiveFilterCard}
                  />
                  <span hidden={activeStatus === 'Dashboard'}>
                    <FilterSelection
                      onHandleFilterCategory={onHandleFilterCategory}
                      onHandleFilterProvince={onHandleFilterProvince}
                      onHandleFilterUser={onHandleFilterUser}
                      onHandleFilterOwnership={onHandleFilterOwnership}
                      onHandleSearch={onHandleSearch}
                      onHandleAllFilter={onHandleAllFilter}
                      onHandleFilterDateRange={onHandleFilterDateRange}
                    />
                  </span>
                </>
              ),
            },
            {
              key: 'pending',
              label: (
                <span className='text-md font-semibold'>
                  Non Business Property
                </span>
              ),
              children: (
                <>
                  <CardStatus
                    activeTab={activeTab}
                    status={statusSummary}
                    activeStatus={activeStatus}
                    setActiveStatus={onChangeActiveFilterCard}
                  />
                  <span hidden={activeStatus === 'Dashboard'}>
                    <FilterSelection />
                  </span>
                </>
              ),
            },
            {
              key: 'non-pending',
              label: (
                <span className='text-md font-semibold'>Business Property</span>
              ),
              children: (
                <>
                  <CardStatus
                    activeTab={activeTab}
                    status={statusSummary}
                    activeStatus={activeStatus}
                    setActiveStatus={onChangeActiveFilterCard}
                  />
                  <span hidden={activeStatus === 'Dashboard'}>
                    <FilterSelection onFilterChange={onFilterChange} />
                  </span>
                </>
              ),
            },
          ]}
        />
      </span>
      <span hidden={activeStatus !== 'Dashboard'}>
        <CardDashboard data={filteredData} />
      </span>
      {/* Render table or card view */}
      <Card
        hidden={activeStatus === 'Dashboard'}
        // CARD TITLE
        title={
          <span className='text-sm'>
            <span className='text-blue-700'> {filteredData?.length} </span>
            <span className='text-gray-400'> | Total Amount </span>
          </span>
        }
        // CARD EXTRA
        extra={
          <div className='flex items-center space-x-2'>
            {/* View Mode Icon (example: list or table) */}
            <ViewSwitcher
              viewMode={viewMode}
              onViewModeChange={(mode) => setViewMode(mode)}
            />
          </div>
        }
      >
        {activeTab !== 'dashboard' &&
          (viewMode === 'table' ? (
            <TableView
              data={filteredData}
              loading={loading}
              columns={tableColumns}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          ) : (
            <div>
              <CardView
                data={filteredData}
                currentPage={currentPage}
                pageSize={pageSize}
              />
            </div>
          ))}

        {/* Pagination */}
        {activeTab !== 'dashboard' && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
              textAlign: 'center',
              marginTop: '16px',
            }}
          >
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredData?.length}
              onChange={(page, size) => {
                setCurrentPage(page)
                setPageSize(size)
              }}
              pageSizeOptions={['10', '20', '50', '100']}
              showSizeChanger
            />
          </div>
        )}
      </Card>
    </>
  )
}
export default Pending
