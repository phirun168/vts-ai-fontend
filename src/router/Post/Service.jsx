import Service from '../../pages/Posts/service/Service'
import ServiceDetail from '../../pages/Posts/service/detail/Detail'
const ServiceRoutes = () => {
    const routes = [
        {
            path: '/service',
            element: <Service />,
        },
        {
            path: '/service/detail',
            element: <ServiceDetail />,
        },

    ]
    return routes
}

export default ServiceRoutes
