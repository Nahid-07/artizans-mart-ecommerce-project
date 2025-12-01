import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth"; // You'll need to create a simple useAuth hook or use useContext(AuthContext)

const axiosSecure = axios.create({
  baseURL: "https://artizans-mart-ecommerce-server.onrender.com", 
  withCredentials: true, // This sends cookies to the server
});

const useAxiosSecure = () => {
  const { logOut } = useAuth(); // Assuming you have this context exposed
  const navigate = useNavigate();

  useEffect(() => {
    // Interceptor to handle 401/403 errors (invalid token)
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response ? error.response.status : null;
        if (status === 401 || status === 403) {
          await logOut();
          navigate("/login_user");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;