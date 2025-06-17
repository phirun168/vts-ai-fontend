import Activity from '../../../pages/Settings/setups/activity/Activity'
import ActivityDetail from '../../../pages/Settings/setups/activity/detail/Detail'
const ActivityRoutes = () => {
  const routes = [
    {
      path: '/activity',
      element: <Activity />,
    },
    {
      path: '/activity/detail/:id',
      element: <ActivityDetail />,
    },
  ]
  return routes
}

export default ActivityRoutes
