import React, { useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Button, Input } from 'antd'

const center = {
  lat: 11.5564, // Phnom Penh latitude
  lng: 104.9282, // Phnom Penh longitude
}

const LeafletMapComponent = ({ form }) => {
  const [selectedPosition, setSelectedPosition] = useState(center)
  const [locationName, setLocationName] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const fetchLocationName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      )
      const data = await response.json()
      if (data.display_name) {
        setLocationName(data.display_name)
        form.setFieldsValue({
          googleMapLocation: `${lat}, ${lng}`,
          locationName: data.display_name,
        })
      }
    } catch (error) {
      console.error('Failed to fetch location name:', error)
    }
  }

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchTerm
        )}&format=json&addressdetails=1&limit=1`
      )
      const results = await response.json()
      if (results.length > 0) {
        const { lat, lon, display_name } = results[0]
        setSelectedPosition({ lat: parseFloat(lat), lng: parseFloat(lon) })
        setLocationName(display_name)
        form.setFieldsValue({
          googleMapLocation: `${lat}, ${lon}`,
          locationName: display_name,
        })
      } else {
        console.error('Location not found')
      }
    } catch (error) {
      console.error('Failed to search for location:', error)
    }
  }

  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        const newPosition = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        }
        setSelectedPosition(newPosition)
        fetchLocationName(newPosition.lat, newPosition.lng)
      },
    })
    return null
  }

  const AutoMoveMap = ({ center }) => {
    const map = useMap()
    map.setView(center, 13) // Move the map to the new center
    return null
  }

  return (
    <div>
      <div
        style={{
          marginBottom: '10px',
          marginTop: '10px',
          display: 'flex',
          gap: '10px',
        }}
      >
        <Input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Enter a location (e.g., Central Market, Phnom Penh)'
          style={{ flex: 1, padding: '8px' }}
        />
        <Button
          onClick={handleSearch}
          style={{ paddingTop: '18px', paddingBottom: '18px' }}
        >
          Search
        </Button>
      </div>
      <MapContainer
        center={selectedPosition}
        zoom={13}
        style={{ width: '100%', height: '300px' }}
        key={`${selectedPosition.lat}-${selectedPosition.lng}`} // Force re-render to ensure the map updates
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={selectedPosition} />
        <AutoMoveMap center={selectedPosition} />
        <MapEvents />
      </MapContainer>
      <div style={{ marginTop: '10px' }}>
        <strong>Location:</strong>{' '}
        {locationName || 'Click on the map or search to select a location'}
      </div>
    </div>
  )
}

export default LeafletMapComponent
