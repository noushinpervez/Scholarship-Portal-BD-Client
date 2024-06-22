import { Helmet } from "react-helmet-async";
import useScholarshipData from "../../../../hooks/useScholarshipData";
import Loading from "../../../../components/Loading";
import Title from "../../../../components/Title";
import { MdOutlineCancel, MdOutlineEdit } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ManageScholarships = () => {
    const [scholarships, loading, error, refetch] = useScholarshipData();
    const axiosPublic = useAxiosPublic();

    if (loading) {
        return <Loading></Loading>;
    }

    if (error) {
        return <div className="text-red-400 text-2xl font-semibold min-h-screen flex items-center justify-center">Error: { error }</div>;
    }

    // Cancel scholarship
    const handleCancelScholarship = async (scholarshipId) => {
        const result = await Swal.fire({
            title: `Are you sure you want to cancel this scholarship?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
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
                                            className="text-sm bg-accent-500 hover:bg-accent-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-1"
                                        >
                                            <CgDetailsMore className="lg:w-5 lg:h-5 w-4 h-4" />
                                        </Link>

                                        <button
                                            type="button"
                                            className="text-sm bg-primary-500 hover:bg-primary-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-1"
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
        </>
    );
};

export default ManageScholarships;