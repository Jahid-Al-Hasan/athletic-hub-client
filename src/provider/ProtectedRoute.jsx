import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, useLocation } from "react-router";
import { Loading } from "../components/Loading/Loading";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate state={location?.pathname} to="/login"></Navigate>;
  } else {
    return children;
  }
};

export default ProtectedRoute;
