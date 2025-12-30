import axios from 'axios';

// Vite exposes env via import.meta.env; avoid process.env in client code
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Log API URL for debugging (only in development)
if (import.meta.env.DEV) {
  console.log('[API] Base URL:', baseURL);
}

export const api = axios.create({ baseURL });

// Add authentication token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle authentication errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // Only redirect if not already on login page to prevent infinite loops
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Authentication API endpoints
 */
export const AuthAPI = {
  registerTenant: (payload) => api.post('/auth/register-tenant', payload),
  login: (payload) => api.post('/auth/login', payload),
  me: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout')
};

/**
 * Tenant management API endpoints
 */
export const TenantsAPI = {
  get: (tenantId) => api.get(`/tenants/${tenantId}`),
  list: (params) => api.get('/tenants', { params }),
  create: (payload) => api.post('/tenants', payload),
  update: (tenantId, payload) => api.put(`/tenants/${tenantId}`, payload),
};

/**
 * User management API endpoints
 */
export const UsersAPI = {
  add: (tenantId, payload) => api.post(`/tenants/${tenantId}/users`, payload),
  list: (tenantId, params) => api.get(`/tenants/${tenantId}/users`, { params }),
  listAll: (params) => api.get('/users/all', { params }), // super_admin: list all users across all tenants
  update: (userId, payload) => api.put(`/users/${userId}`, payload),
  remove: (userId) => api.delete(`/users/${userId}`)
};

/**
 * Project management API endpoints
 */
export const ProjectsAPI = {
  create: (payload) => api.post('/projects', payload),
  list: (params) => api.get('/projects', { params }),
  listAll: (params) => api.get('/projects/all', { params }), // super_admin: list all projects across all tenants
  update: (projectId, payload) => api.put(`/projects/${projectId}`, payload),
  remove: (projectId) => api.delete(`/projects/${projectId}`)
};

/**
 * Task management API endpoints
 */
export const TasksAPI = {
  list: (projectId, params) => api.get(`/projects/${projectId}/tasks`, { params }),
  listAll: (params) => api.get('/tasks/all', { params }), // super_admin: list all tasks across all tenants
  listForTenant: (params) => api.get('/tasks/tenant', { params }), // tenant_admin: list tasks within tenant
  listMine: (params) => api.get('/tasks/my', { params }), // user: list tasks assigned to self
  create: (projectId, payload) => api.post(`/projects/${projectId}/tasks`, payload),
  update: (taskId, payload) => api.put(`/tasks/${taskId}`, payload),
  updateStatus: (taskId, status) => api.patch(`/tasks/${taskId}/status`, { status }),
  remove: (taskId) => api.delete(`/tasks/${taskId}`)
};
