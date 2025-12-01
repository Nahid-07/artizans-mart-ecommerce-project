import { useContext } from "react";
import { AuthContext } from "../context_API/authContext";
const useAuth = () => useContext(AuthContext);
export default useAuth;