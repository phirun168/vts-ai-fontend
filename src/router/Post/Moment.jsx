import Moments from '../../pages/Posts/moment/Moment'
import MomentsDetail from '../../pages/Posts/moment/detail/Detail'
const MomentRoutes = () => {
  const routes = [
    {
      path: '/moment',
      element: <Moments />,
    },
    {
      path: '/moment/detail',
      element: <MomentsDetail />,
    },
  ]
  return routes
}

export default MomentRoutes
