import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

const PrivateRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const [role, setRole] = useState("");
    
    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await axiosPublic.get(`/user-role/${user.email}`);
                setRole(response.data.role);
            } catch (error) {
                console.error("Error fetching user role:", error);
            }
        };

        if (user) {
            fetchUserRole();
        }
    }, [user, axiosPublic]);

    if (loading) {
        return <Loading></Loading>;
    }

    if (!user) {
        return <Navigate to="/login" state={ location?.pathname || "/" }></Navigate>;
    }

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        return <Navigate to="/" />;
    }

    return <>{ children }</>;
};

PrivateRoute.propTypes = {
    children: PropTypes.node,
    allowedRoles: PropTypes.arrayOf(PropTypes.string),
}

export default PrivateRoute;