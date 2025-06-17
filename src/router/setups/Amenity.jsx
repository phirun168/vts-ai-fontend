import Amenity from '../../pages/setups/amenity/Amenity'
import AmenityDetail from '../../pages/setups/amenity/detail/Detail'
const AmenityRoutes = () => {
  const routes = [
    {
      path: '/amenity',
      element: <Amenity />,
    },
    {
      path: '/amenity/detail/:id',
      element: <AmenityDetail />,
    },
  ]
  return routes
}

export default AmenityRoutes
