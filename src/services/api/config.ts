/**
 * API Configuration
 * 
 * Configure your MongoDB backend URL here after export.
 * During development with Supabase, this uses the Supabase URL.
 * After export, replace with your Node.js backend URL.
 */

// Toggle this to switch between Supabase and MongoDB backend
export const USE_MONGODB_BACKEND = false;

// MongoDB Backend URL (configure after export)
export const MONGODB_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Supabase URL (current)
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

// Get the active API URL based on backend choice
export const getApiUrl = () => {
  return USE_MONGODB_BACKEND ? MONGODB_API_URL : SUPABASE_URL;
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  ME: '/auth/me',
  
  // Users
  USERS: '/users',
  USER_ROLES: '/users/roles',
  
  // Documents
  DOCUMENTS: '/documents',
  DOCUMENTS_BY_CATEGORY: (category: string) => `/documents/category/${category}`,
  DOCUMENT_DOWNLOAD: (id: string) => `/documents/${id}/download`,
  
  // Images
  IMAGES: '/images',
  IMAGES_BY_CATEGORY: (category: string) => `/images/category/${category}`,
  IMAGE_UPLOAD: '/images/upload',
  
  // Files (Storage)
  FILES_UPLOAD: '/files/upload',
  FILES_DELETE: '/files/delete',
  
  // Analytics
  ANALYTICS: '/analytics',
  ANALYTICS_DOWNLOADS: '/analytics/downloads',
};
