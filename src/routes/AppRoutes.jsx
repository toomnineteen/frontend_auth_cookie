import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layouts/Layout";
import LayoutUser from "../layouts/LayoutUser";

import Login from "../auth/Login";
import Register from "../auth/Register";
import PageHome from "../pages/PageHome";

import PageHomeUser from "../pages/user/PageHomeUser";
import Profile from "../pages/user/Profile";
import ProtectRouteUser from "./ProtectRouteUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <PageHome /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/user",
    element: <ProtectRouteUser element={<LayoutUser />} />,
    children: [
      { index: true, element: <PageHomeUser /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRoutes;
