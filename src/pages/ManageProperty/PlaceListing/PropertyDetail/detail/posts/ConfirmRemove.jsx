import Swal from 'sweetalert2'
import { Avatar } from 'antd'
import CategoryServices from '../../../../../../services/setup/Category'

const showAlert = ({
  record,
  access_token,
  getCategory,
  setLoading,
  getFileImage,
}) => {
  // 🔴 Prevent the popup when no data is available
  if (!record || !record._id) {
    Swal.fire({
      icon: 'warning',
      title: 'No Data Available!',
      text: 'No category data was provided. Please try again later.',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    })
    return
  }

  const deleteCategory = async () => {
    try {
      console.log('Delete function triggered')
      const doc = { _id: record?._id }
      const res = await CategoryServices.removeCategory({ access_token, doc })
      if (res) {
        console.log('Category deleted successfully')
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
      console.error('Error during delete:', error)
      Swal.fire({
        icon: 'error',
        title: 'Delete Failed!',
        text: 'Something went wrong while deleting.',
        timer: 1500,
      })
    }
  }

  console.log('Swal should trigger now', record)
  Swal.fire({
    title: 'Confirm Deletion',
    text: 'Are you sure you want to delete this category?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      console.log('User clicked delete')
      deleteCategory()
    }
  })
}

export default showAlert
