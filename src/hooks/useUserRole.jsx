import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useUserRole = (userEmail) => {
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchUserRole = async () => {
            setLoading(true);
            try {
                const response = await axiosPublic.get(`/user-role/${userEmail}`);
                setRole(response.data.role);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };

        if (userEmail) {
            fetchUserRole();
        }
    }, [userEmail, axiosPublic]);

    return { role, loading, error };
};

export default useUserRole;