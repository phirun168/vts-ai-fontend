import React from 'react'
import AlbumTabs from './AlbumTabs'
import Swal from 'sweetalert2'

export default function App() {
  const images = [
    // Exterior
    {
      id: 'e1',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKn-X2ZRRr7DWK4gEnkQFFo_NSpS4dxoS-gg&s',
      album: 'Exterior',
    },
    {
      id: 'e2',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKn-X2ZRRr7DWK4gEnkQFFo_NSpS4dxoS-gg&s',
      album: 'Exterior',
    },
    {
      id: 'e3',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKn-X2ZRRr7DWK4gEnkQFFo_NSpS4dxoS-gg&s',
      album: 'Exterior',
    },
    {
      id: 'e4',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKn-X2ZRRr7DWK4gEnkQFFo_NSpS4dxoS-gg&s',
      album: 'Exterior',
    },
    {
      id: 'e5',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKn-X2ZRRr7DWK4gEnkQFFo_NSpS4dxoS-gg&s',
      album: 'Exterior',
    },
    {
      id: 'e6',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKn-X2ZRRr7DWK4gEnkQFFo_NSpS4dxoS-gg&s',
      album: 'Exterior',
    },

    // Room
    {
      id: 'r1',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKn-X2ZRRr7DWK4gEnkQFFo_NSpS4dxoS-gg&s',
      album: 'Room',
    },
    {
      id: 'r2',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKn-X2ZRRr7DWK4gEnkQFFo_NSpS4dxoS-gg&s',
      album: 'Room',
    },
    {
      id: 'r3',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKn-X2ZRRr7DWK4gEnkQFFo_NSpS4dxoS-gg&s',
      album: 'Room',
    },

    // Dining
    {
      id: 'd1',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKn-X2ZRRr7DWK4gEnkQFFo_NSpS4dxoS-gg&s',
      album: 'Dining',
    },
    {
      id: 'd2',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKn-X2ZRRr7DWK4gEnkQFFo_NSpS4dxoS-gg&s',
      album: 'Dining',
    },
    {
      id: 'd3',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKn-X2ZRRr7DWK4gEnkQFFo_NSpS4dxoS-gg&s',
      album: 'Dining',
    },
    {
      id: 'd4',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKn-X2ZRRr7DWK4gEnkQFFo_NSpS4dxoS-gg&s',
      album: 'Dining',
    },

    // Other
    {
      id: 'o1',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKn-X2ZRRr7DWK4gEnkQFFo_NSpS4dxoS-gg&s',
      album: 'Other',
    },
    {
      id: 'o2',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKn-X2ZRRr7DWK4gEnkQFFo_NSpS4dxoS-gg&s',
      album: 'Other',
    },
  ]
  const showPreview = (item) => {
    Swal.fire({
      imageUrl: item?.url,
      //   imageAlt: isVideo ? 'Video preview' : 'Image preview',
      showCloseButton: true,
      showConfirmButton: false,

      // direct API for internal padding
      padding: '24px', // space between edge and content

      // you already had width: '50%', you can bump it if you like:
      width: '60%',

      // optional: background behind the popup
      background: '#fff',

      // hook for any additional custom styling
      customClass: {
        popup: 'my-swal-popup',
      },
    })
  }
  const handlePreview = (item) => {
    showPreview(item)
  }
  const handleDelete = (item) => {
    console.log('Delete', item)
  }

  return (
    <div style={{ padding: 24 }}>
      <AlbumTabs
        images={images}
        onPreview={handlePreview}
        onDelete={handleDelete}
      />
    </div>
  )
}
