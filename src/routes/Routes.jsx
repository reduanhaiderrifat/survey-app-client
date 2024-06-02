import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivetRoute from "../Privet/PrivetRoute";
import Surveys from "../pages/Surveys";



import SurveyorDashboard from "../components/DashBoard/SurveyorDashboard";
import DashBoard from "../layout/DashBoard";
import UpdateForm from "../components/DashBoard/Surveyor/UpdateForm";
import SurveyorDetails from "../components/DashBoard/Surveyor/SurveyorDetails";
import UserDashBoard from "../components/DashBoard/User/UserDashBoard";
import AdminDashboard from "../components/DashBoard/AdminDashboard.jsx/AdminDashboard";

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
        element: <UserDashBoard />,
      },
      {
        path: "admin",
        element: <AdminDashboard />,
      },
      {
        path: "surveyor",
        element: <SurveyorDashboard />,
      },
      {
        path: "surveyor/update/:id",
        element: <UpdateForm />,
      },
      {
        path: "surveyor/details/:id",
        element: <SurveyorDetails />,
      },
    ],
  },
]);

export default router;
