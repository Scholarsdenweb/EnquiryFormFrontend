import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated, loading, verifyAuth } = useAuth();

  useEffect(() => {
    verifyAuth();
  }, []);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#c61d23] border-t-transparent"></div>
      </div>
    );
  }

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    console.log("isAuthenticated", isAuthenticated);
    return <Navigate to="/adminSignup" replace />;
  }

  // If authenticated, render the desired component
  return <Component />;
};

export default PrivateRoute;