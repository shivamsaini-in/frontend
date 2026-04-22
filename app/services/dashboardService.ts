import apiClient from './api';
import type { ApiResponse, DashboardSummary } from '@/app/types';

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const { data } = await apiClient.get<ApiResponse<DashboardSummary>>('/admin/analytics');
  return data.data;
};