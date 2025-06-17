import React, { useState, useEffect } from 'react'
import { Row, Col, Select } from 'antd'
const { Option } = Select
import Search from './Search'
import SettingOtherAddressOptServices from '../../../../../services/options/settings/other/address/Address'

export default function FilterSelection({
  access_token,
  onCityChange,
  setSearch,
}) {
  const [provinces, setProvinces] = useState([])
  const getProvinces = async () => {
    try {
      const list = await SettingOtherAddressOptServices.getProvinceOpt({
        access_token,
      })
      setProvinces(list ?? [])
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    getProvinces()
  }, [access_token])

  return (
    <Row gutter={[8, 8]} className='my-2'>
      <Col xs={24} md={12}>
        <Select
          allowClear
          showSearch
          labelInValue
          placeholder='Search province'
          optionFilterProp='label'
          style={{ width: '100%' }}
          filterSort={(a, b) =>
            (a?.label ?? '')
              .toLowerCase()
              .localeCompare((b?.label ?? '').toLowerCase())
          }
          // ▲ when cleared (value === undefined) we pass null up
          onChange={(value) => onCityChange?.(value ?? null)}
          options={provinces.map((p) => ({
            value: p.provinceId,
            label: `${p.provinceEn} – ${p.provinceKh}`,
          }))}
        />
      </Col>

      <Col xs={24} md={12}>
        <Search setSearch={setSearch} />
      </Col>
    </Row>
  )
}
