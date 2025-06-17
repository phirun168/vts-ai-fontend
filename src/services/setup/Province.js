import httpCommon from 'utils/http-common'
const fetchProvince = async (payload) => {
  try {
    const response = await httpCommon.get(
      '/setup/province/list?search=' + payload?.doc?.search,
      {
        headers: { Authorization: `Bearer ${payload.access_token}` },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error creating :', error.response?.data || error.message)
    throw error
  }
}
const fetchProvinceById = async (payload) => {
  try {
    const response = await httpCommon.get(
      `/setup/province/${payload?.doc?._id}`,
      {
        headers: { Authorization: `Bearer ${payload.access_token}` },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error creating :', error.response?.data || error.message)
    throw error
  }
}
const UpdateProvince = async (payload) => {
  try {
    const response = await httpCommon.put(
      `/setup/province/update`,
      payload?.doc,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${payload.access_token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error creating :', error.response?.data || error.message)
    throw error
  }
}

const ProvinceServices = {
  fetchProvince,
  fetchProvinceById,
  UpdateProvince,
}
export default ProvinceServices
