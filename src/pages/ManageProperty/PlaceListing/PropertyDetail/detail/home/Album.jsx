import React, { useContext, useEffect, useState } from 'react'
import { Tabs, Card, Row, Col, Button, Modal } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import AddAlbumModal from './Add'
import EditAlbumModal from './EditAlbumModal'
import SelectAlbumModal from './SelectAlbumModal' // Optional, if you want searchable selection
import { AuthContext } from '../../../../../../contexts/AuthContext'
import helpFunctions from '../../../../../../utils/helpFunctions'

const { TabPane } = Tabs
const DisplayVideoImage = (props) => {
  //
  const { username, access_token } = useContext(AuthContext)
  const { getFileByName } = helpFunctions
  //
  const { media } = props

  const [albums, setAlbums] = useState()
  const [video, setVideo] = useState()
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [albumToEdit, setAlbumToEdit] = useState(null)
  const [selectModalVisible, setSelectModalVisible] = useState(false)
  const [formData, setFormData] = useState({ albums: [] })
  const [isModalVisible, setIsModalVisible] = useState(false)

  // Open Edit modal for an existing album.
  const openEditModal = (album) => {
    setAlbumToEdit(album)
    setEditModalVisible(true)
  }

  // Open global select modal (if using)
  const openSelectModal = () => {
    setSelectModalVisible(true)
  }

  // Handle album selection from global select modal.
  const handleAlbumSelect = (album) => {
    setAlbumToEdit(album)
    setSelectModalVisible(false)
    setEditModalVisible(true)
  }

  // Handle saving updated album from EditAlbumModal.
  const handleSaveAlbum = (updatedAlbum) => {
    setAlbums((prev) =>
      prev.map((album) =>
        album.albumName === updatedAlbum.albumName ? updatedAlbum : album
      )
    )
  }

  // Handle adding a new album from AddAlbumModal.
  const handleAddAlbum = (newAlbum) => {
    setAlbums((prev) => [...prev, newAlbum])
  }

  // Remove an entire album.
  const handleRemoveAlbum = (albumName) => {
    Modal.confirm({
      title: 'Are you sure you want to remove this album?',
      onOk: () => {
        setAlbums((prev) =>
          prev.filter((album) => album.albumName !== albumName)
        )
      },
    })
  }

  // Remove a media item from an album.
  const handleRemoveMedia = (albumName, mediaId) => {
    setAlbums((prev) =>
      prev.map((album) =>
        album.albumName === albumName
          ? {
              ...album,
              media: album.media.filter((item) => item.id !== mediaId),
            }
          : album
      )
    )
  }
  useEffect(() => {
    if (media?.gallery) {
      setAlbums(media?.gallery)
    }
    if (media?.video) {
      setVideo(media?.video?.[0])
    }
  }, [media])
  // Render albums in a simple tab.
  const renderMediaItems = (filter) => {
    const allFiles = (albums || []).flatMap((album) =>
      (album?.files || []).map((file) => ({
        ...file,
        filePath: Object.keys(file)
          .filter((key) => !isNaN(key))
          .sort((a, b) => a - b)
          .map((key) => file[key])
          .join(''),
        albumName: album.albumName,
        albumId: album._id,
        category: album.category_gallery,
      }))
    )

    return (
      <>
        {filter === 'image' ? (
          <Tabs defaultActiveKey={albums?.[0]?._id}>
            {albums?.map((album) =>
              album?.category_gallery?.trim().toLowerCase() !== 'all' ? (
                <TabPane
                  tab={
                    <>
                      <span className='mx-4'>{album.category_gallery}</span>
                    </>
                  }
                  key={album._id}
                >
                  <Card
                    title={
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>{album.category_gallery}</span>
                        <div>
                          <Button
                            type='link'
                            onClick={() => openEditModal(album)}
                          >
                            <EditOutlined /> Edit
                          </Button>
                          <Button
                            type='link'
                            danger
                            onClick={() => handleRemoveAlbum(album._id)}
                          >
                            <DeleteOutlined /> Remove
                          </Button>
                        </div>
                      </div>
                    }
                    style={{ marginBottom: 16 }}
                  >
                    <Row gutter={[16, 16]}>
                      {album?.files?.map((file, index) => (
                        <Col key={index} xs={24} sm={12} md={8} lg={6}>
                          <div style={{ position: 'relative' }}>
                            {file.endsWith('.mp4') ? (
                              <video
                                controls
                                style={{
                                  width: '100%',
                                  height: '200px',
                                  objectFit: 'cover',
                                }}
                              >
                                <source
                                  src={getFileByName('/' + file)}
                                  type='video/mp4'
                                />
                                Your browser does not support the video tag.
                              </video>
                            ) : (
                              <img
                                src={getFileByName('/' + file)}
                                alt='media'
                                style={{
                                  width: '100%',
                                  height: '200px',
                                  objectFit: 'cover',
                                }}
                              />
                            )}
                            <Button
                              type='primary'
                              danger
                              shape='circle'
                              icon={<DeleteOutlined />}
                              size='small'
                              style={{ position: 'absolute', top: 8, right: 8 }}
                              onClick={() =>
                                handleRemoveMedia(album.albumName, file.id)
                              }
                            />
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Card>
                </TabPane>
              ) : (
                ''
              )
            )}
          </Tabs>
        ) : filter === 'video' ? (
          <div>
            <video
              controls
              style={{
                width: '350px',
                height: '200px',
                objectFit: 'cover',
              }}
            >
              <source src={getFileByName('/' + video)} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : filter === 'all' ? (
          <Card
            title='All '
            // extra={
            //   <div>
            //     <Button
            //       type='primary'
            //       onClick={() => setIsModalVisible(true)}
            //       style={{ marginRight: 8 }}
            //     >
            //       Add Album
            //     </Button>
            //     <Button type='primary' onClick={openSelectModal}>
            //       Select an Album to Edit
            //     </Button>
            //   </div>
            // }
            style={{ marginBottom: 16 }}
          >
            <Row gutter={[16, 16]}>
              {allFiles?.map((file, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <div style={{ position: 'relative' }}>
                    {/* {file.endsWith('.mp4') ? (
                      <video
                        controls
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                        }}
                      >
                        <source
                          src={getFileByName('/' + file)}
                          type='video/mp4'
                        />
                        Your browser does not support the video tag.
                      </video>
                    ) : ( */}
                    {console.log(file, '2342 file me')}
                    <img
                      src={getFileByName('/' + file?.filePath)}
                      alt='media'
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                      }}
                    />
                    {/* )} */}
                    <Button
                      type='primary'
                      danger
                      shape='circle'
                      icon={<DeleteOutlined />}
                      size='small'
                      style={{ position: 'absolute', top: 8, right: 8 }}
                      onClick={() => handleRemoveMedia(file.albumName, file.id)}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        ) : (
          ''
        )}
      </>
    )
    // return albums?.map((album) => {
    //   const filteredMedia = filter === 'image' ? album : ''

    //   if (filteredMedia?.length === 0) return null
    //   console.log(album, '23456789')

    //   return (
    //     <Card
    //       key={album._id}
    //       title={
    //         <div
    //           style={{
    //             display: 'flex',
    //             justifyContent: 'space-between',
    //             alignItems: 'center',
    //           }}
    //         >
    //           <span>{album?.category_gallery}</span>
    //           <div>
    //             <Button type='link' onClick={() => openEditModal(album)}>
    //               <EditOutlined /> Edit
    //             </Button>
    //             <Button
    //               type='link'
    //               danger
    //               onClick={() => handleRemoveAlbum(album._id)}
    //             >
    //               <DeleteOutlined /> Remove Album
    //             </Button>
    //           </div>
    //         </div>
    //       }
    //       style={{ marginBottom: 16 }}
    //     >
    //       <Row gutter={[16, 16]}>
    //         {filteredMedia?.files?.map((file, index) => (
    //           <Col key={index} xs={24} sm={12} md={8} lg={6}>
    //             <div style={{ position: 'relative' }}>
    //               {filter === 'image' ? (
    //                 <img
    //                   src={getFileByName('/' + file)}
    //                   alt='media'
    //                   style={{
    //                     width: '100%',
    //                     height: '200px',
    //                     objectFit: 'cover',
    //                   }}
    //                 />
    //               ) : (
    //                 ''
    //               )}
    //               {/*
    //               :
    //               item.url.endsWith('.mp4') ? (
    //                 <video
    //                   controls
    //                   style={{
    //                     width: '100%',
    //                     height: '200px',
    //                     objectFit: 'cover',
    //                   }}
    //                 >
    //                   <source src={item.url} type='video/mp4' />
    //                   Your browser does not support the video tag.
    //                 </video>
    //               )
    //                 :
    //                 (
    //                 <iframe
    //                   src={item.url}
    //                   title='Embedded Video'
    //                   style={{
    //                     width: '100%',
    //                     height: '200px',
    //                     objectFit: 'cover',
    //                   }}
    //                   frameBorder='0'
    //                   allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
    //                   allowFullScreen
    //                 />
    //               )} */}
    //               <Button
    //                 type='primary'
    //                 danger
    //                 shape='circle'
    //                 icon={<DeleteOutlined />}
    //                 size='small'
    //                 style={{ position: 'absolute', top: 8, right: 8 }}
    //                 onClick={() => handleRemoveMedia(album.albumName, item.id)}
    //               />
    //             </div>
    //           </Col>
    //         ))}
    //       </Row>
    //     </Card>
    // )
    // })
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }} className='flex justify-end'>
        <div>
          <Button
            type='primary'
            onClick={() => setIsModalVisible(true)}
            style={{ marginRight: 8 }}
          >
            Add Album
          </Button>
          <Button type='primary' onClick={openSelectModal}>
            Select an Album to Edit
          </Button>
        </div>
      </div>
      <Tabs defaultActiveKey='all'>
        <TabPane tab={<span className=' mx-5'>All</span>} key='all'>
          {renderMediaItems('all')}
        </TabPane>
        <TabPane tab={<span className=' mx-5'>Video</span>} key='video'>
          {renderMediaItems('video')}
        </TabPane>
        <TabPane tab={<span className=' mx-5'>Images</span>} key='image'>
          {renderMediaItems('image')}
        </TabPane>
      </Tabs>
      <SelectAlbumModal
        visible={selectModalVisible}
        albums={albums}
        onSelect={handleAlbumSelect}
        onClose={() => setSelectModalVisible(false)}
      />
      <EditAlbumModal
        visible={editModalVisible}
        album={albumToEdit}
        onClose={() => setEditModalVisible(false)}
        onSave={handleSaveAlbum}
      />
      <AddAlbumModal
        formData={formData}
        setFormData={setFormData}
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
      />
    </div>
  )
}

export default DisplayVideoImage
