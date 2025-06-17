import Category from '../../pages/Setups/categories/Category'
import CategoryDetail from '../../pages/Setups/categories/detail/Detail'
import SubCategoryList from '../../pages/Setups/categories/detail/SubCategory'
import Location from '../../pages/Setups/categories/detail/Location'
const CategoryRoutes = () => {
  const routes = [
    {
      path: '/category',
      element: <Category />,
    },
    {
      path: '/category/detail/:id',
      element: <CategoryDetail />,
      children: [
        {
          path: 'subcategory',
          element: <SubCategoryList />,
        },
        {
          path: 'location',
          element: <Location />,
        },
      ],
    },
  ]
  return routes
}

export default CategoryRoutes
