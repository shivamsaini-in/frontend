import apiClient from './api';
import type { PaginatedResponse, ApiResponse, MobileUser, UpdateUserStatusPayload } from '@/app/types';

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export const getUsers = async (params: GetUsersParams = {}): Promise<PaginatedResponse<MobileUser>> => {
  const { data } = await apiClient.get<PaginatedResponse<MobileUser>>('/admin/users', {
    params: { page: 1, limit: 10, ...params },
  });
  return data;
};

export const getUserById = async (id: string): Promise<MobileUser> => {
  const { data } = await apiClient.get<ApiResponse<MobileUser>>(`/admin/users/${id}`);
  return data.data;
};

export const updateUserStatus = async (id: string, payload: UpdateUserStatusPayload): Promise<MobileUser> => {
  const { data } = await apiClient.patch<ApiResponse<MobileUser>>(`/admin/users/${id}/status`, payload);
  return data.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await apiClient.delete(`/admin/users/${id}`);
};