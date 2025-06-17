import Swal from 'sweetalert2'
import ReactDOM from 'react-dom'
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
    html: `
      <style>
        .custom-swal-popup {
          width: 30vw;
          max-width: 1000px;
          height: auto;
          padding: 20px;
          border-radius: 10px;
          overflow-y: auto;
        }
        .custom-swal-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 12px;
          gap: 10px;
        }
        .custom-info-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 20px;
          border: 1px solid #ddd;
          padding: 10px;
          width: 100%;
          max-width: 400px;
        }
        .custom-info-box div {
          display: flex;
          justify-content: flex-start;
          padding-left: 10px;
        }
        .custom-info-box p strong {
          margin-right: 5px;
        }
      </style>
      <div id="swiper-container" style="width: 100%; margin: auto;"></div>
      <div class="custom-swal-container">
      <div>Description</div>
        <div class="custom-info-box">
          <div>
            <p><strong>Business Account:</strong> <span class="text-blue-500">${amountOfPlace || 'N/A'}</span></p>
          </div>
          <div>
            <p><strong>Business Owner:</strong> <span class="text-blue-500">${amountOfPlace || 'N/A'}</span></p>
          </div>
          <div>
            <p><strong>Post By:</strong> <span class="text-blue-500">${amountOfPlace || 'N/A'}</span></p>
          </div>
          <div>
            <p><strong>Location:</strong> <span class="text-blue-500">${amountOfPlace || 'N/A'}</span></p>
          </div>
        </div>
        
        <p><a href="/sub-category/detail" target="_blank" style="color: #3085d6; text-decoration: none;"> View Detail </a></p>
      </div>
    `,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    customClass: {
      popup: 'custom-swal-popup', // Applies inline styles defined above
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Confirmed!', 'You confirmed the alert.', 'success')
    }
  })
}

export default showAlert
