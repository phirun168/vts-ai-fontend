import React, { useEffect } from 'react'
import { Table } from 'antd'

const TableView = ({ data, loading, columns, currentPage, pageSize }) => {
  let filteredData = data

  // Calculate paginated data from filteredData
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  return (
    <Table
      columns={columns}
      dataSource={paginatedData}
      loading={loading}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
  )
}

export default TableView
