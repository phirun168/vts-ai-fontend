import TypeList from '../../pages/Setups/type/Type'
import TypeDetail from '../../pages/Setups/type/detail/Detail'
const TypeRoutes = () => {
  const routes = [
    {
      path: '/type',
      element: <TypeList />,
      children: [
        {
          path: 'place',
          element: <TypeList />,
        },
        {
          path: 'food',
          element: <TypeList />,
        },
      ],
    },
    {
      path: '/type/detail/:id',
      element: <TypeDetail />,
    },
  ]
  return routes
}

export default TypeRoutes
