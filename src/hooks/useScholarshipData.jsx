import { useEffect, useState } from "react";

const useScholarshipData = () => {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/top-scholarships")
            .then(res => res.json())
            .then(data => {
                setScholarships(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    return [scholarships, loading, error];
};

export default useScholarshipData;