import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useScholarshipData = () => {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const response = await axiosPublic.get("/top-scholarships");
                setScholarships(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchScholarships();
    }, [axiosPublic]);
    
    return [scholarships, loading, error];
};

export default useScholarshipData;