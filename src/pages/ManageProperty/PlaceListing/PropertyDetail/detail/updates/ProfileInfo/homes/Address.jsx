import React, { useState } from 'react'
import { Input, Card, Modal, Button, Form } from 'antd'
import Map from '../../../../../other/Map'
import SelectProvince from '../../../../../other/SelectProvince'
import TextArea from 'antd/es/input/TextArea'
const Address = ({ open, setOpen }) => {
  const onHandleClose = () => {
    setOpen(false)
  }

  return (
    <Modal
      title={
        <div className='flex items-center'>
          <span>Address</span>
        </div>
      }
      open={open}
      onCancel={onHandleClose}
      footer={[
        <Button type='primary' onClick={onHandleClose}>
          Update
        </Button>,
      ]}
      width={650}
    >
      <Card>
        <SelectProvince />

        <Form.Item
          style={{ marginBottom: '0px' }}
          labelCol={{ span: 24 }}
          label='Address Detail'
          name='Address Detail'
        >
          <TextArea rows={2} placeholder='address detail' />
        </Form.Item>

        <Map />
      </Card>
    </Modal>
  )
}

export default Address
