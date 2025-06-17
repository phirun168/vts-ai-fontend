import FollowUpPage from '../../../pages/ManageProperty/PlaceListing/followUp/FollowUp'
import PropertyPage from '../../../pages/ManageProperty/PlaceListing/Property/Property'
import PlaceDetail from '../../../pages/ManageProperty/PlaceListing/PropertyDetail/detail/Detail'
import Service from '../../../pages/ManageProperty/PlaceListing/PropertyDetail/detail/posts/service/Service'
import Moment from '../../../pages/ManageProperty/PlaceListing/PropertyDetail/detail/posts/Moments/Moment'
import Promotion from '../../../pages/ManageProperty/PlaceListing/PropertyDetail/detail/posts/Promotion/Promotion'
import UserLocation from '../../../pages/ManageProperty/PlaceListing/PropertyDetail/detail/User'
import ReviewImportPage from '../../../pages/ManageProperty/PlaceListing/reviewImport/Property'
//
import PropertyDetail from '../../../pages/ManageProperty/PlaceListing/PropertyDetails/Tabs'
//
const PlaceListingRoutes = () => {
  const routes = [
    {
      path: '/followUp',
      element: <FollowUpPage />,
    },
    {
      path: '/property',
      element: <PropertyPage />,
    },
    {
      path: '/list-place/detail/:id',
      element: <PlaceDetail />,
      children: [
        {
          path: 'service',
          element: <Service />,
        },
        {
          path: 'moment',
          element: <Moment />,
        },

        {
          path: 'promotion',
          element: <Promotion />,
        },
        {
          path: 'user',
          element: <UserLocation />,
        },
      ],
    },
    {
      path: '/review-import',
      element: <ReviewImportPage />,
    },
    {
      path: '/property/:id',
      element: <PropertyDetail />,
    },
  ]
  return routes
}

export default PlaceListingRoutes
