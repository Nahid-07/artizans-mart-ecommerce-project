import { useContext } from "react";
import { AuthContext } from "../context_API/authContext";
import { Navigate, useLocation } from "react-router";

export const PrivateRoute = ({ children }) => {
  let location = useLocation();
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!user && !user?.email) {
    return <Navigate to="/login_user" state={{ from: location }} replace></Navigate>
  } else {
    return children;
  }
};
