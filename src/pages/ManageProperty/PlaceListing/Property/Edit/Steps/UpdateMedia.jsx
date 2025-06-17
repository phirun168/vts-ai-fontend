import React, { useEffect, useState } from 'react'
import { Modal, Form, Card, Row, Col, message } from 'antd'
import MultipleImage from './PlaceImgVideo/MultiipleImage'
import UploadImage from './PlaceImgVideo/UploadThumbnail'
import UploadVideo from './PlaceImgVideo/UploadVideo'
import AllPropertyServices from '../../../../../../services/ManageProperty/PlaceListing/AllProperty'

export default function PlaceImageAndVideoModal({
  open,
  setOpen, // boolean setter from parent  ⇢  setOpenMedia
  propMedia = {}, // the record we’re editing
  access_token,
  //   onSave, // optional callback to refresh list
}) {
  const [form] = Form.useForm()
  const [media, setMedia] = useState([])
  const [locationId, setLocationId] = useState()
  //
  const getNonBusinessProperty = async (record) => {
    try {
      const doc = { id: record?._id }
      const data = await AllPropertyServices.fetchNonBusinessPropertyById({
        doc,
        access_token,
      })
      if (data) {
        console.log(data?.data?.locations?.[0]?.media, 'me')
        setMedia(data?.data?.locations?.[0]?.media)
      }
    } catch (err) {
      console.log(err, 'error on me')
    }
  }
  useEffect(() => {
    if (!propMedia) return
    getNonBusinessProperty(propMedia)
    setLocationId(propMedia?._id)
  }, [propMedia, open])
  /* ─── preload existing media once propMedia arrives ─── */
  useEffect(() => {
    if (!propMedia) return

    form.setFieldsValue({
      // adapt these keys to your API shape
      thumbnail: propMedia.thumbnail || [],
      video: propMedia.video || [],
      gallery: propMedia.gallery || [],
    })
  }, [propMedia, form])

  /* ─── keep gallery in sync when user adds/removes pics ─── */
  const handleImagesChange = (images) => {
    form.setFieldsValue({ gallery: images })
  }

  /* ─── validate + bubble up to parent / server ─── */
  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      // 🔗  call your update-API here, e.g.   await updateMedia(propMedia._id, values);
      //   onSave?.(values) // refresh list in parent
      setOpen(false) // close dialog
      message.success('Media updated')
    } catch {
      /* validation failed – do nothing */
    }
  }

  return (
    <Modal
      open={open}
      title='Update Media'
      width={1000}
      onCancel={() => setOpen(false)}
      onOk={handleSave}
      okText='Save'
      destroyOnClose
    >
      <div className='p-4 space-y-4'>
        <Form form={form} layout='vertical'>
          {/* ✅ hidden field so “gallery” exists in the form schema */}
          <Form.Item name='gallery' noStyle>
            <input type='hidden' />
          </Form.Item>

          <Card>
            <h2 className='text-lg font-semibold'>
              Upload Thumbnail&nbsp;&amp;&nbsp;Video
            </h2>
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <UploadImage form={form} initialImage={media?.image?.[0]} />
              </Col>
              <Col xs={24}>
                <UploadVideo form={form} initialVideo={media?.video?.[0]} />
              </Col>
            </Row>
          </Card>
        </Form>
        <MultipleImage
          onImagesChange={handleImagesChange}
          initialGallery={media?.gallery}
          locationForm={form}
          locationId={locationId}
        />
      </div>
    </Modal>
  )
}
