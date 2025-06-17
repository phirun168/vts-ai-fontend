import httpCommon from 'utils/http-common'
const getAddress = async (payload) => {
  console.log(payload)

  try {
    const response = await httpCommon.post(
      `/other/location_view`,
      payload?.doc,
      {
        headers: {
          Authorization: `Bearer ${payload.access_token}`,
        },
      }
    )
    console.log(response, 'tes me')

    return response.data
  } catch (error) {
    console.error('Error creating :', error.response?.data || error.message)
    throw error
  }
}
const AddressService = {
  getAddress,
}
export default AddressService
