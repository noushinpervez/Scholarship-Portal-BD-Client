import { Helmet } from "react-helmet-async";
import Title from "../../../../components/Title";

const ManageUsers = () => {
    return (
        <>
            <Helmet>
                <title>Admin Dashboard | Manage Users</title>
            </Helmet>

            <div className="container my-16 mx-auto px-2 md:px-4">
                <Title title="Manage Users" />
            </div>
        </>
    );
};

export default ManageUsers;