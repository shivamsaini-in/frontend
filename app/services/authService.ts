import apiClient from './api';
import type { ApiResponse, AuthData, LoginCredentials } from '@/app/types';

export const loginUser = async (credentials: LoginCredentials): Promise<AuthData> => {
  const { data } = await apiClient.post<ApiResponse<AuthData>>('/auth/login', credentials);
  return data.data;
};

export const logoutUser = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/logout');
  } catch {
    // Ignore logout API errors — we always clear local state
  }
};
