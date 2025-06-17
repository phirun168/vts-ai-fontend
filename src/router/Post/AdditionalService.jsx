import AdditionalService from '../../pages/Posts/additionalService/AdditionalService'
import AdditionalServiceDetail from '../../pages/Posts/additionalService/detail/Detail'
const AdditionalServiceRoutes = () => {
  const routes = [
    {
      path: '/additional-service',
      element: <AdditionalService />,
    },
    {
      path: '/additional/service/detail',
      element: <AdditionalServiceDetail />,
    },
  ]
  return routes
}
export default AdditionalServiceRoutes
