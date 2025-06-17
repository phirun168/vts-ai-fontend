import { Avatar, Button, Popconfirm, Table, Tooltip } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

import {

    FileImageOutlined,
} from '@ant-design/icons'
//
import SearchDetail from './Search'
import renderActions from 'components/Icon/MoreOption'
//
const SubCategoryList = (props) => {
    const { isConfirmDelete } = props
    const { access_token } = useContext(AuthContext)
    const navigate = useNavigate()
    const [userList, setUserList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const pageSize = 10

    const generateUserData = () => {
        const categories = ['Category 1', 'Category 2', 'Category 3']
        const subCategories = ['Sub Category 1', 'Sub Category 2', 'Sub Category 3']
        const momentTypes = ['Moment Type 1', 'Moment Type 2']
        const locations = ['Location 1', 'Location 2', 'Location 3']
        const hashtags = ['12', '20', '40']
        const mentions = ['11', '30']

        const generatedData = []

        for (let i = 1; i <= 20; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)]
            const subCategory =
                subCategories[Math.floor(Math.random() * subCategories.length)]
            const momentType =
                momentTypes[Math.floor(Math.random() * momentTypes.length)]
            const location = locations[Math.floor(Math.random() * locations.length)]
            const hashtag = hashtags[Math.floor(Math.random() * hashtags.length)]
            const mention = mentions[Math.floor(Math.random() * mentions.length)]

            generatedData.push({
                key: `place_${i}`,
                name: `Place ${i}`,
                category_name: category,
                sub_category_name: subCategory,
                moment_type: momentType,
                location_name: location,
                hashtags_name: hashtag,
                mention_name: mention,
                description: `Description for Place ${i}`,
            })
        }

        setUserList(generatedData)
        setLoading(false)
    }
    useEffect(() => {
        generateUserData()
    }, [])

    const handleView = (record) => {
        navigate('/category/detail')
    }

    const handleDelete = (record) => {
        console.log(`Delete record: ${record.key}`)
    }

    const renderNo = (_, __, index) => {
        return (currentPage - 1) * pageSize + index + 1
    }

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            width: 50,
            align: 'center',
            render: renderNo,
        },
        {
            title: 'Image',
            dataIndex: 'name',
            key: 'name',
            width: 50,
            align: 'center',
            render: () => (
                <Tooltip title='Click to view image' trigger='click'>
                    <Avatar
                        shape='square'
                        size={24}
                        icon={<FileImageOutlined />}
                        style={{ cursor: 'pointer' }}
                    />
                </Tooltip>
            ),
        },
        {
            title: 'Title',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <span
                    className='text-blue-500 cursor-pointer'
                    onClick={() => console.log(record)}
                >
                    {record.name}
                </span>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category_name',
            key: 'category_name',
            align: 'center',
        },

        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            align: 'center',
        },
        {
            title: 'CreatedAt',
            dataIndex: 'created_at',
            key: 'created_at',
            align: 'center',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            hidden: isConfirmDelete,
            width: 50,
            render: (_, record) => renderActions(record),
        },
    ]

    const paginationConfig = {
        current: currentPage,
        pageSize,
        onChange: (page) => setCurrentPage(page),
        total: userList.length,
        showSizeChanger: false,
    }

    return (
        <>
            <div className='mb-4'>
                <SearchDetail />
            </div>
            <Table
                columns={columns}
                dataSource={userList}
                pagination={paginationConfig}
                bordered={false}
                size='small'
                loading={loading}
                scroll={{ x: 'max-content' }}
                className='custom-table-category'
                rowClassName={(record, index) =>
                    index % 2 === 0 ? 'even-row' : 'odd-row'
                }
            />
        </>
    )
}

export default SubCategoryList
