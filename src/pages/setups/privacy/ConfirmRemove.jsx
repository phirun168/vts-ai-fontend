import Swal from 'sweetalert2'
import AmenityServices from '../../../services/setup/Amenity'
import GroupTypeService from '../../../services/setup/GroupType' // Example service for fetching group types
import PrivacyServices from '../../../services/setup/Privacy'

const showAlert = async ({
  record,
  access_token,
  getPrivacy,
  setLoading,
  getFileImage,
}) => {
  // Fetch group types directly
  let groupType = []
  try {
    const doc = { type: 'Amenity' }
    const res = GroupTypeService.fetchGroupTypeByType({
      access_token,
      doc,
    }) // Replace this with your actual API call

    groupType = res // Adjust based on your API response structure
  } catch (error) {
    console.error('Failed to fetch group types:', error)
  }

  const deletePrivacy = async () => {
    try {
      const doc = { _id: record?._id }
      const res = await PrivacyServices.removePrivacy({ access_token, doc })
      if (res) {
        getPrivacy()
        setLoading(true)
        Swal.fire({
          icon: 'success',
          title: 'Deleted Successfully!',
          text: 'The category has been removed.',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Delete Failed!',
        text: 'Something went wrong while deleting.',
        timer: 1500,
      })
      console.error('Error during delete:', error)
    }
  }

  Swal.fire({
    html: `
      <div style="text-align: center; font-family: Arial, sans-serif;">
        <div style="display: flex; justify-content: center; margin-bottom: 10px;">
          <img
            src="${record?.image ? `${getFileImage(record?.filePath)}/large-${record?.image}` : 'https://via.placeholder.com/50'}"
            style="width: 80px; height: 80px; border-radius: 5px; object-cover: cover; border: 1px solid #ddd;"
            alt="Category Avatar"
          />
        </div>
        <h3 style="margin: 5px 0; font-size: 20px; color: #333;">
          ${record?.nameEn + ' ' + record?.nameKh || 'Default Title'}
        </h3>
        <p style="font-size: 12px; color: #444;">
          ${record?.description || 'No description available'}
        </p>
        <div style="display: flex; justify-content: center; gap: 20px; border: 1px solid #ddd; padding: 10px; width: 100%;">
          <div style="font-size:12px; text-align: center;">
            <p><strong>Location:</strong> <span class="text-blue-500">pp</span></p>
          </div>
          <div style="font-size:12px; text-align: center;">
            <p><strong>Types:</strong> <span class="text-blue-500">${record?.group}</span></p>
          </div>
        </div>
        <p><a href="${'/category/detail/' + record?._id}" target="_blank" style="color: #3085d6; text-decoration: none; font-size:12px;"> View Detail </a></p>
      </div>
    `,
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      deletePrivacy()
    }
  })
}

export default showAlert
