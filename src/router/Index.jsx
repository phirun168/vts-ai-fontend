import { Navigate } from "react-router-dom";

// layout
import ContentLayout from "@/layouts/Layouts";
//
// public
import Login from "pages/Authentication/Login";
import Logout from "pages/Authentication/Logout";
//
// protected
// dashboard
import Dashboard from "pages/Dashboard/Dashboard";
import NotFound from "../pages/NotFound";
import Forbidden from "../pages/Forbidden";

//routes
import TestRoute from "./TestRoute";
//end routes

// *-------------------ROUTES--------------------*//
import ProtectedRoute from "./ProtectedRoute";
import AdministratorRoutes from "./Administrator/AdministratorRoute";
import ViewUserRoutes from "./Administrator/ViewUserRoute";
import UserProfileRoutes from "./Administrator/profile/Profile";
import MobileUsersRoutes from "./MobileApp/users/User";
import CategoryRoutes from "./setups/CategoryRoutes";
import SubCategoryRoutes from "./setups/SubCategoryRoutes";
import TypeRoutes from "./setups/TypeRoutes";
import MomentRoutes from "./Post/Moment";
import HashtagsRoutes from "./setups/Hashtags";
import PromotionAndEventRoutes from "./Post/Promotion&event";
import AdditionalServiceRoutes from "./Post/AdditionalService";
import PrivacyRoutes from "./setups/Privacy";
import ServiceRoutes from "./Post/Service";
import ToursRoutes from "./Post/Tours";
import ProvinceRoutes from "./setups/Province";
// import ActivityRoutes from './setups/Activity'
import AmenityRoutes from "./setups/Amenity";
import FeatureRoutes from "./setups/Feature";
import RequestListPlaceRoutes from "./MobileApp/RequestPlace/RequestPlaceList";
import HomePageRoutes from "./MobileApp/Management/Home";
import KeywordRoutes from "./setups/Keyword";
import FilterCopyIdRoutes from "./other/FilterCopy";
import AreaRoutes from "./setups/Area";
import SettingsRoutes from "./Settings/SettingRoutes";
// *------------------END ROUTES-------------------*//
//manage property
import ManagePropertyRoutes from "./ManageProperty/PropertyRoutes";
import GroupAIRoutes from "./AI/AiRoutes";
//end manage property
const publicRoute = () => {
  const routes = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "/",
      element: <h1>Testing</h1>,
    },
    {
      path: "/test1",
      element: <h1>Testing</h1>,
    },
  ];

  return routes;
};
const authRoute = () => {
  const routes = [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <ContentLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "*",
          element: <Navigate to="/404" />,
        },
        {
          path: "/",
          element: <Navigate to="/dashboard" />,
        },
        {
          path: "/404",
          element: <NotFound />,
        },
        {
          path: "/403",
          element: <Forbidden />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        //mobile app
        ...MobileUsersRoutes(),
        ...RequestListPlaceRoutes(),
        //mobile app
        //administrator
        ...AdministratorRoutes(),
        ...ViewUserRoutes(),
        ...UserProfileRoutes(),
        //administrator
        ...TestRoute(),
        /* --------------- setup  ------------*/
        // ...UserRoutes(),
        ...ProvinceRoutes(),
        // ...PostRoutes(),
        // ...EmployeeRoutes(),
        ...CategoryRoutes(),
        ...SubCategoryRoutes(),
        ...TypeRoutes(),
        ...HashtagsRoutes(),
        // ...ActivityRoutes(),
        ...SettingsRoutes(),
        ...AmenityRoutes(),
        ...PrivacyRoutes(),
        ...ServiceRoutes(),
        ...ToursRoutes(),

        ...FeatureRoutes(),
        ...KeywordRoutes(),
        ...AreaRoutes(),
        /*-----------------end set up-----------------*/
        //other
        ...FilterCopyIdRoutes(),
        //
        //---------Post----------//
        ...MomentRoutes(),
        ...PromotionAndEventRoutes(),
        ...AdditionalServiceRoutes(),
        //-------END Post--------//

        /*-------------------END SET UP-------------*/
        /*-------------------Management-------------*/
        ...HomePageRoutes(),
        /*-------------------Management-------------*/
        /*-------------------Manage Property-------------*/
        ...ManagePropertyRoutes(),
        /*--------------------Manage Property-------------*/
        //GROUP AI
        ...GroupAIRoutes(),
        //END GROUP BLANK
      ],
    },
  ];
  return routes;
};
export { publicRoute, authRoute };
