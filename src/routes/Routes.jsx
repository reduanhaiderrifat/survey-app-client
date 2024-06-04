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
import SurveyForm from "../components/DashBoard/User/SurveyForm";
import Pricing from "../pages/Pricing";
import AdminRoute from "../Privet/AdminRoute";
import SurveyorRoute from "../Privet/SurveyorRoute";
import UserRoute from "../Privet/UserRoute";
import ProUserRoute from "../Privet/ProUserRoute";
import UserSurveyVote from "../components/DashBoard/User/UserSurveyVote";

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
        path: "/uservote/:id",
        element: <UserSurveyVote />,
      },
      {
        path: "/pricing",
        element: (
          <PrivetRoute>
            <Pricing />
          </PrivetRoute>
        ),
      },
      {
        path: "/surveys",
        element: <Surveys />,
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
        element: (
          <UserRoute>
            <UserDashBoard />
          </UserRoute>
        ),
      },
      {
        path: "Pro-User",
        element: (
          <ProUserRoute>
            {" "}
            <UserDashBoard />
          </ProUserRoute>
        ),
      },
      {
        path: "user/survey/:id",
        element: <SurveyForm />,
      },
      {
        path: "Pro-User/survey/:id",
        element: <SurveyForm />,
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "surveyor",
        element: (
          <SurveyorRoute>
            <SurveyorDashboard />
          </SurveyorRoute>
        ),
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
