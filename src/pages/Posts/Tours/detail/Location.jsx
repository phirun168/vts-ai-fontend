import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../contexts/AuthContext'
import { useNavigate, useOutletContext } from 'react-router-dom'
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
} from '@ant-design/icons'
import { Button, Row, Col, Table, Tooltip, Popconfirm, Avatar } from 'antd'
import '@fortawesome/fontawesome-free/css/all.min.css'
import dayjs from 'dayjs'
// imp
const Location = () => {
    const { access_token } = useContext(AuthContext)
    const { collapsed, setDisplayEmitContent } = useOutletContext()
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const generateData = () => {
        const generatedData = []
        for (let i = 1; i <= 500; i++) {
            generatedData.push({
                key: `item_${i}`,
                location_type: i % 2 === 0 ? 'Store' : 'Department', // Alternate between Store and Department
                location_owner: `Owner ${i}`,
                province: `Province ${i}`,
                createdAt: dayjs().format('YYYY-MM-DD'),
            })
        }
        setData(generatedData)
        setLoading(false)
    }

    useEffect(() => {
        generateData()
    }, [])

    const renderNo = (_, __, index) => {
        return (currentPage - 1) * pageSize + index + 1
    }

    const handleView = () => {
        navigate('/category/detail')
    }

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            render: renderNo,
            width: 50,
        },
        {
            title: 'Location Name',
            dataIndex: 'location_type',
            key: 'location_type',
            render: (text, record) => (
                <a
                    href={`/category/detail`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='text-blue-500'
                >
                    {text}
                </a>
            ),
        },
        {
            title: 'Location Owner',
            dataIndex: 'location_owner',
            key: 'location_owner',
        },
        {
            title: 'Province',
            dataIndex: 'province',
            key: 'province',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <div className='flex justify-center'>
                    <Tooltip title='View'>
                        <Button
                            icon={<EyeOutlined style={{ color: 'green' }} />}
                            shape='circle'
                            size='small'
                            onClick={() => handleView(record)}
                            style={{ marginRight: 8 }}
                        />
                    </Tooltip>
                </div>
            ),
        },
    ]

    const pagination = {
        current: currentPage,
        pageSize: pageSize,
        total: data.length,
        onChange: (page, pageSize) => {
            setCurrentPage(page)
            setPageSize(pageSize)
        },
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
    }

    return (
        <div className='relative'>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={pagination}
                rowKey='key'
            />
        </div>
    )
}

export default Location
