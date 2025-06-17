import ViewUserPage from '../../pages/Administrator/users/view/ViewUser'
import UserInfo from '../../pages/Administrator/users/view/UserInfor'
import UserPassword from '../../pages/Administrator/users/view/UserPassword'
import UserPermission from '../../pages/Administrator/users/view/UserPermission'

const ViewUserRoutes = () => {
  const routes = [
    {
      path: '/administrator/user/:userId',
      element: <ViewUserPage />,
      children: [
        {
          path: 'info', // child route will be /@administrator/add-module
          element: <UserInfo />,
        },
        {
          path: 'permission', // child route will be /@administrator/add-module
          element: <UserPermission />,
        },
        {
          path: 'password', // child route will be /@administrator/add-module
          element: <UserPassword />,
        },
      ],
    },
  ]
  return routes
}

export default ViewUserRoutes
