import Swal from 'sweetalert2'

const showAlert = ({
  image,
  title,
  description,
  amountOfPlace,
  amountOfCategory,
}) => {
  Swal.fire({
    title: title || 'Default Title',
    text: description || 'Default description',
    imageUrl:
      'https://static.vecteezy.com/system/resources/thumbnails/026/746/427/small_2x/illustration-image-nature-and-sustainability-eco-friendly-living-and-conservation-concept-art-of-earth-and-animal-life-in-different-environments-generative-ai-illustration-free-photo.jpg', // Use the image for the alert
    imageWidth: 150,
    imageHeight: 120,
    imageAlt: 'Custom image', // Alt text for the image
    icon: '', // Empty icon to avoid the default icon
    html: `
    <div style="display: flex; flex-direction: column; align-items: center; font-size: 12px; gap: 10px;">
      <div style="display: flex; justify-content: center; gap: 20px; border: 1px solid #ddd; padding: 10px; width: 100%; max-width: 400px;">
        <div style="padding-right: 20px; text-align: center;">
          <p><strong>Location Name:</strong> <span class="text-blue-500">${amountOfPlace || 'N/A'}</span> </p>
        </div>
        <div style="padding-right: 20px; text-align: center;">
          <p><strong>Location Owner:</strong> <span class="text-blue-500">${amountOfPlace || 'N/A'}</span> </p>
        </div>
      </div>

    </div>
  `,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    customClass: {
      title: 'custom-title', // Custom class for the title
      image: 'custom-image', // Custom class for the image
    },
    willOpen: () => {
      const titleElement = document.querySelector('.custom-title')
      const imageElement = document.querySelector('.custom-image')

      if (titleElement) {
        // Apply custom styles to the title
        titleElement.style.fontSize = '20px' // Set font size
        titleElement.style.margin = '0px 0' // Set margin
        titleElement.style.padding = '0px' // Set padding
      }

      if (imageElement) {
        // Apply border radius to the image
        imageElement.style.borderRadius = '15px' // Set border-radius
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Confirmed!', 'You confirmed the alert.', 'success')
    }
  })
}

export default showAlert
