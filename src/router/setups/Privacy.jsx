import Privacy from '../../pages/Setups/privacy/Privacy'
import PrivacyDetail from '../../pages/Setups/privacy/detail/Deatil'
const PrivacyRoutes = () => {
  const routes = [
    {
      path: '/privacy',
      element: <Privacy />,
    },
    {
      path: '/privacy/detail/:id',
      element: <PrivacyDetail />,
    },
  ]
  return routes
}

export default PrivacyRoutes
