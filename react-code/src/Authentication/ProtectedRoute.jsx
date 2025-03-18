import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";

function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <p className="text-blue-500">Checking authentication...</p>;
  }

  return isAuthenticated ? element : <Navigate to="/" />;
}

export default ProtectedRoute;
