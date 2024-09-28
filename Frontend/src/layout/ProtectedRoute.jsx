import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  // console.log("Auth state in ProtectedRoute:", auth);

  if (!auth.isAuthenticated) {
    // console.log("User is not authenticated, redirecting to landing page.");
    return <Navigate to="/landing_page" />;
  }

  // console.log("User has access, rendering children.");
  return children;
};

export default ProtectedRoute;
