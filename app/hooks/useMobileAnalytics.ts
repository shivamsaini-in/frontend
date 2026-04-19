import { useQuery } from '@tanstack/react-query';
import { getAnalyticsSummary, getUserAnalysis } from '@/app/services/mobileAnalyticsService';
import { getUserById } from '@/app/services/userService';

export const useAnalyticsSummary = () =>
  useQuery({
    queryKey: ['analytics-summary'],
    queryFn: getAnalyticsSummary,
    staleTime: 60_000,
  });

export const useUserAnalytics = (userId: string, page = 1, limit = 30) =>
  useQuery({
    queryKey: ['user-analytics', userId, page, limit],
    queryFn: () => getUserAnalysis(userId, page, limit),
    enabled: !!userId,
    staleTime: 30_000,
  });

export const useUserDetail = (userId: string) =>
  useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
    staleTime: 60_000,
  });