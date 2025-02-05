import { apiClient, customerQueryKeys } from '@/api';
import { usePagination } from '@/hooks/use-pagination';
import { useQuery } from '@tanstack/react-query';

export function useCustomersPagination() {
  const [{ page, per_page }] = usePagination();

  const getCustomersFn = async () => {
    const response = await apiClient.get(
      `/customers?page=${page}&limit=${per_page}`
    );
    return {
      data: response.data,
      headers: response.headers,
    };
  };

  return useQuery({
    queryKey: customerQueryKeys.pagination(page, per_page),
    queryFn: getCustomersFn,
  });
}
