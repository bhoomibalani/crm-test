// API Configuration
export const API_CONFIG = {
  // Railway backend URL
  BASE_URL: "https://crm-test-production-e9bb.up.railway.app",

  // API Endpoints
  ENDPOINTS: {
    LOGIN: "/api/simple-login.php", // Using simple login
    LOGOUT: "/api/simple-login.php", // Using simple login for logout
    VERIFY: "/api/verify.php",
  },
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
