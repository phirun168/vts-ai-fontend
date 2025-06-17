import React, { useState } from 'react'
import { Row, Col, Card, Button, Modal, Input, Space, Typography } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import EditLinkNameModal from './EditLinkNameModal'

const { Text } = Typography

const websiteGroupsData = [
  {
    groupName: 'Website/Social Media',
    websites: [
      { name: 'Facebook', url: 'https://facebook.com' },
      { name: 'Twitter', url: 'https://twitter.com' },
      { name: 'Instagram', url: 'https://instagram.com' },
      { name: 'LinkedIn', url: 'https://linkedin.com' },
    ],
  },
]

const WebsiteLinks = () => {
  const [websiteGroups, setWebsiteGroups] = useState(websiteGroupsData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSite, setEditingSite] = useState(null)
  const [editedName, setEditedName] = useState('')
  const [editedUrl, setEditedUrl] = useState('')
  const [newSites, setNewSites] = useState([{ name: '', url: '' }])
  const [isBulkEditVisible, setIsBulkEditVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Individual edit
  const handleEdit = (groupIndex, siteIndex) => {
    const site = websiteGroups[groupIndex].websites[siteIndex]
    setEditingSite({ groupIndex, siteIndex })
    setEditedName(site.name)
    setEditedUrl(site.url)
    setIsModalOpen(true)
  }

  // Individual add
  const handleAdd = (groupIndex) => {
    setEditingSite({ groupIndex })
    setNewSites([{ name: '', url: '' }])
    setIsModalOpen(true)
  }

  // Remove individual link
  const handleRemove = (groupIndex, siteIndex) => {
    const updatedGroups = [...websiteGroups]
    updatedGroups[groupIndex].websites.splice(siteIndex, 1)
    setWebsiteGroups(updatedGroups)
  }

  // Save individual edit/add
  const handleSave = () => {
    const updatedGroups = [...websiteGroups]
    const { groupIndex, siteIndex } = editingSite

    if (siteIndex !== undefined) {
      // Edit mode: update the existing link
      updatedGroups[groupIndex].websites[siteIndex] = {
        name: editedName,
        url: editedUrl,
      }
    } else {
      // Add mode: add new links if provided
      newSites.forEach((site) => {
        if (site.name.trim() && site.url.trim()) {
          updatedGroups[groupIndex].websites.push({
            name: site.name,
            url: site.url,
          })
        }
      })
    }

    setWebsiteGroups(updatedGroups)
    setIsModalOpen(false)
  }

  // Update the newSites array when adding links
  const handleNewSiteChange = (index, field, value) => {
    const updatedSites = [...newSites]
    updatedSites[index][field] = value
    setNewSites(updatedSites)
  }

  // Add a new field for adding a link
  const addNewSiteField = () => {
    setNewSites([...newSites, { name: '', url: '' }])
  }

  // Bulk Edit: open the modal for editing all links from the first group
  const openBulkEditModal = () => {
    setIsBulkEditVisible(true)
  }

  // When bulk edit modal is saved, update the websites in the first group
  const handleBulkEditSave = (updatedLinks) => {
    const updatedGroups = [...websiteGroups]
    updatedGroups[0].websites = updatedLinks
    setWebsiteGroups(updatedGroups)
    setIsBulkEditVisible(false)
  }

  return (
    <div>
      {/* Search Input */}

      {websiteGroups.map((group, groupIndex) => {
        // Filter websites using the search term (case-insensitive)
        const filteredWebsites = group.websites.filter((site) =>
          site.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        return (
          <Card
            title={group.groupName}
            key={groupIndex}
            className='mb-4'
            extra={
              <>
                <Button
                  type='primary'
                  icon={<PlusOutlined />}
                  onClick={() => handleAdd(groupIndex)}
                >
                  Add
                </Button>
              </>
            }
          >
            <Col xs={24} sm={12}>
              <Input.Search
                placeholder='Search links by name'
                allowClear
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: 16 }}
              />
            </Col>
            <Row gutter={[16, 16]}>
              {filteredWebsites.map((site, siteIndex) => (
                <Col key={siteIndex} xs={24} sm={12} md={8} lg={6} xl={6}>
                  <Card
                    bordered
                    className='text-center'
                    style={{ position: 'relative', overflow: 'visible' }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        display: 'flex',
                        gap: '8px',
                      }}
                    >
                      <Button
                        type='primary'
                        shape='circle'
                        icon={<EditOutlined />}
                        size='small'
                        onClick={() => handleEdit(groupIndex, siteIndex)}
                      />
                      <Button
                        type='primary'
                        shape='circle'
                        danger
                        icon={<DeleteOutlined />}
                        size='small'
                        onClick={() => handleRemove(groupIndex, siteIndex)}
                      />
                    </div>
                    <a
                      href={site.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 font-semibold'
                    >
                      {site.name}
                    </a>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        )
      })}

      {/* Bulk Edit Modal */}
      <EditLinkNameModal
        visible={isBulkEditVisible}
        setIsModalVisible={setIsBulkEditVisible}
        links={websiteGroups[0].websites}
        onSave={handleBulkEditSave}
      />

      {/* Individual Edit/Add Modal */}
      <Modal
        title={
          editingSite && editingSite.siteIndex !== undefined
            ? 'Edit Website/Social Media'
            : 'Add Website/Social Media'
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        okText='Save'
        cancelButtonProps={{ style: { display: 'none' } }}
        onOk={handleSave}
      >
        <Card>
          {editingSite && editingSite.siteIndex !== undefined ? (
            <>
              <Input
                placeholder='Name'
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className='mb-2'
              />
              <Input
                placeholder='URL'
                value={editedUrl}
                onChange={(e) => setEditedUrl(e.target.value)}
              />
            </>
          ) : (
            <>
              {newSites.map((site, index) => (
                <div key={index} style={{ marginBottom: 16 }}>
                  <Text strong>{`Link ${index + 1}`}</Text>
                  <Space direction='vertical' style={{ width: '100%' }}>
                    <Input
                      placeholder='Name'
                      value={site.name}
                      onChange={(e) =>
                        handleNewSiteChange(index, 'name', e.target.value)
                      }
                    />
                    <Input
                      placeholder='URL'
                      value={site.url}
                      onChange={(e) =>
                        handleNewSiteChange(index, 'url', e.target.value)
                      }
                    />
                  </Space>
                </div>
              ))}
              <Button
                type='dashed'
                onClick={addNewSiteField}
                icon={<PlusOutlined />}
                style={{ width: '100%' }}
              >
                Add Another Link
              </Button>
            </>
          )}
        </Card>
      </Modal>
    </div>
  )
}

export default WebsiteLinks
