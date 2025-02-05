import { apiClient, cronTasksQueryKeys } from '@/api';
import { usePagination } from '@/hooks/use-pagination';
import { useQuery } from '@tanstack/react-query';

export function useCronTasksPagination() {
  const [{ page, per_page }] = usePagination();

  const getCronTasksFn = async () => {
    const response = await apiClient.get(
      `/cron-tasks?page=${page}&limit=${per_page}`
    );
    return {
      data: response.data,
      headers: response.headers,
    };
  };

  return useQuery({
    queryKey: cronTasksQueryKeys.pagination(page, per_page),
    queryFn: getCronTasksFn,
  });
}
