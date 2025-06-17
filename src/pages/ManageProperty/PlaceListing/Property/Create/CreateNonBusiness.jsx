import React, { useState, useEffect } from 'react'
import { Modal, Steps, Button, Form, Input, message, Divider } from 'antd'
import Swal from 'sweetalert2'
import PlaceInfo from './Steps/PlaceInfo'
import PlaceAddress from './Steps/PlaceAddress'
import PlaceImgVideo from './Steps/PlaceImgVideo'
import ReviewImportNonBusinessServices from '../../../../../services/ManageProperty/PlaceListing/ReviewImport'
import AllPropertyServices from '../../../../../services/ManageProperty/PlaceListing/AllProperty'
import dayjs from 'dayjs'
import AddOtherAlbum from '../../other/AddOtherAlbum'
import OtherServiceNonBusinessProperty from '../../../../../services/ManageProperty/PlaceListing/Other'

const { Step } = Steps
const { TextArea } = Input

export default function CreateNonBusiness(props) {
  const { open, setOpen, propData, username, access_token, getAllProperty } =
    props
  const [current, setCurrent] = useState(0)
  //
  const [form1] = Form.useForm()
  const [form2] = Form.useForm()
  const [form3] = Form.useForm()
  const [formSocial] = Form.useForm()
  const [formReference] = Form.useForm()
  const [scheduleForm] = Form.useForm()
  //
  const [category, setCategory] = useState('')
  const [keyCat, setKeyCat] = useState()
  const [nonBusinessData, setNonBusinessData] = useState()
  const [socialMedia, setSocialMedia] = useState([])
  const [referenceLink, setReferencesLink] = useState([])
  const [openDay, setOpenDay] = useState()
  const [openTimes, setTimes] = useState()
  const [googleMap, setGoogleMap] = useState()
  //

  const [btn_loading, setBtnLoading] = useState(false)
  // State to control the "Reason for save draft" modal
  const [draftModalVisible, setDraftModalVisible] = useState(false)
  const [draftReason, setDraftReason] = useState('')
  //
  const [openAlbum, setOpenAlbum] = useState(false)
  const [onCheckAddAlbum, setOnCheckAddAlbum] = useState(false)
  //
  const [locationId, setLocationId] = useState()
  //
  const onHandleCheckAddOtherAlbum = () => {
    setOnCheckAddAlbum(true)
  }
  const steps = [
    {
      title: 'Place Info',
      content: (
        <PlaceInfo
          access_token={access_token}
          form={form1}
          category={category}
          setCategory={setCategory}
          keyCat={keyCat}
          setKeyCat={setKeyCat}
          socialMedia={socialMedia}
          referenceLink={referenceLink}
          nonBusinessData={nonBusinessData}
          openDay={openDay}
          openTimes={openTimes}
          formSocial={formSocial}
          formReference={formReference}
          scheduleForm={scheduleForm}
        />
      ),
      form: form1,
    },
    {
      title: 'Place Address',
      content: (
        <PlaceAddress
          form={form2}
          access_token={access_token}
          googleMap={googleMap}
        />
      ),
      form: form2,
    },
    {
      title: 'Place Image & Video',
      content: (
        <PlaceImgVideo
          form={form3}
          keyCat={keyCat}
          setKeyCat={setKeyCat}
          onHandleCheckAddOtherAlbum={onHandleCheckAddOtherAlbum}
        />
      ),
      form: form3,
    },
  ]

  const next = async () => {
    setBtnLoading(false)
    try {
      await steps[current].form.validateFields()
      if (current === 0) {
        await formReference.validateFields()
      }
      setCurrent(current + 1)
    } catch (err) {
      console.error('Validation failed:', err)
    }
  }

  const prev = () => {
    setBtnLoading(false)
    setCurrent(current - 1)
  }

  //
  /* put this inside CreateNonBusiness, above return */
  const resetWizard = () => {
    // clear all Ant-Design forms
    form1.resetFields()
    form2.resetFields()
    form3.resetFields()
    formSocial.resetFields()
    formReference.resetFields()
    scheduleForm.resetFields()

    // clear React state
    setCurrent(0) // ⬅️ back to STEP 1
    setCategory('')
    setKeyCat(undefined)
    setNonBusinessData(undefined)
    setSocialMedia([])
    setReferencesLink([])
    setOpenDay(undefined)
    setTimes(undefined)
    setGoogleMap(undefined)
  }
  useEffect(() => {
    setCurrent(0)
  }, [open])
  const handleSubmit = async (draftValue) => {
    setBtnLoading(true)
    try {
      /* ✅ 1) Validate all the forms you care about */
      await Promise.all([
        form1.validateFields(),
        form2.validateFields(),
        form3.validateFields(),
        formSocial.validateFields(),
        formReference.validateFields(),
        scheduleForm.validateFields(),
      ])

      /* ✅ 2) Grab their data */
      const infoMain = form1.getFieldsValue(true) // true = nested
      const infoSocial = formSocial.getFieldsValue(true)
      const address = form2.getFieldsValue(true)
      const media = form3.getFieldsValue(true)
      // const referenceLinks = formReference.getFieldsValue(true)
      const schedule = scheduleForm.getFieldsValue(true)

      const { video, image, gallery } = form3.getFieldsValue([
        'video',
        'image',
        'gallery',
      ])
      const {
        nameEn,
        nameKh,
        ownership,
        mainCategory,
        subCategory,
        keyword,
        activity,
        descriptionKh,
        descriptionEn,
        star,
        typeOfPlace,
        typeOfFood,
        phone1,
        phone2,
        _id,
        placeId,
        referenceLinks,
      } = form1.getFieldsValue([
        'nameEn',
        'nameKh',
        'ownership',
        'mainCategory',
        'subCategory',
        'keyword',
        'activity',
        'descriptionKh',
        'descriptionEn',
        'star',
        'typeOfPlace',
        'typeOfFood',
        'phone1',
        'phone2',
        '_id',
        'placeId',
        'referenceLinks',
      ])

      const info = {
        placeId: 'PP010',
        nameEn,
        nameKh,
        ownership,
        mainCategory: mainCategory,
        subCategory,
        keyword,
        activity: activity?.map((item) => item?.value),
        descriptionKh,
        descriptionEn,
        star,
        typeOfPlace: typeOfPlace,
        typeOfFood,
        phone1,
        phone2,
        links: infoSocial?.links,
      }

      const mediaInfo = {
        videos: [video],
        images: image,
        gallery: gallery?.[0],
      }
      const doc1 = {
        id: _id,
        info: {
          ...info,
        },
        address,

        schedule: schedule,
        images: mediaInfo?.images,
        videos: mediaInfo?.videos,
        gallery: mediaInfo?.gallery?.gallery,
        category_gallery: mediaInfo?.gallery?.category_gallery,
        draftReason: draftValue || '',
      }

      const formData = new FormData()
      formData.append('username', username)
      formData.append('info', JSON.stringify(info))
      formData.append('address', JSON.stringify(address))
      formData.append('referenceLinks', JSON.stringify(referenceLinks))
      formData.append('schedule', JSON.stringify(schedule))
      formData.append('category_gallery', mediaInfo?.gallery?.category_gallery)
      formData.append('images', mediaInfo?.images)
      current === 0 || current === 1
        ? formData.append('status', 'Draft')
        : formData.append('status', 'Pending')
      current === 0 || current === 1
        ? formData.append('draftReason', draftValue)
        : ''

      //

      mediaInfo?.videos?.forEach((f) =>
        formData.append('videos', f?.originFileObj ?? f)
      )
      if (gallery?.[0]?.gallery?.length) {
        gallery?.[0]?.gallery?.forEach((f) =>
          formData.append('gallery', f.originFileObj ?? f)
        )
      }
      //

      console.log('FINAL DOC  created non business property→', doc1)
      try {
        const doc = formData
        const data = await AllPropertyServices.createNonBusinessProperty({
          doc,
          access_token,
        })
        if (data) {
          if (mediaInfo?.gallery?.category_gallery !== 'All') {
            OtherServiceNonBusinessProperty.saveAlbum({
              access_token,
              locationId: data?.data?._id,
              category_gallery: 'All',
            })
          } else if (
            gallery?.[0]?.gallery?.length === undefined ||
            gallery?.[0]?.gallery?.length === '' ||
            gallery?.[0]?.gallery?.length === null ||
            gallery?.[0]?.gallery?.length === 0
          ) {
            OtherServiceNonBusinessProperty.saveAlbum({
              access_token,
              locationId: data?.data?._id,
              category_gallery: 'All',
            })
          }
          Swal.fire({
            icon: 'success',
            title: 'Updated',
            timer: 1200,
            showConfirmButton: false,
          }).then(() => {
            resetWizard()
            setOpen(false)
            setBtnLoading(false)
            getAllProperty()
            setOpenAlbum(onCheckAddAlbum)
            setLocationId(data?.data?._id)
          })
        }
      } catch (erro) {
        console.log(erro)
        setBtnLoading(false)
      } finally {
        setBtnLoading(false)
      }
    } catch (err) {
      console.error('Validation failed', err)
      setBtnLoading(false)
    }
  }

  return (
    <>
      <AddOtherAlbum
        open={openAlbum}
        setOpen={setOpenAlbum}
        setOnCheckAddAlbum={setOnCheckAddAlbum}
        locationId={locationId}
      />
      <Modal
        open={open}
        title='Create Place Non Business'
        onCancel={async () => {
          const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Changes you made may not be saved.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, close it',
            cancelButtonText: 'No, keep editing',
          })

          if (result.isConfirmed) {
            setOpen(false)
            resetWizard() // Optional: clear form data on cancel
          }
        }}
        footer={null}
        width={1000}
      >
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <div style={{ marginTop: 24, minHeight: 200 }}>
          {steps[current].content}
        </div>

        <div style={{ marginTop: 24 }} className='flex justify-end'>
          {current > 0 && (
            <Button style={{ marginRight: 8 }} onClick={prev}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button
              loading={btn_loading}
              className='mx-2'
              type='primary'
              onClick={async () => {
                if (current === 0 || current === 1) {
                  await steps[current].form.validateFields()
                  await formReference.validateFields()
                  const result = await Swal.fire({
                    title: 'Reason for Draft',
                    input: 'textarea',
                    inputPlaceholder:
                      'Enter your reason for saving as draft...',
                    inputAttributes: {
                      'aria-label': 'Reason',
                    },
                    inputValidator: (value) => {
                      if (!value.trim()) {
                        return 'Please enter a reason!'
                      }
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Save Draft',
                    cancelButtonText: 'Cancel',
                  })

                  if (result.isConfirmed) {
                    handleSubmit(result.value)
                  }
                }
              }}
            >
              Save Draft
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type='primary' onClick={next}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button loading={btn_loading} type='primary' onClick={handleSubmit}>
              Save Confirm
            </Button>
          )}
        </div>
      </Modal>

      {/* Draft Reason Modal */}
      <Modal
        open={draftModalVisible}
        title='Reason for save draft'
        onCancel={() => {
          setDraftModalVisible(false)
          setDraftReason('')
        }}
        okText='Update'
        cancelText='Cancel'
      >
        <Form>
          <Divider style={{ marginTop: '12px', marginBottom: '12px' }} />
          <Form.Item labelCol={{ span: 24 }} required style={{ margin: '0px' }}>
            <TextArea
              rows={4}
              value={draftReason}
              onChange={(e) => setDraftReason(e.target.value)}
              placeholder='Enter Reason'
            />
          </Form.Item>
          <Divider style={{ marginTop: '12px', marginBottom: '12px' }} />
        </Form>
      </Modal>
    </>
  )
}
