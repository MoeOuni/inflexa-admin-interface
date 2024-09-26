import axios from 'axios';
import { toast } from 'sonner';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('x-auth-token');

  if (token) {
    config.headers.Authorization = `Bearer ${token.slice(1, -1)}`;
  }
  return config;
});

let isUnauthorized = false;

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (!isUnauthorized) {
        isUnauthorized = true;

        // Redirect to login page
        toast.error('Unauthorized. Please log in again.', {
          action: {
            label: 'Log in again',
            onClick: () => {
              localStorage.clear();
              sessionStorage.clear();
              window.location.href = '/login'; // Clear session and localStorage
            },
          },
          duration: 100000,
        });

        return Promise.reject(new Error('Unauthorized. Please log in again.'));
      } else {
        // Cancel all other API calls
        return new axios.Cancel('Unauthorized. API call cancelled.');
      }
    }
    return Promise.reject(error);
  }
);

export { apiClient };

export const API_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  OPTIONS: 'OPTIONS',
} as const;
