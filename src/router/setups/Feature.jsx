import Features from '../../pages/setups/features/Feature'
import FeatureDetail from '../../pages/Setups/features/detail/Detail'
const FeatureRoutes = () => {
  const routes = [
    {
      path: '/feature',
      element: <Features />,
    },
    {
      path: '/feature/detail/:id',
      element: <FeatureDetail />,
    },
  ]
  return routes
}

export default FeatureRoutes
