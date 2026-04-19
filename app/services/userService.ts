import apiClient from './api';
import type {
  PaginatedResponse,
  ApiResponse,
  User,
  CreateUserPayload,
  UpdateUserPayload,
} from '@/app/types';

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const getUsers = async (params: GetUsersParams = {}): Promise<PaginatedResponse<User>> => {
  const { data } = await apiClient.get<PaginatedResponse<User>>('/users', {
    params: { page: 1, limit: 10, ...params },
  });
  return data;
};

export const getUserById = async (id: string): Promise<User> => {
  const { data } = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
  return data.data;
};

export const createUser = async (payload: CreateUserPayload): Promise<User> => {
  const { data } = await apiClient.post<ApiResponse<User>>('/users', payload);
  return data.data;
};

export const updateUser = async (id: string, payload: UpdateUserPayload): Promise<User> => {
  const { data } = await apiClient.put<ApiResponse<User>>(`/users/${id}`, payload);
  return data.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await apiClient.delete(`/users/${id}`);
};
