import { Helmet } from "react-helmet-async";
import Title from "../../../components/Title";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { MdOutlineCancel, MdOutlineEdit, MdOutlineReviews } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import ScholarshipFormInput from "../../../components/ScholarshipFormInput";

const MyApplication = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedApplicationDetails, setSelectedApplicationDetails] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editApplicationDetails, setEditApplicationDetails] = useState({
        universityName: "",
        scholarshipCategory: "",
        subjectCategory: "",
        applyingDegree: "",
        applicationFees: "",
        serviceCharge: "",
        applicationStatus: "",
    });

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

    const handleViewDetails = (application) => {
        setSelectedApplicationDetails(application);
        setDetailModalOpen(true);
    };

    const handleCloseDetailModal = () => {
        setSelectedApplicationDetails(null);
        setDetailModalOpen(false);
    };

    const handleEditApplication = (application) => {
        setEditApplicationDetails({
            universityName: application.universityName,
            scholarshipCategory: application.scholarshipCategory,
            subjectCategory: application.subjectCategory,
            applyingDegree: application.applyingDegree,
            applicationFees: application.applicationFees,
            serviceCharge: application.serviceCharge,
            applicationStatus: application.applicationStatus,
        });
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleEditFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await axiosPublic.put(`/applications/${selectedApplicationDetails._id}`, editApplicationDetails);

            await Swal.fire({
                title: "Success!",
                text: "Application details updated successfully.",
                icon: "success",
                background: "var(--accent-100)",
                color: "var(--text-primary)",
                confirmButtonColor: "var(--primary-500)",
            });

            handleCloseEditModal();
            refetch();
        } catch (error) {
            await Swal.fire({
                title: "Error",
                text: "Failed to update application. Please try again later.",
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
                                    <th className="text-left p-3 px-5">Application Feedback</th>
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
                                        <td className="p-3 px-5">{ application.feedback }</td>
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
                                                onClick={ () => handleEditApplication() }
                                                className="text-sm bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                            >
                                                <MdOutlineEdit className="lg:w-5 lg:h-5 w-4 h-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={ () => handleCancelApplication(application._id) }
                                                className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                            >
                                                <MdOutlineCancel className="lg:w-5 lg:h-5 w-4 h-4" />
                                            </button>
                                            <button
                                                type="button"
                                                className="text-sm bg-accent-500 hover:bg-accent-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                <MdOutlineReviews className="lg:w-5 lg:h-5 w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                )) }
                            </tbody>
                        </table>
                    </div>
                ) }
            </div>

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

            {/* Edit Application Modal */ }
            { editModalOpen && selectedApplicationDetails && (
                <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-background-50 w-full max-w-md p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Edit Application</h2>
                        <form onSubmit={ handleEditFormSubmit }>
                            <ScholarshipFormInput
                                label="University Name"
                                value={ editApplicationDetails.universityName }
                                onChange={ (e) =>
                                    setEditApplicationDetails({ ...editApplicationDetails, universityName: e.target.value })
                                }
                                name="universityName"
                                required
                            />

                            <ScholarshipFormInput
                                label="Scholarship Category"
                                value={ editApplicationDetails.scholarshipCategory }
                                onChange={ (e) =>
                                    setEditApplicationDetails({ ...editApplicationDetails, scholarshipCategory: e.target.value })
                                }
                                name="scholarshipCategory"
                                required
                            />

                            <ScholarshipFormInput
                                label="Subject Category"
                                value={ editApplicationDetails.subjectCategory }
                                onChange={ (e) =>
                                    setEditApplicationDetails({ ...editApplicationDetails, subjectCategory: e.target.value })
                                }
                                name="subjectCategory"
                                required
                            />

                            <ScholarshipFormInput
                                label="Applied Degree"
                                value={ editApplicationDetails.applyingDegree }
                                onChange={ (e) =>
                                    setEditApplicationDetails({ ...editApplicationDetails, applyingDegree: e.target.value })
                                }
                                name="applyingDegree"
                                required
                            />

                            <ScholarshipFormInput
                                label="Application Fees"
                                value={ editApplicationDetails.applicationFees }
                                onChange={ (e) =>
                                    setEditApplicationDetails({ ...editApplicationDetails, applicationFees: e.target.value })
                                }
                                name="applicationFees"
                                type="number"
                                required
                            />

                            <ScholarshipFormInput
                                label="Service Charge"
                                value={ editApplicationDetails.serviceCharge }
                                onChange={ (e) =>
                                    setEditApplicationDetails({ ...editApplicationDetails, serviceCharge: e.target.value })
                                }
                                name="serviceCharge"
                                type="number"
                                required
                            />

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={ handleCloseEditModal }
                                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) }
        </>
    );
};

export default MyApplication;