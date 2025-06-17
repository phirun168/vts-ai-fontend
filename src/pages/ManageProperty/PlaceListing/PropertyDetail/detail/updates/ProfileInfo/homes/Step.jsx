import React, { useState } from 'react'
import { Modal, Steps, Button } from 'antd'
import Swal from 'sweetalert2'

import PropertyInfo from './PropertyInfo'
import Other from './Other'

const { Step } = Steps

export default function MultiStepModal({ open, setOpen }) {
  const [current, setCurrent] = useState(0)

  /* ---------------------------------- steps --------------------------------- */
  const steps = [
    { title: 'Property Info', content: <PropertyInfo /> },
    { title: 'Category & Links', content: <Other /> },
  ]

  /* -------------------------------- handlers -------------------------------- */
  const next = () => setCurrent((prev) => prev + 1)
  const prev = () => setCurrent((prev) => prev - 1)
  const handleClose = () => setOpen(false)

  const handleDone = async () => {
    await Swal.fire({
      title: 'Updated successfully!',
      icon: 'success',

      // 👇  hide the button
      showConfirmButton: false,

      timer: 2000, // auto‑close after 2 s
      timerProgressBar: true, // optional little bar at the top
    })

    handleClose() // close the modal after the toast
  }

  /* ---------------------------------- render -------------------------------- */
  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      width={1000}
      destroyOnClose
    >
      {/* Step headers ------------------------------------------------------- */}
      <Steps current={current} className='mt-5'>
        {steps.map((step, idx) => (
          <Step key={idx} title={step.title} />
        ))}
      </Steps>

      {/* Step body ---------------------------------------------------------- */}
      <div style={{ marginTop: 24, minHeight: 200 }}>
        {steps[current].content}
      </div>

      {/* Navigation buttons ------------------------------------------------- */}
      <div style={{ marginTop: 24, textAlign: 'right' }}>
        {current > 0 && (
          <Button style={{ marginRight: 8 }} onClick={prev}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type='primary' onClick={next}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type='primary' onClick={handleDone}>
            Update
          </Button>
        )}
      </div>
    </Modal>
  )
}
