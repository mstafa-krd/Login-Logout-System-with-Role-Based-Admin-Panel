import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { authApi } from "../api/AuthApi";
import { UserContext } from "../context/userContext";

const CheckAuth = () => {
  const [auth, setAuth] = useState();
  const [loader, setLoader] = useState(true);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(authApi, { withCredentials: true })
      .then((res) => {
        setAuth(res.data);
        setUser(res.data.user);
        localStorage.setItem("user", true);

        setLoader(false);
      })
      .catch((err) => {
        console.error("Error checking authentication status", err);
        setLoader(false);
      });
  }, [setUser]);
  return loader ? (
    <Loader />
  ) : auth.authenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default CheckAuth;
