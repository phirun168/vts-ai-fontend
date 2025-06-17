import React, { useState } from 'react'
import { Modal, Card, Input } from 'antd'

const SelectAlbumModal = ({ visible, albums, onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAlbums = albums?.filter((album) =>
    album?.albumName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  )

  return (
    <Modal
      open={visible}
      title='Select Album Name'
      onCancel={onClose}
      footer={null}
    >
      <Input
        placeholder='Search image name...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      {filteredAlbums?.map((album) => (
        <Card
          key={album.albumName}
          style={{ marginBottom: 8, cursor: 'pointer' }}
          onClick={() => onSelect(album)}
        >
          {album.albumName}
        </Card>
      ))}
      {filteredAlbums?.length === 0 && <p>No albums found.</p>}
    </Modal>
  )
}

export default SelectAlbumModal
