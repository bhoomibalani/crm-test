/**
 * RD & Company CRM - Authentication Context
 * Handles user authentication and role-based access control
 */

import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { API_CONFIG, getApiUrl } from "config/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// User roles and their permissions
export const USER_ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  SALES: "sales",
  OFFICE: "office",
  CLIENT: "client",
};

export const PERMISSIONS = {
  // User Management
  MANAGE_USERS: "manage_users",
  VIEW_USERS: "view_users",

  // Order Management
  MANAGE_ORDERS: "manage_orders",
  VIEW_ORDERS: "view_orders",
  CREATE_ORDERS: "create_orders",

  // Ledger Management
  MANAGE_LEDGERS: "manage_ledgers",
  REQUEST_LEDGERS: "request_ledgers",
  UPLOAD_LEDGERS: "upload_ledgers",

  // Task Management
  MANAGE_TASKS: "manage_tasks",
  VIEW_TASKS: "view_tasks",

  // Attendance Management
  MANAGE_ATTENDANCE: "manage_attendance",
  VIEW_ATTENDANCE: "view_attendance",

  // Reporting
  VIEW_REPORTS: "view_reports",
  MANAGE_REPORTS: "manage_reports",
};

// Role-based permissions mapping
const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.CREATE_ORDERS,
    PERMISSIONS.MANAGE_LEDGERS,
    PERMISSIONS.UPLOAD_LEDGERS,
    PERMISSIONS.MANAGE_TASKS,
    PERMISSIONS.VIEW_TASKS,
    PERMISSIONS.MANAGE_ATTENDANCE,
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.MANAGE_REPORTS,
  ],
  [USER_ROLES.MANAGER]: [
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.CREATE_ORDERS,
    PERMISSIONS.MANAGE_LEDGERS,
    PERMISSIONS.UPLOAD_LEDGERS,
    PERMISSIONS.MANAGE_TASKS,
    PERMISSIONS.VIEW_TASKS,
    PERMISSIONS.MANAGE_ATTENDANCE,
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.MANAGE_REPORTS,
  ],
  [USER_ROLES.SALES]: [
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.CREATE_ORDERS,
    PERMISSIONS.REQUEST_LEDGERS,
    PERMISSIONS.VIEW_TASKS,
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.MANAGE_REPORTS,
  ],
  [USER_ROLES.OFFICE]: [
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.VIEW_LEDGERS,
    PERMISSIONS.MANAGE_TASKS,
    PERMISSIONS.VIEW_TASKS,
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.VIEW_REPORTS,
  ],
  [USER_ROLES.CLIENT]: [
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.CREATE_ORDERS,
    PERMISSIONS.REQUEST_LEDGERS,
    PERMISSIONS.VIEW_TASKS,
  ],
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session and verify with backend
    const storedUser = localStorage.getItem("crm_user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // Verify session with backend
      verifySession().then((isValid) => {
        if (isValid) {
          setUser(userData);
        } else {
          localStorage.removeItem("crm_user");
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const verifySession = async () => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.VERIFY), {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      return data.success;
    } catch (error) {
      return false;
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.LOGIN), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        const userData = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          permissions: ROLE_PERMISSIONS[data.user.role] || [],
        };

        setUser(userData);
        localStorage.setItem("crm_user", JSON.stringify(userData));
        return { success: true, user: userData };
      } else {
        return { success: false, error: data.message || "Login failed" };
      }
    } catch (error) {
      return { success: false, error: "Network error. Please check your connection." };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout API
      await fetch(getApiUrl(API_CONFIG.ENDPOINTS.LOGOUT), {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Clear local state regardless of API call result
      setUser(null);
      localStorage.removeItem("crm_user");
    }
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  const hasRole = (role) => {
    if (!user) return false;
    return user.role === role;
  };

  const value = {
    user,
    login,
    logout,
    hasPermission,
    hasRole,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
