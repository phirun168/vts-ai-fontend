import httpCommon from 'utils/http-common'
const createCategory = async (payload) => {
  try {
    const response = await httpCommon.post(
      `/setup/category/create`,
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
const updateCategory = async (payload) => {
  try {
    const response = await httpCommon.put(
      `/setup/category/update`,
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
const removeCategory = async (payload) => {
  try {
    const response = await httpCommon.delete(
      `/setup/category/` + payload?.doc?._id,
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
const fetchCategory = async (payload) => {
  try {
    const response = await httpCommon.get(
      '/setup/category/list?search=' + payload?.doc?.search,
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
const fetchCategoryById = async (payload) => {
  try {
    const response = await httpCommon.get(
      `/setup/category/${payload?.doc?._id}`,
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

const CategoryServices = {
  createCategory,
  updateCategory,
  removeCategory,
  fetchCategory,
  fetchCategoryById,
}
export default CategoryServices
