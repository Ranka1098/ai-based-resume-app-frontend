import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Otp from "./pages/otp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ForgetPassword from "./pages/ForgetPassword";
import ProtectRoutes from "./pages/ProtectRoutes";
import PublicRoutes from "./pages/PublicRoutes";
import Layout from "./pages/Layout";
import Dashbord from "./pages/Dashbord";
import ResumeDetail from "./pages/ResumeDetail";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectRoutes>
              <Home />
            </ProtectRoutes>
          ),
        },
        {
          path: "/dashboard",
          element: <Dashbord />,
        },
      ],
    },
    {
      path: "/resume/:id",
      element: (
        <ProtectRoutes>
          <ResumeDetail />
        </ProtectRoutes>
      ),
    },
    {
      path: "/register",
      element: (
        <PublicRoutes>
          {" "}
          <Register />
        </PublicRoutes>
      ),
    },
    {
      path: "/otp",
      element: (
        <PublicRoutes>
          {" "}
          <Otp />
        </PublicRoutes>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoutes>
          {" "}
          <Login />
        </PublicRoutes>
      ),
    },
    {
      path: "/forgetPassword",
      element: (
        <PublicRoutes>
          {" "}
          <ForgetPassword />
        </PublicRoutes>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
