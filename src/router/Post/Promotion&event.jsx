import PromotionAndEvent from '../../pages/Posts/promotion&event/Promotion&Event'
import PromotionAndEventDetail from '../../pages/Posts/promotion&event/detail/Detail'
const PromotionAndEventRoutes = () => {
    const routes = [
        {
            path: '/promotion&event',
            element: <PromotionAndEvent />,
        },
        {
            path: '/promotion&event/detail',
            element: <PromotionAndEventDetail />,
        },

    ]
    return routes
}

export default PromotionAndEventRoutes
