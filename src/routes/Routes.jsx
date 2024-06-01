import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivetRoute from "../Privet/PrivetRoute";
import Surveys from "../pages/Surveys";

import UserDashboard from "../components/DashBoard/UserDashboard";
import AdminDashboard from "../components/DashBoard/AdminDashboard";
import SurveyorDashboard from "../components/DashBoard/SurveyorDashboard";
import DashBoard from "../layout/DashBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/singup",
        element: <Register />,
      },
      {
        path: "/surveys",
        element: (
          <PrivetRoute>
            <Surveys />
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivetRoute>
        <DashBoard />
      </PrivetRoute>
    ),
    children: [
      {
        path: "user",
        element: <UserDashboard />,
      },
      {
        path: "admin",
        element: <AdminDashboard />,
      },
      {
        path: "surveyor",
        element: <SurveyorDashboard />,
      },
    ],
  },
]);

export default router;
