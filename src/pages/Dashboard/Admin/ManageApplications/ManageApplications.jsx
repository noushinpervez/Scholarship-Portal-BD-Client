import { Helmet } from "react-helmet-async";
import Title from "../../../../components/Title";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { MdOutlineCancel, MdOutlineFeedback } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { useState } from "react";

const ManageApplications = () => {
    const axiosPublic = useAxiosPublic();
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [feedbackText, setFeedbackText] = useState("");
    const [selectedApplicationId, setSelectedApplicationId] = useState(null);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedApplicationDetails, setSelectedApplicationDetails] = useState(null);

    const { data: scholarshipApplications = [], refetch } = useQuery({
        queryKey: ["scholarshipApplications"],
        queryFn: async () => {
            const res = await axiosPublic.get("/applications");
            return res.data
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
            await axiosPublic.put(`/applications/${applicationId}/cancel`);
            await Swal.fire({
                title: "Canceled!",
                text: "The application status has been updated to rejected.",
                icon: "success",
                background: "var(--accent-100)",
                color: "var(--text-primary)",
                confirmButtonColor: "var(--primary-500)",
            });
            refetch();
        }
    };

    const handleViewDetails = (application) => {
        setSelectedApplicationDetails(application);
        setDetailModalOpen(true);
    };

    const handleCloseDetailModal = () => {
        setSelectedApplicationDetails(null);
        setDetailModalOpen(false);
    };

    const handleOpenFeedbackModal = (applicationId) => {
        setSelectedApplicationId(applicationId);
        setFeedbackModalOpen(true);
    };

    const handleCloseFeedbackModal = () => {
        setFeedbackText("");
        setSelectedApplicationId(null);
        setFeedbackModalOpen(false);
    };

    const handleFeedbackChange = (event) => {
        setFeedbackText(event.target.value);
    };

    const handleSubmitFeedback = async () => {
        if (!feedbackText.trim()) {
            return Swal.fire({
                title: "Error",
                text: "Feedback cannot be empty",
                icon: "error",
                background: "var(--accent-100)",
                color: "var(--text-primary)",
                confirmButtonColor: "var(--primary-500)",
            });
        }

        try {
            await axiosPublic.post(`/applications/${selectedApplicationId}/feedback`, {
                feedback: feedbackText,
            });
            await Swal.fire({
                title: "Feedback Submitted!",
                text: "The feedback has been submitted successfully.",
                icon: "success",
                background: "var(--accent-100)",
                color: "var(--text-primary)",
                confirmButtonColor: "var(--primary-500)",
            });
            handleCloseFeedbackModal();
            refetch();
        } catch (error) {
            console.error("Error submitting feedback:", error);
            Swal.fire({
                title: "Error",
                text: "Failed to submit feedback. Please try again later.",
                icon: "error",
                background: "var(--accent-100)",
                color: "var(--text-primary)",
                confirmButtonColor: "var(--primary-500)",
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Dashboard | Manage Scholarship Applications</title>
            </Helmet>

            <Title title="Manage Scholarship Applications" />

            <div>
                <div className="p-4 flex">
                    <h1 className="text-2xl">Total Applications: { scholarshipApplications.length }</h1>
                </div>
                { scholarshipApplications.length === 0 ? (
                    <div className="p-4">
                        <div className="text-red-400 text-2xl font-semibold flex items-center justify-center">No applications found.</div>
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
                                        <th className="p-2">{ index + 1 }</th>
                                        <td className="p-3 px-5">{ application.universityName }</td>
                                        <td className="p-3 px-5">{ application.scholarshipCategory }</td>
                                        <td className="p-3 px-5">{ application.subjectCategory }</td>
                                        <td className="p-3 px-5">{ application.applyingDegree }</td>
                                        <td className="p-3 px-5">{ application.applicationFees }</td>
                                        <td className="p-3 px-5">{ application.serviceCharge }</td>
                                        <td className="p-3 px-5 uppercase">{ application.applicationStatus }</td>
                                        <td className="p-3 px-5 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={ () => handleViewDetails(application) }
                                                className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                            >
                                                <CgDetailsMore className="lg:w-5 lg:h-5 w-4 h-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={ () => handleOpenFeedbackModal(application._id) }
                                                className="text-sm bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                            >
                                                <MdOutlineFeedback className="lg:w-5 lg:h-5 w-4 h-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={ () => handleCancelApplication(application._id) }
                                                className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                <MdOutlineCancel className="lg:w-5 lg:h-5 w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                )) }
                            </tbody>
                        </table>
                    </div>
                ) }
            </div>

            {/* Feedback Modal */ }
            { feedbackModalOpen && (
                <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-background-50 w-full max-w-md p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Provide Feedback</h2>
                        <textarea
                            value={ feedbackText }
                            onChange={ handleFeedbackChange }
                            placeholder="Enter your feedback here..."
                            className="h-40 mb-4 mt-1 block w-full border border-gray-500 rounded shadow focus:border-primary-500 focus:ring focus:ring-primary-500 p-2 bg-accent-100 text-sm"
                        />
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={ handleSubmitFeedback }
                                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2"
                            >
                                Submit Feedback
                            </button>
                            <button
                                type="button"
                                onClick={ handleCloseFeedbackModal }
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            ) }

            {/* Scholarship Detail Modal */ }
            { detailModalOpen && selectedApplicationDetails && (
                <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-background-50 w-full max-w-3xl p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Scholarship Application Details</h2>
                        <div className="mb-4">
                            <p className="font-semibold">University Name:</p>
                            <p>{ selectedApplicationDetails.universityName }</p>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold">Scholarship Category:</p>
                            <p>{ selectedApplicationDetails.scholarshipCategory }</p>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold">Subject Category:</p>
                            <p>{ selectedApplicationDetails.subjectCategory }</p>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold">Applied Degree:</p>
                            <p>{ selectedApplicationDetails.applyingDegree }</p>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold">Application Fees:</p>
                            <p>{ selectedApplicationDetails.applicationFees }</p>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold">Service Charge:</p>
                            <p>{ selectedApplicationDetails.serviceCharge }</p>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold">Application Status:</p>
                            <p className="uppercase">{ selectedApplicationDetails.applicationStatus }</p>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={ handleCloseDetailModal }
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            ) }
        </>
    );
};

export default ManageApplications;