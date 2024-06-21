import { useContext } from "react";
import { AuthContext } from "../providers/FirebaseProvider";

const useAuth = () => {
    const data = useContext(AuthContext);
    return data;
};

export default useAuth;