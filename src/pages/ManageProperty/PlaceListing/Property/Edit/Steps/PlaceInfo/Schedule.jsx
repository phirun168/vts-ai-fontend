import React, { useState, useMemo, useEffect } from 'react'
import {
  Form,
  Row,
  Col,
  Switch,
  TimePicker,
  Input,
  DatePicker,
  Checkbox, // ← already imported
} from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat) // ← MUST be run before you call dayjs()
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)
const { RangePicker: TimeRangePicker } = TimePicker
const { RangePicker: DateRangePicker } = DatePicker
import AddOpenTimeModal from './AddOpenTime'
import { PlusOutlined } from '@ant-design/icons'
export default function Schedule(props) {
  const { keyCat, openDays, openTimes, form, savedSchedule } = props
  console.log(savedSchedule, 'savedSchedule');

  const [checkInOutRange, setCheckInOutRange] = useState([])
  const [openTime, setOpenTime] = useState(false)
  const [is24x7, setIs24x7] = useState(false)

  /* ───── helpers ───── */
  const toDayjs = (str) => {
    if (!str) return null

    const formats = [
      'HH:mm', // 24‑h eg 18:30
      'H:mm', // 24‑h no leading 0
      'HH:mm:ss', // 24‑h with seconds eg 18:30:00
      'h:mm A', // 12‑h eg 6:30 PM
      'h:mmA', // 12‑h no space
    ]

    for (const fmt of formats) {
      const d = dayjs(str, fmt, true)
      if (d.isValid()) return d // ✅ we found a match
    }

    // final fallback: maybe it's already ISO ('2025‑05‑03T18:30:00Z')
    const iso = dayjs(str)
    return iso.isValid() ? iso : null
  }
  /* makeDay now stores Dayjs instances directly */
  const makeDay = (ot, ct) => {
    const open = toDayjs(ot)
    const close = toDayjs(ct)
    return {
      enabled: Boolean(open && close),
      intervals: [
        {
          openTime: open || dayjs('08:00', 'HH:mm'),
          closeTime: close || dayjs('17:00', 'HH:mm'),
        },
      ],
    }
  }
  /* expand “Mon-Fri” etc. */
  const [addOpenTimes, setAddOpenTime] = useState([])
  const DAY_ORDER = addOpenTimes?.length
    ? addOpenTimes
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const daysToShow = useMemo(() => {
    if (!openDays || typeof openDays !== 'string') return DAY_ORDER
    const parts = openDays.split('-').map((p) => p.trim())
    if (parts.length === 2) {
      const [start, end] = parts
      const s = DAY_ORDER.indexOf(start)
      const e = DAY_ORDER.indexOf(end)
      if (s !== -1 && e !== -1) {
        return s <= e
          ? DAY_ORDER.slice(s, e + 1)
          : [...DAY_ORDER.slice(s), ...DAY_ORDER.slice(0, e + 1)]
      }
    }
    return DAY_ORDER
  }, [openDays, addOpenTimes])

  //
  /* determine defaults */
  const [defaultOpenTime, setDefaultCloseTime] = useState([])
  //
  const [defaultOpen, defaultClose] =
    Array.isArray(defaultOpenTime) && defaultOpenTime.length > 0
      ? defaultOpenTime
      : ['08:00', '17:00']

  const enabledDays = daysToShow
  const initialSchedule = useMemo(() => {
    const [defaultOpen, defaultClose] =
      Array.isArray(defaultOpenTime) && defaultOpenTime.length === 2
        ? defaultOpenTime
        : [dayjs('08:00', 'HH:mm'), dayjs('17:00', 'HH:mm')]

    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].reduce(
      (acc, abbr) => {
        acc[abbr] = {
          enabled: enabledDays.includes(abbr),
          intervals: [
            {
              openTime: defaultOpen,
              closeTime: defaultClose,
            },
          ],
        }
        return acc
      },
      {}
    )
  }, [addOpenTimes, defaultOpenTime])

  const [schedule, setSchedule] = useState(initialSchedule)
  useEffect(() => {
    setSchedule(initialSchedule)
  }, [initialSchedule, addOpenTimes])

  const ABBR_TO_DAY = {
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday',
    Sun: 'Sunday',
  }

  /* sync with parent form */
  useEffect(() => {
    form?.setFieldsValue({ schedule: { is24x7, days: schedule } })
  }, [is24x7, schedule, form])

  //check in / checkout data
  // 1️⃣ Init check-in/out from openTimes (an array [start, end] of ISO strings)
  const initialCheckInOut = useMemo(() => {
    if (Array.isArray(openTimes) && openTimes.length === 2) {
      return [dayjs(openTimes[0], 'HH:mm'), dayjs(openTimes[1], 'HH:mm')]
    }
    return []
  }, [openTimes])
  //
  const handleAddOpenTime = () => {
    setOpenTime(true)
  }
  const handleAddTimeInterval = ({ days, openTime, closeTime }) => {
    console.log(days, openTime, closeTime,
      'add time interval'
    );

    if (!openTime || !closeTime || !Array.isArray(days) || days.length === 0)
      return
    const open = toDayjs(openTime)
    const close = toDayjs(closeTime)
    if (!open || !close) return
    setAddOpenTime((prev) => Array.from(new Set([...prev, ...days])))
    setSchedule((prev) => {
      const updated = { ...prev }
      days.forEach((day) => {
        if (!updated[day]) {
          updated[day] = {
            enabled: true,
            intervals: [],
          }
        }
        if (!updated[day].enabled) updated[day].enabled = true
        setDefaultCloseTime([open, close])
        updated[day].intervals = [...(updated[day].intervals || [])]
      })
      return updated
    })
  }

  // whenever the prop changes, reset our state
  // useEffect(() => {
  //   setCheckInOutRange(initialCheckInOut)
  //   console.log(initialCheckInOut, 'initialCheckInOut');

  // }, [initialCheckInOut])

  // 2️⃣ sync into the parent form under the field “checkInOut”
  useEffect(() => {
    form.setFieldsValue({ checkInOut: checkInOutRange })
  }, [checkInOutRange, form])
  useEffect(() => {
    if (!savedSchedule) return
    setIs24x7(Boolean(savedSchedule.is24x7))
    // savedSchedule.days is an object like { Mon: {…}, Tue: {…}, … }
    setSchedule(savedSchedule.days)
  }, [savedSchedule])
  //end check in / checkout data
  /* UI */
  //24/7
  useEffect(() => {
    if (is24x7) {
      const fullDay = {
        enabled: true,
        intervals: [
          {
            openTime: dayjs('00:00', 'HH:mm'),
            closeTime: dayjs('23:59', 'HH:mm'),
          },
        ],
      }
      const updated = DAY_ORDER?.reduce((acc, day) => {
        acc[day] = fullDay
        return acc
      }, {})
      setSchedule(updated)
    } else {
      // Reset to default if needed
      setSchedule(initialSchedule)
    }
  }, [is24x7])
  //24/7
  //
  // useEffect(() => {
  //   form.setFieldsValue({ is24x7: true }) // ✅ sets it to checked
  // }, [form])
  //end check in/check out
  const onHandleChangeCheckInCheckout = (value) => {
    // setCheckInOutRange(value)
    // form.setFieldsValue({ checkInOut: value })
    console.log(value, 'vlaue');
    const openTime = value?.[0]
    const closeTime = value?.[1]
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    if (!openTime || !closeTime || !Array.isArray(days) || days.length === 0)
      return
    console.log(openTime, closeTime, days);

    const open = toDayjs(openTime)
    const close = toDayjs(closeTime)
    if (!open || !close) return
    setAddOpenTime((prev) => Array.from(new Set([...prev, ...days])))
    setSchedule((prev) => {
      const updated = { ...prev }
      days.forEach((day) => {
        if (!updated[day]) {
          updated[day] = {
            enabled: true,
            intervals: [],
          }
        }
        if (!updated[day].enabled) updated[day].enabled = true
        setDefaultCloseTime([open, close])
        updated[day].intervals = [...(updated[day].intervals || [])]
      })
      return updated
    })

  }


  useEffect(() => {
    if (savedSchedule?.days?.Mon?.intervals?.[0]?.openTime || savedSchedule?.days?.Mon?.intervals?.[0]?.closeTime) {
      form?.setFieldsValue({
        checkInOut: [toDayjs(savedSchedule?.days?.Mon?.intervals?.[0]?.openTime), toDayjs(savedSchedule?.days?.Mon?.intervals?.[0]?.closeTime)],
      })
    }
    else {
      form?.setFieldsValue({ checkInOut: [] }) // fallback
    }
  }, [savedSchedule, is24x7, form])
  //end check in/check out
  return (
    <div className='my-2 font-sans'>
      {/* // */}
      <AddOpenTimeModal
        open={openTime}
        setOpen={setOpenTime}
        onSave={({ days, openTime, closeTime }) =>
          handleAddTimeInterval({ days, openTime, closeTime })
        }
      />

      {/* // */}
      <Form layout='vertical' form={form}>
        {/* hidden field holding the whole schedule */}
        <Form.Item name='schedule' noStyle>
          <Input type='hidden' />
        </Form.Item>

        {/* Accommodation check-in/out */}
        {keyCat?.trim().toLowerCase() === 'accommodation' && (
          <Form.Item
            label='Check-in/Out'
            name='checkInOut'
            style={{ marginBottom: 0 }}
          >
            <TimeRangePicker
              style={{ width: '100%' }}
              format='HH:mm A'

              onChange={onHandleChangeCheckInCheckout}
              placeholder={['Open', 'Close']}
            />
          </Form.Item>
        )}

        {/* 24/7 toggle + opening hours grid */}
        {/* keyCat?.trim().toLowerCase() === 'accommodation'  */}
        {keyCat?.trim().toLowerCase() !== 'accommodation' && (
          <>
            <div className='flex items-center'>
              <div className='flex items-center'>
                <span>Open Time&nbsp;</span>
                <Form.Item
                  name='is24x7'
                  valuePropName='checked'
                  style={{ marginBottom: 0 }}
                >
                  <Checkbox onChange={(e) => setIs24x7(e.target.checked)}>
                    24/7
                  </Checkbox>
                </Form.Item>
              </div>
              <button
                className='bg-blue-500 rounded-xl text-white '
                onClick={() => handleAddOpenTime()}
              >
                <div className='mx-2'>
                  <PlusOutlined />
                  Add Open Time
                </div>
              </button>{' '}
            </div>
            <Row gutter={[8, 8]}>
              {Object.keys(schedule).map((day) => (
                <Col xs={24} md={12} key={day}>
                  <Row gutter={[8, 8]}>
                    <Col xs={24} sm={8} md={9} lg={7}>
                      <div className='flex items-center'>
                        <Switch
                          checked={!is24x7 && schedule[day].enabled}
                          onChange={(checked) =>
                            setSchedule((prev) => ({
                              ...prev,
                              [day]: {
                                ...prev[day],
                                enabled: checked,
                              },
                            }))
                          }
                          className='mr-2'
                        />
                        <span className='font-medium'>{ABBR_TO_DAY[day]}</span>
                      </div>
                    </Col>

                    <Col xs={24} sm={14} md={15}>
                      {!is24x7 && schedule[day].enabled ? (
                        schedule[day].intervals.map((interval, idx) => (

                          <div key={`${day}-${idx}`} className='mb-2'>
                            <TimeRangePicker
                              format='h:mm A'
                              placeholder={['Open', 'Close']}
                              style={{ width: '100%' }}
                              value={[
                                toDayjs(interval.openTime),
                                toDayjs(interval.closeTime),
                              ]}
                              onChange={(values) => {
                                if (!values || values.length !== 2) return
                                setSchedule((prev) => {
                                  const next = [...prev[day].intervals]
                                  next[idx] = {
                                    openTime: values[0],
                                    closeTime: values[1],
                                  }
                                  return {
                                    ...prev,
                                    [day]: {
                                      ...prev[day],
                                      intervals: next,
                                    },
                                  }
                                })
                              }}
                            />
                          </div>
                        ))
                      ) : (
                        <Input
                          placeholder='Closed'
                          disabled
                          style={{ width: '100%' }}
                        />
                      )}
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Form>
    </div>
  )
}
