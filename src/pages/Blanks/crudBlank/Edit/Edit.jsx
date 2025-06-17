import React from 'react'
import { Modal } from 'antd'
import AccessForm from '../form/FormData' // ✅ default import
let counter = 1
export default function Edit({ form, open, setOpen, setData }) {
  const onSubmit = async () => {
    try {
      const values = await form.validateFields()
      setData((prev) => [...prev, { ...values, key: counter++ }])
      form.resetFields() // optional: clear the form
      setOpen(false)
    } catch (err) {
      /* validation errors already shown */
    }
  }

  return (
    <Modal
      open={open}
      title='Add Record'
      onOk={onSubmit}
      onCancel={() => setOpen(false)}
      okText='Save'
      destroyOnClose
    >
      <AccessForm form={form} /> {/* renders once import is correct */}
    </Modal>
  )
}
