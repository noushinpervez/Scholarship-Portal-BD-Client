import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>;
    }

    if (!user) {
        return <Navigate to="/login" state={ location?.pathname || "/" }></Navigate>;
    }

    return (
        <div>
            { children }
        </div>
    );
};

PrivateRoute.propTypes = {
    children: PropTypes.object
}

export default PrivateRoute;