import { useQuery } from '@tanstack/react-query';
import { getDashboardSummary } from '@/app/services/dashboardService';

export const useDashboardSummary = () =>
  useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: getDashboardSummary,
    staleTime: 60_000,
  });
