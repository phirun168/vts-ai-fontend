import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'
import { Tag, Tabs, Card, Breadcrumb, Pagination } from 'antd'
import '@fortawesome/fontawesome-free/css/all.min.css'
import dayjs from 'dayjs'
import FilterSelection from './filters/FilterSelection'
import TableView from './TableView' // Import your new table component
import CardView from './CardView'
import ViewSwitcher from './filters/SwitchButton'
import getTableColumns from './Column' // Import the columns definition
import AddRemark from '../other/AddRemark'
import AddComment from '../other/AddComment'
import { AuthContext } from '../../../../contexts/AuthContext'
import { PERMS } from '../../../../constants/permission/perms'
const renderStatusTag = (status) => {
  switch (status.toLowerCase()) {
    case 'active':
      return (
        <Tag color='green' style={{ background: '#6AC917' }} className='px-4'>
          Active
        </Tag>
      )
    case 'inactive':
      return (
        <Tag color='gray' className='px-3'>
          Inactive
        </Tag>
      )
    case 'approved':
      return (
        <Tag color='orange' className='px-3'>
          Approved
        </Tag>
      )
    case 'pending':
      return (
        <Tag color='orange' className='px-3'>
          Pending
        </Tag>
      )
    case 'draft':
      return (
        <Tag color='blue' className='px-3'>
          Draft
        </Tag>
      )
    default:
      return <Tag>Unknown</Tag>
  }
}

const Pending = () => {
  const { setDisplayEmitContent } = useOutletContext()
  const { user, access_token, checkPermission } = useContext(AuthContext)

  const navigate = useNavigate()
  //CHECK PERMISSION
  useEffect(() => {
    if (!checkPermission(PERMS.FOLLOW_UP_MANAGEMENT)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.FOLLOW_UP_MANAGEMENT)) {
    return null
  }
  //END CHECK PERMISSION
  // "Add" drawer/steps
  const [isAddRemarkOpen, setIsAddRemarkOpen] = useState(false)
  const [isCommentOpen, setCommentOpen] = useState(false)

  // View mode: table vs. card
  const [viewMode, setViewMode] = useState('table')

  // Main data & loading state
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Tabs & filters state
  // Changed activeTab default to 'remark' (first tab)
  const [activeTab, setActiveTab] = useState('remark')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterCreatedBy, setFilterCreatedBy] = useState('all')
  const [dateRange, setDateRange] = useState([])

  // Sample data following your column structure
  const sampleData = [
    {
      key: 'item_1',
      no: 1,
      placeID: 'PL001',
      status: 'active',
      click_count: 120,
      image: 'https://picsum.photos/300/200?random=1',
      location_name_en: 'Place English 1',
      location_name_kh: 'ទីតាំង 1',
      belong_to: 'john_doe',
      category: 'Category A',
      sub_category: 'Subcat X',
      type_of_place: 'Commercial',
      city_province: 'Phnom Penh',
      district_khan: 'District 1',
      commune_sangkat: 'Commune A',
      Ownership: 'Public',
      'Created By': 'admin',
      createdAt: '2025-03-24',
      remark: [
        {
          number: 3,
          date: '04-01-2025',
          time: '9:25 AM',
          text: 'Need to contact latter',
        },
        {
          number: 2,
          date: '04-01-2025',
          time: '9:25 AM',
          text: 'Need to contact latter',
        },
        {
          number: 2,
          date: '04-01-2025',
          time: '9:25 AM',
          text: 'Need to contact latter',
        },
        {
          number: 4,
          date: '04-01-2025',
          time: '9:25 AM',
          text: 'Need to contact latter',
        },
      ],
    },
    {
      key: 'item_2',
      no: 2,
      placeID: 'PL002',
      status: 'active',
      click_count: 45,
      image: 'https://picsum.photos/300/200?random=2',
      location_name_en: 'Place English 2',
      location_name_kh: 'ទីតាំង 2',
      belong_to: 'jane_smith',
      category: 'Category B',
      sub_category: 'Subcat Y',
      type_of_place: 'Residential',
      city_province: 'Siem Reap',
      district_khan: 'District 2',
      commune_sangkat: 'Commune B',
      Ownership: 'Private',
      'Created By': 'editor',
      createdAt: '2025-03-25',
    },
    {
      key: 'item_3',
      no: 3,
      placeID: 'PL003',
      status: 'active',
      click_count: 10,
      image: 'https://picsum.photos/300/200?random=3',
      location_name_en: 'Place English 3',
      location_name_kh: 'ទីតាំង 3',
      belong_to: 'sam_johnson',
      category: 'Category C',
      sub_category: 'Subcat Z',
      type_of_place: 'Commercial',
      city_province: 'Battambang',
      district_khan: 'District 3',
      commune_sangkat: 'Commune C',
      Ownership: 'Public',
      'Created By': 'admin',
      createdAt: '2025-03-26',
    },
    {
      key: 'item_4',
      no: 4,
      placeID: 'PL004',
      status: 'in review',
      click_count: 5,
      image: 'https://picsum.photos/300/200?random=4',
      location_name_en: 'Place English 4',
      location_name_kh: 'ទីតាំង 4',
      belong_to: 'alice_brown',
      category: 'Category A',
      sub_category: 'Subcat X',
      type_of_place: 'Residential',
      city_province: 'Phnom Penh',
      district_khan: 'District 4',
      commune_sangkat: 'Commune D',
      'Created By': 'moderator',
      Ownership: 'Private',
      createdAt: '2025-03-27',
      comments: [
        {
          number: 3,
          date: '04-01-2025',
          time: '9:25 AM',
          text: 'Need to contact latter',
        },
        {
          number: 2,
          date: '04-01-2025',
          time: '9:25 AM',
          text: 'Need to contact latter',
        },
        {
          number: 2,
          date: '04-01-2025',
          time: '9:25 AM',
          text: 'Need to contact latter',
        },
        {
          number: 4,
          date: '04-01-2025',
          time: '9:25 AM',
          text: 'Need to contact latter',
        },
      ],
    },
    {
      key: 'item_5',
      no: 5,
      placeID: 'PL005',
      status: 'in review',
      click_count: 200,
      image: 'https://picsum.photos/300/200?random=5',
      location_name_en: 'Place English 5',
      location_name_kh: 'ទីតាំង 5',
      belong_to: 'john_doe',
      category: 'Category B',
      sub_category: 'Subcat Y',
      type_of_place: 'Commercial',
      city_province: 'Siem Reap',
      district_khan: 'District 2',
      commune_sangkat: 'Commune B',
      Ownership: 'Public',
      'Created By': 'admin',
      createdAt: '2025-03-28',
    },
  ]

  // Set sample data on component mount
  useEffect(() => {
    setData(sampleData)
    setLoading(false)
  }, [])

  // Reset current page when activeTab changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab])

  const handleView = (record) => {
    navigate('/list-place/detail')
  }
  /************************************************************
   *                FILTER DATA FUNCTION
   ************************************************************/
  const filterData = () => {
    let filtered = data

    // Use activeTab to separate Remark and Comment views
    if (activeTab === 'remark') {
      // For Remark tab, show all items except those with status "Pending"
      filtered = filtered.filter(
        (item) => item.status.toLowerCase() === 'active'
      )
    } else if (activeTab === 'comment') {
      // For Comment tab, show only items with status "Pending"
      filtered = filtered.filter(
        (item) => item.status.toLowerCase() === 'in review'
      )
    }

    // Apply date range filter if set
    if (dateRange && dateRange.length === 2) {
      const [start, end] = dateRange
      filtered = filtered.filter((item) => {
        const created = dayjs(item.createdAt, 'YYYY-MM-DD')
        return (
          created.isAfter(start.startOf('day')) &&
          created.isBefore(end.endOf('day'))
        )
      })
    }

    // Additional filters for category and Created By if not 'all'
    if (filterCategory !== 'all') {
      filtered = filtered.filter((item) => item.mainCategory === filterCategory)
    }
    if (filterCreatedBy !== 'all') {
      filtered = filtered.filter((item) => item.createdBy === filterCreatedBy)
    }

    return filtered
  }

  const filteredData = filterData()
  const tableColumns = getTableColumns(
    currentPage,
    pageSize,
    activeTab,
    setIsAddRemarkOpen,
    setCommentOpen,
    handleView
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

  return (
    <>
      <AddRemark open={isAddRemarkOpen} setOpen={setIsAddRemarkOpen} />
      <AddComment open={isCommentOpen} setOpen={setCommentOpen} />
      <div className='font-bold text-lg my-1'>Follow Up</div>

      <span className='apply-all-tabs'>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className='mb-2 rounded-md p-3'
          items={[
            {
              key: 'remark',
              label: <span className='text-md font-semibold'>Remark</span>,
              children: (
                <>
                  <FilterSelection />
                </>
              ),
            },
            {
              key: 'comment',
              label: <span className='text-md font-semibold'>Comment</span>,
              children: (
                <>
                  <FilterSelection />
                </>
              ),
            },
          ]}
        />
      </span>

      {/* Render table or card view */}
      <Card
        // CARD TITLE
        title={
          <span className='text-sm'>
            <span className='text-blue-700'>700</span>
            <span className='text-gray-400'> | Total Amount</span>
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
              activeTab={activeTab}
              renderStatusTag={renderStatusTag}
            />
          ) : (
            <div>
              <CardView
                data={filteredData}
                currentPage={currentPage}
                pageSize={pageSize}
                renderStatusTag={renderStatusTag}
                activeTab={activeTab}
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
export default Pending
