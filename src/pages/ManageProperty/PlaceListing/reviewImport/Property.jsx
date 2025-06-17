import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'
import { Card, Breadcrumb, Pagination } from 'antd'
import '@fortawesome/fontawesome-free/css/all.min.css'
import dayjs from 'dayjs'
import EditNonBusiness from './Edit/CreateNonBusiness'
import FilterSelection from './filters/FilterSelection'
import TableView from './TableView' // Import your new table component
import getTableColumns from './Column' // Import the columns definition
import ReviewImportNonBusinessServices from '../../../../services/ManageProperty/PlaceListing/ReviewImport'
import { AuthContext } from '../../../../contexts/AuthContext'
import { PERMS } from '../../../../constants/permission/perms'

const ReviewImport = () => {
  const { username, access_token, checkPermission } = useContext(AuthContext)
  const { setDisplayEmitContent } = useOutletContext()
  const navigate = useNavigate()
  //CHECK PERMISSION
  useEffect(() => {
    if (!checkPermission(PERMS.REVIEW_IMPORT_MANAGEMENT)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.REVIEW_IMPORT_MANAGEMENT)) {
    return null
  }
  //END CHECK PERMISSION
  // "Add" drawer/steps
  const [openEdit, setOpenEdit] = useState(false)
  // View mode: table vs. card
  const [viewMode, setViewMode] = useState('table')
  // Main data & loading state
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [propData, setPropData] = useState()
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Tabs & filters state
  const [activeTab, setActiveTab] = useState('all')
  const [activeStatus, setActiveStatus] = useState('all')
  const [filterProvince, setFilterProvince] = useState(null)
  const [search, setSearch] = useState()
  const getReviewImport = async () => {
    setLoading(true)
    try {
      const data =
        await ReviewImportNonBusinessServices.fetchReviewImportNonBusiness({
          access_token,
        })
      if (data) {
        setData(data)
        setLoading(false)
      }
    } catch {
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getReviewImport()
  }, [])

  // Reset current page when activeTab changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab])

  const handleView = (record) => {
    navigate('/list-place/detail/' + record?._id)
  }
  /************************************************************
   *                FILTER DATA FUNCTION
   ************************************************************/
  const filterData = () => {
    let filtered = data
    if (filterProvince) {
      filtered = filtered.filter((item) => item.city === filterProvince)
    }
    /* search filter */
    const q = search?.trim().toLowerCase()
    if (q) {
      filtered = filtered.filter(
        (i) =>
          (i.nameEn ?? '').toLowerCase().includes(q) ||
          (i.nameKh ?? '').includes(search) ||
          (i.placeId ?? '').toLowerCase().includes(q)
      )
    }
    return filtered
  }
  const onEditNonBusiness = (record) => {
    setOpenEdit(true)
    setPropData(record)
  }
  const onCityChange = (value) => {
    if (!value) return setFilterProvince(null)
    const label = typeof value === 'string' ? value : value.label
    const english = label.split(' – ')[0].trim()

    setFilterProvince(english)
  }
  const filteredData = filterData()
  const tableColumns = getTableColumns(
    currentPage,
    pageSize,
    handleView,
    onEditNonBusiness
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
              { title: <span>Review Import Non Business</span> },
            ]}
          />
        </div>
      </div>
    )
  }, [navigate, setDisplayEmitContent])
  return (
    <>
      {openEdit === true && (
        <EditNonBusiness
          getReviewImport={getReviewImport}
          open={openEdit}
          setOpen={setOpenEdit}
          propData={propData}
          access_token={access_token}
          username={username}
        />
      )}

      <FilterSelection
        access_token={access_token}
        onCityChange={onCityChange}
        setSearch={setSearch}
      />
      <Card
        hidden={activeStatus === 'Dashboard'}
        // CARD TITLE
        title={
          <span className='text-sm'>
            <span className='text-blue-700'>{filteredData?.length}</span>
            <span className='text-gray-400'> | Total Amount</span>
          </span>
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
            ''
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
              total={filteredData.length}
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
export default ReviewImport
