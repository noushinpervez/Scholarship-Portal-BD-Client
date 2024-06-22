import { Helmet } from "react-helmet-async";
import useScholarshipData from "../../../../hooks/useScholarshipData";
import Loading from "../../../../components/Loading";
import Title from "../../../../components/Title";
import { MdOutlineCancel, MdOutlineEdit } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useState } from "react";
import ScholarshipFormInput from "../../../../components/ScholarshipFormInput";
import ScholarshipFormOptionInput from "../../../../components/ScholarshipFormOptionInput";

const ManageScholarships = () => {
    const [scholarships, loading, error, refetch] = useScholarshipData();
    const axiosPublic = useAxiosPublic();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedScholarship, setEditedScholarship] = useState(null);

    const subjectCategories = ["Agriculture", "Engineering", "Doctor"];
    const scholarshipCategories = ["Full Funding", "Partial Funding", "Self-funded"];
    const degrees = ["Diploma", "Bachelor", "Masters"];

    if (loading) {
        return <Loading></Loading>;
    }

    if (error) {
        return <div className="text-red-400 text-2xl font-semibold min-h-screen flex items-center justify-center">Error: { error }</div>;
    }

    const openEditModal = (scholarship) => {
        setEditedScholarship(scholarship);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setEditedScholarship(null);
    };

    const handleUpdateScholarship = async () => {
        try {
            const response = await axiosPublic.put(`/update-scholarships/${editedScholarship._id}`, editedScholarship);
            if (response.status === 200) {
                await Swal.fire({
                    title: "Updated!",
                    text: "Scholarship has been updated successfully.",
                    icon: "success",
                    background: "var(--accent-100)",
                    color: "var(--text-primary)",
                });
                refetch();
                closeEditModal();
            } else {
                throw new Error("Failed to update scholarship");
            }
        } catch (error) {
            console.error("Error updating scholarship:", error);
            await Swal.fire({
                title: "Error",
                text: "Failed to update scholarship",
                icon: "error",
                background: "var(--accent-100)",
                color: "var(--text-primary)",
                confirmButtonColor: "var(--primary-500)",
            });
        }
    };

    // Cancel scholarship
    const handleCancelScholarship = async (scholarshipId) => {
        const result = await Swal.fire({
            title: `Are you sure you want to cancel this scholarship?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--primary-500)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel scholarship!",
            background: "var(--accent-100)",
            color: "var(--text-primary)",
        });

        if (result.isConfirmed) {
            await axiosPublic.delete(`/top-scholarships/${scholarshipId}`);
            await Swal.fire({
                title: "Canceled!",
                text: "Scholarship has been canceled.",
                icon: "success",
                background: "var(--accent-100)",
                color: "var(--text-primary)",
            });
            refetch();
        }
    };

    return (
        <>
            <Helmet>
                <title>Dashboard | Manage Scholarships</title>
            </Helmet>

            <Title title="Manage Scholarships" />

            <div className="p-4 flex">
                <h1 className="text-2xl">Total Scholarships: { scholarships.length }</h1>
            </div>

            <div className="px-3 py-4 flex overflow-scroll">
                <table className="w-full bg-accent-100 shadow rounded mb-4 text-xs lg:text-sm">
                    <tbody>
                        <tr className="border-b border-accent-100">
                            <th className="p-2"></th>
                            <th className="text-left p-3 px-5">Scholarship Category</th>
                            <th className="text-left p-3 px-5">University Name</th>
                            <th className="text-left p-3 px-5">Subject Category</th>
                            <th className="text-left p-3 px-5">Degree</th>
                            <th className="text-left p-3 px-5">Application Fees</th>
                            <th></th>
                        </tr>
                        {
                            scholarships.map((scholarship, index) => (
                                <tr
                                    key={ scholarship._id }
                                    className="border-b hover:bg-primary-100 bg-background-50 border-accent-100"
                                >
                                    <th className="p-2">{ index + 1 }</th>
                                    <td className="p-3 px-5">{ scholarship.scholarship_category }</td>
                                    <td className="p-3 px-5">{ scholarship.university_name }</td>
                                    <td className="p-3 px-5">{ scholarship.subject_name }</td>
                                    <td className="p-3 px-5">{ scholarship.degree_name }</td>
                                    <td className="p-3 px-5">{ scholarship.application_fees }</td>
                                    <td className="p-3 px-5 flex justify-end">
                                        <Link to={ `/scholarships/${scholarship._id}` }
                                            className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                        >
                                            <CgDetailsMore className="lg:w-5 lg:h-5 w-4 h-4" />
                                        </Link>

                                        <button
                                            type="button" 
                                            onClick={ () => openEditModal(scholarship) } 
                                            className="text-sm bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                        >
                                            <MdOutlineEdit className="lg:w-5 lg:h-5 w-4 h-4" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={ () => handleCancelScholarship(scholarship._id) }
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
            {/* Edit Scholarship Modal */ }
            { editModalOpen && (
                <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 lg:flex items-center justify-center p-4">
                    <div className="bg-background-50 w-full max-w-md p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Edit Scholarship</h2>
                        <ScholarshipFormInput
                            label="University Name"
                            value={ editedScholarship.university_name }
                            onChange={ (e) =>
                                setEditedScholarship({
                                    ...editedScholarship,
                                    university_name: e.target.value,
                                })
                            }
                        />
                        <ScholarshipFormInput
                            label="University Location - Country"
                            value={ editedScholarship?.university_location?.country || "" }
                            onChange={ (e) =>
                                setEditedScholarship({
                                    ...editedScholarship,
                                    university_location: {
                                        ...editedScholarship.university_location,
                                        country: e.target.value,
                                    },
                                })
                            }
                        />
                        <ScholarshipFormOptionInput
                            label="Scholarship Category"
                            value={ editedScholarship.scholarship_category }
                            options={ scholarshipCategories }
                            onChange={ (e) =>
                                setEditedScholarship({
                                    ...editedScholarship,
                                    scholarship_category: e.target.value,
                                })
                            }
                        />
                        <ScholarshipFormInput
                            label="Application Deadline"
                            type="date"
                            value={ editedScholarship.application_deadline }
                            onChange={ (e) =>
                                setEditedScholarship({
                                    ...editedScholarship,
                                    application_deadline: e.target.value,
                                })
                            }
                        />
                        <ScholarshipFormOptionInput
                            label="Subject Category"
                            value={ editedScholarship.subject_name }
                            options={ subjectCategories }
                            onChange={ (e) =>
                                setEditedScholarship({
                                    ...editedScholarship,
                                    subject_name: e.target.value,
                                })
                            }
                        />
                        <ScholarshipFormInput
                            label="Stipend"
                            value={ editedScholarship.stipend }
                            type="number"
                            onChange={ (e) =>
                                setEditedScholarship({
                                    ...editedScholarship,
                                    stipend: e.target.value,
                                })
                            }
                        />
                        <ScholarshipFormInput
                            label="Service Charge"
                            value={ editedScholarship.service_charge }
                            type="number"
                            onChange={ (e) =>
                                setEditedScholarship({
                                    ...editedScholarship,
                                    service_charge: e.target.value,
                                })
                            }
                        />
                        <ScholarshipFormInput
                            label="Application Fees"
                            value={ editedScholarship.application_fees }
                            type="number"
                            onChange={ (e) =>
                                setEditedScholarship({
                                    ...editedScholarship,
                                    application_fees: e.target.value,
                                })
                            }
                        />
                        <ScholarshipFormOptionInput
                            label="Degree"
                            value={ editedScholarship.degree_name }
                            options={ degrees }
                            onChange={ (e) =>
                                setEditedScholarship({
                                    ...editedScholarship,
                                    degree_name: e.target.value,
                                })
                            }
                        />

                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded mr-2"
                                onClick={ handleUpdateScholarship }
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-4 py-2 rounded"
                                onClick={ closeEditModal }
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            ) }
        </>
    );
};

export default ManageScholarships;