import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://artizans-mart-ecommerce-server.onrender.com", 
  withCredentials: true, 
});
const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
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