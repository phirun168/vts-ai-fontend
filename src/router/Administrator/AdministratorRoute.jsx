import AdministratorPage from '../../pages/Administrator/AdministratorTab'
import AddModule from '../../pages/Administrator/Modules/AddModule'
import ViewRole from '../../pages/Administrator/roles/Edit/UpdateRole'
import UpdateModule from '../../pages/Administrator/Modules/UpdateModule'
//
import AddUser from '../../pages/Administrator/users/AddUser'
import AddRole from '../../pages/Administrator/roles/AddRole'
import UpdateRole from '../../pages/Administrator/roles/Edit/UpdateRole'
//children administrator
import UserInfo from '../../pages/Administrator/users/view/UserInfor'
import Roles from '../../pages/Administrator/roles/RoleList'
import ModuleUser from '../../pages/Administrator/moduleUser/ModuleUser'
import Modules from '../../pages/Administrator/modules/Modules'
//end children administrator
const AdministratorRoutes = () => {
  const routes = [
    {
      path: '/administrator',
      element: <AdministratorPage />,
      children: [
        {
          path: 'user',
          element: <UserInfo />,
        },
        {
          path: 'role',
          element: <Roles />,
        },
        {
          path: 'module',
          element: <Modules />,
        },

        {
          path: 'module-user',
          element: <ModuleUser />,
        },
      ],
    },
    //
    {
      path: '/administrator/user/form',
      element: <AddUser />,
    },
    //
    {
      path: '/administrator/module/form',
      element: <AddModule />,
    },
    {
      path: '/administrator/module/form/:id',
      element: <UpdateModule />,
    },
    //
    {
      path: '/view-role',
      element: <ViewRole />,
    },
    {
      path: '/administrator/role/form',
      element: <AddRole />,
    },
    {
      path: '/administrator/role/form/:id',
      element: <UpdateRole />,
    },
  ]
  return routes
}

export default AdministratorRoutes
