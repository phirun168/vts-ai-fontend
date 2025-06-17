import UserPage from '../../pages/setups/users/UserList'
import UserBusinessTab from '../../pages/setups/users/UserList'
import UserVlogTab from '../../pages/setups/users/UserList'
import UserNormalTab from '../../pages/setups/users/UserList'
import UserRequestTab from '../../pages/setups/users/UserList'
const UserRoutes = () => {
  const routes = [
    {
      path: '/user',
      element: <UserPage />,
      children: [
        {
          path: 'list',
          element: <UserBusinessTab />,
        },
        {
          path: 'request',
          element: <UserRequestTab />,
        },
      ],
    },
  ]
  return routes
}

export default UserRoutes
