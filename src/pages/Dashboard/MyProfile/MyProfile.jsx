import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import Title from "../../../components/Title";

const MyProfile = () => {
    const { user } = useAuth();

    return (
        <>
            <Helmet>
                <title>Dashboard | Profile</title>
            </Helmet>

            <div className="container my-16 mx-auto px-2 md:px-4">
                <Title title="Profile Information" />

                <div className="flex justify-center items-center h-full">
                    <div className="w-full overflow-hidden max-w-screen-md m-auto rounded border border-background-100">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium">User Profile</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Information about the user</p>
                        </div>

                        {/* User Information */}
                        <div className="border-t border-background-100 px-4 py-5 sm:p-0">
                            <div className="sm:divide-y sm:divide-background-100">
                                {/* Profile image */}
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <p></p>
                                    <img className="inline-flex object-cover border-4 border-blue-600 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-blue-600/100 h-48 w-48 bg-current" src={ user?.photoURL } alt={ user?.displayName } />
                                </div>

                                {/* Full nme */}
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <p className="text-sm font-medium text-gray-500">Full name</p>
                                    <p className="mt-1 text-sm sm:mt-0 sm:col-span-2">{ user?.displayName }</p>
                                </div>

                                {/* Email */}
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <p className="text-sm font-medium text-gray-500">Email address</p>
                                    <p className="mt-1 text-sm sm:mt-0 sm:col-span-2">{ user?.email }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyProfile;