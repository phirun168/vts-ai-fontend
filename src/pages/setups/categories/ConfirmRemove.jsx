import Swal from 'sweetalert2'
import { Avatar } from 'antd'
import CategoryServices from '../../../services/setup/Category'

const showAlert = ({
  record,
  access_token,
  getCategory,
  setLoading,
  getFileImage,
}) => {
  const deleteCategory = async () => {
    try {
      const doc = { _id: record?._id }
      const res = await CategoryServices.removeCategory({ access_token, doc }) // Await the API call
      if (res) {
        getCategory()
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
        <!-- Avatar Image (Simulated using inline HTML) -->
        <div style="display: flex; justify-content: center; margin-bottom: 10px;">
         <img
            src="${record?.image ? `${getFileImage(record?.filePath)}/large-${record?.image}` : 'https://via.placeholder.com/50'}"
            style="width: 80px; height: 80px; border-radius: 5px; object-cover: cover; border: 1px solid #ddd;"
            alt="Category Avatar"
          />
         
        </div>

        <h3 style="margin: 5px 0; font-size: 20px; color: #333;">${record?.nameEn || 'Default Title'}</h3>

        <p style="font-size: 14px; color: #777;">${record?.nameKh || 'No subtitle available'}</p>

        <p style="font-size: 14px; color: #444;">${record?.description || 'No description available'}</p>

      </div>
      <p><a href="${'/category/detail/' + record?._id}" target="_blank" style="color: #3085d6; text-decoration: none;font-size:12px;"> View Detail </a></p>


    `,
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      deleteCategory()
    }
  })
}

export default showAlert
