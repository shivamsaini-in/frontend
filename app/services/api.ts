import axios, { AxiosError } from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000,
});

// Request interceptor: inject JWT from persisted Zustand store in localStorage
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('auth-storage');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        const token = parsed?.state?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch {
        // ignore parse errors
      }
    }
  }
  return config;
});

// Response interceptor: redirect to /login on 401
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('auth-storage');
      document.cookie = 'auth-token=; path=/; max-age=0';
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
