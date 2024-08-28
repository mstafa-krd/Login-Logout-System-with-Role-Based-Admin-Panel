import { Navigate, Outlet } from "react-router-dom";

export default function LoginRedicrect() {
  const user = localStorage.getItem("user");

  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return <Outlet />;
}
