//
import Test from 'pages/others/Test.jsx'
import Test1 from 'pages/others/Test1'
import TestTabRoute from '../pages/others/TestTab'
import TableLcL from '../pages/others/print/container-detail/TableLcL'
import TableAir from '../pages/others/print/container-detail/TableAir'
import TableExp from '../pages/others/print/container-detail/TableExp'

// prints table test

const TestRoute = () => {
  const routes = [
    {
      path: '/test',
      element: <Test />,
    },
    {
      path: '/test1',
      element: <Test1 />,
    },
    {
      path: '/test-tab/:keyTab?',
      element: <TestTabRoute />,
    },
    {
      path: '/print/table-lcl',
      element: <TableLcL />,
    },
    {
      path: '/print/table-exp',
      element: <TableExp />,
    },
    {
      path: '/print/table-air',
      element: <TableAir />,
    },
  ]
  return routes
}

export default TestRoute
