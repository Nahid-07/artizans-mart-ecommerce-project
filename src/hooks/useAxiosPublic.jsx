import axios from "axios";

// Export the instance directly
export const axiosPublic = axios.create({
  baseURL: "https://artizans-mart-ecommerce-server.onrender.com", 
});

// Keep the hook for use in components
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;