import React, { useContext, useEffect, useState } from 'react'
import {
  Upload,
  Button,
  Input,
  Radio,
  Row,
  Col,
  message,
  Checkbox,
  Progress,
} from 'antd'

import {
  PlusOutlined,
  DeleteOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons'
import Swal from 'sweetalert2'
import styled from 'styled-components'
import helpFunctions from '../../../../../../../utils/helpFunctions'
import OtherServiceNonBusinessProperty from '../../../../../../../services/ManageProperty/PlaceListing/Other'
import { AuthContext } from '../../../../../../../contexts/AuthContext'
// import AllPropertyServices from '../../../../../services/ManageProperty/PlaceListing/AllProperty'
import AllPropertyServices from '../../../../../../../services/ManageProperty/PlaceListing/AllProperty'
const StyledButton = styled(Button)`
  position: absolute;
  top: 5px;
  right: 5px;
  transition:
    background 0.3s ease,
    border-bottom-left-radius 0.3s ease;
  &:hover {
    background: white !important;
    border-bottom-right-radius: 30px;
    transition: 0.4s;
  }
`
/** Return a previewable URL or an empty string */
const getPreviewUrl = (file) => {
  // 1. remote URL already known (pre‑loaded images, or upload finished)
  if (file.url) return file.url

  // 2. freshly‑selected file still in memory
  const obj = file.originFileObj // real File or undefined
  if (obj instanceof Blob) {
    return URL.createObjectURL(obj) // ✅ only when it’s a Blob/File
  }

  // 3. nothing we can preview
  return ''
}

export default function MultiipleImage(props) {
  const {
    // keyCat,
    // setKeyCat,
    onImagesChange,
    // initialGallery = [],
    locationForm,
    locationId,
  } = props // NEW (callback)
  const { getFileByName } = helpFunctions
  const { user, access_token } = useContext(AuthContext)
  //main function
  const [initialGallery, setInitialGallery] = useState([])
  console.log(initialGallery, 'test')

  const getNonBusinessProperty = async (locationId) => {
    try {
      const doc = { id: locationId }
      const data = await AllPropertyServices.fetchNonBusinessPropertyById({
        doc,
        access_token,
      })
      if (data) {
        setInitialGallery(data?.data?.locations?.[0]?.media?.gallery)
      }
    } catch {}
  }
  useEffect(() => {
    getNonBusinessProperty(locationId)
  }, [locationId])
  /* ─────────── initial state ─────────── */
  const [categories, setCategories] = useState(['All'])
  const [activekeyCat, setActivekeyCat] = useState('All')

  const subkeyCatMapping = {}

  const [imagesBykeyCat, setImagesBykeyCat] = useState({})
  //
  const [uploadingFiles, setUploadingFiles] = useState({}) // Track upload progress for each file

  //
  const handleUpdateImageProgress = (fileUid, percent) => {
    setUploadingFiles((prevState) => ({
      ...prevState,
      [fileUid]: percent,
    }))
  }
  const [newkeyCat, setNewkeyCat] = useState('')
  const currentCategory = imagesBykeyCat[activekeyCat] || {
    arrayFiles: [],
    gallery: [],
  }
  //
  const handleUpdateImageAlbum = async (
    albumId,
    locationId,
    cat,
    newImages,
    oldImages
  ) => {
    try {
      const formData = new FormData()
      console.log(albumId, locationId, cat, newImages, oldImages, 'gg')

      // Loop through new images and simulate or track progress
      newImages?.forEach((file, index) => {
        const fileObj = file.originFileObj
        if (fileObj) {
          formData.append('gallery', fileObj)
          // Initialize progress for each file (0%)
          // handleUpdateImageProgress(file.uid, 0)

          // // Simulate the upload progress using setTimeout
          // const simulateUploadProgress = (fileUid) => {
          //   let progress = 0

          //   const progressSimulation = () => {
          //     // Increment progress in small steps
          //     progress = Math.min(progress + Math.random() * 10, 100) // Increase progress randomly, but don't exceed 100%

          //     // Update progress state
          //     handleUpdateImageProgress(fileUid, progress)

          //     // If progress reaches 100%, stop the simulation
          //     if (progress >= 100) {
          //       handleUpdateImageProgress(fileUid, 100) // Final progress update
          //     } else {
          //       // Continue simulating progress after a short delay
          //       setTimeout(progressSimulation, 500) // Simulate every 500ms
          //     }
          //   }

          //   // Start the progress simulation
          //   setTimeout(progressSimulation, 500) // Initial delay before progress starts
          // }
          // // Start simulating progress for the current file
          // simulateUploadProgress(file.uid)
        }
      })

      // Append category and old image paths
      formData.append('category_gallery', cat)
      const oldImagePaths = oldImages.map((img) => {
        const fullUrl = img.url
        try {
          const pathname = new URL(fullUrl).pathname // e.g., "/place/2025/05/original-119-1746848010375.png"
          return pathname
          // return pathname.startsWith('/') ? pathname.slice(1) : pathname // remove leading slash
        } catch (e) {
          console.warn('Invalid URL:', fullUrl)
          return img.name // fallback if URL is bad
        }
      })
      formData.append('arrayFiles', JSON.stringify(oldImagePaths))
      console.log(oldImagePaths, newImages, 'oldImagePaths somnak') // Call API to update album
      const data = await OtherServiceNonBusinessProperty.updateAlbum({
        access_token,
        albumId,
        locationId,
        formData,
      })

      if (data) {
        getNonBusinessProperty(locationId)
        message.success('Album updated successfully!')
      }
    } catch (error) {
      console.error('Failed to update album:', error)
      message.error('Failed to update album.')
    }
  }
  const removeImages = async (
    albumId,
    locationId,
    cat,
    newImages,
    oldImages
  ) => {
    try {
      const formData = new FormData()

      // Loop through new images and simulate or track progress
      newImages?.forEach((file, index) => {
        const fileObj = file.originFileObj
        if (fileObj) {
          formData.append('gallery', fileObj)

          // Initialize progress for each file (0%)
          handleUpdateImageProgress(file.uid, 0)

          // Simulate the upload progress using setTimeout
          const simulateUploadProgress = (fileUid) => {
            let progress = 0

            const progressSimulation = () => {
              // Increment progress in small steps
              progress = Math.min(progress + Math.random() * 10, 100) // Increase progress randomly, but don't exceed 100%

              // Update progress state
              handleUpdateImageProgress(fileUid, progress)

              // If progress reaches 100%, stop the simulation
              if (progress >= 100) {
                handleUpdateImageProgress(fileUid, 100) // Final progress update
              } else {
                // Continue simulating progress after a short delay
                setTimeout(progressSimulation, 500) // Simulate every 500ms
              }
            }

            // Start the progress simulation
            setTimeout(progressSimulation, 500) // Initial delay before progress starts
          }

          // Start simulating progress for the current file
          simulateUploadProgress(file.uid)
        }
      })

      // Append category and old image paths
      formData.append('category_gallery', cat)
      const oldImagePaths = oldImages.map((img) => {
        const fullUrl = img.url
        try {
          const pathname = new URL(fullUrl).pathname // e.g., "/place/2025/05/original-119-1746848010375.png"
          return pathname
          // return pathname.startsWith('/') ? pathname.slice(1) : pathname // remove leading slash
        } catch (e) {
          console.warn('Invalid URL:', fullUrl)
          return img.name // fallback if URL is bad
        }
      })

      formData.append('arrayFiles', JSON.stringify(oldImagePaths))
      // Call API to update album
      const data = await OtherServiceNonBusinessProperty.updateAlbum({
        access_token,
        albumId,
        locationId,
        formData,
      })

      if (data) {
        // getNonBusinessProperty(locationId)
        message.success('images remove successfully!')
      }
    } catch (error) {
      console.error('Failed to image remove:', error)
      message.error('Failed to image remove.')
    }
  }

  const handleSaveImageAlbum = async (locationId, cat, newImages) => {
    try {
      // const formData = new FormData()
      const result = Object.entries(newImages).map(([category, files]) => ({
        category,
        files,
      }))
      for (const { category, files } of result) {
        if (!files?.gallery?.length) continue
        const formData = new FormData()

        // Loop over each file to simulate upload progress
        files?.gallery?.forEach((file, index) => {
          const realFile = file.originFileObj || file
          formData.append('gallery', realFile)

          // Initialize progress for each file(0 %)
          handleUpdateImageProgress(file.uid, 0)

          // Simulate the upload progress
          const simulateUploadProgress = (fileUid) => {
            let progress = 0

            const progressSimulation = () => {
              progress = Math.min(progress + Math.random() * 10, 100) // Increase progress randomly, but don't exceed 100%
              // Update the progress
              handleUpdateImageProgress(fileUid, progress)

              // Stop the simulation when progress reaches 100%
              if (progress >= 100) {
                handleUpdateImageProgress(fileUid, 100)
              } else {
                // Continue simulating progress after a delay
                setTimeout(progressSimulation, 500)
              }
            }

            // Start the progress simulation
            setTimeout(progressSimulation, 500)
          }

          // Start simulating progress for the current file
          simulateUploadProgress(file.uid)
        })

        const category_gallery = category
        const data = await OtherServiceNonBusinessProperty.saveAlbum({
          access_token,
          formData,
          locationId,
          category_gallery,
        })

        if (data) {
          getNonBusinessProperty(locationId)
          message.success('Album add successfully!')
          // setLastUploadedCategory((prev) =>
          //   prev.includes(category) ? prev : [...prev, category]
          // )
        }
      }
    } catch (error) {
      console.error('Failed to update album:', error)
    }
  }
  /** Create a brand‑new album – only if this category does NOT exist yet */

  const removeAlbum = async (locationId, albumId) => {
    try {
      const data = await OtherServiceNonBusinessProperty.removeAlbum({
        access_token,
        locationId,
        albumId,
      })
      if (data) {
        message.success('Album add successfully!')
      }
    } catch (error) {
      console.error('Failed to update album:', error)
    }
  }

  /* ─────────── helpers ─────────── */
  const getFileObject = (file) => file.originFileObj || file
  //

  /* ─────────── update sub-categories on main cat change ─────────── */
  // useEffect(() => {
  //   if (keyCat && subkeyCatMapping[keyCat]) {
  //     setCategories(subkeyCatMapping[keyCat])
  //     setActivekeyCat(subkeyCatMapping[keyCat])
  //   }
  // }, [keyCat])

  useEffect(() => {
    if (!initialGallery.length) return
    // 1. Build the category map and image objects
    const next = {}
    const foundCategories = new Set(['All']) // start with 'All'
    initialGallery.forEach(({ category_gallery, files, _id }) => {
      const preloadedImages = files.map((path, idx) => {
        const name = path.split('/').pop()
        return {
          uid: `rc-${category_gallery}-${idx}`,
          name,
          status: 'done',
          url: getFileByName(path),
          type: 'image/*',
        }
      })

      if (!next[category_gallery]) {
        next[category_gallery] = { arrayFiles: [], gallery: [], _id: _id }
      }

      next[category_gallery].arrayFiles = preloadedImages
      foundCategories.add(category_gallery)
    })
    setImagesBykeyCat(next)
    setCategories(Array.from(foundCategories)) // 👈 update your categories from initialGallery
    setActivekeyCat(Array.from(foundCategories)[1] || 'All') // skip 'All' for default active
  }, [initialGallery])

  /* ─────────── internal change handlers ─────────── */
  const syncAndNotify = (next) => {
    setImagesBykeyCat(next)
    onImagesChange?.([
      {
        category_gallery: activekeyCat,
        gallery: next[activekeyCat],
      },
    ])
  }

  const handleImageChange =
    (cat) =>
    ({ fileList }) => {
      const safeFileList = Array.isArray(fileList) ? fileList : []
      const oldImages = safeFileList.filter((f) => !f.originFileObj)
      const newImages = safeFileList.filter((f) => f.originFileObj)
      const currentAlbum = imagesBykeyCat[cat]
      const albumId = currentAlbum?._id

      console.log('Album ID:', albumId)
      console.log('Category:', cat)
      console.log('Old Files:', oldImages)
      console.log('New Files:', newImages)
      console.log('locationId:', locationId)

      if (albumId && cat && locationId) {
        // ✅ Update existing album
        console.log('on update')
        handleUpdateImageAlbum(albumId, locationId, cat, newImages, oldImages)
      }
      // else if (!albumId && locationId && cat && cat !== 'All') {
      //   // ✅ Save new album if no albumId
      //   console.log('on save')
      //   handleSaveImageAlbum(locationId, cat, {
      //     [cat]: {
      //       ...currentAlbum,
      //       arrayFiles: oldImages,
      //       gallery: newImages,
      //     },
      //   })
      // }
      // ✅ Always update UI state
      setImagesBykeyCat((prev) => ({
        ...prev,
        [cat]: {
          ...currentAlbum,
          arrayFiles: oldImages,
          gallery: newImages,
        },
      }))
    }

  const handleImageRemove = async (cat, file) => {
    const isPreloaded = !file.originFileObj && file.uid?.startsWith('init')
    const current = imagesBykeyCat[cat] || { arrayFiles: [], gallery: [] }
    let updatedGalleryList = current.arrayFiles
    let updatedGallery = current.gallery
    let updateOldImages = current.arrayFiles

    if (isPreloaded) {
      updatedGalleryList = updatedGalleryList.filter((f) => f.uid !== file.uid)
      // console.log(updatedGalleryList, 'updatedGalleryList');
    } else {
      updatedGallery = updatedGallery.filter((f) => f.uid !== file.uid)
      // console.log(updatedGalleryList, 'updatedGalleryList');
    }
    const removeDuplicateFile = updateOldImages.filter(
      (f) => f.uid !== file.uid
    )
    // Update the category's images
    const updated = {
      ...current,
      arrayFiles: removeDuplicateFile,
      gallery: updatedGallery,
    }
    const nextImagesBykeyCat = {
      ...imagesBykeyCat,
      [cat]: updated,
    }
    // Sync the new state with the parent
    syncAndNotify(nextImagesBykeyCat)

    // 🔥 Remove from backend

    const albumId = imagesBykeyCat[cat]?._id

    if (isPreloaded || (albumId && locationId)) {
      const keptOldImages = removeDuplicateFile
      await removeImages(albumId, locationId, cat, [], keptOldImages)
    }
  }

  //end handle remove
  /* ─────────── preview ─────────── */
  const handleImagePreview = (file) => {
    const fileObj = getFileObject(file)
    // if the file has a .url (preload), use that; otherwise blobify the File
    const previewUrl =
      file.url ||
      (fileObj.type?.startsWith('image') ? URL.createObjectURL(fileObj) : null)
    if (!previewUrl) return

    Swal.fire({
      imageUrl: previewUrl,
      imageWidth: '50%',
      imageHeight: 'auto',
      showConfirmButton: false,
      width: '50%',
    })
  }

  /* ─────────── add sub-category ─────────── */
  const handleAddkeyCat = async () => {
    const name = newkeyCat.trim()
    if (!name) return
    /* duplicate?  show a toast & stop */
    if (imagesBykeyCat[name] || categories.includes(name)) {
      message.warning(`“${name}” is already in the list.`)
      return
    }
    try {
      const category_gallery = name
      const data = await OtherServiceNonBusinessProperty.saveAlbum({
        access_token,
        locationId,
        category_gallery,
      })
      if (data) {
        getNonBusinessProperty(locationId)
        message.success(' album has created ')
        if (!name) return
        if (!categories.includes(name)) {
          setCategories((prev) => [...prev, name])
          syncAndNotify({ ...imagesBykeyCat, [name]: [] })
          setActivekeyCat(name)
        }
        setNewkeyCat('')
      }
    } catch (error) {
      console.log(error, 'error')

      // message.error('save album success')
    }
  }
  const beforeUpload = (file) => {
    if (!file.type.startsWith('image')) {
      message.error('Only image files are allowed')
      return Upload.LIST_IGNORE
    }
    return false // prevent auto upload
  }
  /* ─────────── render ─────────── */
  return (
    <div>
      <h2 className='text-lg font-semibold'>Upload Images</h2>
      <p className='text-sm mb-2'>Please select image category</p>

      {/* add category */}
      <div className='mb-4 flex items-center gap-2'>
        <Input
          style={{ width: '50%' }}
          placeholder='New category'
          value={newkeyCat}
          onChange={(e) => setNewkeyCat(e.target.value)}
          size='small'
        />
        <Button
          className='border-none text-blue-400'
          size='small'
          icon={<PlusOutlined />}
          onClick={() => handleAddkeyCat()}
        >
          Add new
        </Button>
      </div>
      {/* category selector */}
      <Radio.Group
        value={activekeyCat}
        onChange={(e) => {
          const cat = e.target.value
          setActivekeyCat(cat)
          onImagesChange?.([{ category: cat, files: imagesBykeyCat[cat] }])
        }}
        style={{ marginBottom: 8 }}
      >
        {categories?.map((cat) => (
          <>
            <Radio key={cat} value={cat} style={{ marginRight: 16 }}>
              {cat}
              {cat !== 'All' ? (
                <Button
                  style={{ border: 'none' }}
                  icon={<DeleteOutlined />}
                  size='small'
                  onClick={async () => {
                    const currentAlbum = imagesBykeyCat[cat]
                    const albumId = currentAlbum?._id

                    if (!albumId || !locationId) {
                      message.warning('Album not found.')
                      return
                    }
                    const confirm = await Swal.fire({
                      title: 'Are you sure?',
                      text: `Remove album "${cat}"? This cannot be undone.`,
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonText: 'Yes, remove it!',
                    })
                    if (confirm.isConfirmed) {
                      // Call the removeAlbum method with the category's albumId and locationId
                      await removeAlbum(locationId, albumId)
                      // Remove from local state
                      const nextImages = { ...imagesBykeyCat }
                      delete nextImages[cat] // Delete the specific category's images
                      const nextCategories = categories.filter(
                        (category) => category !== cat
                      ) // Remove the category from the list
                      const nextActive =
                        nextCategories[1] || nextCategories[0] || 'All' // Set the new active category (if available)
                      setImagesBykeyCat(nextImages) // Update the images state
                      setCategories(nextCategories) // Update the categories state
                      setActivekeyCat(nextActive) // Update the active category state
                    }
                  }}
                ></Button>
              ) : (
                ''
              )}
            </Radio>
          </>
        ))}
      </Radio.Group>

      {/* drag-drop */}
      <Upload.Dragger
        multiple
        accept='image/*'
        listType='picture-card'
        fileList={[
          ...(imagesBykeyCat[activekeyCat]?.arrayFiles || []),
          ...(imagesBykeyCat[activekeyCat]?.gallery || []),
        ]}
        beforeUpload={beforeUpload}
        onChange={handleImageChange(activekeyCat)}
        onPreview={handleImagePreview}
        onRemove={(file) => handleImageRemove(activekeyCat, file)}
        // ref={fileInputRef}
        style={{ width: '100%' }}
        iconRender={() => <CloudUploadOutlined style={{ fontSize: 48 }} />}
        itemRender={() => null} // we draw thumbs ourselves
      >
        <p className='ant-upload-hint'> click to upload images</p>
      </Upload.Dragger>
      <Row gutter={[16, 16]} className='mt-4'>
        {[
          ...(imagesBykeyCat[activekeyCat]?.arrayFiles || []),
          ...(imagesBykeyCat[activekeyCat]?.gallery || []),
        ]
          .filter((f) => f.type?.startsWith('image'))
          .map((file) => {
            // const url = file.url || URL?.createObjectURL(getFileObject(file))
            const url = getPreviewUrl(file)

            const uploadProgress = uploadingFiles[file.uid] || 0

            return (
              <Col key={file.uid} xs={12} sm={8} md={6} lg={4}>
                <div
                  style={{ position: 'relative', width: '100%', height: 100 }}
                >
                  <img
                    src={url}
                    alt='preview'
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 8,
                      cursor: 'pointer',
                      filter:
                        uploadProgress !== 100 && uploadProgress !== 0
                          ? 'blur(1px)'
                          : 'blur(0px)',
                      opacity: uploadProgress ? 1 : 1,
                    }}
                    onClick={() => handleImagePreview(file)}
                  />
                  <StyledButton
                    type='text'
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleImageRemove(activekeyCat, file)}
                  />
                  {uploadProgress ? <Progress percent={uploadProgress} /> : ''}
                </div>
              </Col>
            )
          })}
      </Row>
    </div>
  )
}
