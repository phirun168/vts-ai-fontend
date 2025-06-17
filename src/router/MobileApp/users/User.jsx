import MobileUserList from '../../../pages/MobileApp/users/User'
import UserProfile from '../../../pages/MobileApp/users/detail/UserProfile'

const MobileAppUsersRoutes = () => {
  const routes = [
    {
      path: '/app',
      children: [
        {
          path: 'user',
          element: <MobileUserList />,
        },
        {
          path: 'user/profile/:id',
          element: <UserProfile />,
        },
      ],
    },
  ]
  return routes
}

export default MobileAppUsersRoutes
