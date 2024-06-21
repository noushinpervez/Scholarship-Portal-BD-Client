import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import AllScholarship from "../pages/AllScholarship/AllScholarship";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";
import MyProfile from "../pages/MyProfile/MyProfile";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,

        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "all-scholarship",
                element: <AllScholarship></AllScholarship>,
            },
            {
                path: "login",
                element: <Login></Login>,
            },
            {
                path: "signup",
                element: <SignUp></SignUp>,
            },
            {
                path: "scholarships/:id",
                element: <PrivateRoute>
                    <ScholarshipDetails />
                </PrivateRoute>,
            },
        ],
    },
    {
        path: "dashboard",
        element: <PrivateRoute>
            <Dashboard />
        </PrivateRoute>,
        children: [
            {
                path: "profile",
                element: <MyProfile></MyProfile>,
            },
        ],
    },
]);