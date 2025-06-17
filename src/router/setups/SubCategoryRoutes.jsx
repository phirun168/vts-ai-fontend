import SubCategory from '../../pages/Setups/SubCategory/SubCategory'
import SubCategoryDetail from '../../pages/Setups/SubCategory/detail/Detail'
const SubCategoryRoutes = () => {
  const routes = [
    {
      path: '/sub-category',
      element: <SubCategory />,
    },
    {
      path: '/sub-category/detail/:id',
      element: <SubCategoryDetail />,
    },
  ]
  return routes
}

export default SubCategoryRoutes
