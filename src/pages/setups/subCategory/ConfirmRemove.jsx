import Swal from 'sweetalert2'
import SubCategoryServices from '../../../services/setup/SubCategory'

const showAlert = ({
  record,
  access_token,
  getSubCategory,
  setLoading,
  getFileImage,
}) => {
  const deleteSubCategory = async () => {
    try {
      const doc = { _id: record?._id }
      const res = await SubCategoryServices.removeSubCategory({
        access_token,
        doc,
      })
      if (res) {
        getSubCategory()
        setLoading(true)
        Swal.fire({
          icon: 'success',
          title: 'Upload Successful!',
          text: 'The information has been updated successfully.',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed!',
        text: 'Something went wrong while updating.',
        timer: 1500,
      })
    }
  }

  // Build the image path or use a fallback
  const imageSrc = record?.image
    ? `${getFileImage(record?.filePath)}/large-${record?.image}`
    : 'https://via.placeholder.com/50'

  Swal.fire({
    // Display the image above the title
    imageUrl: imageSrc,
    imageWidth: 80,
    imageHeight: 80,
    imageAlt: 'Category Avatar',

    // Title & text
    title: record?.nameEn
      ? `${record?.nameEn} - ${record?.nameKh}`
      : 'Default Title',
    text: record?.description || 'Default description',
    icon: '', // Hide the default SweetAlert2 icon

    // Custom HTML section (below the text)
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; font-size: 12px; gap: 10px;">
        <div>Description</div>
        <div style="display: flex; justify-content: center; gap: 20px; border: 1px solid #ddd; padding: 10px; width: 100%; max-width: 400px;">
          <div style="border-right: 1px solid #ddd; padding-right: 20px; text-align: center;">
            <p><strong>Location:</strong> <span class="text-blue-500">${'N/A'}</span></p>
          </div>
          <div style="padding-left: 20px; text-align: center;">
            <p><strong>Category:</strong> <span class="text-blue-500">${'N/A'}</span></p>
          </div>
        </div>
        <p>
          <a
            href="${'/sub-category/detail/' + record?._id}"
            target="_blank"
            style="color: #3085d6; text-decoration: none;"
          >
            View Detail
          </a>
        </p>
      </div>
    `,

    // Buttons
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',

    // Optional custom classes to target styling
    customClass: {
      title: 'custom-title',
      image: 'custom-image',
    },

    // Inline styling adjustments via DOM access
    willOpen: () => {
      const titleElement = document.querySelector('.custom-title')
      const imageElement = document.querySelector('.custom-image')

      // Customize the title
      if (titleElement) {
        titleElement.style.fontSize = '20px'
        titleElement.style.margin = '0px'
        titleElement.style.padding = '0px'
      }

      // Customize the image
      if (imageElement) {
        imageElement.style.borderRadius = '5px'
        imageElement.style.objectFit = 'cover'
        imageElement.style.border = '1px solid #ddd'
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      deleteSubCategory()
    }
  })
}

export default showAlert
