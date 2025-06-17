import React, { useEffect, useState } from 'react'
import { Form, Input, Radio, Select, Row, Col, Collapse, Card } from 'antd'
import { RightOutlined } from '@ant-design/icons'

const { Panel } = Collapse
const { TextArea } = Input
const { Option } = Select
import Schedule from './PlaceInfo/Schedule'
import Other from './PlaceInfo/Other'
// Helper function to truncate text by character count
import AddKeyWord from '../../../other/AddKeyWord'
import AddWebsiteSocial from '../../../other/AddWebsiteSocial'
import AddPhoneNumber from '../../../other/AddPhone'
const truncateText = (text, maxLength) => {
  if (!text) return ''
  return text.length <= maxLength ? text : text.slice(0, maxLength) + '...'
}
import AddReference from '../../../other/AddReference'
import CategoryServices from '../../../../../../services/setup/Category'
import SubCategoryServices from '../../../../../../services/setup/SubCategory'
import ActivityServices from '../../../../../../services/setup/Activity'
import TypeServices from '../../../../../../services/setup/Type'
export default function PlaceInfoForm(props) {
  const {
    form,
    access_token,
    socialMedia,
    nonBusinessData,
    referenceLink,
    openDay,
    openTimes,
    formSocial,
    formReference,
    scheduleForm,
    keyCat,
    setKeyCat,
    scheduleData,
  } = props

  const [open, setOpen] = useState(false)
  const ActivityType = [
    { value: 'Temple', label: 'ប្រាសាទ – Temple' },
    { value: 'Palace', label: 'វាំង – Palace' },
    { value: 'Monuments & Statues', label: 'រូបសំណាក – Monuments & Statues' },
    { value: 'Waterfall', label: 'ទឹកធ្លាក់ – Waterfall' },
    { value: 'National Park', label: 'ឧទ្យានជាតិ – National Park' },
    { value: 'Beach', label: 'ឆ្នេរ – Beach' },
  ]
  //
  const [categoryOptions, setCategoryOptions] = useState([])
  //

  const [subCategory, setSubCategory] = useState([])
  const [filterSubCategory, setFilterSucategory] = useState([])

  //activity
  const [activity, setActivity] = useState([])
  const [typeOfPlace, setTypeOfPlace] = useState([])
  const [activityOptions, setActivityOptions] = useState([])
  //end activity
  // newLink state at the top level
  const [selectedPlaces, setSelectedPlaces] = useState([])
  const handlePlaceChange = (values) => {
    setSelectedPlaces(values)
  }

  // Watch for changes on phone1, phone2, and links fields
  const phone1 = Form.useWatch('phone1', form)
  const phone2 = Form.useWatch('phone2', form)
  const linksValue = Form.useWatch('links', form) || []
  // 2) watch the currently selected ID
  const [fallbackCat, setFallbackCat] = useState(null)
  const [fallbackSubCat, setFallbackSubCat] = useState(null)
  const [fallbackActivity, setFallbackActivity] = useState(null)
  const [fallbackTypeOfPlace, setFallbackTypeOfPlace] = useState(null)
  const [typeOfFood, setTypeOfFood] = useState([])
  // Create dynamic header based on entered phone numbers
  const phoneNumbers = [phone1, phone2].filter((num) => num)
  let phoneHeader =
    phoneNumbers.length > 0
      ? `Phone Number${phoneNumbers.length > 1 ? 's' : ''}: ${phoneNumbers.join(
          ', '
        )}`
      : 'Add Phone Number'
  phoneHeader = truncateText(phoneHeader, 35)

  // Create dynamic header for links panel based on added links
  let linksHeader =
    'Add Website / Social Media Links' + `: ${linksValue.join(', ')}`
  linksHeader = truncateText(linksHeader, 90)
  const filterChangeCategory = (value, option) => {
    const english = option.label
      .replace(/[\u1780-\u17FF]+/g, '') // remove Khmer letters
      .replace(/[–-]/g, '') // remove dash/– if present
      .trim()

    setKeyCat(english)
    const filteredSubCats = subCategory?.filter(
      (sub) => sub.catEn?.trim() === english
    )
    setFilterSucategory(filteredSubCats)
  }

  const getCategory = async () => {
    try {
      const doc = { search: '' }
      const data = await CategoryServices.fetchCategory({ doc, access_token })
      if (data) {
        setCategoryOptions(data || [])
      }
    } catch {}
  }
  const getSubCategory = async () => {
    try {
      const doc = { search: '' }
      const data = await SubCategoryServices.fetchSubCategory({
        doc,
        access_token,
      })
      if (data) {
        setSubCategory(data)
      }
    } catch {}
  }
  const getActivity = async () => {
    try {
      const doc = { search: '' }
      const data = await ActivityServices.fetchActivity({ doc, access_token })
      if (data) {
        setActivityOptions(data)
      }
    } catch {}
  }
  const getTypeOfPlace = async () => {
    try {
      const doc = { search: '', type: 'Place' }
      const data = await TypeServices.fetchType({ doc, access_token })
      if (data) {
        setTypeOfPlace(data)
      }
    } catch {}
  }
  const getTypeOfFood = async () => {
    try {
      const doc = { search: '', type: 'Food' }
      const data = await TypeServices.fetchType({ doc, access_token })
      if (data) {
        setTypeOfFood(data)
        console.log(data, 'type of place')
      }
    } catch {}
  }
  useEffect(() => {
    getCategory()
    getSubCategory()
    getActivity()
    getTypeOfPlace()
    getTypeOfFood()
  }, [form])
  //check null
  /* inside PlaceInfoForm */

  const mainCatId = Form.useWatch('mainCategory', form) // string | undefined
  const subCatIds = Form.useWatch('subCategory', form) // string[] (tags mode)
  const activityObjs = Form.useWatch('activity', form) || []
  //check null
  //
  const typeOfPlaceObjs = Form.useWatch('typeOfPlace', form) || []
  useEffect(() => {
    if (!nonBusinessData) return
    if (nonBusinessData?.mainCategory) {
      setFallbackCat(
        nonBusinessData?.mainCategory.id == null
          ? nonBusinessData.mainCategory
          : null
      )
      // also put the id into the form so Select shows the right option
      form.setFieldsValue({
        mainCategory: nonBusinessData.mainCategory.id ?? undefined,
      })
    }
    if (nonBusinessData?.subCategory) {
      setFallbackSubCat(
        nonBusinessData.subCategory.id == null
          ? nonBusinessData.subCategory
          : null
      )
      form.setFieldsValue({
        subCategory: nonBusinessData.subCategory.id ?? undefined,
      })
    }
  }, [nonBusinessData])
  useEffect(() => {
    if (!nonBusinessData) return

    /* ---------- activity ---------- */
    const customsAct =
      nonBusinessData.activity?.filter((a) => a._id == null) ?? []
    const withIdAct =
      nonBusinessData.activity
        ?.filter((a) => a._id != null)
        .map((a) => ({ value: a._id, label: a.nameEn })) ?? []
    setFallbackActivity(customsAct) // grey label only
    // form.setFieldsValue({ activity: withIdAct })

    /* ---------- type of place ---------- */
    const customsType =
      nonBusinessData.typeOfPlace?.filter((t) => t._id == null) ?? []
    const withIdType =
      nonBusinessData.typeOfPlace
        ?.filter((t) => t._id != null)
        .map((t) => t._id) ?? []
    setFallbackTypeOfPlace(customsType) // grey label only

    form.setFieldsValue({ typeOfPlace: withIdType })

    /* ---------- category ---------- */
    form.setFieldsValue({
      mainCategory: nonBusinessData.mainCategory?._id,
      subCategory: nonBusinessData.subCategory?._id,
    })
    setFallbackCat(
      nonBusinessData.mainCategory?._id == null
        ? nonBusinessData.mainCategory
        : null
    )
    setFallbackSubCat(
      nonBusinessData.subCategory?._id == null
        ? nonBusinessData.subCategory
        : null
    )
  }, [nonBusinessData, form])

  useEffect(() => {
    if (mainCatId) {
      setFallbackCat(null)
    }
    if (subCatIds) {
      setFallbackSubCat(null)
    }
  }, [mainCatId, subCatIds, mainCatId])
  //

  const dynamicLabelCat = fallbackCat
    ? ` ${fallbackCat.nameEn || ''}-${fallbackCat.nameKh || ''}`.trim()
    : ''
  //

  const dynamicLabelSub = fallbackSubCat
    ? `${fallbackSubCat.nameKh || ''}- ${fallbackSubCat.nameEn || ''}`.trim()
    : ''
  //
  //activity
  const dynamicLabelActivity = fallbackActivity
    ? fallbackActivity
        .map((a) => (a.nameKh ? `${a.nameKh} – ` : '') + (a.nameEn || ''))
        .join(', ')
    : ''
  //activity
  //
  const dynamicLabelTypeOfPlace = fallbackTypeOfPlace
    ? fallbackTypeOfPlace
        .map((a) => (a.nameKh ? `${a.nameKh} – ` : '') + (a.nameEn || ''))
        .join(', ')
    : ''

  //
  useEffect(() => {
    if (subCategory) {
      setFilterSucategory(subCategory)
    }
  }, [subCategory])
  // //check null id category
  return (
    <>
      {/*  */}
      <AddKeyWord open={open} setOpen={setOpen} />
      {/*  */}
      <Card>
        <Form
          form={form}
          layout='vertical'
          initialValues={{ ownership: 'Private' }}
          className='space-y-2'
        >
          <Form.Item
            hidden
            style={{ marginBottom: '0px' }}
            label='id'
            name='_id'
            rules={[{ required: true, message: 'field required' }]}
          >
            <Input placeholder='Enter id' />
          </Form.Item>
          <Form.Item
            hidden
            style={{ marginBottom: '0px' }}
            label='placeId'
            name='placeId'
            rules={[{ required: true, message: 'field required' }]}
          >
            <Input placeholder='Enter placeId' />
          </Form.Item>

          {/* 1. First row: Place Names and Ownership */}
          <Row gutter={[8, 8]}>
            <Col xs={24} md={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Place Name (Khmer)'
                name='nameKh'
                rules={[{ required: true, message: 'field required' }]}
              >
                <Input placeholder='Enter place name' />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Place Name (English)'
                name='nameEn'
                rules={[{ required: true, message: 'field required' }]}
              >
                <Input placeholder='Enter place name' />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Ownership'
                name='ownership'
                rules={[{ required: true, message: 'field required' }]}
              >
                <Radio.Group>
                  <Radio value='Private'>Private</Radio>
                  <Radio value='Public'>Public</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <AddPhoneNumber form={form} />
            </Col>
          </Row>
        </Form>
      </Card>
      <Row gutter={[8, 8]} className='my-2'>
        <Col xs={24} className=''>
          <AddWebsiteSocial socialMedia={socialMedia} form={formSocial} />
        </Col>
      </Row>

      <Form form={form} layout='vertical' className='space-y-2'>
        <Card className='my-2'>
          <Row gutter={[8, 8]}>
            <Col xs={24} md={12}>
              <Form.Item
                label={`Select Main Category (${dynamicLabelCat})`}
                name='mainCategory'
                rules={[{ required: true, message: 'field required' }]}
              >
                <Select
                  allowClear
                  showSearch
                  placeholder='Select a Category'
                  style={{ width: '100%' }}
                  onChange={filterChangeCategory}
                  /* 🔍 tell Select to search the option.label field */
                  optionFilterProp='label'
                  /* optional: refine the matching logic */
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.trim().toLowerCase())
                  }
                  options={
                    Array.isArray(categoryOptions)
                      ? categoryOptions.map((el) => ({
                          label: `${el.nameKh} – ${el.nameEn}`, // visible text
                          value: el._id,
                        }))
                      : []
                  }
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label={`Select Sub Category( ${dynamicLabelSub})`}
                name='subCategory'
                rules={[{ required: true, message: 'field required' }]}
              >
                <Select
                  allowClear
                  showSearch
                  placeholder='Choose Sub sub category'
                  optionFilterProp='children'
                >
                  {filterSubCategory?.map((cat) => (
                    <Option key={cat._id} value={cat?._id}>
                      {`${cat.nameKh} - ${cat.nameEn}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
      <Row hidden={keyCat === undefined || keyCat === '' || keyCat === null}>
        <Col
          xs={24}
          md={keyCat?.trim().toLowerCase() === 'accommodation' ? 12 : 24}
        >
          <Form form={form} layout='vertical'>
            <Other
              typeOfPlace={typeOfPlace}
              typeOfFood={typeOfFood}
              form={form}
              keyCat={keyCat}
              setKeyCat={setKeyCat}
              dynamicLabelTypeOfPlace={dynamicLabelTypeOfPlace}
            />
          </Form>
        </Col>
        {keyCat?.trim().toLowerCase() === 'accommodation' ? (
          <Col xs={24} md={12}>
            <Schedule
              keyCat={keyCat}
              setKeyCat={setKeyCat}
              openDays={openDay}
              openTimes={openTimes}
              form={scheduleForm}
              savedSchedule={scheduleData}
            />
          </Col>
        ) : (
          <Col xs={24}>
            <Schedule
              keyCat={keyCat}
              setKeyCat={setKeyCat}
              openDays={openDay}
              openTimes={openTimes}
              form={scheduleForm}
              savedSchedule={scheduleData}
            />
          </Col>
        )}
      </Row>

      <div className='my-2'>
        <AddReference form={form} referenceLink={referenceLink} />
      </div>
      <Form form={form} layout='vertical' className='space-y-2 mt-2'>
        <Card>
          <Row gutter={[8, 8]}>
            <Col
              xs={24}
              sm={keyCat === 'Rental' ? 24 : 24}
              md={keyCat === 'Rental' ? 24 : 12}
            >
              <Form.Item
                style={{ marginBottom: 0 }}
                name='keyword'
                label={
                  <>
                    <span>Keyword </span>{' '}
                    <span
                      className='text-blue-400 mx-2 cursor-pointer'
                      onClick={() => setOpen(true)}
                    >
                      <span className='text-lg'> +</span> Add New
                    </span>
                  </>
                }
              >
                <Select
                  mode='multiple'
                  placeholder='Select keyword'
                  style={{ width: '100%' }}
                  value={selectedPlaces}
                  onChange={handlePlaceChange}
                  allowClear
                >
                  {ActivityType.map((act) => (
                    <Option
                      key={act.value}
                      value={act.value}
                      label={act.value} // ← your English name only
                    >
                      {act.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} style={{ marginTop: '6px' }}>
              <Form.Item
                name='activity'
                label={
                  <>
                    <span>{`Activity (${dynamicLabelActivity})`} </span>{' '}
                  </>
                }
                hidden={keyCat === 'Rental'}
              >
                <Select
                  allowClear
                  showSearch
                  labelInValue // ← this
                  style={{ width: '100%' }}
                  mode='multiple'
                  placeholder='Select activity'
                  optionFilterProp='children'
                >
                  {activityOptions?.map((act) => (
                    <Option key={act._id} value={act._id}>
                      {`${act.nameKh} – ${act.nameEn}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* 5. Descriptions */}
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Description Khmer'
                name='descriptionKh'
              >
                <TextArea rows={2} placeholder='Enter description in Khmer' />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                label='Description English'
                name='descriptionEn'
              >
                <TextArea rows={2} placeholder='Enter description in English' />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </>
  )
}
