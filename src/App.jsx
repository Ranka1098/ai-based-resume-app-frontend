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
import ResumeDetail from "./pages/ResumeDetail";
import FullResume from "./pages/components/FullResume";

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
          path: "/resume/:id",
          element: (
            <ProtectRoutes>
              <ResumeDetail />
            </ProtectRoutes>
          ),
        },
      ],
    },
    {
      path: "/fullresume/:id",
      element: (
        <ProtectRoutes>
          <FullResume />
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
