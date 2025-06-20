import React, { useContext, useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { message } from "antd";
import { publicRoute, authRoute } from "./router/Index";
import "./styles/colors.scss";
import { AuthContext } from "./contexts/AuthContext";
import CheckAuth from "./services/admin/check-auth";

const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { access_token, setPermissions, setIsAdminFn, setMenuSideBar } =
    useContext(AuthContext);
  // const location = useLocation();
  //
  const [connection, setConnection] = useState(navigator.onLine);

  const handleOffline = () => {
    setConnection(false);
    messageApi.open({
      key: "internetStatus",
      type: "loading",
      content: <b style={{ color: "red" }}>Error: No internet connection!</b>,
      duration: 0,
    });
  };

  const handleOnline = () => {
    setConnection(true);
    messageApi.open({
      key: "internetStatus",
      type: "success",
      content: <b>Internet connected!</b>,
      duration: 2,
    });
  };

  useEffect(() => {
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [connection]);

  useEffect(() => {
    if (location.href.includes("/login")) return;
    CheckAuth.getUserInfoWhenRefreshPage(access_token)
      .then((res) => {
        setPermissions(res.permissions);
        setIsAdminFn(res.user.isAdmin);
        setMenuSideBar(res.sideBar);
        localStorage.setItem("user_info", JSON.stringify(res));
      })
      .catch((error) => {
        console.log(error);
        //
        const testRoute = ["/"];
        const pathname = window.location.pathname || null;
        if (testRoute.includes(pathname)) return;
        //
        window.location.href = "/logout";
      });
  }, []);

  // Enable the v7_startTransition flag here
  const router = createBrowserRouter([...publicRoute(), ...authRoute()]);

  return (
    <React.Fragment>
      {contextHolder}
      <RouterProvider router={router} />
    </React.Fragment>
  );
};

export default App;
