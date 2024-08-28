import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.array,
};
export default function ProtectedRoute({ allowedRoles }) {
  const user = useContext(UserContext);

  // Check if the user has one of the allowed roles
  if (allowedRoles.includes(user.user.role)) {
    return <Outlet />;
  } else {
    return <Navigate to="/404" />;
  }
}
