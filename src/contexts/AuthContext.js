/**
 * RD & Company CRM - Authentication Context
 * Handles user authentication and role-based access control
 */

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// User roles and their permissions
export const USER_ROLES = {
  ADMIN: 'admin',
  SALES_PERSON: 'sales_person',
  OFFICE_STAFF: 'office_staff',
  CLIENT: 'client'
};

export const PERMISSIONS = {
  // User Management
  MANAGE_USERS: 'manage_users',
  VIEW_USERS: 'view_users',
  
  // Order Management
  MANAGE_ORDERS: 'manage_orders',
  VIEW_ORDERS: 'view_orders',
  CREATE_ORDERS: 'create_orders',
  
  // Ledger Management
  MANAGE_LEDGERS: 'manage_ledgers',
  REQUEST_LEDGERS: 'request_ledgers',
  UPLOAD_LEDGERS: 'upload_ledgers',
  
  // Task Management
  MANAGE_TASKS: 'manage_tasks',
  VIEW_TASKS: 'view_tasks',
  
  // Attendance Management
  MANAGE_ATTENDANCE: 'manage_attendance',
  VIEW_ATTENDANCE: 'view_attendance',
  
  // Reporting
  VIEW_REPORTS: 'view_reports',
  MANAGE_REPORTS: 'manage_reports'
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
    PERMISSIONS.MANAGE_REPORTS
  ],
  [USER_ROLES.SALES_PERSON]: [
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.CREATE_ORDERS,
    PERMISSIONS.REQUEST_LEDGERS,
    PERMISSIONS.VIEW_TASKS,
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.MANAGE_REPORTS
  ],
  [USER_ROLES.OFFICE_STAFF]: [
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.VIEW_LEDGERS,
    PERMISSIONS.MANAGE_TASKS,
    PERMISSIONS.VIEW_TASKS,
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.VIEW_REPORTS
  ],
  [USER_ROLES.CLIENT]: [
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.CREATE_ORDERS,
    PERMISSIONS.REQUEST_LEDGERS,
    PERMISSIONS.VIEW_TASKS
  ]
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('crm_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Mock authentication - replace with actual API call
      const mockUsers = [
        {
          id: 1,
          name: 'Admin User',
          email: 'admin@rdcompany.com',
          role: USER_ROLES.ADMIN,
          permissions: ROLE_PERMISSIONS[USER_ROLES.ADMIN]
        },
        {
          id: 2,
          name: 'John Sales',
          email: 'sales@rdcompany.com',
          role: USER_ROLES.SALES_PERSON,
          permissions: ROLE_PERMISSIONS[USER_ROLES.SALES_PERSON]
        },
        {
          id: 3,
          name: 'Office Staff',
          email: 'office@rdcompany.com',
          role: USER_ROLES.OFFICE_STAFF,
          permissions: ROLE_PERMISSIONS[USER_ROLES.OFFICE_STAFF]
        },
        {
          id: 4,
          name: 'Client User',
          email: 'client@example.com',
          role: USER_ROLES.CLIENT,
          permissions: ROLE_PERMISSIONS[USER_ROLES.CLIENT]
        }
      ];

      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('crm_user', JSON.stringify(foundUser));
        return { success: true, user: foundUser };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('crm_user');
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
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
