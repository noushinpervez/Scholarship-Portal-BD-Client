import { Helmet } from "react-helmet-async";
import ScholarshipCard from "../../layout/ScholarshipCard/ScholarshipCard";
import Loading from "../../components/Loading";
import useScholarshipData from "../../hooks/useScholarshipData";

const AllScholarship = () => {
    const [scholarships, loading, error] = useScholarshipData();

    if (loading) {
        return <Loading></Loading>;
    }

    if (error) {
        return <div className="text-red-400 text-2xl font-semibold min-h-[49vh] flex items-center justify-center">Error: { error }</div>;
    }

    return (
        <>
            <Helmet>
                <title>Scholarship Portal | All Scholarship</title>
            </Helmet>
            
            <section className="container my-16 mx-auto px-2 md:px-4">
                <h2 className="text-center mb-12 px-6 text-3xl font-bold text-accent-600">All Scholarship</h2>

                {/* All scholarship cards */ }
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:px-3 lg:px-6 mb-6">
                    {
                        scholarships.map(scholarship => (
                            <ScholarshipCard key={ scholarship._id } scholarship={ scholarship } />
                        ))
                    }
                </div>
            </section>
        </>
    );
};

export default AllScholarship;