import { Helmet } from "react-helmet-async";
import Title from "../../../../components/Title";

const ManageApplications = () => {
    return (
        <>
            <Helmet>
                <title>Dashboard | Manage Applications</title>
            </Helmet>

            <Title title="Manage Applications" />
        </>
    );
};

export default ManageApplications;