import Tours from '../../pages/Posts/Tours/Tours'
import ToursDetail from '../../pages/Posts/Tours/detail/Detail'
const ToursRoutes = () => {
  const routes = [
    {
      path: '/tours',
      element: <Tours />,
    },
    {
      path: '/tours/detail',
      element: <ToursDetail />,
    },
  ]
  return routes
}

export default ToursRoutes
