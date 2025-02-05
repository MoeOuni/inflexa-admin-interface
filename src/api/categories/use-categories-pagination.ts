import { apiClient, categoryQueryKeys } from '@/api';
import { usePagination } from '@/hooks/use-pagination';
import { useQuery } from '@tanstack/react-query';

export function useCategoriesPagination() {
  const [{ page, per_page }] = usePagination();

  const getCategoriesFn = async () => {
    const response = await apiClient.get(
      `/categories?page=${page}&limit=${per_page}`
    );
    return {
      data: response.data,
      headers: response.headers,
    };
  };

  return useQuery({
    queryKey: categoryQueryKeys.pagination(page, per_page),
    queryFn: getCategoriesFn,
  });
}
