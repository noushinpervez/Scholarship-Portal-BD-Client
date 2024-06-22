import Loading from "../../components/Loading";
import ScholarshipCard from "../../layout/ScholarshipCard/ScholarshipCard";
import { Link } from "react-router-dom";
import useScholarshipData from "../../hooks/useScholarshipData";

const TopScholarship = () => {
    const [scholarships, loading, error] = useScholarshipData();

    if (loading) {
        return <Loading></Loading>;
    }

    if (error) {
        return <div>Error: { error }</div>;
    }

    return (
        <section className="container my-16 mx-auto px-2 md:px-4">
            <h2 className="text-center mb-12 px-6 text-3xl font-bold text-accent-600">Top Scholarship</h2>

            {/* Top scholarship cards */ }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:px-3 lg:px-6 mb-6">
                {
                    scholarships.slice(0, 6).map(scholarship => (
                        <ScholarshipCard key={ scholarship._id } scholarship={ scholarship } />
                    ))
                }
            </div>

            {/* All scholarship button */ }
            <div className="flex justify-center w-full">
                <Link to="all-scholarship" className="relative inline-block px-4 py-2 font-medium group rounded">
                    <span className="absolute inset-0 w-full h-full transition duration-500 ease-out transform translate-x-1 translate-y-1 bg-primary-600 group-hover:-translate-x-0 group-hover:-translate-y-0 rounded"></span>
                    <span className="absolute inset-0 w-full h-full bg-primary-50 border-2 border-primary-600 group-hover:bg-primary-600 rounded"></span>
                    <span className="relative group-hover:text-text-50 uppercase">View All Scholarship</span>
                </Link>
            </div>
        </section>
    );
};

export default TopScholarship;