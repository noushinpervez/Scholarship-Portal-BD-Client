import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import PropTypes from "prop-types";
import useUserRole from "../hooks/useUserRole";

const PrivateRoute = ({ children, allowedRoles }) => {
    const { user, loading: authLoading } = useAuth();
    const location = useLocation();
    const { role, loading: roleLoading } = useUserRole(user?.email);

    if (authLoading) {
        return <Loading />;
    }

    if (roleLoading && user) {
        return <Loading />;
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