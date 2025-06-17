import React, { useState, useEffect } from 'react'
import { Modal, Steps, Button, Form, Input, message, Divider } from 'antd'
import Swal from 'sweetalert2'
import PlaceInfo from './PlaceInfo'
// import PlaceAddress from './Steps/PlaceAddress'
// import PlaceImgVideo from './Steps/PlaceImgVideo'
// import ReviewImportNonBusinessServices from '../../../../../services/ManageProperty/PlaceListing/ReviewImport'
// import OtherServiceNonBusinessProperty from '../../../../../services/ManageProperty/PlaceListing/Other'
import dayjs from 'dayjs'
import AllPropertyServices from '../../../../../../../../services/ManageProperty/PlaceListing/AllProperty'

const { Step } = Steps
const { TextArea } = Input

export default function CreateNonBusiness(props) {
  const {
    open,
    setOpen,
    propData,
    username,
    access_token,
    getBusinessProperty,
  } = props
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
  //media
  const [initialGallery, setInitialGallery] = useState()
  const [initialImage, setInitialImage] = useState()
  const [initialVideo, setInitialVideo] = useState()
  //
  const [scheduleData, setScheduleData] = useState()

  //
  const [googlePlaceLink, setGooglePlaceLink] = useState()

  //
  const [btn_loading, setBtnLoading] = useState(false)
  console.log(btn_loading, 'btn_loading')

  //

  const [address, setAddress] = useState()
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
  //
  const getNonBusinessProperty = async (record) => {
    try {
      const doc = { id: record?._id }
      const data = await AllPropertyServices.fetchNonBusinessPropertyById({
        doc,
        access_token,
      })
      if (data) {
        setNonBusinessData(data?.data?.locations?.[0])
      }
    } catch {}
  }
  useEffect(() => {
    if (!propData) return
    getNonBusinessProperty(propData)
    setLocationId(propData?._id)
  }, [propData, open])
  useEffect(() => {
    console.log(nonBusinessData, 'nonbusiness')

    if (!nonBusinessData) return
    const activityIds = (nonBusinessData?.activity || []).map((a) => a.id)
    setSocialMedia(nonBusinessData?.links || [])
    setReferencesLink(nonBusinessData?.referenceLinks || [])
    setOpenDay(nonBusinessData?.openDay)
    setTimes([nonBusinessData?.openTime, nonBusinessData?.closeTime])
    //
    // const buildOption = (obj) => ({
    //   value: obj._id, //
    //   label: obj.nameKh + obj.nameEn || '',
    // })

    // const activityField = (nonBusinessData?.activity || []).map(buildOption)
    // // const withIdAct =
    // //   activityField
    // //     ?.filter((a) => a.value != null || a?.value != undefined)
    // //     .map((a) => ({ value: a.value, label: a.label })) ?? []
    const withIdAct =
      nonBusinessData?.activity
        ?.filter((a) => a._id != null)
        .map((a) => ({ value: a._id, label: a.nameEn })) ?? []
    //
    console.log(withIdAct, 'withIdAct')

    const buildTypeOfPlaceOption = (obj) => ({
      value: obj.id, //
      label: obj.nameKh + obj.nameEn || '',
    })
    const typeOfPlaceField = (nonBusinessData?.typeOfPlace || []).map(
      buildTypeOfPlaceOption
    )
    const withIdTypeOfPlace =
      typeOfPlaceField?.filter((a) => a.value != null).map((a) => a.value) ?? []
    //

    form1.setFieldsValue({
      ...nonBusinessData,
      subCategory: nonBusinessData?.subCategory?._id,
      mainCategory: nonBusinessData?.mainCategory?._id,
      activity: withIdAct,
      typeOfPlace: withIdTypeOfPlace,
      phone1: nonBusinessData?.phone1,
      phone2: nonBusinessData?.phone2,
    })
    scheduleForm.setFieldsValue({ is24x7: nonBusinessData?.schedule?.is24x7 })
    //

    //

    //
    setScheduleData(nonBusinessData?.schedule)
    if (nonBusinessData?.mainCategory) {
      setKeyCat(nonBusinessData?.mainCategory?.nameEn)
    }
    //
    setAddress
    const locPath = [
      nonBusinessData?.address?.location?.provinceId,
      nonBusinessData?.address?.location?.districtId,
      nonBusinessData?.address?.location?.communeId,
    ].filter(Boolean)

    form2.setFieldsValue({
      location: locPath, // the 3-level id array
      addressDetails: nonBusinessData?.address?.addressDetails,
      googleMap: nonBusinessData?.address?.googleMap,
      googlePlaceLink: nonBusinessData?.address?.googlePlaceLink,
      coordinates: nonBusinessData?.address?.coordinates,
    })
    setGoogleMap(nonBusinessData?.address?.googleMap?.googleMap)
    setGooglePlaceLink(nonBusinessData?.address?.googlePlaceLink)

    //media
    //gallery
    setInitialGallery(nonBusinessData?.media?.gallery)
    setInitialImage(nonBusinessData?.media?.image?.[0])
    setInitialVideo(nonBusinessData?.media?.video?.[0])
  }, [nonBusinessData])

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
          scheduleData={scheduleData}
        />
      ),
      form: form1,
    },
  ]

  const next = async () => {
    try {
      await steps[current].form.validateFields()
      if (current === 0) {
        await formReference.validateFields()
      }
      setBtnLoading(false)
      setCurrent(current + 1)
    } catch (err) {
      console.error('Validation failed:', err)
    }
  }

  const prev = () => {
    setCurrent(current - 1)
    setBtnLoading(false)
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
  const handleSubmit = async () => {
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
      // const referenceLinks = formReference.getFieldValue('links') || []
      const schedule = scheduleForm.getFieldsValue(true)
      const typeOfPlacse = form1.getFieldsValue('typeOfPlace')
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
        placeId,
        nameEn,
        nameKh,
        ownership,
        mainCategory: mainCategory,
        subCategory,
        keyword,
        activity: activity.map((item) => item.value),
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
        gallery: gallery,
      }
      const doc1 = {
        id: _id,
        info: {
          ...info,
        },
        address,

        referenceLinks: referenceLinks,
        schedule: schedule,
        images: mediaInfo?.images,
        videos: mediaInfo?.videos,
        gallery: mediaInfo?.gallery?.gallery,
        category_gallery: mediaInfo?.gallery?.category_gallery,
      }

      const formData = new FormData()
      formData.append('id', _id)
      formData.append('username', username)
      formData.append('info', JSON.stringify(info))
      formData.append('address', JSON.stringify(address))
      formData.append('referenceLinks', JSON.stringify(referenceLinks))
      formData.append('schedule', JSON.stringify(schedule))
      formData.append('category_gallery', mediaInfo?.gallery?.category_gallery)
      formData.append('images', mediaInfo?.images)
      formData.append('status', 'Pending')
      mediaInfo?.videos?.forEach((f) =>
        formData.append('videos', f?.originFileObj ?? f)
      )
      try {
        const doc = formData
        const data = await AllPropertyServices.updateNonBusinessProperty({
          doc,
          access_token,
        })
        if (data) {
          setBtnLoading(false)
          Swal.fire({
            icon: 'success',
            title: 'Updated',
            timer: 1200,
            showConfirmButton: false,
          }).then(() => {
            resetWizard()
            setOpen(false)
            getBusinessProperty()
            setBtnLoading(false)
            setOpenAlbum(onCheckAddAlbum)
          })
        }
      } catch (erro) {
        console.log(erro)
        setBtnLoading(false)
      }
    } catch (err) {
      console.error('Validation failed', err)
      setBtnLoading(false)
    }
  }
  const handleCancelModal = () => {
    setOpen(false)
    resetWizard()
  }

  return (
    <>
      <Modal
        open={open}
        // bodyStyle={{ padding: 0 }}
        title='Edit Place Information'
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
            setBtnLoading(false)
            resetWizard() // Optional: clear form data on cancel
          }
        }}
        footer={null}
        width={1000}
      >
        {/* <Divider style={{ margin: 0, borderColor: '#f0f0f0' }} /> */}
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
          scheduleData={scheduleData}
        />
        {/* <Steps current={current}>
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
            <Button type='primary' onClick={next}>
              Next
            </Button>
          )} */}
        {/* {current === steps.length - 1 && ( */}
        <div className='flex justify-end mt-5'>
          <Button loading={btn_loading} type='primary' onClick={handleSubmit}>
            Save Change
          </Button>
        </div>
        {/* )} */}
        {/* </div> */}
      </Modal>

      {/* Draft Reason Modal */}
      <Modal
        open={draftModalVisible}
        title='Reason for save draft'
        onCancel={() => {
          setDraftModalVisible(false)
          setDraftReason('')
        }}
        okText='Save'
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
