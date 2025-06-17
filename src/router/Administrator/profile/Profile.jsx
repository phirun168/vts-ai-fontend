import UserProfile from '../../../pages/Administrator/profile/Sidebar'
import ProfileInfo from '../../../pages/Administrator/profile/ProfileInfo'
import Password from '../../../pages/Administrator/profile/Password'
import Module from '../../../pages/Administrator/profile/Module'
import Role from '../../../pages/Administrator/profile/Role'
const UserProfileRoutes = () => {
  const routes = [
    {
      path: '/profile',
      element: <UserProfile />,
      children: [
        {
          path: 'info',
          element: <ProfileInfo />,
        },
        {
          path: 'password',
          element: <Password />,
        },
        {
          path: 'module',
          element: <Module />,
        },
        {
          path: 'role',
          element: <Role />,
        },
      ],
    },
  ]
  return routes
}

export default UserProfileRoutes
