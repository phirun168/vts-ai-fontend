import httpCommon from 'utils/http-common'
const createNonBusinessProperty = async (payload) => {
  try {
    const response = await httpCommon.post(
      '/place/save_location/',
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
const updateNonBusinessProperty = async (payload) => {
  try {
    const response = await httpCommon.post(
      '/place/update_place/',
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
const removeActivity = async (payload) => {
  try {
    const response = await httpCommon.delete(
      `/setup/activity/` + payload?.doc?._id,
      {
        headers: {
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
const fetchAllProperty = async (payload) => {
  try {
    const response = await httpCommon.post(
      '/place/place_list',
      {},
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
const fetchNonBusinessPropertyById = async (payload) => {
  try {
    const response = await httpCommon.post('/place/place_list', payload?.doc, {
      headers: { Authorization: `Bearer ${payload.access_token}` },
    })
    return response.data
  } catch (error) {
    console.error('Error creating :', error.response?.data || error.message)
    throw error
  }
}

const AllPropertyServices = {
  createNonBusinessProperty,
  updateNonBusinessProperty,
  removeActivity,
  fetchAllProperty,
  fetchNonBusinessPropertyById,
}
export default AllPropertyServices
