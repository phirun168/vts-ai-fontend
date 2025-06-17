import RequestListPlace from '../../../pages/MobileApp/RequestPlace/PlaceListTab'
import UserProfile from '../../../pages/MobileApp/users/detail/UserProfile'

const RequestListPlaceRoutes = () => {
  const routes = [
    {
      path: '/request-list-place',
      element: <RequestListPlace />,
    },
  ]
  return routes
}

export default RequestListPlaceRoutes
