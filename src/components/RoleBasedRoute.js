/**
 * RD & Company CRM - Role Based Route Component
 * Controls access to routes based on user permissions
 */

import { useAuth } from "contexts/AuthContext";
import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({ children, requiredPermission, requiredRole, fallbackPath = "/dashboard" }) => {
  const { user, hasPermission, hasRole } = useAuth();

  // If no user is logged in, redirect to sign in
  if (!user) {
    return <Navigate to="/authentication/sign-in" replace />;
  }

  // Check permission if required
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to={fallbackPath} replace />;
  }

  // Check role if required
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};

export default RoleBasedRoute;
