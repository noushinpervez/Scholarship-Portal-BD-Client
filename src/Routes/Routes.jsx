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
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import Payment from "../pages/Payment/Payment";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import AddScholarship from "../pages/Dashboard/Admin/AddScholarship/AddScholarship";
import ManageScholarships from "../pages/Dashboard/Admin/ManageScholarships/ManageScholarships";
import ManageApplications from "../pages/Dashboard/Admin/ManageApplications/ManageApplications";
import ManageReviews from "../pages/Dashboard/Admin/ManageReviews/ManageReviews";
import MyApplication from "../pages/Dashboard/MyApplication/MyApplication";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,

        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "all-scholarship",
                element: <AllScholarship />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                path: "scholarships/:id",
                element: <PrivateRoute>
                    <ScholarshipDetails />
                </PrivateRoute>,
            },
            {
                path: "payment/:id",
                element: <Payment />,
            },
        ],
    },

    // Dashboard routes
    {
        path: "dashboard",
        element: <PrivateRoute>
            <Dashboard />
        </PrivateRoute>,
        children: [
            {
                path: "profile",
                element: <MyProfile />,
            },
            {
                path: "manage-reviews",
                element: <ManageReviews />,
            },
            {
                path: "applied-applications",
                element: <MyApplication />,
            },
            {
                path: "manage-reviews",
                element: <ManageReviews />,
            },

            // Admin routes 
            {
                path: "add-scholarship",
                element: <PrivateRoute allowedRoles={ ["admin"] }>
                    <AddScholarship />
                </PrivateRoute>,
            },
            {
                path: "manage-applied-applications",
                element: <ManageApplications />,
            },
            {
                path: "manage-users",
                element: <PrivateRoute allowedRoles={ ["admin"] }>
                    <ManageUsers />
                </PrivateRoute>,
            },

            // Moderator routes
            {
                path: "manage-scholarships",
                element: <PrivateRoute allowedRoles={ ["admin", "moderator"] }>
                    <ManageScholarships />
                </PrivateRoute>,
            },
        ],
    },
]);