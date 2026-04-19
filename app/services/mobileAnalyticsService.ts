import apiClient from './api';
import type {
  ApiResponse,
  PaginatedResponse,
  MobileAnalysisRecord,
  AnalyticsSummary,
} from '@/app/types';

export const getAnalyticsSummary = async (): Promise<AnalyticsSummary> => {
  const { data } = await apiClient.get<ApiResponse<AnalyticsSummary>>('/mobile-analysis/summary');
  return data.data;
};

export const getUserAnalysis = async (
  userId: string,
  page = 1,
  limit = 30
): Promise<PaginatedResponse<MobileAnalysisRecord>> => {
  const { data } = await apiClient.get<PaginatedResponse<MobileAnalysisRecord>>(
    `/mobile-analysis/user/${userId}`,
    { params: { page, limit } }
  );
  return data;
};