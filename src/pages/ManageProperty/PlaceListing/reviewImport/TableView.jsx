import React from 'react'
import { Table } from 'antd'

const TableView = ({ data, loading, columns, currentPage, pageSize }) => {
  // Calculate the data to display using pagination (assuming data is an array)
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  return (
    <Table
      columns={columns}
      dataSource={paginatedData}
      loading={loading}
      pagination={false} // You can decide to handle Pagination externally if needed
      scroll={{ x: 'max-content' }}
      rowKey={(record) => record._id}
    />
  )
}

export default TableView
