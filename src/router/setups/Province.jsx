import PlacePage from '../../pages/Setups/province/Province'
import ProvinceDetail from '../../pages/Setups/province/detail/Detail'
const ProvinceRoutes = () => {
  const routes = [
    {
      path: '/province',
      element: <PlacePage />,
    },
    {
      path: '/province/detail/:id',
      element: <ProvinceDetail />,
    },
  ]
  return routes
}

export default ProvinceRoutes
