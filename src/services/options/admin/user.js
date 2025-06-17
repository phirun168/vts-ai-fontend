import httpCommon from 'utils/http-common'

const fetchUserForRole = async (payload) => {
  try {
    const response = await httpCommon.get('/opts/user_for_role', {
      headers: { Authorization: `Bearer ${payload.access_token}` },
    })

    return response.data
  } catch (error) {
    console.error('Error creating user:', error.response?.data || error.message)
    throw error
  }
}
const fetchUserForRoleById = async (payload) => {
  try {
    const response = await httpCommon.get(
      '/opts/user_for_role?userId=' + payload.doc._id,
      {
        headers: { Authorization: `Bearer ${payload.access_token}` },
      }
    )

    return response.data
  } catch (error) {
    console.error('Error creating user:', error.response?.data || error.message)
    throw error
  }
}

const UserOptService = {
  fetchUserForRole,
  fetchUserForRoleById,
}
export default UserOptService
