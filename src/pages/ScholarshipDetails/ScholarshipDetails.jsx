import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import AuthButton from "../../components/AuthButton";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ScholarshipDetails = () => {
    const [scholarship, setScholarship] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchScholarshipDetails = async () => {
            try {
                const response = await axiosPublic.get(`/top-scholarships/${id}`);
                setScholarship(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchScholarshipDetails();
    }, [id, axiosPublic]);

    if (loading) {
        return <Loading></Loading>;
    }

    if (error) {
        return <div className="text-red-400 text-2xl font-semibold min-h-[49vh] flex items-center justify-center">Error: { error }</div>;
    }

    return (
        <>
            <Helmet>
                <title>Scholarship Portal | Scholarship Details</title>
            </Helmet>

            <div className="container my-16 mx-auto px-2 md:px-4">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:w-1/5 md:h-auto px-4">
                        <div className="mb-4">
                            <img className="w-full h-full object-cover rounded" src={ scholarship.university_logo } alt={ `${scholarship.university_name} logo` } />
                        </div>
                        <div className="mb-4 w-full px-2">
                            <Link to={ {
                                pathname: `/payment/${scholarship._id}`,
                                search: `?universityName=${encodeURIComponent(scholarship.university_name)}&scholarshipCategory=${encodeURIComponent(scholarship.scholarship_category)}&subjectCategory=${encodeURIComponent(scholarship.subject_name)}&applicationFees=${encodeURIComponent(scholarship.application_fees)}&serviceCharge=${encodeURIComponent(scholarship.service_charge)}`,
                                state: {
                                    universityName: scholarship.university_name,
                                    scholarshipCategory: scholarship.scholarship_category,
                                    subjectCategory: scholarship.subject_name,
                                    applicationFees: scholarship.application_fees,
                                    serviceCharge: scholarship.service_charge
                                }
                            } } >
                                <AuthButton text="Apply Scholarship" />
                            </Link>
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-text-900 mb-2">{ scholarship.university_name }</h2>
                        <p className="text-gray-600 mb-4">{ scholarship.subject_name }</p>
                        <div className="flex mb-4 flex-wrap">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700">Stipend: </span>
                                <span className="text-gray-600">{ scholarship.stipend } USD</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700">Deadline: </span>
                                <span className="text-gray-600">{ scholarship.application_deadline }</span>
                            </div>
                        </div>
                        <div className="flex mb-4 flex-wrap">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700">Application Fees: </span>
                                <span className="text-gray-600">{ scholarship.application_fees } USD</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700">Service Charge: </span>
                                <span className="text-gray-600">{ scholarship.service_charge } USD</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700">More Information:</span>
                            <div className="flex items-center gap-y-2 flex-wrap  mt-2">
                                <button className="bg-accent-300 text-accent-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-accent-400">{ scholarship.scholarship_category }</button>
                                <button className="bg-accent-300 text-accent-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-accent-400">{ scholarship.university_location.city }</button>
                                <button className="bg-accent-300 text-accent-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-accent-400">{ scholarship.university_location.country }</button>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700">Scholarship Description:</span>
                            <p className="text-gray-600 text-sm mt-2">{ scholarship.scholarship_description }</p>
                        </div>
                        <div className="mt-4 text-sm">
                            <span className="font-bold text-gray-700">Posted on: </span>
                            <span className="text-gray-600">{ scholarship.post_date }</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ScholarshipDetails;