import { Helmet } from "react-helmet-async";
import Title from "../../../components/Title";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { MdOutlineCancel, MdOutlineFeedback } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import useAuth from "../../../hooks/useAuth";

const MyApplication = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data: scholarshipApplications = [], refetch } = useQuery({
        queryKey: ["scholarshipApplications", user.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/applications/${user.email}`);
            return res.data;
        }
    });

    const handleCancelApplication = async (applicationId) => {
        const result = await Swal.fire({
            title: "Cancel Application",
            text: "Are you sure you want to cancel this application?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--primary-500)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel",
            background: "var(--accent-100)",
            color: "var(--text-primary)",
        });

        if (result.isConfirmed) {
            await axiosPublic.delete(`/applications/${applicationId}`);
            await Swal.fire({
                title: "Canceled!",
                text: "The application has been canceled.",
                icon: "success",
                background: "var(--accent-100)",
                color: "var(--text-primary)",
                confirmButtonColor: "var(--primary-500)",
            });
            refetch();
        }
    };

    return (
        <>
            <Helmet>
                <title>Dashboard | My Applications</title>
            </Helmet>

            <Title title="My Applications" />

            <div>
                <div className="p-4 flex">
                    <h1 className="text-2xl">Total Applications: { scholarshipApplications.length }</h1>
                </div>
                { scholarshipApplications.length === 0 ? (
                    <div className="p-4">
                        <div className="text-red-400 text-2xl font-semibold flex items-center justify-center mt-16">No applications found.</div>
                    </div>
                ) : (
                    <div className="px-3 py-4 flex overflow-scroll">
                        <table className="w-full bg-accent-100 shadow rounded mb-4 text-xs lg:text-sm">
                            <tbody>
                                <tr className="border-b border-accent-100">
                                    <th className="p-2"></th>
                                    <th className="text-left p-3 px-5">University Name</th>
                                    <th className="text-left p-3 px-5">Scholarship Category</th>
                                    <th className="text-left p-3 px-5">Subject Category</th>
                                    <th className="text-left p-3 px-5">Applied Degree</th>
                                    <th className="text-left p-3 px-5">Application Fees</th>
                                    <th className="text-left p-3 px-5">Service Charge</th>
                                    <th className="text-left p-3 px-5">Application Status</th>
                                    <th></th>
                                </tr>
                                { scholarshipApplications.map((application, index) => (
                                    <tr
                                        key={ application._id }
                                        className="border-b hover:bg-primary-100 bg-background-50 border-accent-100"
                                    >
                                        <th>{ index + 1 }</th>
                                        <td className="p-3 px-5">{ application.universityName }</td>
                                        <td className="p-3 px-5">{ application.scholarshipCategory }</td>
                                        <td className="p-3 px-5">{ application.subjectCategory }</td>
                                        <td className="p-3 px-5">{ application.applyingDegree }</td>
                                        <td className="p-3 px-5">{ application.applicationFees }</td>
                                        <td className="p-3 px-5">{ application.serviceCharge }</td>
                                        <td className="p-3 px-5">{ application.applicationStatus }</td>
                                        <td className="p-3 px-5 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={ () => console.log("Details clicked") }
                                                className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                            >
                                                <CgDetailsMore className="lg:w-5 lg:h-5 w-4 h-4" />
                                                Details
                                            </button>
                                            <button
                                                type="button"
                                                onClick={ () => console.log("Feedback clicked") }
                                                className="text-sm bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                            >
                                                <MdOutlineFeedback className="lg:w-5 lg:h-5 w-4 h-4" />
                                                Feedback
                                            </button>
                                            <button
                                                type="button"
                                                onClick={ () => handleCancelApplication(application._id) }
                                                className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                <MdOutlineCancel className="lg:w-5 lg:h-5 w-4 h-4" />
                                                Cancel
                                            </button>
                                        </td>
                                    </tr>
                                )) }
                            </tbody>
                        </table>
                    </div>
                ) }
            </div>
        </>
    );
};

export default MyApplication;