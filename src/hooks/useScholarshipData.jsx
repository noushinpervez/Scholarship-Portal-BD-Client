import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useScholarshipData = () => {
    const axiosPublic = useAxiosPublic();

    const { data: scholarships = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["topScholarships"],
        queryFn: async () => {
            const res = await axiosPublic.get("/top-scholarships");
            return res.data;
        }
    });

    return [scholarships, isLoading, isError, refetch];
};

export default useScholarshipData;